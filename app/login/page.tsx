import Link from "next/link";
import { AppleIcon, MicrosoftIcon, GoogleIcon, MailIcon } from "@/components/icons";

const providers = [
  { name: "apple", icon: <AppleIcon />, href: "/onboarding" },
  { name: "microsoft", icon: <MicrosoftIcon />, href: "/onboarding" },
  { name: "google", icon: <GoogleIcon />, href: "/onboarding" },
  // Atajo de prueba: salta directo al mapa en vez de pasar por onboarding.
  { name: "mail", icon: <MailIcon />, href: "/mapa" },
];

export default function LoginPage() {
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

      <div className="mt-8 flex gap-3 justify-center">
        {providers.map((p) => (
          <Link
            key={p.name}
            href={p.href}
            className="w-11 h-11 rounded-full border-[0.5px] border-linea-marcada flex items-center justify-center"
          >
            {p.icon}
          </Link>
        ))}
      </div>
      <p className="mt-4 text-xs text-gris-calido">Elegí cómo entrar</p>
    </main>
  );
}
