"use client";

import { useEffect, useRef, useState } from "react";
import BottomNav from "@/components/BottomNav";
import MapboxMap from "@/components/MapboxMap";
import TourCard, { generarTourCard, type TourCardData } from "@/components/TourCard";
import EndOfTourOverlay from "@/components/EndOfTourOverlay";
import { CloseIcon } from "@/components/icons";
import { useActiveRecorridoId } from "@/lib/useActiveRecorrido";
import { getRecorrido, DEFAULT_ACTIVE_ID, type Mensaje } from "@/lib/recorridos";

const FILTROS = [
  { id: "todo", label: "Todo" },
  { id: "historia", label: "Historia" },
  { id: "comida", label: "Comida" },
  { id: "arte", label: "Arte" },
  { id: "miradores", label: "Miradores" },
];

const SUGERENCIAS = ["Más corto", "Menos caminata", "Sumar café"];

const FAB_SIZE = 64; // w-16
const FAB_MARGIN = 20;

export default function MapaPage() {
  const [infoOpen, setInfoOpen] = useState(false);
  const [conversationOpen, setConversationOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Mensaje[]>([]);
  const [tourCard, setTourCard] = useState<TourCardData | null>(null);
  const [grupoSeleccionado, setGrupoSeleccionado] = useState<string[]>([]);
  const [finOpen, setFinOpen] = useState(false);
  const [filtroActivo, setFiltroActivo] = useState("todo");
  const [toast, setToast] = useState<string | null>(null);
  const { activeId } = useActiveRecorridoId();
  const activo = getRecorrido(activeId) ?? getRecorrido(DEFAULT_ACTIVE_ID)!;

  // --- FAB arrastrable con snap al borde más cercano ---
  const containerRef = useRef<HTMLDivElement>(null);
  const [fabPos, setFabPos] = useState<{ left: number; top: number } | null>(null);
  const dragState = useRef({ startX: 0, startY: 0, baseLeft: 0, baseTop: 0, dragging: false });

  function fabDefaultPos() {
    const el = containerRef.current;
    const w = el?.clientWidth ?? 390;
    const h = el?.clientHeight ?? 700;
    return { left: w - FAB_SIZE - FAB_MARGIN, top: h - FAB_SIZE - 170 };
  }

  function onFabPointerDown(e: React.PointerEvent) {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    const pos = fabPos ?? fabDefaultPos();
    dragState.current = { startX: e.clientX, startY: e.clientY, baseLeft: pos.left, baseTop: pos.top, dragging: false };
  }

  function onFabPointerMove(e: React.PointerEvent) {
    if (e.buttons !== 1) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) dragState.current.dragging = true;
    if (!dragState.current.dragging) return;
    const el = containerRef.current;
    const w = el?.clientWidth ?? 390;
    const h = el?.clientHeight ?? 700;
    const maxLeft = w - FAB_SIZE - FAB_MARGIN;
    const maxTop = h - FAB_SIZE - 90;
    setFabPos({
      left: Math.min(maxLeft, Math.max(FAB_MARGIN, dragState.current.baseLeft + dx)),
      top: Math.min(maxTop, Math.max(60, dragState.current.baseTop + dy)),
    });
  }

  function onFabPointerUp() {
    if (!dragState.current.dragging) {
      setInfoOpen((v) => !v);
    } else {
      // snapea al borde mas cercano
      const el = containerRef.current;
      const w = el?.clientWidth ?? 390;
      setFabPos((prev) => {
        if (!prev) return prev;
        const center = prev.left + FAB_SIZE / 2;
        const snapLeft = center < w / 2 ? FAB_MARGIN : w - FAB_SIZE - FAB_MARGIN;
        return { ...prev, left: snapLeft };
      });
    }
    dragState.current.dragging = false;
  }

  useEffect(() => {
    setMessages(activo.conversacion ?? []);
    setTourCard(null);
    setGrupoSeleccionado([]);
    setFabPos(null);
  }, [activo.id]);

  const ultimoMensaje = [...messages].reverse().find((m) => m.from === "yatoor")?.text;

  function mostrarToast(texto: string) {
    setToast(texto);
    setTimeout(() => setToast(null), 3200);
  }

  function enviarMensaje() {
    const texto = inputText.trim();
    if (!texto) return;
    setMessages((prev) => [
      ...prev,
      { from: "vos", text: texto },
      { from: "yatoor", text: "Perfecto, armé algo con eso." },
    ]);
    setInputText("");
    setConversationOpen(true);
    setTourCard(generarTourCard(activo));
  }

  function ajustarTour() {
    setMessages((prev) => [
      ...prev,
      { from: "vos", text: "Más corto y menos caminata" },
      { from: "yatoor", text: "Listo, lo achico y saco una parada." },
    ]);
    const delta = -(0.8 + Math.random() * 0.6); // recorta ~0.8 a 1.4km, como el mockup
    setTourCard(generarTourCard(activo, delta));
  }

  function toggleAmigo(key: string) {
    setGrupoSeleccionado((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }

  function verEnMapa() {
    setConversationOpen(false);
    setInfoOpen(false);
    if (grupoSeleccionado.length > 0) {
      mostrarToast(
        `Recorrido armado para vos y ${grupoSeleccionado.length} más. El audio arranca sincronizado para todos.`
      );
    } else {
      mostrarToast("Ya está en el mapa. Caminá — cuando llegues, arranco.");
    }
  }

  const fab = fabPos ?? fabDefaultPos();

  return (
    <main ref={containerRef} className="relative h-screen w-full overflow-hidden bg-papel">
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
        {/* Botón de prueba para disparar el overlay de fin de recorrido sin caminar de verdad */}
        <button
          onClick={() => setFinOpen(true)}
          className="bg-papel/90 backdrop-blur rounded-full px-3 py-1.5 text-[10px] text-gris-calido shadow-sm"
        >
          Simular fin
        </button>
      </div>

      {/* chips de filtro */}
      <div className="absolute top-16 inset-x-0 z-10 flex gap-2 px-5 overflow-x-auto no-scrollbar">
        {FILTROS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFiltroActivo(f.id)}
            className={`flex-shrink-0 text-xs font-medium px-3.5 py-2 rounded-full border-[0.5px] shadow-sm whitespace-nowrap ${
              filtroActivo === f.id
                ? "bg-tinta text-papel border-tinta"
                : "bg-papel border-linea-marcada text-tinta"
            }`}
          >
            {f.label}
          </button>
        ))}
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
                grupoSeleccionado={grupoSeleccionado}
                onToggleAmigo={toggleAmigo}
                onAjustar={ajustarTour}
                onVerMapa={verEnMapa}
              />
            )}
          </div>

          <div className="p-4 pt-2 flex-shrink-0">
            {!tourCard && (
              <div className="flex gap-2 mb-2 overflow-x-auto no-scrollbar">
                {SUGERENCIAS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setInputText(s)}
                    className="flex-shrink-0 text-xs border-[0.5px] border-linea-marcada rounded-full px-3 py-1.5 text-gris-medio whitespace-nowrap"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
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
          className="absolute z-20 flex flex-col items-end gap-3"
          style={{ left: fab.left, top: fab.top, width: FAB_SIZE }}
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
            <div
              className="bg-superficie/95 backdrop-blur rounded-2xl p-4 shadow-lg"
              style={{
                width: "min(320px, 82vw)",
                position: "fixed",
                left: "50%",
                bottom: 96,
                transform: "translateX(-50%)",
              }}
            >
              <p className="text-sm leading-relaxed">
                {ultimoMensaje ?? "Empezá a caminar y te voy a ir contando lo que encontremos."}
              </p>
              <p className="mt-1 text-xs text-gris-calido">
                {activo.nombre.split(" · ")[0]} · en curso
              </p>
              {!tourCard && (
                <div className="mt-2.5 flex gap-2 overflow-x-auto no-scrollbar">
                  {SUGERENCIAS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setInputText(s)}
                      className="flex-shrink-0 text-xs border-[0.5px] border-linea-marcada rounded-full px-3 py-1.5 text-gris-medio whitespace-nowrap"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
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
                    grupoSeleccionado={grupoSeleccionado}
                    onToggleAmigo={toggleAmigo}
                    onAjustar={ajustarTour}
                    onVerMapa={verEnMapa}
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

      {toast && (
        <div className="absolute bottom-24 inset-x-5 z-30 bg-tinta text-papel text-xs text-center rounded-2xl px-4 py-3 shadow-lg">
          {toast}
        </div>
      )}

      {finOpen && (
        <EndOfTourOverlay
          nombre={activo.nombre.split(" · ")[0]}
          distanciaKm={activo.distanciaKm ?? 4.2}
          onClose={() => setFinOpen(false)}
        />
      )}

      <BottomNav />
    </main>
  );
}
