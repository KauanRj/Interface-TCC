import type { Route } from "./+types/home";
import { Welcome } from "../pages/welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Educontrol - Relatórios" },
    { name: "description", content: "Página de relatórios" },
  ];
}

export default function Relatórios() {
  return <Welcome />;
}
