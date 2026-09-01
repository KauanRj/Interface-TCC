import type { Route } from "./+types/relatorios";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Relatórios" },
    { name: "description", content: "Relatórios da secretaria." },
  ];
}

export default function Relatorios() {
  return <Welcome />;
}