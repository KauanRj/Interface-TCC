import type { Route } from "./+types/salas";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Salas" },
    { name: "description", content: "Salas da secretaria." },
  ];
}

export default function Salas() {
  return <Welcome />;
}