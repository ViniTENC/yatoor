"""
Pedile un tour a Gemini en lenguaje natural. Prefiltra los candidatos en
Supabase (get_tour_candidates) antes de mandarselos al LLM, asi el modelo
solo tiene que elegir, ordenar y narrar -- especialmente que pasa ENTRE
paradas -- en vez de procesar cientos de filas.

Uso:
    export GEMINI_API_KEY="tu-key"
    python3 pedir_tour.py "quiero un tour estilo cultura por San Telmo de 3 horas y que termine en Puerto Madero"
"""
import os
import sys
import json
import urllib.request

GEMINI_KEY = os.environ.get("GEMINI_API_KEY")
if not GEMINI_KEY:
    raise SystemExit("Falta GEMINI_API_KEY como variable de entorno.")

if len(sys.argv) < 2:
    raise SystemExit('Uso: python3 pedir_tour.py "tu pedido en lenguaje natural"')

pedido_usuario = sys.argv[1]

SUPABASE_URL = "https://zhiigqsslttzkfrfhocc.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpoaWlncXNzbHR0emtmcmZob2NjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0ODk2ODksImV4cCI6MjEwNTA2NTY4OX0.l1gIjNxkyHpRFY27HMqUgyMcEkwtzirywsOfUcdA37A"

CATEGORIAS_VALIDAS = ["historia", "cultura", "futbol", "comida", "musica", "arte", "arquitectura"]
BARRIOS_VALIDOS = [
    "SAN TELMO", "MONSERRAT", "SAN NICOLAS", "PUERTO MADERO", "RETIRO", "RECOLETA",
    "BALVANERA", "CONSTITUCION", "PALERMO", "BELGRANO", "CABALLITO", "FLORES",
    "BOCA", "BARRACAS", "ALMAGRO", "VILLA CRESPO", "NUÑEZ", "COLEGIALES",
]


def gemini_generate(prompt, temperature=0.4):
    body = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"responseMimeType": "application/json", "temperature": temperature},
    }
    req = urllib.request.Request(
        f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_KEY}",
        data=json.dumps(body).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read())
    return json.loads(data["candidates"][0]["content"]["parts"][0]["text"])


def supabase_rpc(fn_name, params):
    req = urllib.request.Request(
        f"{SUPABASE_URL}/rest/v1/rpc/{fn_name}",
        data=json.dumps(params).encode("utf-8"),
        headers={
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read())


# 1. Extraigo parametros estructurados del pedido en lenguaje natural
#    (barrios, categoria, minutos, barrio de fin si lo menciona)
extraccion_prompt = f"""Pedido del usuario: "{pedido_usuario}"

Extrae de este pedido, en JSON:
{{
  "barrios": [lista de barrios de esta lista que mencione o implique el pedido: {BARRIOS_VALIDOS}],
  "categoria": "una de estas: {CATEGORIAS_VALIDAS}",
  "minutos_max": numero de minutos (si dice "X horas" convertilo; si no dice nada, 120),
  "barrio_final": "barrio donde quiere terminar, si lo menciona, si no null"
}}
Solo el JSON, nada mas."""

params = gemini_generate(extraccion_prompt, temperature=0)
print("--- Parametros extraidos del pedido ---")
print(json.dumps(params, ensure_ascii=False, indent=2))

barrios = params["barrios"]
if params.get("barrio_final") and params["barrio_final"] not in barrios:
    barrios.append(params["barrio_final"])

# 2. Prefiltro en Supabase: esto es lo barato, corre en la base, no en el LLM
candidatos = supabase_rpc("get_tour_candidates", {
    "barrios_in": barrios,
    "categoria_in": params["categoria"],
    "minutos_max": params["minutos_max"],
})

print(f"\n--- Candidatos prefiltrados: {len(candidatos)} ---")

if not candidatos:
    raise SystemExit("No hay candidatos para esa combinacion de barrio/categoria. Probar otra.")

# 3. Le paso el pedido + los candidatos (ya prefiltrados) al LLM.
#    Enfasis: lo importante no es describir cada POI aislado, es narrar
#    que conecta a una parada con la siguiente.
tour_prompt = f"""Sos el motor narrativo de Yatoor, una app de audioguias caminables de Buenos Aires.

Pedido del usuario (literal): "{pedido_usuario}"

Candidatos disponibles (ya prefiltrados por zona/categoria/tiempo, elegi un subconjunto
que entre en el presupuesto de tiempo, no inventes otros POIs):

{json.dumps(candidatos, ensure_ascii=False, indent=2)}

Instrucciones:
1. Ordena los POIs elegidos en una secuencia caminable con sentido geografico (mira lat/lng).
2. Estima caminata entre paradas consecutivas a ~75 metros/minuto en linea recta, sumale
   duracion_min de cada parada, y quedate dentro de {params['minutos_max']} minutos.
3. Para cada parada: separa "dato_duro" (hecho verificable) de "marco_narrativo" (por que
   importa hoy).
4. LO MAS IMPORTANTE: en "puente_a_siguiente" explica que conecta esta parada con la
   siguiente -- una entidad compartida, un periodo historico, una relacion causal, un
   contraste. Esto es mas valioso que la descripcion de cada punto por separado: es lo
   que el usuario va a escuchar caminando ENTRE los POIs, no parado frente a ellos.
   Si no hay conexion real, decilo explicitamente en vez de inventar una.

Devolve SOLO este JSON:
{{
  "titulo": "...",
  "duracion_estimada_min": 0,
  "distancia_estimada_km": 0.0,
  "paradas": [
    {{"nombre": "...", "barrio": "...", "dato_duro": "...", "marco_narrativo": "...", "puente_a_siguiente": "..."}}
  ]
}}
"""

tour = gemini_generate(tour_prompt)
print("\n--- Tour generado ---")
print(json.dumps(tour, ensure_ascii=False, indent=2))

# 4. Valido contra la funcion real de Supabase (no confio en la estimacion del LLM)
ids_elegidos = [c["id"] for c in candidatos if c["nombre"] in [s["nombre"] for s in tour["paradas"]]]
if ids_elegidos:
    validacion = supabase_rpc("duracion_tour_min", {"poi_ids": ids_elegidos})
    print("\n--- Validacion real (Supabase, Haversine) ---")
    print(json.dumps(validacion, ensure_ascii=False, indent=2))
