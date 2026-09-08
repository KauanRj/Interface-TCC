import { Log } from "~/pages/logout/login/Log";
import type { Route } from "../+types/root";



export function meta({}: Route.MetaArgs) { 
  return [
    { title: "Educontrol - Log" },
    { name: "description", content: "Página de log" },
  ];
}

export default function logPage() {
  return <Log />;
}
