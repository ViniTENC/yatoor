const EMBEDDING_MODEL = "text-embedding-3-small"; // 1536 dims, matchea schema.sql

export async function embed(texto: string): Promise<number[]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Falta OPENAI_API_KEY en el entorno del servidor.");
  }

  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model: EMBEDDING_MODEL, input: texto }),
  });

  if (!res.ok) {
    const detalle = await res.text();
    throw new Error(`Error generando embedding (${res.status}): ${detalle}`);
  }

  const data = await res.json();
  return data.data[0].embedding as number[];
}
