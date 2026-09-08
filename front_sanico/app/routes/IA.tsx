import { IA} from "~/pages/assistenteIA/IA";
import type { Route } from "../+types/root";



export function meta({}: Route.MetaArgs) { 
  return [
    { title: "Educontrol - IA" },
    { name: "description", content: "Página de IA" },
  ];
}

export default function iaPage() {
  return <IA />;
}
