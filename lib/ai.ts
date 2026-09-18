// Nunca expongas esta key en el cliente: usar solo desde API routes / server actions.
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = "gemini-2.0-flash";

async function callGemini(opts: {
  prompt: string;
  system?: string;
  jsonMode?: boolean;
}): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error("Falta GEMINI_API_KEY en el entorno del servidor.");
  }

  const body: Record<string, unknown> = {
    contents: [{ role: "user", parts: [{ text: opts.prompt }] }],
  };
  if (opts.system) {
    body.systemInstruction = { parts: [{ text: opts.system }] };
  }
  if (opts.jsonMode) {
    body.generationConfig = { responseMimeType: "application/json" };
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const detalle = await res.text();
    throw new Error(`Error llamando a Gemini (${res.status}): ${detalle}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Gemini no devolvió texto (¿respuesta bloqueada por safety filters?).");
  }
  return text as string;
}

export async function askTourGuide(prompt: string) {
  const text = await callGemini({ prompt });
  return { text };
}

// ============================================================
// Armado de recorridos: el "texto de especificación" que le decimos
// al modelo para que narre bien, separando siempre dato duro (hecho
// verificable) de marco narrativo (por qué importa), y explicitando
// qué conecta cada parada con la siguiente -- ver
// building_bd/CLAUDE_2.md / content-principles-and-workflow.
// ============================================================

export interface PoiSemilla {
  id: string;
  nombre: string;
  barrio: string | null;
  lat: number;
  lng: number;
  que_contar: string;
  categoria: string[];
}

export interface ParadaGenerada {
  nombre: string;
  barrio: string;
  lat: number;
  lng: number;
  dato_duro: string;
  marco_narrativo: string;
  puente_a_siguiente: string;
  que_contar: string; // dato_duro + marco_narrativo fusionados en voz Yatoor, listo para narrar/TTS
  poi_id?: string; // si vino de un POI semilla existente, su id
}

export interface RecorridoGenerado {
  titulo: string;
  duracion_min: number;
  distancia_km: number;
  origen: "seed" | "live_search" | "mixto";
  paradas: ParadaGenerada[];
}

const SYSTEM_PROMPT = `Sos el motor narrativo de Yatoor, una app de audioguías caminables.
Tu voz: compañero de viaje cercano, no un guía turístico formal. Voseo rioplatense
cuando la ciudad es Buenos Aires. Sin emojis, sin exclamaciones forzadas.

Reglas de contenido (no negociables):
1. Separá siempre "dato_duro" (hecho verificable: fecha, autor, ubicación) de
   "marco_narrativo" (por qué esa persona/hecho importa hoy). Nunca mezcles
   interpretación con hecho sin dejarlo claro. No inventes fechas ni atribuciones
   que no tengas razonablemente firmes -- ante la duda, marco_narrativo puede
   quedar más general en vez de arriesgar un dato falso.
2. LO MÁS IMPORTANTE es "puente_a_siguiente": qué conecta esta parada con la
   próxima -- una entidad compartida (misma persona, mismo período histórico),
   una relación causal, o un contraste deliberado. Esto es lo que el usuario
   escucha CAMINANDO ENTRE paradas, no parado frente a ellas -- vale más que la
   descripción de cada punto por separado. Si de verdad no hay conexión real,
   decilo en vez de inventarla ("esta parada es un quiebre de tema: pasamos de
   X a Y").
3. "que_contar" es el texto final que se narra por audio (TTS): fusioná
   dato_duro + marco_narrativo en 2-4 frases fluidas, en la voz de Yatoor. Es lo
   que efectivamente escucha el usuario en esa parada.
4. Si te paso POIs semilla (ya verificados, con su propio que_contar), priorizá
   usarlos tal cual para dato_duro/que_contar en vez de reescribir desde cero, y
   marcá origen "seed" para esa parada. Si no hay semilla suficiente para lo que
   pide el usuario, usá tu propio conocimiento y marcá origen "live_search" --
   está permitido, es preferible a forzar una semilla que no encaja.
5. Ordená las paradas con sentido geográfico real (mirá lat/lng) y quedate
   dentro del presupuesto de tiempo pedido (duración de cada parada ~4-8 min +
   caminata a ~75m/min entre paradas consecutivas).

Devolvé SOLO este JSON, sin texto antes ni después:
{
  "titulo": "...",
  "duracion_min": 0,
  "distancia_km": 0.0,
  "origen": "seed" | "live_search" | "mixto",
  "paradas": [
    {
      "nombre": "...", "barrio": "...", "lat": 0.0, "lng": 0.0,
      "dato_duro": "...", "marco_narrativo": "...", "puente_a_siguiente": "...",
      "que_contar": "...", "poi_id": "id-del-poi-semilla-si-aplica-o-null"
    }
  ]
}`;

export async function generarRecorrido(
  pedidoUsuario: string,
  poisSemilla: PoiSemilla[]
): Promise<RecorridoGenerado> {
  const contexto =
    poisSemilla.length > 0
      ? `POIs semilla disponibles en la zona (usalos como base cuando apliquen):\n${JSON.stringify(
          poisSemilla,
          null,
          2
        )}`
      : "No hay POIs semilla cargados para esta zona/pedido -- armá el recorrido con tu propio conocimiento y marcá origen \"live_search\".";

  const texto = await callGemini({
    system: SYSTEM_PROMPT,
    prompt: `Pedido del usuario: "${pedidoUsuario}"\n\n${contexto}`,
    jsonMode: true,
  });

  // con responseMimeType json Gemini no debería envolver en ```json, pero
  // por las dudas lo saco igual si aparece
  const limpio = texto.replace(/^```json\s*|\s*```$/g, "").trim();
  return JSON.parse(limpio) as RecorridoGenerado;
}
