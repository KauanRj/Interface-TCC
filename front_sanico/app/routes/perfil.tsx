import { RotaProtegida } from "~/auth/RotaProtegida";
import { Perfil } from "~/pages/perfil/perfil";
import type { Route } from "../+types/root";



export function meta({}: Route.MetaArgs) { 
  return [
    { title: "Educontrol - Perfil" },
    { name: "description", content: "Página de perfil" },
  ];
}

export default function PerfilPage() {
  return <RotaProtegida permissao="pagina.perfil"><Perfil /></RotaProtegida> };

