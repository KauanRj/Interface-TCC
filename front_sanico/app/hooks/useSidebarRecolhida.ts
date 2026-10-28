import { useState } from "react";

const CHAVE = "educontrol:sidebar-recolhida";

function lerSalvo() {
  if (typeof window === "undefined") {
    return false;
  }
  return localStorage.getItem(CHAVE) === "1";
}

export function useSidebarRecolhida() {
  const [recolhida, setRecolhida] = useState(lerSalvo);

  function alternar() {
    const novo = !recolhida;
    setRecolhida(novo);
    if (novo) {
      localStorage.setItem(CHAVE, "1");
    } else {
      localStorage.setItem(CHAVE, "0");
    }
  }

  return { recolhida, alternar };
}
