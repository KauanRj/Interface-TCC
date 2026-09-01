import type { Route } from "./+types/ajuda";
import { Welcome } from "../pages/welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Educontrol - Ajuda" },
    { name: "description", content: "Página de ajuda" },
  ];
}

export default function Ajuda() {
  return <Welcome />;
}
