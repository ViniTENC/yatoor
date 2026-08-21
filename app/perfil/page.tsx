"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import { CheckIcon } from "@/components/icons";
import { recorridos, getRecorrido } from "@/lib/recorridos";
import { useActiveRecorridoId } from "@/lib/useActiveRecorrido";

const amigos = [
  { name: "Cami", nivel: "Plata" },
  { name: "Fede", nivel: "Bronce" },
  { name: "Luli", nivel: "Oro · Explorador BA" },
];

const medallas = [
  { icon: "🏛️", label: "San Telmo", ganada: true },
  { icon: "🎨", label: "Arte urbano", ganada: true },
  { icon: "☕", label: "Gastronomía", ganada: true },
  { icon: "⚽", label: "Fútbol", ganada: false },
  { icon: "···", label: "Secreta", ganada: false },
];

export default function PerfilPage() {
  const router = useRouter();
  const { activeId, setActiveId } = useActiveRecorridoId();

  const activo = getRecorrido(activeId);
  const mostrarActivo = activo && activo.status !== "hecho";
  const hechos = recorridos.filter((r) => r.status === "hecho");
  const pendientes = recorridos.filter(
    (r) => r.id !== activeId && r.status !== "hecho"
  );

  function retomar(id: string) {
    setActiveId(id);
    router.push("/mapa");
  }

  return (
    <main className="min-h-screen flex flex-col p-8 pb-28 gap-8">
      <div className="flex items-center justify-between">
        <span className="font-archivo font-extrabold tracking-tight text-sm">
          Perfil
        </span>
        <button
          onClick={() => {
            const disponible =
              pendientes.find((r) => r.porcentaje === undefined) ?? pendientes[0];
            if (disponible) retomar(disponible.id);
          }}
          disabled={pendientes.length === 0}
          className="text-xs bg-tinta text-papel px-3.5 py-1.5 rounded-full disabled:opacity-40"
        >
          + Nuevo recorrido
        </button>
      </div>

      <section>
        <h2 className="font-archivo font-extrabold tracking-tight text-sm mb-2.5">
          Recorridos
        </h2>

        <div className="flex flex-col gap-4">
          {mostrarActivo && activo && (
            <div>
              <p className="text-xs text-gris-calido mb-1.5">Estás haciendo</p>
              <Link
                href="/mapa"
                className="bg-superficie rounded-xl px-3 py-2.5 flex items-center gap-2.5 border-[0.5px] border-linea-marcada"
              >
                <div className="w-[18px] h-[18px] rounded-full bg-nube flex-shrink-0" />
                <div>
                  <div className="text-sm">{activo.nombre}</div>
                  <div className="text-xs text-gris-calido mt-0.5">
                    {activo.porcentaje !== undefined
                      ? `${activo.porcentaje}% · ${activo.tiempoMin} min`
                      : `~${activo.tiempoMin} min`}
                  </div>
                </div>
              </Link>
            </div>
          )}

          {hechos.length > 0 && (
            <div>
              <p className="text-xs text-gris-calido mb-1.5">Hechos</p>
              <div className="flex flex-col gap-2">
                {hechos.map((r) => (
                  <Link
                    key={r.id}
                    href={`/perfil/recorridos/${r.id}`}
                    className="bg-[#EAF3DE] rounded-xl px-3 py-2.5 flex items-center gap-2.5"
                  >
                    <div className="w-[18px] h-[18px] rounded-full bg-[#639922] flex items-center justify-center flex-shrink-0">
                      <CheckIcon />
                    </div>
                    <div>
                      <div className="text-sm">{r.nombre}</div>
                      <div className="text-xs text-[#3B6D11] mt-0.5">
                        {r.porcentaje}% · {r.distanciaKm} km · {r.tiempoMin} min
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {pendientes.length > 0 && (
            <div>
              <p className="text-xs text-gris-calido mb-1.5">Pendientes</p>
              <div className="flex flex-col gap-2">
                {pendientes.map((r) => (
                  <div
                    key={r.id}
                    className="bg-superficie rounded-xl px-3 py-2.5 flex items-center gap-2.5"
                  >
                    <Link
                      href={`/perfil/recorridos/${r.id}`}
                      className="flex items-center gap-2.5 flex-1 min-w-0"
                    >
                      <div className="w-[18px] h-[18px] rounded-full border-[1.5px] border-linea-marcada flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-sm truncate">{r.nombre}</div>
                        <div className="text-xs text-gris-calido mt-0.5">
                          {r.porcentaje !== undefined
                            ? `${r.porcentaje}% · ${r.tiempoMin} min`
                            : `~${r.tiempoMin} min`}
                        </div>
                      </div>
                    </Link>
                    <button
                      onClick={() => retomar(r.id)}
                      className="text-xs bg-tinta text-papel px-3 py-1.5 rounded-full flex-shrink-0"
                    >
                      {r.porcentaje !== undefined
                        ? "Retomar recorrido"
                        : "Empezar recorrido"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section>
        <h2 className="font-archivo font-extrabold tracking-tight text-sm mb-2.5">
          Medallas
        </h2>
        <div className="flex gap-3 flex-wrap">
          {medallas.map((m) => (
            <div
              key={m.label}
              className={`w-20 h-20 rounded-full border-2 border-dashed flex flex-col items-center justify-center gap-1 text-center ${
                m.ganada
                  ? "border-transparent bg-superficie"
                  : "border-linea-marcada opacity-40"
              }`}
            >
              <div className="text-lg">{m.icon}</div>
              <div className="text-[9px] uppercase tracking-wide text-gris-calido px-1.5">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-archivo font-extrabold tracking-tight text-sm mb-2.5">
          Amigos
        </h2>
        <div className="flex flex-col gap-2">
          {amigos.map((a) => (
            <div
              key={a.name}
              className="bg-superficie rounded-xl px-3 py-2.5 flex items-center justify-between"
            >
              <span className="text-sm">{a.name}</span>
              <span className="text-xs text-gris-calido">{a.nivel}</span>
            </div>
          ))}
        </div>
      </section>

      <BottomNav />
    </main>
  );
}
