"use client";

export interface TourCardData {
  titulo: string;
  paradas: string[];
  duracionMin: number;
  km: number;
  minutosRelato: number;
  deltaKm?: number; // si viene de un "Ajustar", cuánto cambió respecto a la version anterior
}

export function generarTourCard(
  base: { nombre: string; pois: { name: string }[]; tiempoMin: number; distanciaKm?: number },
  ajusteKm = 0
): TourCardData {
  const km = Math.max(0.4, (base.distanciaKm ?? base.pois.length * 0.6) + ajusteKm);
  const duracionMin = Math.max(10, Math.round(base.tiempoMin + ajusteKm * 12));
  return {
    titulo: base.nombre.split(" · ")[0],
    paradas: base.pois.map((p) => p.name),
    duracionMin,
    km: Math.round(km * 10) / 10,
    minutosRelato: Math.max(4, base.pois.length * 3),
    deltaKm: ajusteKm !== 0 ? Math.round(ajusteKm * 10) / 10 : undefined,
  };
}

export const AMIGOS = [
  { key: "vicente", name: "Vicente", avatar: "V" },
  { key: "manuel", name: "Manuel", avatar: "M" },
  { key: "ulises", name: "Ulises", avatar: "U" },
] as const;

function KPI({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="font-archivo font-extrabold text-lg leading-none tabular-nums">{value}</div>
      <div className="mt-1 text-[9px] uppercase tracking-wide text-gris-calido text-center">
        {label}
      </div>
    </div>
  );
}

function fmtDuracion(min: number) {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m > 0 ? `${h}h${String(m).padStart(2, "0")}` : `${h}h`;
}

export default function TourCard({
  data,
  grupoSeleccionado,
  onToggleAmigo,
  onVerMapa,
  onAjustar,
}: {
  data: TourCardData;
  grupoSeleccionado: string[];
  onToggleAmigo: (key: string) => void;
  onVerMapa: () => void;
  onAjustar: () => void;
}) {
  return (
    <div className="self-stretch bg-papel rounded-2xl border-[0.5px] border-linea-marcada p-4 flex flex-col gap-3 shadow-sm">
      {data.deltaKm !== undefined && (
        <span className="self-start text-[10px] bg-superficie text-gris-medio px-2 py-0.5 rounded-full">
          {data.deltaKm > 0 ? "+" : ""}
          {data.deltaKm} km respecto a la v. anterior
        </span>
      )}

      <p className="font-archivo font-extrabold text-sm leading-snug">{data.titulo}</p>

      <div className="grid grid-cols-4 gap-1">
        <KPI value={data.paradas.length} label="paradas" />
        <KPI value={fmtDuracion(data.duracionMin)} label="duración" />
        <KPI value={`${data.km}km`} label="caminata" />
        <KPI value={`${data.minutosRelato}m`} label="de relato" />
      </div>

      <p className="text-xs text-gris-calido leading-relaxed">
        {data.paradas.map((p, i) => (
          <span key={p}>
            <b className="text-tinta">{i + 1}.</b> {p}
            {i < data.paradas.length - 1 ? " · " : ""}
          </span>
        ))}
      </p>

      <div className="pt-3 border-t border-linea">
        <p className="text-xs font-medium mb-2">
          Modo grupo{" "}
          <span className="text-gris-calido font-normal">— audio sincronizado para todos</span>
        </p>
        <div className="flex gap-2 flex-wrap">
          {AMIGOS.map((a) => {
            const active = grupoSeleccionado.includes(a.key);
            return (
              <button
                key={a.key}
                onClick={() => onToggleAmigo(a.key)}
                className={`text-xs px-3 py-1.5 rounded-full border-[0.5px] flex items-center gap-1.5 ${
                  active
                    ? "bg-tinta text-papel border-tinta"
                    : "border-linea-marcada text-tinta"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${
                    active ? "bg-papel/20" : "bg-superficie"
                  }`}
                >
                  {a.avatar}
                </span>
                {a.name}
              </button>
            );
          })}
        </div>
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
