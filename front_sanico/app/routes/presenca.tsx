import type { Route } from "./+types/presenca";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Presenças" },
    { name: "description", content: "Controle de presenças." },
  ];
}

export default function Presenca() {
  return <Welcome />;
}