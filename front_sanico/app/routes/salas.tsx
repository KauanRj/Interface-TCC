import { Salas} from "~/pages/salas/salas";
import type { Route } from "../+types/root";



export function meta({}: Route.MetaArgs) { 
  return [
    { title: "Educontrol - Salas" },
    { name: "description", content: "Página de salas" },
  ];
}

export default function salasPage() {
  return <Salas />;
}
