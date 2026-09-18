"use client";

import { CloseIcon } from "@/components/icons";
import type { Friend } from "@/lib/recorridos";

export default function FriendOverlay({
  friend,
  onClose,
  onCopy,
}: {
  friend: Friend | null;
  onClose: () => void;
  onCopy: (friend: Friend) => void;
}) {
  const open = friend !== null;
  return (
    <div
      className={`absolute inset-0 z-[100] flex flex-col bg-papel transition-transform duration-300 ease-out ${
        open ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
    >
      <div className="flex justify-end px-5 pt-3.5 flex-shrink-0">
        <button onClick={onClose} aria-label="Cerrar" className="text-gris-2">
          <CloseIcon />
        </button>
      </div>

      {friend && (
        <>
          <div className="px-5 pb-5 pt-1.5 border-b border-linea-1 flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-sup-2 flex items-center justify-center font-archivo font-extrabold text-2xl">
              {friend.avatar}
            </div>
            <div className="font-archivo font-extrabold text-xl tracking-tight mt-3">{friend.name}</div>
            <div className="text-xs text-gris-2 mt-0.5">{friend.since}</div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {friend.tags.map((t) => (
                <span key={t} className="bg-sup-1 border border-linea-1 rounded-full px-3 py-1.5 text-xs font-semibold text-tinta-soft">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 pt-5 pb-8">
            <section>
              <h3 className="font-archivo font-extrabold text-base mb-3">Recorridos recientes</h3>
              <div className="flex flex-col gap-2.5">
                {friend.recorridosRecientes.map((r) => (
                  <div key={r.titulo} className="bg-sup-1 border border-linea-1 rounded-2xl px-3.5 py-3.5 flex items-center gap-3">
                    <div
                      className="w-14 h-14 rounded-xl bg-sup-2 flex-shrink-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${friend.recorridoThumb})` }}
                    />
                    <div className="min-w-0">
                      <div className="font-bold text-sm">{r.titulo}</div>
                      <div className="text-[11px] text-gris-2 mt-1 tabular-nums">{r.meta}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => onCopy(friend)}
                className="mt-3 w-full bg-papel border border-linea-2 rounded-full py-2.5 text-xs font-bold"
              >
                Copiar recorrido
              </button>
            </section>

            <section className="mt-7 pt-6 border-t border-linea-1">
              <h3 className="font-archivo font-extrabold text-base mb-3">Pasaporte</h3>
              <div className="grid grid-cols-2 gap-3">
                {friend.pasaporte.map((p) => (
                  <div key={p.ciudad} className="rounded-2xl border border-linea-1 bg-sup-1 text-center px-3 py-4">
                    <div className="font-archivo font-extrabold text-sm">{p.ciudad}</div>
                    <div className="text-[11px] text-gris-2 mt-1">{p.meta}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-7 pt-6 border-t border-linea-1">
              <h3 className="font-archivo font-extrabold text-base mb-3">Logros</h3>
              <div className="grid grid-cols-3 gap-3">
                {friend.logros.map((l) => (
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
        </>
      )}
    </div>
  );
}
