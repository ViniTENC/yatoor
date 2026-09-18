import { NextRequest, NextResponse } from "next/server";
import { embed } from "@/lib/embeddings";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { generarRecorrido, type PoiSemilla, type RecorridoGenerado } from "@/lib/ai";

const SIMILARITY_THRESHOLD = 0.7;
const CITY_SLUG = "buenos-aires";

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
    // sumo un uso al cache hit (fire and forget, no bloquea la respuesta)
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

  // 2. No hay cache: busco POIs semilla de la ciudad para darle contexto real al modelo
  const { data: poisRaw } = await supabaseAdmin
    .from("pois")
    .select("id, barrio, lat, lng, que_contar, categoria")
    .eq("city_slug", CITY_SLUG)
    .limit(80);

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

  let tour: RecorridoGenerado;
  try {
    tour = await generarRecorrido(prompt, poisSemilla);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }

  // 3. Guardo el recorrido armado, con su embedding, para la proxima vez
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
    // no rompo la respuesta al usuario solo porque falló el guardado del cache
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
