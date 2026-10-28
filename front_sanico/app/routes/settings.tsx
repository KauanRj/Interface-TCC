import { RotaProtegida } from "~/auth/RotaProtegida";
import { Configuracao } from "~/pages/settings/configuracao";
import type { Route } from "../+types/root";



export function meta({}: Route.MetaArgs) { 
  return [
    { title: "Educontrol - Configurações" },
    { name: "description", content: "Página de configurações" },
  ];
}

export default function SettingsPage() {
  return <RotaProtegida permissao="pagina.configuracoes"><Configuracao /></RotaProtegida> };

