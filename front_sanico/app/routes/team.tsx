import type { Route } from "./+types/home";
import { Welcome } from "../pages/welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Educontrol - Time" },
    { name: "description", content: "Página do time" },
  ];
}

export default function Team() {
  return <Welcome />;
}
