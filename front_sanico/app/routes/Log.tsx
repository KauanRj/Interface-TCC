import { Log } from "~/pages/logout/Log";
import type { Route } from "../+types/root";



export function meta({}: Route.MetaArgs) { 
  return [
    { title: "Educontrol - Login" },
    { name: "description", content: "Página de log" },
  ];
}

export default function LogPage() {
  return <Log /> };

