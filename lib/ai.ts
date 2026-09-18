import { BARRIOS_CABA } from "@/lib/barrios";

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

export interface PedidoExtraido {
  barrios: string[];
  minutos_max: number;
}

export async function extraerPedido(pedidoUsuario: string): Promise<PedidoExtraido> {
  const texto = await callGemini({
    jsonMode: true,
    prompt: `Pedido del usuario: "${pedidoUsuario}"

Extraé, en JSON:
{
  "barrios": [lista de barrios de esta lista oficial de CABA que el pedido
    mencione o implique claramente: ${JSON.stringify(BARRIOS_CABA)}.
    Si no se menciona ni implica ningún barrio, dejá la lista vacía],
  "minutos_max": numero de minutos (si dice "X horas" convertilo a minutos;
    si no dice nada, usá 120)
}
Solo el JSON, nada más.`,
  });
  const limpio = texto.replace(/^```json\s*|\s*```$/g, "").trim();
  return JSON.parse(limpio) as PedidoExtraido;
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

export interface ContenidoZonaSemilla {
  id: string;
  barrio: string;
  categoria: string[];
  contenido: string;
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
  fuente: "poi_seed" | "contenido_zona_seed" | "nuevo";
  poi_id?: string; // si fuente = "poi_seed": el id del POI ancla usado
  contenido_zona_id?: string; // si fuente = "contenido_zona_seed": el id reusado; si fuente = "nuevo": un slug sugerido para guardarlo
  categoria?: string[]; // solo relevante si fuente = "nuevo", para poder guardarlo bien en contenido_zona
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

Fuentes de contenido, en este orden de prioridad:
1. "POIs ancla" (verificados, hiperlocales, con lat/lng exacta): si el pedido del
   usuario toca la zona de alguno, ES OBLIGATORIO incluirlo como parada -- son los
   puntos que "sí o sí" hay que visitar en esa zona. Usá su que_contar tal cual
   (podés ajustar el tono si hace falta para que fluya con el resto), marcá
   "fuente": "poi_seed" y "poi_id" con su id.
2. "Contenido de zona" (relleno ya generado antes para ese barrio, sin lat/lng
   puntual): si alguno encaja temáticamente con el pedido y ayuda a llenar el
   tiempo entre POIs ancla, reusalo tal cual, marcá "fuente": "contenido_zona_seed"
   y "contenido_zona_id" con su id. Para estas paradas de relleno podés estimar
   una lat/lng aproximada dentro del barrio, cerca de la ruta entre los POIs ancla
   que la rodean.
3. Si ninguna de las dos fuentes cubre lo que hace falta para completar el tour
   dentro del tiempo pedido, generá contenido nuevo con tu propio conocimiento.
   Marcá esas paradas "fuente": "nuevo", con "categoria" (lista de categorías que
   aplican) y un "contenido_zona_id" sugerido (slug corto, ej. "san-telmo-tango-callejero")
   para que se pueda guardar como contenido de zona reusable en el futuro -- no lo
   ates a un lat/lng exacto si es contenido de zona genérico, no de un edificio puntual.

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
   dato_duro + marco_narrativo en 2-4 frases fluidas, en la voz de Yatoor. Para
   paradas "poi_seed"/"contenido_zona_seed" partí del que_contar/contenido ya
   existente en vez de reescribirlo desde cero.
4. Ordená las paradas con sentido geográfico real (mirá lat/lng) y quedate
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
      "que_contar": "...", "fuente": "poi_seed" | "contenido_zona_seed" | "nuevo",
      "poi_id": "...o null", "contenido_zona_id": "...o null", "categoria": ["..."] 
    }
  ]
}`;

export async function generarRecorrido(
  pedidoUsuario: string,
  poisSemilla: PoiSemilla[],
  contenidoZonaSemilla: ContenidoZonaSemilla[] = []
): Promise<RecorridoGenerado> {
  const partesContexto: string[] = [];
  partesContexto.push(
    poisSemilla.length > 0
      ? `POIs ancla disponibles (obligatorios si aplican):\n${JSON.stringify(poisSemilla, null, 2)}`
      : "No hay POIs ancla cargados para esta zona."
  );
  partesContexto.push(
    contenidoZonaSemilla.length > 0
      ? `Contenido de zona ya generado antes (relleno reusable si aplica):\n${JSON.stringify(
          contenidoZonaSemilla,
          null,
          2
        )}`
      : "No hay contenido de zona generado todavía para esta zona."
  );

  const texto = await callGemini({
    system: SYSTEM_PROMPT,
    prompt: `Pedido del usuario: "${pedidoUsuario}"\n\n${partesContexto.join("\n\n")}`,
    jsonMode: true,
  });

  // con responseMimeType json Gemini no debería envolver en ```json, pero
  // por las dudas lo saco igual si aparece
  const limpio = texto.replace(/^```json\s*|\s*```$/g, "").trim();
  return JSON.parse(limpio) as RecorridoGenerado;
}
