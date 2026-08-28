import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("relatorios", "routes/relatorios.tsx"),
  route("IA", "routes/IA.tsx"),
  route("team", "routes/team.tsx"),
  route("presencas", "routes/presenca.tsx"),
  route("salas", "routes/salas.tsx"),
  route("alunos", "routes/alunos.tsx"),
  route("settings", "routes/settings.tsx"),
  route("ajuda", "routes/ajuda.tsx"),
  route("Log", "routes/Log.tsx"),
] satisfies RouteConfig;
