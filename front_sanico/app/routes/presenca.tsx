import type { Route } from "./+types/home";
import { Welcome } from "../pages/welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Educontrol - Presença" },
    { name: "description", content: "Página de presença" },
  ];
}

export default function Presença() {
  return <Welcome />;
}
