"use client";

import { useEffect, useState } from "react";
import { DEFAULT_ACTIVE_ID } from "@/lib/recorridos";

const STORAGE_KEY = "yatoor_active_recorrido";

export function useActiveRecorridoId() {
  const [activeId, setActiveIdState] = useState(DEFAULT_ACTIVE_ID);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) setActiveIdState(stored);
  }, []);

  function setActiveId(id: string) {
    window.localStorage.setItem(STORAGE_KEY, id);
    setActiveIdState(id);
  }

  return { activeId, setActiveId };
}
