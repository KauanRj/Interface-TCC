import {
  Home,
  LayoutDashboard,
  List,
  Filter,
  Mail,
  ClipboardCheck,
  DoorOpen,
  Users,
  Settings,
  
  LogOut,
  BellRing,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import Lohran from "../../../public/lohran.png";
import { useNavigate } from "react-router";

export function Relatorios() {
  const navigate = useNavigate();

  return (
    <main className="app-shell">

      <aside className="app-sidebar">
        <div className="flex items-center gap-3 mb-10">
          <div className="app-logo-mark">
            <Home size={21} />
          </div>

          <h1 className="text-base font-bold">
            Home
          </h1>
        </div>

        <nav className="flex flex-col gap-2">
          <a
            onClick={() => navigate("/home")}
            className="app-nav-link"
          >
            <LayoutDashboard size={20} />
            <span>Início</span>
          </a>

          <a
            onClick={() => navigate("/relatorios")}
            className="app-nav-active"
          >
            <List size={20} />
            <span>Relatórios</span>
          </a>

          <a
            onClick={() => navigate("/ia")}
            className="app-nav-link"
          >
            <Filter size={20} />
            <span>Assistente de IA</span>
          </a>

          <a
            onClick={() => navigate("/team")}
            className="app-nav-link-between"
          >
            <div className="flex items-center gap-3">
              <Mail size={20} />
              <span>Team</span>
            </div>
          </a>

          <a
            onClick={() => navigate("/presenca")}
            className="app-nav-link"
          >
            <ClipboardCheck size={20} />
            <span>Presenças</span>
          </a>

          <a
            onClick={() => navigate("/salas")}
            className="app-nav-link"
          >
            <DoorOpen size={20} />
            <span>Salas</span>
          </a>

          <a
            onClick={() => navigate("/alunos")}
            className="app-nav-link"
          >
            <Users size={20} />
            <span>Alunos</span>
          </a>
        </nav>

        <div className="app-divider" />

        <nav>
          <a
            onClick={() => navigate("/settings")}
            className="app-nav-link"
          >
            <Settings size={20} />
            <span>Settings</span>
          </a>
        </nav>

        <div className="flex-1" />

        <div className="flex flex-col gap-3">
          <a
            onClick={() => navigate("/perfil")}
            className="app-nav-link"
          >
            <Users size={20} />
            <span>Perfil</span>
          </a>

          <a
            onClick={() => navigate("/log")}
            className="app-nav-link"
          >
            <LogOut size={20} />
            <span>Log out</span>
          </a>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">

        <div className="app-header">
          <div>
            <h1 className="app-title p-4">
              Relatorios
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <BellRing
              size={20}
              className="text-gray-700 dark:text-[#b9d2cc]"
            />

            <div className="app-avatar">
              <img
                src={Lohran}
                alt="Profile"
                className="rounded-full"
              />
            </div>

            <span className="text-lg font-semibold text-gray-900 dark:text-[#f5fffc]">
              Lohran
            </span>
          </div>
        </div>

        <div className="app-page-grid">

          <div className="app-card h-60 p-5">

            <h1 className="absolute top-6 left-4 right-0 text-2xl font-bold text-gray-950 dark:text-[#f5fffc]">
              Pesquisar Aluno para relatórios
            </h1>

            <div className="mt-16">
              <input
                type="text"
                placeholder="Pesquisar..."
                className="app-input w-full h-14"
              />
            </div>

          </div>

          <div className="app-card min-h-60 p-4">

            <h1 className="text-lg font-bold text-center text-[#f5fffc]">
              //tabela
            </h1>

            
          </div>

        </div>

      </div>

    </main>
  );
}