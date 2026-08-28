import type { Route } from "./+types/home";
import { Welcome } from "../pages/welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Educontrol - Log" },
    { name: "description", content: "Página de log" },
  ];
}

export default function Log() {
  return <Welcome />;
}
