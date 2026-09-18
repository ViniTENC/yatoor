const EMBEDDING_MODEL = "gemini-embedding-001";
const OUTPUT_DIMENSIONALITY = 1536; // matchea el vector(1536) del schema.sql

export async function embed(texto: string): Promise<number[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Falta GEMINI_API_KEY en el entorno del servidor.");
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${EMBEDDING_MODEL}:embedContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: { parts: [{ text: texto }] },
        outputDimensionality: OUTPUT_DIMENSIONALITY,
        taskType: "SEMANTIC_SIMILARITY",
      }),
    }
  );

  if (!res.ok) {
    const detalle = await res.text();
    throw new Error(`Error generando embedding (${res.status}): ${detalle}`);
  }

  const data = await res.json();
  return data.embedding.values as number[];
}
