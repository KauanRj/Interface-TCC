import type { Route } from "./+types/alunos";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Alunos" },
    { name: "description", content: "Cadastro de alunos." },
  ];
}

export default function Alunos() {
  return <Welcome />;
}