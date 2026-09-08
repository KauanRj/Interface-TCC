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
  HelpCircle,
  LogOut,
  BellRing,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import Lohran from "../../../public/lohran.png";


export function Welcome() {
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
            href="home.tsx"
            className="app-nav-active"
          >
            <LayoutDashboard size={20} />
            <span>Início</span>
          </a>

          <a
            href="relatorios.tsx"
            className="app-nav-link"
          >
            <List size={20} />
            <span>Relatórios</span>
          </a>

          <a
            href="IA.tsx"
            className="app-nav-link"
          >
            <Filter size={20} />
            <span>Assistente de IA</span>
          </a>

          <a
            href="team.tsx"
            className="app-nav-link-between"
          >
            <div className="flex items-center gap-3">
              <Mail size={20} />
              <span>Team</span>
            </div>
          </a>

          <a
            href="presencas.tsx"
            className="app-nav-link"
          >
            <ClipboardCheck size={20} />
            <span>Presenças</span>
          </a>

          <a
            href="salas.tsx"
            className="app-nav-link"
          >
            <DoorOpen size={20} />
            <span>Salas</span>
          </a>

          <a
            href="alunos.tsx"
            className="app-nav-link"
          >
            <Users size={20} />
            <span>Alunos</span>
          </a>
        </nav>

        <div className="app-divider" />

        <nav>
          <a
            href="settings.tsx"
            className="app-nav-link"
          >
            <Settings size={20} />
            <span>Settings</span>
          </a>
        </nav>

        <div className="flex-1" />

        <div className="flex flex-col gap-3">
          <a
            href="ajuda.tsx"
            className="app-nav-link"
          >
            <HelpCircle size={20} />
            <span>Ajuda</span>
          </a>

          <a
            href="Log.tsx"
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
            <h1 className="app-title">
              Welcome back, Lohran!
            </h1>
            <p className="app-muted">
              blablabla
            </p>
          </div>

          <div>
            <input
              type="text"
              placeholder="Pesquisar..."
              className="app-input w-full max-w-80"
            />
          </div>

          <div className="flex items-center gap-4">
            <BellRing size={20} className="text-gray-900 dark:text-[#f5fffc]" />

            <div className="app-avatar">
              <img
                src={Lohran}
                alt="Lohran"
                className="rounded-full"
              />
            </div>

            <span className="text-lg font-semibold text-gray-900 dark:text-[#f5fffc]">
              Lohran
            </span>
          </div>
        </div>

        <div className="app-content-grid">
          <div className="app-card-strong flex flex-col justify-around p-4">
            <h1 className="absolute top-4 left-0 right-0 text-lg font-bold text-white text-center">
              Presenças
            </h1>

            <TrendingUp
              size={20}
              className="text-white/80 absolute bottom-4 left-4"
            />
          </div>

          <div className="app-card flex flex-col justify-around p-4">
            <h1 className="absolute top-4 left-0 right-0 text-lg font-bold text-gray-950 dark:text-[#f5fffc] text-center">
              Pendentes
            </h1>

            <TrendingUp
              size={20}
              className="text-[#f5fffc] absolute bottom-4 left-4"
            />
          </div>

          <div className="app-card flex flex-col justify-around p-4">
            <h1 className="absolute top-4 left-0 right-0 text-lg font-bold text-gray-950 dark:text-[#f5fffc] text-center">
              Atrasados
            </h1>

            <TrendingDown
              size={20}
              className="text-[#f5fffc] absolute bottom-4 left-4"
            />
          </div>

          <div className="app-card lg:col-span-2">
            <h1 className="absolute top-4 left-4 right-0 text-lg font-bold text-gray-950 dark:text-[#f5fffc]">
              Grafico de Turmas
            </h1>
          </div>

          <div className="app-card">
            <h1 className="absolute top-4 left-0 right-0 text-lg font-bold text-gray-950 dark:text-[#f5fffc] text-center">
              Pré-Relatorios
            </h1>
          </div>
        </div>
      </div>
    </main>
  );
}

