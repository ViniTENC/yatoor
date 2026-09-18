import type { TourCardData } from "@/components/TourCard";

interface ParadaApi {
  nombre: string;
  barrio: string;
  lat: number;
  lng: number;
  dato_duro: string;
  marco_narrativo: string;
  puente_a_siguiente: string;
  que_contar: string;
}

interface TourApiResponse {
  cache: boolean;
  similarity?: number;
  id?: string;
  titulo: string;
  duracion_min: number;
  distancia_km: number;
  paradas: ParadaApi[];
  error?: string;
}

const PALABRAS_POR_MINUTO_HABLADO = 130;

export async function pedirRecorrido(
  prompt: string
): Promise<{ card: TourCardData; paradas: ParadaApi[]; cache: boolean }> {
  const res = await fetch("/api/tour", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const data: TourApiResponse = await res.json();
  if (!res.ok || data.error) {
    throw new Error(data.error ?? "No se pudo armar el recorrido.");
  }

  const totalPalabras = data.paradas.reduce(
    (acc, p) => acc + p.que_contar.split(/\s+/).length,
    0
  );

  const card: TourCardData = {
    titulo: data.titulo,
    paradas: data.paradas.map((p) => p.nombre),
    duracionMin: data.duracion_min,
    km: Math.round(data.distancia_km * 10) / 10,
    minutosRelato: Math.max(1, Math.round(totalPalabras / PALABRAS_POR_MINUTO_HABLADO)),
  };

  return { card, paradas: data.paradas, cache: data.cache };
}
