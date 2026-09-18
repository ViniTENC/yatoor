"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppleIcon, MicrosoftIcon, GoogleIcon, MailIcon } from "@/components/icons";

const providers = [
  { name: "apple", icon: <AppleIcon />, href: "/onboarding" },
  { name: "microsoft", icon: <MicrosoftIcon />, href: "/onboarding" },
  { name: "google", icon: <GoogleIcon />, href: "/onboarding" },
];

export default function LoginPage() {
  const router = useRouter();
  const [mailOpen, setMailOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function registrarse() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, nombre }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "No se pudo registrar.");
      localStorage.setItem("yatoor_usuario", JSON.stringify(data.usuario));
      router.push("/mapa");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo registrar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <span className="font-archivo font-extrabold tracking-tight text-sm">
        yatoor
      </span>

      <div className="mt-6 max-w-xs">
        <h1 className="font-archivo font-extrabold tracking-tight text-2xl leading-tight">
          Tu compañero de viaje.
        </h1>
        <p className="mt-2 text-sm text-gris-medio leading-relaxed">
          No es una guía. Camina con vos y te cuenta lo que otros no ven.
        </p>
      </div>

      {!mailOpen ? (
        <>
          <div className="mt-8 flex gap-3 justify-center">
            {providers.map((p) => (
              <a
                key={p.name}
                href={p.href}
                className="w-11 h-11 rounded-full border-[0.5px] border-linea-marcada flex items-center justify-center"
              >
                {p.icon}
              </a>
            ))}
            <button
              onClick={() => setMailOpen(true)}
              aria-label="Entrar con mail"
              className="w-11 h-11 rounded-full border-[0.5px] border-linea-marcada flex items-center justify-center"
            >
              <MailIcon />
            </button>
          </div>
          <p className="mt-4 text-xs text-gris-calido">Elegí cómo entrar</p>
        </>
      ) : (
        <div className="mt-8 w-full max-w-xs flex flex-col gap-2.5">
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre"
            className="border-[0.5px] border-linea-marcada rounded-full px-4 py-2.5 text-sm bg-papel outline-none text-center"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && email && registrarse()}
            type="email"
            placeholder="tu@mail.com"
            className="border-[0.5px] border-linea-marcada rounded-full px-4 py-2.5 text-sm bg-papel outline-none text-center"
          />
          {error && <p className="text-xs text-[#C0392B]">{error}</p>}
          <button
            onClick={registrarse}
            disabled={!email || loading}
            className="bg-tinta text-papel rounded-full py-3 font-bold text-sm disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
          <button
            onClick={() => setMailOpen(false)}
            className="text-xs text-gris-calido underline"
          >
            Volver
          </button>
        </div>
      )}
    </main>
  );
}
