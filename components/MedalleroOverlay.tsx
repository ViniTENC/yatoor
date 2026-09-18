"use client";

import { CloseIcon } from "@/components/icons";
import { pasaporteCiudades, logros } from "@/lib/recorridos";

export default function MedalleroOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      className={`absolute inset-0 z-[100] flex flex-col bg-papel transition-transform duration-300 ease-out ${
        open ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-3 px-5 pt-4 pb-3.5 border-b border-linea-1 flex-shrink-0">
        <div className="font-archivo font-extrabold text-base">Medallero</div>
        <button onClick={onClose} aria-label="Cerrar" className="ml-auto text-gris-2">
          <CloseIcon />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-8">
        <section>
          <h3 className="font-archivo font-extrabold text-base mb-1">Pasaporte</h3>
          <p className="text-[13px] text-gris-2 mb-4">Las ciudades donde caminaste con Yatoor.</p>
          <div className="grid grid-cols-2 gap-3">
            {pasaporteCiudades.map((c) => (
              <div
                key={c.ciudad}
                className={`relative rounded-2xl overflow-hidden text-center px-3 py-4.5 border ${
                  c.visited ? "border-transparent" : "border-dashed border-linea-2"
                }`}
                style={
                  c.visited
                    ? { backgroundImage: `url(${c.foto})`, backgroundSize: "cover", backgroundPosition: "center" }
                    : undefined
                }
              >
                {c.visited && (
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/80" />
                )}
                <div className={`relative z-10 ${!c.visited ? "bg-sup-2 -m-3 py-4.5" : ""}`}>
                  <div
                    className={`w-14 h-14 mx-auto mb-2.5 rounded-full flex items-center justify-center ${
                      c.visited ? "bg-nube p-[2.5px]" : "border-[1.5px] border-dashed border-linea-2"
                    }`}
                  >
                    <div
                      className={`w-full h-full rounded-full flex items-center justify-center ${
                        c.visited ? "bg-sup-1 text-tinta" : "bg-sup-2 text-gris-1"
                      }`}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <rect x="5" y="3" width="14" height="18" rx="2.2" stroke="currentColor" strokeWidth="1.5" />
                        <circle cx="12" cy="10" r="3.1" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                    </div>
                  </div>
                  <div className={`font-archivo font-extrabold text-sm ${c.visited ? "text-white" : "text-gris-1"}`}>
                    {c.ciudad}
                  </div>
                  <div className={`text-[11px] mt-0.5 ${c.visited ? "text-white/80" : "text-gris-1"}`}>{c.meta}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-7 pt-6 border-t border-linea-1">
          <h3 className="font-archivo font-extrabold text-base mb-1">Logros</h3>
          <p className="text-[13px] text-gris-2 mb-4">Lo que fuiste desbloqueando a fuerza de caminar.</p>
          <div className="grid grid-cols-3 gap-3">
            {logros.map((l) => (
              <div
                key={l.nombre}
                className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-1.5 px-2 text-center ${
                  l.earned ? "bg-sup-1 border border-linea-1" : "bg-transparent border-[1.5px] border-dashed border-linea-2"
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${l.earned ? "bg-nube" : "bg-sup-2"}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={l.earned ? "text-tinta" : "text-gris-1"}>
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </div>
                <div className={`text-[10px] font-bold leading-tight ${l.earned ? "" : "text-gris-1"}`}>{l.nombre}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
