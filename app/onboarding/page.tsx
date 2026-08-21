import Link from "next/link";

export default function OnboardingPage() {
  return (
    <main className="min-h-screen flex flex-col p-8 gap-3">
      <span className="font-archivo font-extrabold tracking-tight text-sm">
        yatoor
      </span>

      <p className="text-sm leading-relaxed">
        Hola! Con qué energías despertaste hoy?
      </p>
      <p className="self-end bg-tinta text-papel text-sm px-4 py-2.5 rounded-full max-w-[75%] leading-snug">
        Con ganas de caminar sin apuro
      </p>
      <p className="text-sm leading-relaxed">
        Buenísimo. Y hoy, ¿con ganas de descubrir algo nuevo o de volver a un
        lugar que ya conocés?
      </p>
      <p className="self-end bg-tinta text-papel text-sm px-4 py-2.5 rounded-full max-w-[75%] leading-snug">
        Algo nuevo, sorprendeme
      </p>

      <div className="flex-1" />

      <div className="flex gap-2 flex-wrap">
        <Link
          href="/mapa"
          className="text-xs border-[0.5px] border-linea-marcada text-gris-medio px-3.5 py-1.5 rounded-full"
        >
          Algo nuevo
        </Link>
        <Link
          href="/mapa"
          className="text-xs border-[0.5px] border-linea-marcada text-gris-medio px-3.5 py-1.5 rounded-full"
        >
          Un clásico
        </Link>
      </div>
      <div className="border-[0.5px] border-linea-marcada rounded-full px-4 py-2.5 text-sm text-gris-calido">
        Escribí tu propia respuesta...
      </div>
    </main>
  );
}
