import { RotaProtegida } from "~/auth/RotaProtegida";
import { IA } from "~/pages/assistenteIA/IA";
import type { Route } from "../+types/root";



export function meta({}: Route.MetaArgs) { 
  return [
    { title: "Educontrol - IA" },
    { name: "description", content: "Página de IA" },
  ];
}

export default function IAPage() {
  return <RotaProtegida permissao="pagina.ia"><IA /></RotaProtegida> };

