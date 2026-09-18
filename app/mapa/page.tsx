"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import MapboxMap from "@/components/MapboxMap";
import EndOfTourOverlay from "@/components/EndOfTourOverlay";
import ChatOverlay from "@/components/ChatOverlay";
import PoiPhoto from "@/components/PoiPhoto";
import { CloseIcon } from "@/components/icons";
import type { TourCardData } from "@/components/TourCard";
import { useActiveRecorridoId } from "@/lib/useActiveRecorrido";
import { getRecorrido, DEFAULT_ACTIVE_ID, type Mensaje, type Poi, type FiltroMapa } from "@/lib/recorridos";
import { pedirRecorrido } from "@/lib/pedirRecorrido";

const FILTROS: { id: "todo" | FiltroMapa; label: string }[] = [
  { id: "todo", label: "Todo" },
  { id: "historia", label: "Historia" },
  { id: "comida", label: "Comida" },
  { id: "arte", label: "Arte" },
  { id: "miradores", label: "Miradores" },
];

const CAT_LABEL: Record<FiltroMapa, string> = {
  historia: "HISTORIA",
  comida: "COMIDA",
  arte: "ARTE",
  miradores: "MIRADOR",
};

function fmtDistancia(m?: number) {
  if (m === undefined) return "";
  return m >= 1000 ? `${(m / 1000).toFixed(1).replace(".", ",")} km` : `${m} m`;
}

export default function MapaPage() {
  const [filtroActivo, setFiltroActivo] = useState<"todo" | FiltroMapa>("todo");
  const [sheetExpanded, setSheetExpanded] = useState(false);
  const [selectedPoi, setSelectedPoi] = useState<Poi | null>(null);

  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Mensaje[]>([]);
  const [inputText, setInputText] = useState("");
  const [tourCard, setTourCard] = useState<TourCardData | null>(null);
  const [tourCache, setTourCache] = useState(false);
  const [armando, setArmando] = useState(false);
  const [errorArmado, setErrorArmado] = useState<string | null>(null);
  const [ultimoPrompt, setUltimoPrompt] = useState<string | null>(null);
  const [grupoSeleccionado, setGrupoSeleccionado] = useState<string[]>([]);

  const [narrating, setNarrating] = useState(false);
  const [paused, setPaused] = useState(false);
  const [stopIndex, setStopIndex] = useState(0);
  const [completionOpen, setCompletionOpen] = useState(false);
  const [finOpen, setFinOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const { activeId } = useActiveRecorridoId();
  const activo = getRecorrido(activeId) ?? getRecorrido(DEFAULT_ACTIVE_ID)!;
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("chat") === "1") setChatOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setMessages(activo.conversacion ?? []);
    setTourCard(null);
    setGrupoSeleccionado([]);
    setNarrating(false);
    setStopIndex(0);
  }, [activo.id]);

  const pois = activo.pois.filter((p) => filtroActivo === "todo" || p.filtro === filtroActivo);
  const currentStop = activo.pois[stopIndex];

  function mostrarToast(texto: string) {
    setToast(texto);
    setTimeout(() => setToast(null), 3200);
  }

  async function armarRecorrido(prompt: string, mensajeUsuario: string) {
    setMessages((prev) => [...prev, { from: "vos", text: mensajeUsuario }]);
    setInputText("");
    setChatOpen(true);
    setArmando(true);
    setErrorArmado(null);
    setUltimoPrompt(prompt);
    try {
      const { card, cache } = await pedirRecorrido(prompt);
      setTourCard(card);
      setTourCache(cache);
      setMessages((prev) => [
        ...prev,
        { from: "yatoor", text: cache ? "Ya tenía algo muy parecido armado, te lo paso." : "Perfecto, armé esto con eso." },
      ]);
    } catch (err) {
      setErrorArmado(err instanceof Error ? err.message : "No se pudo armar el recorrido.");
      setMessages((prev) => [...prev, { from: "yatoor", text: "Uy, no pude armarlo ahora. ¿Lo intentamos de nuevo?" }]);
    } finally {
      setArmando(false);
    }
  }

  function enviarMensaje() {
    const texto = inputText.trim();
    if (!texto) return;
    armarRecorrido(texto, texto);
  }

  function ajustarTour() {
    if (!ultimoPrompt) return;
    armarRecorrido(`${ultimoPrompt} (pero más corto y con menos caminata)`, "Más corto y menos caminata");
  }

  function toggleAmigo(key: string) {
    setGrupoSeleccionado((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  }

  function verEnMapa() {
    setChatOpen(false);
    if (grupoSeleccionado.length > 0) {
      mostrarToast(`Recorrido armado para vos y ${grupoSeleccionado.length} más. El audio arranca sincronizado para todos.`);
    } else {
      mostrarToast("Ya está en el mapa. Caminá — cuando llegues, arranco.");
    }
  }

  function llevameAca() {
    setSelectedPoi(null);
    setNarrating(true);
    setPaused(false);
  }

  function siguienteParada() {
    setNarrating(false);
    if (stopIndex >= activo.pois.length - 1) {
      setCompletionOpen(true);
      setTimeout(() => {
        setCompletionOpen(false);
        setFinOpen(true);
      }, 1600);
    } else {
      setStopIndex((i) => i + 1);
      setCompletionOpen(true);
      setTimeout(() => {
        setCompletionOpen(false);
        setNarrating(true);
      }, 1400);
    }
  }

  return (
    <main className="relative h-screen w-full overflow-hidden bg-papel">
      <div className="absolute inset-0">
        <MapboxMap center={activo.center} pois={activo.pois} inicio={activo.inicio} porcentaje={activo.porcentaje} />
      </div>

      {/* filter chips */}
      <div
        className="absolute inset-x-0 z-10 flex gap-2 px-4 overflow-x-auto no-scrollbar"
        style={{ top: "calc(env(safe-area-inset-top, 0px) + 14px)" }}
      >
        {FILTROS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFiltroActivo(f.id)}
            className={`flex-shrink-0 rounded-full px-3.5 py-2 text-[13px] font-semibold whitespace-nowrap shadow-sm border ${
              filtroActivo === f.id ? "bg-tinta text-papel border-tinta" : "bg-papel border-linea-2 text-tinta"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* route banner */}
      {narrating && (
        <div
          className="absolute left-4 right-4 z-[6] bg-tinta text-papel rounded-2xl px-4 py-3.5 shadow-lg"
          style={{ top: "calc(env(safe-area-inset-top, 0px) + 14px)" }}
        >
          <div className="text-[11px] tracking-[0.08em] uppercase font-semibold text-[#c9c4b5]">Próxima parada</div>
          <div className="font-archivo font-extrabold text-[17px] mt-0.5">{currentStop?.name}</div>
          <div className="flex items-center gap-2 mt-2.5">
            <div className="flex-1 h-1 rounded-full bg-white/20 overflow-hidden">
              <div className="h-full bg-nube" style={{ width: `${((stopIndex + 1) / activo.pois.length) * 100}%` }} />
            </div>
            <div className="text-xs font-semibold text-[#c9c4b5] whitespace-nowrap tabular-nums">
              Parada {stopIndex + 1} de {activo.pois.length}
            </div>
          </div>
        </div>
      )}

      {/* group strip */}
      {grupoSeleccionado.length > 0 && (
        <div
          className="absolute left-4 right-4 z-[6] bg-papel rounded-full px-3.5 py-2 flex items-center justify-between shadow-md"
          style={{ top: "calc(env(safe-area-inset-top, 0px) + 128px)" }}
        >
          <div className="flex">
            {grupoSeleccionado.map((k, i) => (
              <div
                key={k}
                className="w-[26px] h-[26px] rounded-full border-2 border-papel bg-sup-2 flex items-center justify-center text-[11px] font-bold"
                style={{ marginLeft: i === 0 ? 0 : -8 }}
              >
                {k[0]?.toUpperCase()}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-nube flex-shrink-0" />
            En vivo · sincronizado
          </div>
        </div>
      )}

      {/* completion flash */}
      {completionOpen && (
        <div className="absolute inset-0 z-[15] flex flex-col items-center justify-center bg-white/90 backdrop-blur">
          <div className="w-[72px] h-[72px] rounded-full border-[3px] border-tinta flex items-center justify-center overflow-hidden mb-4.5">
            <div className="w-2/3 h-2/3 rounded-full bg-nube blur-[6px]" />
          </div>
          <div className="font-archivo font-extrabold text-[26px] bg-nube bg-clip-text text-transparent">Completado</div>
          <div className="text-[13px] font-semibold text-gris-2 mt-1">
            {stopIndex + 1} paradas · {activo.distanciaKm ?? 4.2} km
          </div>
        </div>
      )}

      {/* fab */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          aria-label="Preguntale a Yatoor"
          className="absolute z-20 w-[52px] h-[52px] rounded-full bg-papel border-[3px] border-tinta flex items-center justify-center shadow-lg overflow-hidden"
          style={{ right: 16, bottom: narrating ? 232 : 168 }}
        >
          <div className="w-[64%] h-[64%] rounded-full bg-nube blur-[3px]" />
        </button>
      )}

      {toast && (
        <div
          className="absolute left-4 right-4 z-30 bg-papel/95 backdrop-blur rounded-2xl px-4 py-3 shadow-lg text-[13px] text-center"
          style={{ top: "calc(env(safe-area-inset-top, 0px) + 14px)" }}
        >
          {toast}
        </div>
      )}

      {/* narration panel */}
      {narrating && !completionOpen && (
        <div className="absolute left-0 right-0 bottom-0 z-10 bg-papel rounded-t-[20px] shadow-[0_-8px_24px_rgba(20,22,26,0.12)] px-5 pt-3.5 pb-24">
          <div className="flex justify-between items-center mb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-nube inline-block" />
              <span className="text-xs font-bold">Yatoor está contando</span>
            </div>
            <span className="text-xs text-gris-2 font-semibold tabular-nums">{paused ? "pausado" : "1:12 / 2:40"}</span>
          </div>
          <div className="text-[15px] leading-relaxed mb-4">
            {currentStop?.info ?? "Este edificio abrió como teatro en 1919, con capacidad para mil butacas"}
            {!paused && <span className="inline-block w-0.5 h-4 align-middle bg-rosa ml-0.5 animate-pulse" />}
          </div>
          <div className="flex gap-2.5">
            <button
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "Reanudar" : "Pausar"}
              className="w-[52px] h-[52px] rounded-full bg-tinta text-papel flex items-center justify-center flex-shrink-0"
            >
              {paused ? (
                <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                  <path d="M8 5l11 7-11 7V5z" fill="currentColor" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                  <rect x="6" y="5" width="4" height="14" fill="currentColor" />
                  <rect x="14" y="5" width="4" height="14" fill="currentColor" />
                </svg>
              )}
            </button>
            <button onClick={siguienteParada} className="flex-1 bg-sup-1 border border-linea-2 rounded-full font-bold text-sm">
              Siguiente parada
            </button>
          </div>
        </div>
      )}

      {/* bottom sheet: exploration */}
      {!narrating && !completionOpen && (
        <div
          className="absolute left-0 right-0 bottom-0 z-10 bg-papel rounded-t-[20px] shadow-[0_-8px_24px_rgba(20,22,26,0.12)] overflow-hidden transition-[height] duration-300"
          style={{ height: selectedPoi ? 460 : sheetExpanded ? 460 : 320 }}
        >
          <button
            onClick={() => setSheetExpanded((v) => !v)}
            className="w-full flex justify-center pt-2.5 pb-1"
            aria-label={sheetExpanded ? "Colapsar" : "Expandir"}
          >
            <span className="w-9 h-1 rounded-full bg-linea-2" />
          </button>

          {!selectedPoi && (
            <>
              <div className="flex items-center justify-between px-5 pt-2 pb-2">
                <div className="font-archivo font-extrabold text-[17px] tracking-tight">{pois.length} señales cerca</div>
              </div>
              <div className="flex gap-2.5 px-5 pb-24 overflow-x-auto no-scrollbar">
                {pois.map((poi) => (
                  <button
                    key={poi.name}
                    onClick={() => setSelectedPoi(poi)}
                    className={`flex-shrink-0 w-[132px] rounded-2xl p-3 text-left bg-sup-1 border ${
                      poi.sponsored ? "border-linea-1" : "border-transparent"
                    }`}
                  >
                    <div className="w-full h-16 rounded-[10px] bg-sup-2 mb-0 flex items-center justify-center text-gris-1 overflow-hidden">
                      {poi.placeId ? (
                        <PoiPhoto placeId={poi.placeId} alt={poi.name} className="w-full h-full object-cover" />
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                          <circle cx="12" cy="12" r="3" fill="currentColor" />
                        </svg>
                      )}
                    </div>
                    {poi.sponsored ? (
                      <span className="mt-1 inline-flex items-center gap-1 text-[9px] font-bold tracking-wide uppercase border border-linea-2 rounded-full px-2 py-0.5">
                        Beneficio
                      </span>
                    ) : (
                      <div className="text-[9px] font-medium tracking-[0.12em] uppercase text-gris-2 mt-1.5">
                        {poi.filtro ? CAT_LABEL[poi.filtro] : ""}
                      </div>
                    )}
                    <div className="font-bold text-[13px] mt-1.5 leading-tight">{poi.name}</div>
                    <div className="text-[11px] text-gris-2 mt-1.5">
                      {fmtDistancia(poi.distanciaM)} {poi.benefitText ? `· ${poi.benefitText}` : poi.relatoMin ? `· ${poi.relatoMin} min de relato` : ""}
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {selectedPoi && (
            <div className="px-5 pb-24 overflow-y-auto" style={{ maxHeight: 420 }}>
              <div className="relative w-full h-[120px] rounded-2xl bg-sup-2 mb-3.5 flex items-center justify-center text-gris-1 overflow-hidden">
                {selectedPoi.placeId ? (
                  <PoiPhoto placeId={selectedPoi.placeId} alt={selectedPoi.name} className="w-full h-full object-cover" />
                ) : (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
                    <circle cx="12" cy="12" r="3" fill="currentColor" />
                  </svg>
                )}
                <button
                  onClick={() => setSelectedPoi(null)}
                  aria-label="Cerrar"
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/45 backdrop-blur flex items-center justify-center"
                >
                  <CloseIcon color="#FFFFFF" />
                </button>
              </div>
              <div className="text-[10px] font-medium tracking-[0.12em] uppercase text-gris-2">
                {selectedPoi.filtro ? CAT_LABEL[selectedPoi.filtro] : ""}
              </div>
              <div className="font-archivo font-extrabold text-xl tracking-tight mt-1 mb-1.5">{selectedPoi.name}</div>
              <p className="text-sm leading-relaxed text-tinta-soft mb-2.5">
                {selectedPoi.info ?? "Yatoor tiene una historia preparada para este lugar."}
              </p>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-gris-2 mb-4">
                <span className="w-3.5 h-3.5 rounded-full border border-gris-2 inline-block" />
                Al llegar, arranca solo{selectedPoi.relatoMin ? ` · ${selectedPoi.relatoMin} min` : ""}
              </div>
              {selectedPoi.friendNote && (
                <div className="flex gap-2.5 items-start bg-sup-1 rounded-2xl p-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-sup-2 flex items-center justify-center text-[13px] font-bold flex-shrink-0">
                    {selectedPoi.friendNote.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-xs mb-0.5">{selectedPoi.friendNote.name}</div>
                    <div className="text-[13px] leading-relaxed text-tinta-soft">{selectedPoi.friendNote.text}</div>
                  </div>
                </div>
              )}
              {selectedPoi.benefitText && (
                <div className="flex items-center gap-2.5 bg-sup-1 border border-dashed border-linea-3 rounded-2xl px-3.5 py-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-tinta text-papel flex items-center justify-center flex-shrink-0">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="8.4" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </div>
                  <div className="flex-1 text-[12.5px] leading-relaxed text-tinta-soft">
                    <b className="text-tinta font-extrabold">Beneficio Yatoor:</b> {selectedPoi.benefitText}
                  </div>
                  <button className="text-tinta text-xs font-bold underline flex-shrink-0">Ver</button>
                </div>
              )}
              <div className="flex gap-2.5">
                <button onClick={llevameAca} className="flex-1 bg-tinta text-papel rounded-full py-3.5 font-bold text-sm">
                  Llevame acá
                </button>
                <button
                  onClick={() => mostrarToast(`Sumamos "${selectedPoi.name}" al recorrido.`)}
                  className="flex-1 bg-sup-1 border border-linea-2 rounded-full py-3.5 font-bold text-sm"
                >
                  Sumar al recorrido
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <ChatOverlay
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        messages={messages}
        inputText={inputText}
        setInputText={setInputText}
        onSend={enviarMensaje}
        armando={armando}
        errorArmado={errorArmado}
        tourCard={tourCard}
        grupoSeleccionado={grupoSeleccionado}
        onToggleAmigo={toggleAmigo}
        onAjustar={ajustarTour}
        onVerMapa={verEnMapa}
        cache={tourCache}
      />

      {finOpen && (
        <EndOfTourOverlay
          nombre={activo.nombre.split(" · ")[0]}
          distanciaKm={activo.distanciaKm ?? 4.2}
          onClose={() => {
            setFinOpen(false);
            setNarrating(false);
            setStopIndex(0);
          }}
        />
      )}

      <BottomNav />
    </main>
  );
}
