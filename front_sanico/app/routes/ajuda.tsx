import { Ajuda } from "~/pages/ajuda/ajuda";
import type { Route } from "../+types/root";



export function meta({}: Route.MetaArgs) { 
  return [
    { title: "Educontrol - Ajuda" },
    { name: "description", content: "Página de ajuda" },
  ];
}

export default function ajudaPage() {
  return <Ajuda />;
}
