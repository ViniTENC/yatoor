import { NextRequest, NextResponse } from "next/server";
import { embed } from "@/lib/embeddings";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import {
  generarRecorrido,
  extraerPedido,
  type PoiSemilla,
  type ContenidoZonaSemilla,
  type RecorridoGenerado,
} from "@/lib/ai";

const SIMILARITY_THRESHOLD = 0.7;
const CITY_SLUG = "buenos-aires";

function slugify(texto: string): string {
  return texto
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  if (!prompt || typeof prompt !== "string") {
    return NextResponse.json({ error: "Falta el prompt" }, { status: 400 });
  }

  let queryEmbedding: number[];
  try {
    queryEmbedding = await embed(prompt);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }

  // 1. ¿Ya armamos algo con una similitud >= 70% a este pedido?
  const { data: match, error: matchError } = await supabaseAdmin.rpc(
    "match_recorrido_by_similarity",
    {
      p_city_slug: CITY_SLUG,
      p_query_embedding: queryEmbedding,
      p_threshold: SIMILARITY_THRESHOLD,
      p_limit: 1,
    }
  );

  if (matchError) {
    return NextResponse.json({ error: matchError.message }, { status: 500 });
  }

  if (match && match.length > 0) {
    const hit = match[0];
    supabaseAdmin.rpc("increment_recorrido_usos", { p_id: hit.id }).then(() => {});
    return NextResponse.json({
      cache: true,
      similarity: hit.similarity,
      titulo: hit.titulo,
      duracion_min: hit.duracion_min,
      distancia_km: hit.distancia_km,
      paradas: hit.paradas,
    });
  }

  // 2. No hay cache: entiendo qué barrio(s)/tiempo pide, y busco anclas + relleno reusable
  let barrios: string[] = [];
  try {
    const extraido = await extraerPedido(prompt);
    barrios = extraido.barrios;
  } catch (err) {
    console.error("No se pudo extraer barrios del pedido, sigo sin filtro:", err);
  }

  let poisQuery = supabaseAdmin.from("pois").select("id, barrio, lat, lng, que_contar, categoria").eq("city_slug", CITY_SLUG);
  let zonaQuery = supabaseAdmin.from("contenido_zona").select("id, barrio, categoria, contenido").eq("city_slug", CITY_SLUG);
  if (barrios.length > 0) {
    poisQuery = poisQuery.in("barrio", barrios);
    zonaQuery = zonaQuery.in("barrio", barrios);
  }
  const [{ data: poisRaw }, { data: zonaRaw }] = await Promise.all([
    poisQuery.limit(80),
    zonaQuery.limit(40),
  ]);

  // pois.id es un slug ('puente-de-la-mujer'); no hay columna de nombre
  // legible en el schema, así que lo derivo acá para pasárselo al modelo.
  const poisSemilla: PoiSemilla[] = (poisRaw ?? []).map((p) => ({
    id: p.id,
    nombre: p.id
      .split("-")
      .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    barrio: p.barrio,
    lat: p.lat,
    lng: p.lng,
    que_contar: p.que_contar,
    categoria: p.categoria ?? [],
  }));

  const contenidoZonaSemilla: ContenidoZonaSemilla[] = (zonaRaw ?? []).map((z) => ({
    id: z.id,
    barrio: z.barrio,
    categoria: z.categoria ?? [],
    contenido: z.contenido,
  }));

  let tour: RecorridoGenerado;
  try {
    tour = await generarRecorrido(prompt, poisSemilla, contenidoZonaSemilla);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }

  // 3. Las paradas "nuevo" son relleno recién generado: las guardo en
  // contenido_zona (con su propio embedding) para que el próximo tour de
  // esa misma zona las pueda reusar en vez de regenerarlas.
  const nuevas = tour.paradas.filter((p) => p.fuente === "nuevo");
  await Promise.all(
    nuevas.map(async (p) => {
      try {
        const id = p.contenido_zona_id ? slugify(p.contenido_zona_id) : slugify(`${p.barrio}-${p.nombre}`);
        const contenidoEmbedding = await embed(p.que_contar);
        await supabaseAdmin.from("contenido_zona").upsert(
          {
            id,
            city_slug: CITY_SLUG,
            barrio: p.barrio,
            categoria: p.categoria ?? [],
            contenido: p.que_contar,
            fuente: "generado por el modelo en runtime (live_search), no auditado",
            fuente_verificada: false,
            embedding: contenidoEmbedding,
          },
          { onConflict: "id" }
        );
      } catch (err) {
        // no rompo la respuesta al usuario solo porque no se pudo guardar el relleno
        console.error("No se pudo guardar contenido_zona nuevo:", err);
      }
    })
  );

  // 4. Guardo el recorrido completo armado, con su embedding, para la próxima vez
  const { data: saved, error: saveError } = await supabaseAdmin
    .from("recorridos")
    .insert({
      city_slug: CITY_SLUG,
      prompt_original: prompt,
      titulo: tour.titulo,
      duracion_min: tour.duracion_min,
      distancia_km: tour.distancia_km,
      paradas: tour.paradas,
      origen: tour.origen,
      embedding: queryEmbedding,
    })
    .select()
    .single();

  if (saveError) {
    console.error("No se pudo guardar el recorrido en cache:", saveError.message);
  }

  return NextResponse.json({
    cache: false,
    id: saved?.id,
    titulo: tour.titulo,
    duracion_min: tour.duracion_min,
    distancia_km: tour.distancia_km,
    paradas: tour.paradas,
  });
}
