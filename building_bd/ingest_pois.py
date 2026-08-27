"""
Yatoor · Ingesta de POIs desde los .md de contexto (caba.md, rio-de-janeiro.md, madrid.md, ...)
hacia Supabase (tabla `pois`, con embedding pgvector).

Uso:
    pip install supabase openai --break-system-packages
    export SUPABASE_URL="https://xxxx.supabase.co"
    export SUPABASE_SERVICE_KEY="..."      # service_role key, no la anon key
    export OPENAI_API_KEY="..."
    python ingest_pois.py caba.md rio-de-janeiro.md madrid.md

Qué hace:
  1. Parsea cada archivo .md en bloques "### Nombre" -> dict de campos.
  2. Detecta la ciudad desde el front-matter ("- **Ciudad:** Buenos Aires, Argentina")
     y la normaliza a slug (buenos-aires).
  3. Hace upsert de la fila en `cities` (si no existe).
  4. Para cada POI: genera embedding de `que_contar` (texto que efectivamente narra
     Yatoor) y hace upsert en `pois`, seteando origen='seed'.
  5. Parsea también la sección "## Pendientes de scrapear" con el mismo formato
     y los ingesta con origen='live_search' — son los que el modelo fue
     descubriendo en producción y quedaron anotados ahí para no perderlos.

Este script es idempotente: se puede correr de nuevo después de agregar más
puntos al .md y sólo va a tocar (upsert) lo que cambió, por `id`.
"""

import os
import re
import sys
import unicodedata

EMBEDDING_MODEL = "text-embedding-3-small"  # 1536 dims, matchea el schema.sql

FIELD_RE = re.compile(r"^- (id|barrio|lat, lng|place_id|categoría|qué contar|dato de gancho|fuente|última verificación):\s*(.*)$")


def slugify(text: str) -> str:
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    text = re.sub(r"[^\w\s-]", "", text).strip().lower()
    return re.sub(r"[-\s]+", "-", text)


def parse_city_header(content: str) -> dict:
    m = re.search(r"\*\*Ciudad:\*\*\s*(.+?),\s*(.+)", content)
    if not m:
        raise ValueError("No se encontró '- **Ciudad:**' en el archivo")
    city_name, country = m.group(1).strip(), m.group(2).strip()

    voice_m = re.search(r"\*\*Registro de voz:\*\*\s*(.+?)\n- \*\*", content, re.DOTALL)
    voice = re.sub(r"\s+", " ", voice_m.group(1)).strip() if voice_m else ""

    geofence_m = re.search(r"\*\*Radio de geofencing:\*\*\s*(\d+)", content)
    geofence = int(geofence_m.group(1)) if geofence_m else 50

    return {
        "slug": slugify(city_name),
        "display_name": city_name,
        "country": country,
        "voice_register": voice,
        "geofence_radius_m": geofence,
    }


def parse_poi_blocks(section_text: str) -> list[dict]:
    """Parsea todos los bloques '### Nombre' dentro de una sección del .md."""
    blocks = re.split(r"\n### ", section_text)
    pois = []
    for raw in blocks[1:]:
        lines = raw.split("\n")
        name = lines[0].strip()
        fields: dict[str, str] = {}
        for line in lines[1:]:
            m = FIELD_RE.match(line.strip())
            if m:
                fields[m.group(1)] = m.group(2).strip()

        if "id" not in fields or not fields.get("qué contar"):
            continue  # bloque incompleto o placeholder ("- —"), lo salteamos

        lat, lng = None, None
        if fields.get("lat, lng"):
            parts = [p.strip() for p in fields["lat, lng"].split(",")]
            if len(parts) == 2:
                try:
                    lat, lng = float(parts[0]), float(parts[1])
                except ValueError:
                    pass

        if lat is None or lng is None:
            print(f"  ! salteando '{name}': sin lat/lng válidas")
            continue

        pois.append({
            "id": fields["id"],
            "name": name,
            "barrio": fields.get("barrio") or None,
            "lat": lat,
            "lng": lng,
            "place_id": fields.get("place_id") or None,
            "categoria": [c.strip() for c in fields.get("categoría", "").split(",") if c.strip()],
            "que_contar": fields.get("qué contar", ""),
            "dato_gancho": fields.get("dato de gancho") or None,
            "fuente": fields.get("fuente") or None,
            "fuente_verificada": bool(fields.get("fuente")) and "sin scrapear" not in fields.get("fuente", "") and "sin verificar" not in fields.get("fuente", ""),
            "ultima_verificacion": fields.get("última verificación") or None,
        })
    return pois


def parse_md_file(path: str) -> tuple[dict, list[dict], list[dict]]:
    with open(path, encoding="utf-8") as f:
        content = f.read()

    city = parse_city_header(content)

    # sección "## Puntos cargados" hasta el próximo "---"
    seed_m = re.search(r"## Puntos cargados\n(.*?)\n---", content, re.DOTALL)
    seed_pois = parse_poi_blocks(seed_m.group(1)) if seed_m else []

    # sección "## Pendientes de scrapear" hasta el próximo "---"
    pending_m = re.search(r"## Pendientes de scrapear\n(.*?)\n---", content, re.DOTALL)
    pending_pois = parse_poi_blocks(pending_m.group(1)) if pending_m else []

    return city, seed_pois, pending_pois


def embed_text(client, text: str) -> list[float]:
    resp = client.embeddings.create(model=EMBEDDING_MODEL, input=text)
    return resp.data[0].embedding


def main(md_paths: list[str]):
    from supabase import create_client
    from openai import OpenAI

    supabase_url = os.environ["SUPABASE_URL"]
    supabase_key = os.environ["SUPABASE_SERVICE_KEY"]
    openai_key = os.environ["OPENAI_API_KEY"]

    sb = create_client(supabase_url, supabase_key)
    oai = OpenAI(api_key=openai_key)

    for path in md_paths:
        print(f"\n=== {path} ===")
        city, seed_pois, pending_pois = parse_md_file(path)

        sb.table("cities").upsert(city, on_conflict="slug").execute()
        print(f"  ciudad: {city['display_name']} -> {city['slug']}")

        all_pois = [(p, "seed") for p in seed_pois] + [(p, "live_search") for p in pending_pois]

        for poi, origen in all_pois:
            embedding = embed_text(oai, poi["que_contar"])
            row = {
                "id": poi["id"],
                "city_slug": city["slug"],
                "barrio": poi["barrio"],
                "lat": poi["lat"],
                "lng": poi["lng"],
                "place_id": poi["place_id"],
                "categoria": poi["categoria"],
                "que_contar": poi["que_contar"],
                "dato_gancho": poi["dato_gancho"],
                "fuente": poi["fuente"],
                "fuente_verificada": poi["fuente_verificada"],
                "ultima_verificacion": poi["ultima_verificacion"],
                "origen": origen,
                "embedding": embedding,
            }
            sb.table("pois").upsert(row, on_conflict="id").execute()
            print(f"  + {poi['id']} ({origen})")

        print(f"  total: {len(seed_pois)} cargados, {len(pending_pois)} pendientes ingestados")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python ingest_pois.py archivo1.md [archivo2.md ...]")
        sys.exit(1)
    main(sys.argv[1:])
