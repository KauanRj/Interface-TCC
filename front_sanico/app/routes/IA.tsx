import type { Route } from "./+types/IA";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Assistente de IA" },
    { name: "description", content: "Assistente de IA da secretaria." },
  ];
}

export default function AssistenteIA() {
  return <Welcome />;
}
