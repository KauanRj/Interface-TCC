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
  Lock,
  LogOut,
  BellRing,
  TrendingUp,
  TrendingDown,
  UserRound,
}from "lucide-react";
import Lohran from "../../../public/lohran.png";
import { useNavigate } from "react-router";

export function Perfil() {
  const navigate = useNavigate();
  return (
    <main className="app-shell">

      <aside className="app-sidebar">
        <div className="flex items-center gap-3 mb-10">
          <span className="sm:text-2xl">
             <span className="app-login-logo-edu">Edu</span>
             <span className="app-login-logo-control">Control</span>
           </span>
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
            className="app-nav-link"
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
              <Users size={20} />
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
            <UserRound size={20} />
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
            className="app-nav-active"  
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

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

        <div className="app-header">
          <div>
            <h1 className="app-title p-4">
              Meu perfil
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
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
              <div className="app-card min-h-60 overflow-hidden p-4">
                 <div className="mb-4 flex flex-col gap-2">
                  <label htmlFor="email" className="font-medium text-white/60">
                    E-mail
                  </label>

                  <div className="relative">
                    <Mail
                      size={20}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 placeholder-gray-500 outline-none focus:border-[#0d7f70] dark:border-white/15 dark:bg-[#151515] dark:text-white dark:focus:border-[#22c7a9]"
                    />
                  </div>
                </div>

                <div className="mb-4 flex flex-col gap-2">
                  <label htmlFor="password" className="font-medium text-white/60">
                    Senha
                  </label>

                  <div className="relative">
                    <Lock
                      size={20}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="password"
                      type= "password"
                     
                      placeholder="Sua senha"
                      className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 placeholder-gray-500 outline-none focus:border-[#0d7f70] dark:border-white/15 dark:bg-[#151515] dark:text-white dark:focus:border-[#22c7a9]"
                    />

                  </div>
                </div>             
              </div>

              <aside className="grid gap-4">
                <div className="app-card p-4">
                    2
                </div> 

                <div className="app-card p-4">
                  2 test
                </div> 
                



              </aside> 


          </div>
        </div>

        
          
          
        </div>
        
      
    </main>
  );
}
