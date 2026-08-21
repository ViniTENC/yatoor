"use client";

import { useRouter } from "next/navigation";
import { useActiveRecorridoId } from "@/lib/useActiveRecorrido";

export default function EmpezarRecorridoButton({
  id,
  label,
}: {
  id: string;
  label: string;
}) {
  const router = useRouter();
  const { setActiveId } = useActiveRecorridoId();

  return (
    <button
      onClick={() => {
        setActiveId(id);
        router.push("/mapa");
      }}
      className="bg-tinta text-papel text-center rounded-full py-2.5 text-sm"
    >
      {label}
    </button>
  );
}
