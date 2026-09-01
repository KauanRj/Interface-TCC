import type { Route } from "./+types/team";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Team" },
    { name: "description", content: "Equipe da secretaria." },
  ];
}

export default function Team() {
  return <Welcome />;
}