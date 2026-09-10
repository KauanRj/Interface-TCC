import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/_index.tsx"),
    route("home", "routes/home.tsx"),
    route("ajuda", "routes/ajuda.tsx"),
    route("alunos", "routes/alunos.tsx"),
    route("ia", "routes/iA.tsx"),
    route("log", "routes/Log.tsx"),
    route("presenca", "routes/presenca.tsx"),
    route("relatorios", "routes/relatorios.tsx"),
    route("salas", "routes/salas.tsx"),
    route("settings", "routes/settings.tsx"),
    route("team", "routes/team.tsx"),
] satisfies RouteConfig;
