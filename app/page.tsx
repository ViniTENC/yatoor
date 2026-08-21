"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push("/login"), 1500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-tinta">
      <Link href="/login" className="flex flex-col items-center">
        <div className="w-14 h-14 rounded-full border-[1.5px] border-papel flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-papel" />
        </div>
        <h1 className="mt-3.5 font-archivo font-extrabold tracking-tight text-papel text-xl">
          yatoor
        </h1>
      </Link>
      <p className="mt-1.5 text-xs text-gris-calido">
        Caminá. Yatoor te cuenta.
      </p>
    </main>
  );
}
