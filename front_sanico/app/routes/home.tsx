import { RotaProtegida } from "~/auth/RotaProtegida";
import type { Route } from "./+types/home";
import { Welcome } from "../pages/welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Educontrol - Home" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <RotaProtegida permissao="pagina.inicio"><Welcome /></RotaProtegida>;
}
