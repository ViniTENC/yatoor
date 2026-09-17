"use client";

import { CloseIcon } from "@/components/icons";

export interface Beneficio {
  partner: string;
  desc: string;
  code: string;
}

export default function RedeemModal({
  beneficio,
  onClose,
}: {
  beneficio: Beneficio;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[60] bg-tinta/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-xs bg-papel rounded-3xl p-6 relative text-center">
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-superficie flex items-center justify-center"
        >
          <CloseIcon />
        </button>
        <p className="text-xs text-gris-calido uppercase tracking-wide">Beneficio canjeado</p>
        <p className="mt-2 font-archivo font-extrabold text-lg">{beneficio.partner}</p>
        <p className="mt-1 text-sm text-gris-medio">{beneficio.desc}</p>
        <div className="mt-4 border-[1.5px] border-dashed border-linea-marcada rounded-xl py-3">
          <p className="text-[10px] text-gris-calido uppercase tracking-wide">Mostrá este código</p>
          <p className="mt-1 font-archivo font-extrabold text-xl tabular-nums">{beneficio.code}</p>
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-tinta text-papel rounded-full py-2.5 text-sm"
        >
          Listo
        </button>
      </div>
    </div>
  );
}
