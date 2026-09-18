"use client";

import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import ChatOverlay from "@/components/ChatOverlay";
import MedalleroOverlay from "@/components/MedalleroOverlay";
import FriendOverlay from "@/components/FriendOverlay";
import type { TourCardData } from "@/components/TourCard";
import {
  recorridos,
  amigosPerfil,
  logros,
  beneficios,
  perfilMock,
  type Friend,
  type Mensaje,
} from "@/lib/recorridos";
import { pedirRecorrido } from "@/lib/pedirRecorrido";

export default function PerfilPage() {
  const [verMas, setVerMas] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [medalleroOpen, setMedalleroOpen] = useState(false);
  const [friend, setFriend] = useState<Friend | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [messages, setMessages] = useState<Mensaje[]>([
    { from: "yatoor", text: "Hola, soy Yatoor. Contame qué tenés ganas de hacer hoy y armo el recorrido con vos." },
  ]);
  const [inputText, setInputText] = useState("");
  const [tourCard, setTourCard] = useState<TourCardData | null>(null);
  const [tourCache, setTourCache] = useState(false);
  const [armando, setArmando] = useState(false);
  const [errorArmado, setErrorArmado] = useState<string | null>(null);
  const [ultimoPrompt, setUltimoPrompt] = useState<string | null>(null);
  const [grupoSeleccionado, setGrupoSeleccionado] = useState<string[]>([]);

  const activoResumen = recorridos.find((r) => r.status === "incompleto");
  const completos = recorridos.filter((r) => r.status === "hecho");
  const [primero, ...resto] = completos;

  function mostrarToast(texto: string) {
    setToast(texto);
    setTimeout(() => setToast(null), 2800);
  }

  async function armarRecorrido(prompt: string, mensajeUsuario: string) {
    setMessages((prev) => [...prev, { from: "vos", text: mensajeUsuario }]);
    setInputText("");
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

  return (
    <main className="relative h-screen w-full overflow-hidden bg-papel flex flex-col">
      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-28">
        {/* cover */}
        <div className="relative h-[120px] -mx-5 bg-gradient-to-br from-sup-1 to-sup-3">
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/25" />
          <button
            aria-label="Ajustes"
            className="absolute top-3.5 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white z-10"
          >
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
              <path
                d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
                stroke="currentColor"
                strokeWidth="1.7"
              />
            </svg>
          </button>
          <button className="absolute bottom-2.5 right-4 z-10 flex items-center gap-1.5 bg-black/45 backdrop-blur rounded-full pl-2 pr-3 py-1.5 text-white text-[11px] font-bold">
            <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
              <path
                d="M4 8.5A1.5 1.5 0 015.5 7h2l1-2h7l1 2h2A1.5 1.5 0 0120 8.5v9A1.5 1.5 0 0118.5 19h-13A1.5 1.5 0 014 17.5v-9z"
                stroke="#FFFFFF"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="13" r="3.2" stroke="#FFFFFF" strokeWidth="1.6" />
            </svg>
            Cambiar portada
          </button>
        </div>

        <div className="flex items-end gap-3.5 mb-4.5 mt-0">
          <div className="relative flex-shrink-0 -mt-9">
            <div className="w-[72px] h-[72px] rounded-full border-[3px] border-papel bg-sup-2 shadow" />
          </div>
          <div>
            <div className="font-archivo font-extrabold text-[19px] tracking-tight">{perfilMock.nombre}</div>
            <div className="text-xs text-gris-2 mt-0.5">{perfilMock.ubicacion}</div>
          </div>
        </div>

        {/* nivel */}
        <div className="mb-5.5">
          <div className="flex justify-between items-baseline mb-1.5">
            <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-gris-2">
              Nivel {perfilMock.nivel} · {perfilMock.nivelNombre}
            </span>
            <span className="text-xs font-bold text-gris-2 tabular-nums">
              {perfilMock.xp} / {perfilMock.xpTotal}
            </span>
          </div>
          <div className="h-2 rounded-full bg-sup-2 overflow-hidden">
            <div className="h-full rounded-full bg-nube" style={{ width: `${(perfilMock.xp / perfilMock.xpTotal) * 100}%` }} />
          </div>
        </div>

        {/* racha */}
        <div className="text-[10px] font-medium tracking-[0.12em] uppercase text-gris-2 mb-2">Racha semanal</div>
        <div className="flex gap-1.5 mb-6.5">
          {perfilMock.racha.map((d, i) => (
            <div
              key={i}
              className={`flex-1 h-[34px] rounded-lg flex items-center justify-center text-[10px] font-bold ${
                d.done ? "bg-tinta text-papel" : "bg-sup-1 text-gris-2"
              }`}
            >
              {d.dia}
            </div>
          ))}
        </div>

        {/* CTA nuevo recorrido */}
        <button
          onClick={() => setChatOpen(true)}
          className="relative w-full overflow-hidden flex items-center gap-3 bg-tinta text-papel rounded-2xl p-4 mb-3.5 text-left"
        >
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-nube" />
          <div className="w-9 h-9 rounded-full bg-nube p-0.5 flex-shrink-0">
            <div className="w-full h-full rounded-full bg-tinta flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
                <path d="M12 5V19M5 12H19" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <div>
            <div className="font-archivo font-extrabold text-[15px]">Armar un recorrido nuevo</div>
            <div className="text-xs text-[#c9c4b5] mt-0.5">Contale a Yatoor qué tenés ganas de ver</div>
          </div>
        </button>

        {/* recorridos recientes */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-archivo font-extrabold text-base">Recorridos recientes</h3>
          {resto.length > 0 && (
            <button onClick={() => setVerMas((v) => !v)} className="text-xs font-semibold text-gris-2">
              {verMas ? "Ver menos" : "Ver más"}
            </button>
          )}
        </div>

        {activoResumen && (
          <div className="bg-sup-1 border border-linea-1 rounded-2xl p-3.5 mb-2.5 flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-sup-2 flex-shrink-0" />
            <div>
              <div className="font-bold text-sm">{activoResumen.nombre}</div>
              <div className="text-[11px] font-bold text-tinta mt-0.5">
                {Math.round((activoResumen.porcentaje ?? 0) / 20)} de 5 paradas · seguir
              </div>
              <div className="flex gap-0.5 mt-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className={`w-3.5 h-[3px] rounded-sm ${i < Math.round((activoResumen.porcentaje ?? 0) / 20) ? "bg-tinta" : "bg-linea-2"}`} />
                ))}
              </div>
            </div>
          </div>
        )}

        {primero && (
          <div className="bg-sup-1 border border-linea-1 rounded-2xl p-3.5 mb-2.5 flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-sup-2 flex-shrink-0" />
            <div>
              <div className="font-bold text-sm">{primero.nombre}</div>
              <div className="text-[11px] text-gris-2 mt-0.5 tabular-nums">
                Completo · {primero.distanciaKm} km · {primero.tiempoMin} min
              </div>
            </div>
          </div>
        )}

        {verMas &&
          resto.map((r) => (
            <div key={r.id} className="bg-sup-1 border border-linea-1 rounded-2xl p-3.5 mb-2.5 flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-sup-2 flex-shrink-0" />
              <div>
                <div className="font-bold text-sm">{r.nombre}</div>
                <div className="text-[11px] text-gris-2 mt-0.5 tabular-nums">
                  Completo · {r.distanciaKm} km · {r.tiempoMin} min
                </div>
              </div>
            </div>
          ))}

        {/* amigos */}
        <div className="flex justify-between items-center mb-3 mt-6.5">
          <h3 className="font-archivo font-extrabold text-base">Recorridos de amigos</h3>
          <span className="text-xs font-semibold text-gris-2">Ver todos</span>
        </div>
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1 mb-6.5">
          {amigosPerfil.map((f) => (
            <button
              key={f.key}
              onClick={() => setFriend(f)}
              className="flex-shrink-0 w-[150px] bg-sup-1 border border-linea-1 rounded-2xl p-3 text-left"
            >
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-[26px] h-[26px] rounded-full bg-sup-2 flex items-center justify-center font-archivo font-extrabold text-[11px]">
                  {f.avatar}
                </div>
                <div className="text-xs font-bold">{f.name}</div>
              </div>
              <div
                className="w-full h-16 rounded-[10px] bg-sup-2 mb-2 bg-cover bg-center"
                style={{ backgroundImage: `url(${f.recorridoThumb})` }}
              />
              <div className="text-xs font-bold leading-tight mb-2">{f.recorridoTitulo}</div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  mostrarToast(`Copiaste "${f.recorridoTitulo}" de ${f.name}.`);
                }}
                className="w-full bg-papel border border-linea-2 rounded-full py-1.5 text-[11px] font-bold"
              >
                Copiar recorrido
              </button>
            </button>
          ))}
        </div>

        {/* medallero preview */}
        <button onClick={() => setMedalleroOpen(true)} className="w-full flex justify-between items-center mb-3 text-left">
          <h3 className="font-archivo font-extrabold text-base">Medallero</h3>
          <span className="text-xs font-semibold text-gris-2">Ver todo</span>
        </button>
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1 mb-6.5">
          {logros
            .filter((l) => l.earned)
            .slice(0, 4)
            .map((l) => (
              <div key={l.nombre} className="flex-shrink-0 w-[108px] aspect-square rounded-2xl bg-sup-1 border border-linea-1 flex flex-col items-center justify-center gap-1.5 px-2 text-center">
                <div className="w-10 h-10 rounded-full bg-nube flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-tinta">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </div>
                <div className="text-[10px] font-bold leading-tight">{l.nombre}</div>
              </div>
            ))}
        </div>

        {/* beneficios preview */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-archivo font-extrabold text-base">Beneficios</h3>
          <span className="text-xs font-semibold text-gris-2">Ver todos</span>
        </div>
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
          {beneficios.map((b) => (
            <div key={b.partner} className={`flex-shrink-0 w-[120px] bg-sup-1 border border-linea-1 rounded-2xl p-3 ${b.locked ? "opacity-50" : ""}`}>
              <div className="w-[30px] h-[30px] rounded-[9px] bg-sup-2 flex items-center justify-center font-archivo font-extrabold text-xs mb-2">
                {b.partnerCorto}
              </div>
              <div className="text-[11px] font-bold leading-tight">{b.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {toast && (
        <div className="absolute bottom-24 inset-x-5 z-30 bg-tinta text-papel text-xs text-center rounded-2xl px-4 py-3 shadow-lg">
          {toast}
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
        onVerMapa={() => setChatOpen(false)}
        cache={tourCache}
      />

      <MedalleroOverlay open={medalleroOpen} onClose={() => setMedalleroOpen(false)} />

      <FriendOverlay
        friend={friend}
        onClose={() => setFriend(null)}
        onCopy={(f) => {
          mostrarToast(`Copiaste "${f.recorridoTitulo}" de ${f.name}.`);
          setFriend(null);
        }}
      />

      <BottomNav />
    </main>
  );
}
