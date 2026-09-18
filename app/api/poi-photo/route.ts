import { NextRequest, NextResponse } from "next/server";

// Sirve la foto de un lugar directo desde Google Places (New) -- nunca la
// guardamos nosotros, solo resolvemos la URL final y redirigimos ahi. La
// API key nunca llega al browser: la usamos server-side para las dos
// llamadas y solo exponemos la URL final de googleusercontent.com.
export async function GET(req: NextRequest) {
  const placeId = req.nextUrl.searchParams.get("place_id");
  const maxWidth = req.nextUrl.searchParams.get("maxWidth") ?? "800";

  if (!placeId) {
    return NextResponse.json({ error: "Falta place_id" }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Falta GOOGLE_PLACES_API_KEY en el servidor" }, { status: 500 });
  }

  // 1. traigo el nombre de la primera foto de ese lugar
  const detailsRes = await fetch(`https://places.googleapis.com/v1/places/${placeId}?fields=photos`, {
    headers: { "X-Goog-Api-Key": apiKey },
  });

  if (!detailsRes.ok) {
    const detalle = await detailsRes.text();
    return NextResponse.json({ error: `Places API (${detailsRes.status}): ${detalle}` }, { status: detailsRes.status });
  }

  const details = await detailsRes.json();
  const photoName: string | undefined = details.photos?.[0]?.name;
  if (!photoName) {
    return NextResponse.json({ error: "Este lugar no tiene fotos en Google Places" }, { status: 404 });
  }

  // 2. resuelvo la url final de la imagen (googleusercontent.com) sin
  // seguir la redirección server-side -- asi no exponemos la key al cliente
  const mediaRes = await fetch(
    `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=${maxWidth}&key=${apiKey}`,
    { redirect: "manual" }
  );

  const location = mediaRes.headers.get("location");
  if (!location) {
    return NextResponse.json({ error: "No se pudo resolver la foto del lugar" }, { status: 502 });
  }

  return NextResponse.redirect(location);
}
