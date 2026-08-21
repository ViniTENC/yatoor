"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { CATEGORIA_COLOR, CATEGORIA_LABEL, type Poi, type Punto } from "@/lib/recorridos";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

// San Telmo, Buenos Aires — default cuando no se pasan props.
const defaultCenter: [number, number] = [-58.3712, -34.6208];
const defaultPois: Poi[] = [
  { name: "Bar cochería 1920", lng: -58.3724, lat: -34.6214, categoria: "tradicional" },
  { name: "Mural de San Telmo", lng: -58.3701, lat: -34.6229, categoria: "moderno" },
];

interface MapboxMapProps {
  center?: [number, number];
  pois?: Poi[];
  inicio?: Punto;
  porcentaje?: number;
  zoom?: number;
}

// Distancia aproximada (equirectangular, suficiente para tramos a pie cortos).
function distancia(a: [number, number], b: [number, number]) {
  const dx = (a[0] - b[0]) * Math.cos(((a[1] + b[1]) / 2) * (Math.PI / 180));
  const dy = a[1] - b[1];
  return Math.sqrt(dx * dx + dy * dy);
}

function cortarPorPorcentaje(coords: [number, number][], porcentaje: number) {
  if (coords.length < 2) return coords;
  const acumulado = [0];
  for (let i = 1; i < coords.length; i++) {
    acumulado.push(acumulado[i - 1] + distancia(coords[i - 1], coords[i]));
  }
  const total = acumulado[acumulado.length - 1];
  const objetivo = total * (porcentaje / 100);
  let idx = acumulado.findIndex((d) => d >= objetivo);
  if (idx === -1) idx = coords.length - 1;
  return coords.slice(0, Math.max(2, idx + 1));
}

async function rutaCaminando(waypoints: [number, number][]): Promise<[number, number][] | null> {
  const coordsParam = waypoints.map(([lng, lat]) => `${lng},${lat}`).join(";");
  const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${coordsParam}?geometries=geojson&overview=full&access_token=${TOKEN}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.routes?.[0]?.geometry?.coordinates ?? null;
  } catch {
    return null;
  }
}

export default function MapboxMap({
  center = defaultCenter,
  pois = defaultPois,
  inicio,
  porcentaje,
  zoom = 16,
}: MapboxMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!TOKEN || !containerRef.current) return;
    let cancelled = false;

    mapboxgl.accessToken = TOKEN;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center,
      zoom,
    });
    mapRef.current = map;

    pois.forEach((poi) => {
      const color = CATEGORIA_COLOR[poi.categoria];
      const el = document.createElement("div");
      el.style.width = "18px";
      el.style.height = "18px";
      el.style.borderRadius = "50% 50% 50% 0";
      el.style.background = color;
      el.style.border = "1.5px solid #F5F2EA";
      el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.35)";
      el.style.transform = "rotate(-45deg)";
      el.style.cursor = "pointer";

      const popup = new mapboxgl.Popup({ offset: 22, closeButton: true, className: "yatoor-popup" }).setHTML(
        `<div style="font-family:'DM Sans',sans-serif;">
          <div style="font-size:10px;letter-spacing:0.05em;text-transform:uppercase;color:${color};font-weight:600;margin-bottom:2px;">${CATEGORIA_LABEL[poi.categoria]}</div>
          <div style="font-family:'Archivo',sans-serif;font-weight:800;font-size:13px;color:#14161A;margin-bottom:4px;">${poi.name}</div>
          ${poi.info ? `<div style="font-size:12px;color:#6E7278;line-height:1.4;max-width:200px;">${poi.info}</div>` : ""}
        </div>`
      );

      new mapboxgl.Marker({ element: el })
        .setLngLat([poi.lng, poi.lat])
        .setPopup(popup)
        .addTo(map);
    });

    if (inicio) {
      const el = document.createElement("div");
      el.style.width = "20px";
      el.style.height = "20px";
      el.style.borderRadius = "50%";
      el.style.background = "#F5F2EA";
      el.style.border = "3px solid #14161A";
      el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.35)";

      const popup = new mapboxgl.Popup({ offset: 16, closeButton: true, className: "yatoor-popup" }).setHTML(
        `<div style="font-family:'DM Sans',sans-serif;">
          <div style="font-size:10px;letter-spacing:0.05em;text-transform:uppercase;color:#8A8578;font-weight:600;margin-bottom:2px;">Punto de inicio</div>
          <div style="font-family:'Archivo',sans-serif;font-weight:800;font-size:13px;color:#14161A;">Arrancás acá</div>
        </div>`
      );

      new mapboxgl.Marker({ element: el })
        .setLngLat([inicio.lng, inicio.lat])
        .setPopup(popup)
        .addTo(map);
    }

    map.on("load", async () => {
      if (cancelled || !inicio || pois.length === 0) return;

      const waypoints: [number, number][] = [
        [inicio.lng, inicio.lat],
        ...pois.map((p) => [p.lng, p.lat] as [number, number]),
      ];
      const coords = await rutaCaminando(waypoints);
      if (cancelled || !coords || coords.length < 2) return;

      map.addSource("ruta-planeada", {
        type: "geojson",
        data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: coords } },
      });
      map.addLayer({
        id: "ruta-planeada-line",
        type: "line",
        source: "ruta-planeada",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: { "line-color": "#C9C4B5", "line-width": 3, "line-dasharray": [1.5, 1.5] },
      });

      if (porcentaje && porcentaje > 0) {
        const hechoCoords = cortarPorPorcentaje(coords as [number, number][], porcentaje);
        map.addSource("ruta-hecha", {
          type: "geojson",
          data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: hechoCoords } },
        });
        map.addLayer({
          id: "ruta-hecha-line",
          type: "line",
          source: "ruta-hecha",
          layout: { "line-cap": "round", "line-join": "round" },
          paint: { "line-color": "#639922", "line-width": 4 },
        });
      }
    });

    return () => {
      cancelled = true;
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(center), JSON.stringify(pois), JSON.stringify(inicio), porcentaje, zoom]);

  if (!TOKEN) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[#F2EFE6] p-8 text-center">
        <p className="text-sm text-gris-medio max-w-xs">
          Falta NEXT_PUBLIC_MAPBOX_TOKEN en .env.local. Conseguí un token
          gratis en mapbox.com y agregalo para ver el mapa real.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}
