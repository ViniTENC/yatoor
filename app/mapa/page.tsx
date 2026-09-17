"use client";

import { useEffect, useRef, useState } from "react";
import BottomNav from "@/components/BottomNav";
import MapboxMap from "@/components/MapboxMap";
import TourCard, { generarTourCard, type TourCardData } from "@/components/TourCard";
import EndOfTourOverlay from "@/components/EndOfTourOverlay";
import { CloseIcon } from "@/components/icons";
import { useActiveRecorridoId } from "@/lib/useActiveRecorrido";
import { getRecorrido, DEFAULT_ACTIVE_ID, type Mensaje } from "@/lib/recorridos";

const RESPUESTA_FIJA = "Genial! Te armé algo para que veas.";

export default function MapaPage() {
  const [infoOpen, setInfoOpen] = useState(false);
  const [conversationOpen, setConversationOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Mensaje[]>([]);
  const [tourCard, setTourCard] = useState<TourCardData | null>(null);
  const [finOpen, setFinOpen] = useState(false);
  const { activeId } = useActiveRecorridoId();
  const activo = getRecorrido(activeId) ?? getRecorrido(DEFAULT_ACTIVE_ID)!;

  // --- FAB arrastrable ---
  const [fabOffset, setFabOffset] = useState({ x: 0, y: 0 });
  const dragState = useRef<{ startX: number; startY: number; base: { x: number; y: number }; dragging: boolean }>({
    startX: 0,
    startY: 0,
    base: { x: 0, y: 0 },
    dragging: false,
  });

  function onFabPointerDown(e: React.PointerEvent) {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      base: fabOffset,
      dragging: false,
    };
  }

  function onFabPointerMove(e: React.PointerEvent) {
    if (e.buttons !== 1) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) dragState.current.dragging = true;
    if (dragState.current.dragging) {
      setFabOffset({ x: dragState.current.base.x + dx, y: dragState.current.base.y + dy });
    }
  }

  function onFabPointerUp() {
    if (!dragState.current.dragging) {
      // fue un click, no un drag: togglear el panel
      setInfoOpen((v) => !v);
    }
    dragState.current.dragging = false;
  }

  useEffect(() => {
    setMessages(activo.conversacion ?? []);
    setTourCard(null);
    setFabOffset({ x: 0, y: 0 });
  }, [activo.id]);

  const ultimoMensaje = [...messages].reverse().find((m) => m.from === "yatoor")?.text;

  function enviarMensaje() {
    const texto = inputText.trim();
    if (!texto) return;
    setMessages((prev) => [
      ...prev,
      { from: "vos", text: texto },
      { from: "yatoor", text: RESPUESTA_FIJA },
    ]);
    setInputText("");
    setConversationOpen(true);
    if (!tourCard) {
      setTourCard(generarTourCard(activo));
    }
  }

  function ajustarTour() {
    // simula un reajuste del LLM: un delta chico en distancia/duracion
    const delta = (Math.random() - 0.5) * 2.2; // ej. ~ -1.1km a +1.1km
    setTourCard(generarTourCard(activo, delta));
  }

  return (
    <main className="relative h-screen w-full overflow-hidden bg-papel">
      <div className="absolute inset-0">
        <MapboxMap
          center={activo.center}
          pois={activo.pois}
          inicio={activo.inicio}
          porcentaje={activo.porcentaje}
        />
      </div>

      <div className="absolute top-0 inset-x-0 pt-5 px-5 z-10 flex items-center justify-between">
        <span className="inline-block bg-papel/90 backdrop-blur rounded-full px-3.5 py-1.5 font-archivo font-extrabold tracking-tight text-2xl shadow-sm">
          yatoor
        </span>
        {/* Botón de prueba para disparar el overlay de fin de recorrido sin tener que caminar de verdad */}
        <button
          onClick={() => setFinOpen(true)}
          className="bg-papel/90 backdrop-blur rounded-full px-3 py-1.5 text-[10px] text-gris-calido shadow-sm"
        >
          Simular fin
        </button>
      </div>

      {conversationOpen && (
        <div className="absolute inset-x-5 top-20 bottom-24 z-20 rounded-3xl border-[0.5px] border-linea bg-superficie/95 backdrop-blur flex flex-col shadow-lg overflow-hidden">
          <div className="flex items-center justify-between p-4 pb-2 flex-shrink-0">
            <span className="text-xs text-gris-calido">
              Conversación · {activo.nombre.split(" · ")[0]}
            </span>
            <button
              onClick={() => {
                setConversationOpen(false);
                setInfoOpen(false);
              }}
              aria-label="Cerrar conversación"
              className="w-7 h-7 rounded-full bg-papel border-[0.5px] border-linea-marcada flex items-center justify-center flex-shrink-0"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 flex flex-col gap-2.5">
            {messages.length > 0 ? (
              messages.map((m, i) => (
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
              ))
            ) : (
              <p className="text-sm text-gris-medio">Todavía no arrancaste este recorrido.</p>
            )}

            {tourCard && (
              <TourCard
                data={tourCard}
                onAjustar={ajustarTour}
                onVerMapa={() => setConversationOpen(false)}
              />
            )}
          </div>

          <div className="p-4 pt-2 flex-shrink-0">
            <div className="flex items-center gap-2">
              <input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") enviarMensaje();
                }}
                placeholder="Preguntale algo a Yatoor..."
                className="flex-1 border-[0.5px] border-linea-marcada rounded-full px-4 py-2.5 text-sm bg-papel placeholder:text-gris-calido outline-none"
              />
              <button
                onClick={enviarMensaje}
                aria-label="Enviar"
                className="w-9 h-9 rounded-full bg-tinta flex items-center justify-center flex-shrink-0"
              >
                <div className="w-2 h-2 rounded-full bg-papel" />
              </button>
            </div>
          </div>
        </div>
      )}

      {!conversationOpen && (
        <div
          className="absolute inset-x-0 bottom-24 z-20 flex flex-col items-center gap-3 px-5"
          style={{ transform: `translate(${fabOffset.x}px, ${fabOffset.y}px)` }}
        >
          <div
            className={
              infoOpen
                ? "nube-ring shadow-[0_8px_24px_rgba(0,0,0,0.35)] flex-shrink-0"
                : "flex-shrink-0"
            }
          >
            <button
              onPointerDown={onFabPointerDown}
              onPointerMove={onFabPointerMove}
              onPointerUp={onFabPointerUp}
              aria-label={infoOpen ? "Cerrar" : "Preguntale a Yatoor"}
              className={`w-16 h-16 rounded-full bg-tinta flex items-center justify-center touch-none ${
                infoOpen ? "" : "shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
              }`}
            >
              <div className="w-3.5 h-3.5 rounded-full bg-papel" />
            </button>
          </div>

          {infoOpen && (
            <div className="w-full bg-superficie/95 backdrop-blur rounded-2xl p-4 shadow-lg">
              <p className="text-sm leading-relaxed">
                {ultimoMensaje ?? "Empezá a caminar y te voy a ir contando lo que encontremos."}
              </p>
              <p className="mt-1 text-xs text-gris-calido">
                {activo.nombre.split(" · ")[0]} · en curso
              </p>
              <div className="mt-2.5 flex items-center gap-2">
                <input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") enviarMensaje();
                  }}
                  placeholder="Preguntale algo a Yatoor..."
                  className="flex-1 border-[0.5px] border-linea-marcada rounded-full px-4 py-2.5 text-sm bg-papel placeholder:text-gris-calido outline-none"
                />
                <button
                  onClick={enviarMensaje}
                  aria-label="Enviar"
                  className="w-9 h-9 rounded-full bg-tinta flex items-center justify-center flex-shrink-0"
                >
                  <div className="w-2 h-2 rounded-full bg-papel" />
                </button>
              </div>
              {tourCard && (
                <div className="mt-2.5">
                  <TourCard
                    data={tourCard}
                    onAjustar={ajustarTour}
                    onVerMapa={() => setInfoOpen(false)}
                  />
                </div>
              )}
              <button
                onClick={() => setConversationOpen(true)}
                className="mt-2.5 block w-full text-center text-xs text-gris-medio underline"
              >
                Ver toda la conversación
              </button>
            </div>
          )}
        </div>
      )}

      {finOpen && (
        <EndOfTourOverlay nombre={activo.nombre.split(" · ")[0]} onClose={() => setFinOpen(false)} />
      )}

      <BottomNav />
    </main>
  );
}
