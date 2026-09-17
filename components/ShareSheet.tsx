"use client";

export default function ShareSheet({
  texto,
  onClose,
}: {
  texto: string;
  onClose: () => void;
}) {
  function compartir(canal: "whatsapp" | "twitter" | "instagram") {
    if (canal === "whatsapp") {
      window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, "_blank");
    } else if (canal === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}`, "_blank");
    } else {
      alert(
        "Instagram no tiene un link de compartir web como WhatsApp o X — para postear en Historias hace falta la integración nativa de la app (SDK / share intent)."
      );
    }
    onClose();
  }

  const opciones: { key: "whatsapp" | "twitter" | "instagram"; label: string; bg: string }[] = [
    { key: "whatsapp", label: "WhatsApp", bg: "#25D366" },
    { key: "twitter", label: "X / Twitter", bg: "#000000" },
    { key: "instagram", label: "Instagram", bg: "linear-gradient(135deg,#FFDD55,#FF543E 45%,#C837AB 65%,#7638FA 90%)" },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center">
      <div className="absolute inset-0 bg-tinta/50" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-papel rounded-t-3xl p-6 pb-8">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-linea-marcada" />
        <p className="font-archivo font-extrabold text-base mb-4">Compartir recorrido</p>
        <div className="flex justify-around">
          {opciones.map((o) => (
            <button
              key={o.key}
              onClick={() => compartir(o.key)}
              className="flex flex-col items-center gap-2"
            >
              <span
                className="w-12 h-12 rounded-full"
                style={{ background: o.bg }}
              />
              <span className="text-xs">{o.label}</span>
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full border-[0.5px] border-linea-marcada rounded-full py-2.5 text-sm"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
