import {
  LayoutDashboard,
  List,
  Filter,
  ClipboardCheck,
  DoorOpen,
  Users,
  Settings,
  LogOut,
  UserRound,
  UserCircle,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useUsuario } from "~/hooks/useUsuario";
import { useSidebarRecolhida } from "~/hooks/useSidebarRecolhida";

export function Sidebar({ ativo }: { ativo: string }) {
  const navigate = useNavigate();
  const { pode, sair } = useUsuario();
  const { recolhida, alternar } = useSidebarRecolhida();

  let classeRecolhida = "";
  if (recolhida) {
    classeRecolhida = "!justify-center !px-0";
  }

  function criarLink(rota: string, texto: string, icone: any, permissao: string) {
    if (pode(permissao) === false) {
      return null;
    }

    let classe = "app-nav-link";
    if (ativo === rota) {
      classe = "app-nav-active";
    } else if (rota === "/team") {
      classe = "app-nav-link-between";
    }

    let titulo = undefined;
    if (recolhida) {
      titulo = texto;
    }

    let conteudo = (
      <>
        {icone}
        {!recolhida && <span>{texto}</span>}
      </>
    );

    if (rota === "/team") {
      let espaco = "gap-3";
      if (recolhida) {
        espaco = "justify-center";
      }
      conteudo = (
        <div className={`flex items-center ${espaco}`}>
          {icone}
          {!recolhida && <span>{texto}</span>}
        </div>
      );
    }

    return (
      <a
        onClick={() => navigate(rota)}
        title={titulo}
        className={`${classe} cursor-pointer ${classeRecolhida}`}
      >
        {conteudo}
      </a>
    );
  }

  function sairDoSistema() {
    sair();
    navigate("/log");
  }

  let classeAside = "";
  let textoBotao = "Recolher menu";
  let classeBotao = "right-2";
  let iconeBotao = <PanelLeftClose size={20} />;
  let classeLogo = "";
  let logo = (
    <span className="sm:text-2xl">
      <span className="app-login-logo-edu">Edu</span>
      <span className="app-login-logo-control">Control</span>
    </span>
  );

  if (recolhida) {
    classeAside = "!w-[72px] !min-w-[72px]";
    textoBotao = "Expandir menu";
    classeBotao = "left-1/2 -translate-x-1/2";
    iconeBotao = <PanelLeftOpen size={20} />;
    classeLogo = "justify-center";
    logo = (
      <span className="sm:text-2xl" title="EduControl">
        <span className="app-login-logo-edu">ㅤ</span>
      </span>
    );
  }

  return (
    <aside
      className={`app-sidebar relative transition-[width,min-width] duration-300 ${classeAside}`}
    >
      <button
        type="button"
        onClick={alternar}
        title={textoBotao}
        aria-label={textoBotao}
        className={`absolute top-4 z-20 rounded-md p-1 text-current hover:bg-black/10 dark:hover:bg-white/10 ${classeBotao}`}
      >
        {iconeBotao}
      </button>

      <div className={`mb-10 flex items-center gap-3 ${classeLogo}`}>{logo}</div>

      <nav className="flex flex-col gap-2">
        {criarLink("/home", "Início", <LayoutDashboard size={20} />, "pagina.inicio")}
        {criarLink("/relatorios", "Relatórios", <List size={20} />, "pagina.relatorios")}
        {criarLink("/ia", "Assistente de IA", <Filter size={20} />, "pagina.ia")}
        {criarLink("/team", "Team", <Users size={20} />, "pagina.team")}
        {criarLink("/presenca", "Presenças", <ClipboardCheck size={20} />, "pagina.presenca")}
        {criarLink("/salas", "Salas", <DoorOpen size={20} />, "pagina.salas")}
        {criarLink("/alunos", "Alunos", <UserRound size={20} />, "pagina.alunos")}
      </nav>

      <div className="app-divider" />

      <nav className="flex flex-col gap-2">
        {criarLink("/settings", "Settings", <Settings size={20} />, "pagina.configuracoes")}
      </nav>

      <div className="flex-1" />

      <div className="flex flex-col gap-3">
        {criarLink("/perfil", "Perfil", <UserCircle size={20} />, "pagina.perfil")}

        <a
          onClick={sairDoSistema}
          title={recolhida ? "Log out" : undefined}
          className={`app-nav-link cursor-pointer ${classeRecolhida}`}
        >
          <LogOut size={20} />
          {!recolhida && <span>Log out</span>}
        </a>
      </div>
    </aside>
  );
}
