import type { Route } from "./+types/Log";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Log out" },
    { name: "description", content: "Encerrar sessão." },
  ];
}

export default function Log() {
  return <Welcome />;
}