import type { Route } from "./+types/settings";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Settings" },
    { name: "description", content: "Configurações da secretaria." },
  ];
}

export default function Settings() {
  return <Welcome />;
}