import type { Route } from "./+types/home";
import { Welcome } from "../pages/welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Educontrol - Alunos" },
    { name: "description", content: "Página de alunos" },
  ];
}

export default function Alunos() {
  return <Welcome />;
}
