"""
Prueba rápida: arma un tour narrado de San Telmo con Gemini,
usando un cluster real de monumentos sacado de monumentos_relevantes.

Uso:
    export GEMINI_API_KEY="tu-key-aca"
    python3 probar_tour_gemini.py
"""
import os
import json
import urllib.request

API_KEY = os.environ.get("GEMINI_API_KEY")
if not API_KEY:
    raise SystemExit("Falta GEMINI_API_KEY como variable de entorno.")

# Cluster caminable en San Telmo / borde con Monserrat (todo a ~10 cuadras)
POIS = [
    {"nombre": "Monumento a Manuel Belgrano", "direccion": "Bolívar 342 (San Telmo)",
     "lat": -34.6118557, "lng": -58.3733252},
    {"nombre": "Busto a Rosario Vera Peñaloza", "direccion": "Piedras y San Juan Av. (San Telmo)",
     "lat": -34.6220607, "lng": -58.3772054},
    {"nombre": "Busto a Cesar M. Polledo", "direccion": "Paseo Colón Av. e Independencia Av. (San Telmo)",
     "lat": -34.6170010, "lng": -58.3686898},
    {"nombre": "Pirámide de Mayo", "direccion": "Av. de Mayo / Plaza de Mayo (Monserrat, linda con San Telmo)",
     "lat": -34.6089263, "lng": -58.3721553},
    {"nombre": "Monumento a Mariano Moreno", "direccion": "Av. de Mayo 1500 (Monserrat)",
     "lat": -34.6094914, "lng": -58.3867311},
]

PROMPT = f"""Sos el motor narrativo de Yatoor, una app de audioguías caminables de Buenos Aires.

Con estos POIs reales (nombre, dirección, coordenadas), armá un recorrido a pie de San Telmo / borde con Monserrat.

Reglas estrictas:
1. Separá siempre "dato duro" (fecha, autor, ubicación, hecho verificable) de "marco narrativo" (interpretación, importancia histórica). Nunca mezcles ambos sin dejarlo claro.
2. Para cada parada, explicá quién fue o qué representa la persona/hecho homenajeado, no solo el objeto físico (esto importa más que describir el bronce o el mármol).
3. Buscá conexiones entre paradas cuando compartan una entidad histórica o un período (ej. si dos paradas tocan la Revolución de Mayo, decilo explícitamente).
4. Devolvé JSON con esta forma exacta:
{{
  "titulo": "...",
  "duracion_min": 0,
  "distancia_km": 0.0,
  "paradas": [
    {{"nombre": "...", "dato_duro": "...", "marco_narrativo": "...", "conexion_con_otras_paradas": "..."}}
  ]
}}

POIs:
{json.dumps(POIS, ensure_ascii=False, indent=2)}
"""

body = {
    "contents": [{"parts": [{"text": PROMPT}]}],
    "generationConfig": {"responseMimeType": "application/json"},
}

url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}"
req = urllib.request.Request(
    url,
    data=json.dumps(body).encode("utf-8"),
    headers={"Content-Type": "application/json"},
    method="POST",
)

with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read())

text = data["candidates"][0]["content"]["parts"][0]["text"]
tour = json.loads(text)

print(json.dumps(tour, ensure_ascii=False, indent=2))
