"use client";

import { CloseIcon } from "@/components/icons";
import TourCard, { type TourCardData } from "@/components/TourCard";
import type { Mensaje } from "@/lib/recorridos";

const SUGERENCIAS = ["Más corto", "Menos caminata", "Sumar café"];

export default function ChatOverlay({
  open,
  onClose,
  messages,
  inputText,
  setInputText,
  onSend,
  armando,
  errorArmado,
  tourCard,
  grupoSeleccionado,
  onToggleAmigo,
  onAjustar,
  onVerMapa,
  cache,
}: {
  open: boolean;
  onClose: () => void;
  messages: Mensaje[];
  inputText: string;
  setInputText: (v: string) => void;
  onSend: () => void;
  armando: boolean;
  errorArmado: string | null;
  tourCard: TourCardData | null;
  grupoSeleccionado: string[];
  onToggleAmigo: (key: string) => void;
  onAjustar: () => void;
  onVerMapa: () => void;
  cache: boolean;
}) {
  return (
    <div
      className={`absolute inset-0 z-[100] flex flex-col bg-papel transition-transform duration-300 ease-out ${
        open ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-3 px-5 pt-4 pb-3.5 border-b border-linea-1 flex-shrink-0">
        <div className="w-[34px] h-[34px] rounded-full bg-tinta flex items-center justify-center flex-shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-papel" />
        </div>
        <div className="font-archivo font-extrabold text-base">Yatoor</div>
        <button onClick={onClose} aria-label="Cerrar" className="ml-auto text-gris-2">
          <CloseIcon />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4.5 flex flex-col gap-3">
        {messages.map((m, i) => (
          <p
            key={i}
            className={
              m.from === "vos"
                ? "self-end max-w-[80%] bg-tinta text-papel text-sm leading-relaxed rounded-2xl rounded-br-md px-3.5 py-3"
                : "self-start max-w-[80%] bg-sup-1 text-sm leading-relaxed rounded-2xl rounded-bl-md px-3.5 py-3"
            }
          >
            {m.text}
          </p>
        ))}
        {armando && <p className="text-sm text-gris-2 animate-pulse">Armando tu recorrido...</p>}
        {errorArmado && <p className="text-xs text-[#C0392B]">{errorArmado}</p>}
        {tourCard && (
          <TourCard
            data={tourCard}
            grupoSeleccionado={grupoSeleccionado}
            onToggleAmigo={onToggleAmigo}
            onAjustar={onAjustar}
            onVerMapa={onVerMapa}
            cache={cache}
          />
        )}
      </div>

      {!tourCard && (
        <div className="flex gap-2 px-5 pb-2.5 overflow-x-auto no-scrollbar flex-shrink-0">
          {SUGERENCIAS.map((s) => (
            <button
              key={s}
              onClick={() => setInputText(s)}
              className="flex-shrink-0 bg-sup-1 border border-linea-2 rounded-full px-3.5 py-2 text-xs font-semibold whitespace-nowrap"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2.5 px-5 pt-3 pb-5 border-t border-linea-1 flex-shrink-0">
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSend();
          }}
          placeholder="Escribí acá..."
          className="flex-1 border border-linea-2 bg-sup-1 rounded-full px-4.5 py-3 text-sm outline-none"
        />
        <button
          onClick={onSend}
          aria-label="Enviar"
          className="w-10 h-10 rounded-full bg-tinta flex items-center justify-center flex-shrink-0"
        >
          <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
            <path d="M4 12h16M14 6l6 6-6 6" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
