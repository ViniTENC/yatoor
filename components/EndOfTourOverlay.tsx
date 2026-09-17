"use client";

import { useState } from "react";
import { CloseIcon, CheckIcon } from "@/components/icons";
import RedeemModal, { type Beneficio } from "@/components/RedeemModal";
import ShareSheet from "@/components/ShareSheet";

interface Pregunta {
  q: string;
  opciones: string[];
  correcta: number;
}

// Mismas preguntas que el mockup de referencia (San Telmo / Puerto Madero).
const QUIZ_QUESTIONS: Pregunta[] = [
  {
    q: "1. ¿Desde qué año es Plaza de Mayo el corazón político del país?",
    opciones: ["1580", "1810", "1900", "1976"],
    correcta: 0,
  },
  {
    q: "2. El Ateneo Grand Splendid era originalmente un...",
    opciones: ["Cine", "Teatro", "Mercado", "Banco"],
    correcta: 1,
  },
  {
    q: "3. En la Feria de San Telmo, además de antigüedades, se puede ver...",
    opciones: ["Autos clásicos", "Tango callejero", "Recitales de rock", "Desfiles de moda"],
    correcta: 1,
  },
  {
    q: "4. ¿Quién diseñó el Puente de la Mujer?",
    opciones: ["Norman Foster", "Frank Gehry", "Santiago Calatrava", "Zaha Hadid"],
    correcta: 2,
  },
  {
    q: "5. La Costanera Sur es...",
    opciones: ["Un puerto de carga", "Una reserva ecológica", "Un shopping", "Un estadio"],
    correcta: 1,
  },
];

const BENEFICIO: Beneficio = {
  partner: "Café Society",
  desc: "15% en tu consumición",
  code: "YAT-4F2K",
};

export default function EndOfTourOverlay({
  nombre,
  distanciaKm = 4.2,
  duracion = "3h05",
  minutosRelato = 18,
  onClose,
}: {
  nombre: string;
  distanciaKm?: number;
  duracion?: string;
  minutosRelato?: number;
  onClose: () => void;
}) {
  const [rating, setRating] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<number, number>>({});
  const [redeemOpen, setRedeemOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const respondidas = Object.keys(respuestas).length;
  const puntaje = QUIZ_QUESTIONS.reduce(
    (acc, p, i) => acc + (respuestas[i] === p.correcta ? 1 : 0),
    0
  );

  function responder(qi: number, oi: number) {
    if (respuestas[qi] !== undefined) return;
    setRespuestas((prev) => ({ ...prev, [qi]: oi }));
  }

  const textoCompartir = `Recorrí ${nombre} con Yatoor: ${distanciaKm.toFixed(
    1
  )} km, ${QUIZ_QUESTIONS.length} preguntas y ${minutosRelato} min de historias en el camino 🗺️`;

  return (
    <div className="fixed inset-0 z-50 bg-papel flex flex-col">
      <div className="flex items-center justify-between p-5 flex-shrink-0">
        <div>
          <p className="text-xs text-gris-calido uppercase tracking-wide">Recorrido completo</p>
          <p className="mt-0.5 font-archivo font-extrabold text-lg">{nombre}</p>
        </div>
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="w-7 h-7 rounded-full border-[0.5px] border-linea-marcada flex items-center justify-center flex-shrink-0"
        >
          <CloseIcon />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-6">
        {/* stats */}
        <div className="grid grid-cols-4 gap-1 bg-superficie rounded-2xl p-4">
          <Stat value={`${distanciaKm.toFixed(1)}km`} label="distancia" />
          <Stat value={duracion} label="duración" />
          <Stat value={`${minutosRelato}m`} label="de relato" />
          <Stat value="+120" label="puntos" />
        </div>

        {/* rating */}
        <section>
          <h3 className="font-archivo font-extrabold text-sm mb-1">¿Cómo estuvo?</h3>
          <p className="text-xs text-gris-calido mb-2.5">
            Tu puntuación ayuda a mejorar los próximos recorridos.
          </p>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setRating(n)}
                className="text-2xl leading-none"
                aria-label={`${n} estrellas`}
              >
                {n <= rating ? "★" : "☆"}
              </button>
            ))}
          </div>
        </section>

        {/* quiz */}
        <section>
          <h3 className="font-archivo font-extrabold text-sm mb-1">¿Cuánto te acordás?</h3>
          <p className="text-xs text-gris-calido mb-3">
            {QUIZ_QUESTIONS.length} preguntas sobre lo que fuiste viendo hoy.
          </p>
          <div className="flex flex-col gap-4">
            {QUIZ_QUESTIONS.map((p, qi) => {
              const elegida = respuestas[qi];
              const mostrar = elegida !== undefined;
              return (
                <div key={qi}>
                  <p className="text-sm font-medium mb-2">{p.q}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {p.opciones.map((op, oi) => {
                      const esCorrecta = oi === p.correcta;
                      const esElegida = elegida === oi;
                      return (
                        <button
                          key={op}
                          onClick={() => responder(qi, oi)}
                          disabled={mostrar}
                          className={`text-xs text-left px-3 py-2.5 rounded-xl border-[0.5px] flex items-center justify-between gap-1 ${
                            mostrar && esCorrecta
                              ? "bg-[#EAF3DE] border-transparent"
                              : mostrar && esElegida
                              ? "bg-[#FBE4E1] border-transparent"
                              : "border-linea-marcada"
                          }`}
                        >
                          <span>{op}</span>
                          {mostrar && esCorrecta && <CheckIcon color="#639922" />}
                          {mostrar && esElegida && !esCorrecta && (
                            <span className="text-[#C0392B] text-xs">✕</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          {respondidas === QUIZ_QUESTIONS.length && (
            <div className="mt-4 text-center bg-superficie rounded-2xl py-3">
              <div className="font-archivo font-extrabold text-lg tabular-nums">
                {puntaje} / {QUIZ_QUESTIONS.length}
              </div>
              <div className="text-[10px] uppercase tracking-wide text-gris-calido">acertaste</div>
            </div>
          )}
        </section>

        {/* beneficio */}
        <section>
          <h3 className="font-archivo font-extrabold text-sm mb-1">Beneficio desbloqueado</h3>
          <p className="text-xs text-gris-calido mb-2.5">
            Por terminar el recorrido, un local de la zona te invita algo.
          </p>
          <div className="bg-superficie rounded-2xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-tinta text-papel flex items-center justify-center text-xs font-archivo font-extrabold flex-shrink-0">
              CS
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{BENEFICIO.partner}</p>
              <p className="text-xs text-gris-calido">{BENEFICIO.desc}</p>
              <p className="text-[10px] text-gris-calido mt-0.5">A 300 m de tu última parada</p>
            </div>
            <button
              onClick={() => setRedeemOpen(true)}
              className="text-xs bg-tinta text-papel px-3.5 py-1.5 rounded-full flex-shrink-0"
            >
              Canjear
            </button>
          </div>
        </section>

        <div className="flex flex-col gap-2 mt-2">
          <button
            onClick={() => setShareOpen(true)}
            className="w-full bg-tinta text-papel rounded-full py-2.5 text-sm"
          >
            Compartir recorrido
          </button>
          <button
            onClick={onClose}
            className="w-full border-[0.5px] border-linea-marcada rounded-full py-2.5 text-sm"
          >
            Volver al mapa
          </button>
        </div>
      </div>

      {redeemOpen && <RedeemModal beneficio={BENEFICIO} onClose={() => setRedeemOpen(false)} />}
      {shareOpen && <ShareSheet texto={textoCompartir} onClose={() => setShareOpen(false)} />}
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="font-archivo font-extrabold text-base tabular-nums">{value}</div>
      <div className="mt-0.5 text-[9px] uppercase tracking-wide text-gris-calido text-center">
        {label}
      </div>
    </div>
  );
}
