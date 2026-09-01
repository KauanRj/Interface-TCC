import type { Route } from "./+types/home";
import { Welcome } from "../pages/welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Educontrol - IA" },
    { name: "description", content: "Página de IA" },
  ];
}

export default function IA() {
  return <Welcome />;
}
