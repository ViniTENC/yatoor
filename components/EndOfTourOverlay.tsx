"use client";

import { useState } from "react";
import { CloseIcon, CheckIcon } from "@/components/icons";

interface Pregunta {
  q: string;
  opciones: string[];
  correcta: number;
}

const PREGUNTAS: Pregunta[] = [
  {
    q: "¿De dónde trajeron los adoquines originales de San Telmo?",
    opciones: ["España", "Suecia", "Italia"],
    correcta: 1,
  },
  {
    q: "¿Qué día funciona la Feria de San Telmo?",
    opciones: ["Sábados", "Domingos", "Todos los días"],
    correcta: 1,
  },
  {
    q: "¿Quién pintó el mural de San Telmo?",
    opciones: ["Un colectivo local en 2019", "Un artista francés", "Se desconoce el autor"],
    correcta: 0,
  },
];

type Paso = "rating" | "quiz" | "resultado";

export default function EndOfTourOverlay({
  nombre,
  onClose,
}: {
  nombre: string;
  onClose: () => void;
}) {
  const [rating, setRating] = useState(0);
  const [paso, setPaso] = useState<Paso>("rating");
  const [preguntaIdx, setPreguntaIdx] = useState(0);
  const [correctas, setCorrectas] = useState(0);
  const [respuestaElegida, setRespuestaElegida] = useState<number | null>(null);

  function elegirRespuesta(i: number) {
    if (respuestaElegida !== null) return;
    setRespuestaElegida(i);
    if (i === PREGUNTAS[preguntaIdx].correcta) setCorrectas((c) => c + 1);
    setTimeout(() => {
      if (preguntaIdx + 1 < PREGUNTAS.length) {
        setPreguntaIdx((p) => p + 1);
        setRespuestaElegida(null);
      } else {
        setPaso("resultado");
      }
    }, 850);
  }

  function compartir(canal: "whatsapp" | "twitter" | "instagram") {
    const texto = `Acabo de terminar el recorrido "${nombre}" en Yatoor 🚶`;
    if (canal === "whatsapp") {
      window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, "_blank");
    } else if (canal === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}`, "_blank");
    } else {
      alert(
        "Compartir en Instagram requiere el SDK nativo de la app — no disponible desde la web."
      );
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-tinta/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
      <div className="w-full max-w-sm bg-papel rounded-3xl p-6 relative">
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-superficie flex items-center justify-center"
        >
          <CloseIcon />
        </button>

        {paso === "rating" && (
          <div className="flex flex-col items-center gap-4 pt-2">
            <p className="font-archivo font-extrabold text-lg text-center">¡Llegaste! 🎉</p>
            <p className="text-sm text-gris-medio text-center">¿Cómo estuvo &quot;{nombre}&quot;?</p>
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
            <button
              onClick={() => setPaso("quiz")}
              disabled={rating === 0}
              className="mt-2 w-full bg-tinta text-papel rounded-full py-2.5 text-sm disabled:opacity-40"
            >
              Siguiente: un ratito de quiz
            </button>
          </div>
        )}

        {paso === "quiz" && (
          <div className="flex flex-col gap-4 pt-2">
            <p className="text-xs text-gris-calido">
              Pregunta {preguntaIdx + 1} de {PREGUNTAS.length}
            </p>
            <p className="font-archivo font-extrabold text-base leading-snug">
              {PREGUNTAS[preguntaIdx].q}
            </p>
            <div className="flex flex-col gap-2">
              {PREGUNTAS[preguntaIdx].opciones.map((op, i) => {
                const elegida = respuestaElegida === i;
                const esCorrecta = i === PREGUNTAS[preguntaIdx].correcta;
                const mostrar = respuestaElegida !== null;
                return (
                  <button
                    key={op}
                    onClick={() => elegirRespuesta(i)}
                    disabled={respuestaElegida !== null}
                    className={`text-sm text-left px-4 py-2.5 rounded-full border-[0.5px] flex items-center justify-between ${
                      mostrar && esCorrecta
                        ? "bg-[#EAF3DE] border-transparent"
                        : mostrar && elegida
                        ? "bg-[#FBE4E1] border-transparent"
                        : "border-linea-marcada"
                    }`}
                  >
                    {op}
                    {mostrar && esCorrecta && <CheckIcon color="#639922" />}
                    {mostrar && elegida && !esCorrecta && (
                      <span className="text-[#C0392B] text-xs">✕</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {paso === "resultado" && (
          <div className="flex flex-col items-center gap-4 pt-2 text-center">
            <p className="font-archivo font-extrabold text-lg">
              {correctas}/{PREGUNTAS.length} correctas
            </p>
            <p className="text-sm text-gris-medio">
              Canjeaste una recompensa por completar el recorrido.
            </p>
            <button className="w-full bg-lima text-tinta rounded-full py-2.5 text-sm font-medium">
              Canjear recompensa
            </button>
            <div className="flex gap-2 w-full">
              <button
                onClick={() => compartir("whatsapp")}
                className="flex-1 text-xs border-[0.5px] border-linea-marcada rounded-full py-2"
              >
                WhatsApp
              </button>
              <button
                onClick={() => compartir("twitter")}
                className="flex-1 text-xs border-[0.5px] border-linea-marcada rounded-full py-2"
              >
                Twitter
              </button>
              <button
                onClick={() => compartir("instagram")}
                className="flex-1 text-xs border-[0.5px] border-linea-marcada rounded-full py-2"
              >
                Instagram
              </button>
            </div>
            <button onClick={onClose} className="text-xs text-gris-calido underline">
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
