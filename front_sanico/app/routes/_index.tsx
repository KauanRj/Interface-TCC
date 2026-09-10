import { Log } from "~/pages/logout/Log";
import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Educontrol - Login" },
    { name: "description", content: "Página de login" },
  ];
}

export default function Index() {
  return <Log />;
}
