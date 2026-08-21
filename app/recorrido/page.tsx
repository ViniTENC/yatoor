import Link from "next/link";
import { ArrowLeftIcon, CheckIcon } from "@/components/icons";
import BottomNav from "@/components/BottomNav";

const stops = [
  { name: "Bar cochería 1920", status: "done", meta: "Hecho · 4 min caminando" },
  { name: "Mural de San Telmo", status: "done", meta: "Hecho · 9 min caminando" },
  { name: "Parque Lezama", status: "pending", meta: "Disponible · 6 min caminando" },
  { name: "Feria de San Telmo", status: "pending", meta: "Disponible · 11 min caminando" },
];

export default function RecorridoPage() {
  return (
    <main className="min-h-screen flex flex-col p-8 pb-28">
      <div className="flex items-center gap-2.5">
        <Link
          href="/mapa"
          className="w-7 h-7 rounded-full border-[0.5px] border-linea-marcada flex items-center justify-center"
        >
          <ArrowLeftIcon />
        </Link>
        <span className="font-archivo font-extrabold tracking-tight text-sm">
          Tu recorrido
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {stops.map((stop) => (
          <div
            key={stop.name}
            className={`rounded-xl px-3 py-2.5 flex items-center gap-2.5 ${
              stop.status === "done" ? "bg-[#EAF3DE]" : "bg-superficie"
            }`}
          >
            {stop.status === "done" ? (
              <div className="w-[18px] h-[18px] rounded-full bg-[#639922] flex items-center justify-center flex-shrink-0">
                <CheckIcon />
              </div>
            ) : (
              <div className="w-[18px] h-[18px] rounded-full border-[1.5px] border-linea-marcada flex-shrink-0" />
            )}
            <div>
              <div className="text-sm">{stop.name}</div>
              <div
                className={`text-xs mt-0.5 ${
                  stop.status === "done" ? "text-[#3B6D11]" : "text-gris-calido"
                }`}
              >
                {stop.meta}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/mapa"
        className="mt-auto bg-tinta text-papel text-center rounded-full py-2.5 text-sm"
      >
        Seguir caminando
      </Link>

      <BottomNav />
    </main>
  );
}
