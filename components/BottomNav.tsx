"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPinIcon, ProfileIcon } from "@/components/icons";

const items = [
  { href: "/mapa", label: "Mapa", icon: MapPinIcon },
  { href: "/perfil", label: "Perfil", icon: ProfileIcon },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-20 bg-tinta rounded-full shadow-lg flex items-center gap-1 px-2 py-2">
      {items.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(href + "/");
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs transition-colors ${
              active ? "bg-papel text-tinta" : "text-papel/60"
            }`}
          >
            <Icon color={active ? "#14161A" : "#F5F2EA99"} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
