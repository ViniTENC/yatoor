import Link from "next/link";
import { notFound } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import MapboxMap from "@/components/MapboxMap";
import EmpezarRecorridoButton from "@/components/EmpezarRecorridoButton";
import { ArrowLeftIcon } from "@/components/icons";
import { getRecorrido } from "@/lib/recorridos";

export default async function RecorridoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recorrido = getRecorrido(id);
  if (!recorrido) notFound();

  const stats =
    recorrido.status === "hecho"
      ? `${recorrido.porcentaje}% · ${recorrido.distanciaKm} km · ${recorrido.tiempoMin} min`
      : recorrido.status === "incompleto"
        ? `${recorrido.porcentaje}% · ${recorrido.tiempoMin} min`
        : `~${recorrido.tiempoMin} min estimado`;

  return (
    <main className="min-h-screen flex flex-col p-8 pb-28 gap-4">
      <div className="flex items-center gap-2.5">
        <Link
          href="/perfil"
          className="w-7 h-7 rounded-full border-[0.5px] border-linea-marcada flex items-center justify-center"
        >
          <ArrowLeftIcon />
        </Link>
        <div>
          <div className="font-archivo font-extrabold tracking-tight text-sm">
            {recorrido.nombre}
          </div>
          <div className="text-xs text-gris-calido mt-0.5">{stats}</div>
        </div>
      </div>

      <div className="relative h-64 rounded-3xl overflow-hidden border-[0.5px] border-linea">
        <MapboxMap
          center={recorrido.center}
          pois={recorrido.pois}
          inicio={recorrido.inicio}
          porcentaje={recorrido.porcentaje}
          zoom={15}
        />
      </div>

      {recorrido.conversacion ? (
        <>
          <div className="bg-superficie rounded-2xl p-4 flex flex-col gap-2.5">
            <p className="text-xs text-gris-calido mb-1">Conversación</p>
            {recorrido.conversacion.map((m, i) => (
              <p
                key={i}
                className={
                  m.from === "vos"
                    ? "self-end bg-tinta text-papel text-sm px-4 py-2.5 rounded-full max-w-[80%] leading-snug"
                    : "text-sm leading-relaxed max-w-[85%]"
                }
              >
                {m.text}
              </p>
            ))}
          </div>
          {recorrido.status === "incompleto" && (
            <EmpezarRecorridoButton id={recorrido.id} label="Retomar recorrido" />
          )}
        </>
      ) : (
        <EmpezarRecorridoButton id={recorrido.id} label="Empezar recorrido" />
      )}

      <BottomNav />
    </main>
  );
}
