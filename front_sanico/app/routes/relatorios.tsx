import { Relatorios } from "~/pages/relatorios/relatorios";
import type { Route } from "../+types/root";



export function meta({}: Route.MetaArgs) { 
  return [
    { title: "Educontrol - Relatórios" },
    { name: "description", content: "Página de relatórios" },
  ];
}

export default function relatorios() {
  return <Relatorios />;
}
