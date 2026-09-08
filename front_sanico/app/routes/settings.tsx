import { Configuracao } from "~/pages/settings/configuracao";
import type { Route } from "../+types/root";



export function meta({}: Route.MetaArgs) { 
  return [
    { title: "Educontrol - Configurações" },
    { name: "description", content: "Página de configurações" },
  ];
}

export default function settingsPage() {
  return <Configuracao />;
}
