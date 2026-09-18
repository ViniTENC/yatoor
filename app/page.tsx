import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-8 pt-8 pb-14 text-center bg-papel">
      <div className="w-[88px] h-[88px] rounded-full border-4 border-tinta flex items-center justify-center overflow-hidden mb-6">
        <div className="w-[64%] h-[64%] rounded-full bg-nube blur-[7px]" />
      </div>

      <h1 className="font-archivo font-extrabold tracking-tight text-[26px] mb-2.5">
        Hola, soy Yatoor
      </h1>
      <p className="text-sm leading-relaxed text-gris-2 max-w-[280px] mb-8">
        Te cuento Buenos Aires mientras caminás. Empecemos como prefieras.
      </p>

      <div className="flex flex-col gap-2.5 w-full max-w-[280px]">
        <Link
          href="/mapa?chat=1"
          className="bg-tinta text-papel rounded-full py-3.5 font-bold text-sm"
        >
          Hablar con Yatoor
        </Link>
        <Link
          href="/mapa"
          className="bg-sup-1 border border-linea-2 text-tinta rounded-full py-3.5 font-bold text-sm"
        >
          Explorar el mapa
        </Link>
      </div>
    </main>
  );
}
