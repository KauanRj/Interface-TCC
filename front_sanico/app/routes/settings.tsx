import type { Route } from "./+types/home";
import { Welcome } from "../pages/welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Educontrol - Configurações" },
    { name: "description", content: "Página de configurações" },
  ];
}

export default function Settings() {
  return <Welcome />;
}
