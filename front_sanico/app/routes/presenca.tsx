import { RotaProtegida } from "~/auth/RotaProtegida";
import { Presenca } from "~/pages/presencas/presenca";
import type { Route } from "../+types/root";



export function meta({}: Route.MetaArgs) { 
  return [
    { title: "Educontrol - Presença" },
    { name: "description", content: "Página de presença" },
  ];
}

export default function PresencaPage() {
  return <RotaProtegida permissao="pagina.presenca"><Presenca /></RotaProtegida> };

