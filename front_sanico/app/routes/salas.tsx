import type { Route } from "./+types/home";
import { Welcome } from "../pages/welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Educontrol - Salas" },
    { name: "description", content: "Página de salas" },
  ];
}

export default function Salas() {
  return <Welcome />;
}
