import { Team } from "~/pages/Team/team";
import type { Route } from "../+types/root";



export function meta({}: Route.MetaArgs) { 
  return [
    { title: "Educontrol - Time" },
    { name: "description", content: "Página do time" },
  ];
}

export default function teamPage() {
  return <Team />;
}
