"use client";

export interface TourCardData {
  paradas: number;
  duracionMin: number;
  km: number;
  minutosRelato: number;
}

export function generarTourCard(
  base: { pois: unknown[]; tiempoMin: number; distanciaKm?: number },
  ajuste = 0
): TourCardData {
  const km = Math.max(0.4, (base.distanciaKm ?? base.pois.length * 0.6) + ajuste);
  const duracionMin = Math.max(10, Math.round(base.tiempoMin + ajuste * 12));
  return {
    paradas: base.pois.length,
    duracionMin,
    km: Math.round(km * 10) / 10,
    minutosRelato: Math.max(4, base.pois.length * 3),
  };
}

function KPI({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="font-archivo font-extrabold text-lg leading-none">{value}</div>
      <div className="mt-1 text-[9px] uppercase tracking-wide text-gris-calido text-center">
        {label}
      </div>
    </div>
  );
}

export default function TourCard({
  data,
  onVerMapa,
  onAjustar,
}: {
  data: TourCardData;
  onVerMapa: () => void;
  onAjustar: () => void;
}) {
  return (
    <div className="self-stretch bg-papel rounded-2xl border-[0.5px] border-linea-marcada p-4 flex flex-col gap-3 shadow-sm">
      <p className="text-xs text-gris-calido">Armé este recorrido para vos</p>
      <div className="grid grid-cols-4 gap-1">
        <KPI value={data.paradas} label="paradas" />
        <KPI value={`${data.duracionMin}m`} label="duración" />
        <KPI value={`${data.km}km`} label="distancia" />
        <KPI value={`${data.minutosRelato}m`} label="de relato" />
      </div>
      <div className="flex gap-2">
        <button
          onClick={onAjustar}
          className="flex-1 text-xs border-[0.5px] border-linea-marcada rounded-full py-2"
        >
          Ajustar
        </button>
        <button
          onClick={onVerMapa}
          className="flex-1 text-xs bg-tinta text-papel rounded-full py-2"
        >
          Ver en el mapa
        </button>
      </div>
    </div>
  );
}
