import type { Route } from "./+types/ajuda";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ajuda" },
    { name: "description", content: "Central de ajuda." },
  ];
}

export default function Ajuda() {
  return <Welcome />;
}
