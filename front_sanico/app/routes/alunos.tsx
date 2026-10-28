import { RotaProtegida } from "~/auth/RotaProtegida";
import { Alunos } from "~/pages/alunos/alunos";
import type { Route } from "../+types/root";



export function meta({}: Route.MetaArgs) { 
  return [
    { title: "Educontrol - Alunos" },
    { name: "description", content: "Página de alunos" },
  ];
}

export default function AlunosPage() {
  return <RotaProtegida permissao="pagina.alunos"><Alunos /></RotaProtegida> };

