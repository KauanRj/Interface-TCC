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
}from "lucide-react";

export function Alunos() {
  return (
    <main className="min-h-screen flex bg-gray-100 m-0">
   
      <aside className="w-55 min-h-screen bg-stone-900 text-white text-sm flex flex-col px-5 py-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-5 h-10 rounded-full flex items-center justify-center bg-white/10">
            <Home size={21} />
          </div>

          <h1 className="text-base font-bold">
            Home
          </h1>
        </div>

        <nav className="flex flex-col gap-2">
          <a
            href="home.tsx"
            className="flex items-center gap-3 px-3 py-3 rounded-lg bg-white/10 text-white font-semibold"
          >
            <LayoutDashboard size={20} />
            <span>Início</span>
          </a>

          <a
            href="relatorios.tsx"
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-white/50 hover:bg-white/5 hover:text-white transition"
          >
            <List size={20} />
            <span>Relatórios</span>
          </a>

          <a
            href="IA.tsx"
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-white/50 hover:bg-white/5 hover:text-white transition"
          >
            <Filter size={20} />
            <span>Assistente de IA</span>
          </a>

          <a
            href="team.tsx"
            className="flex items-center justify-between px-3 py-3 rounded-lg text-white/50 hover:bg-white/5 hover:text-white transition"
          >
            <div className="flex items-center gap-3">
              <Mail size={20} />
              <span>Team</span>
            </div>

          </a>

          <a
            href="presencas.tsx"
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-white/50 hover:bg-white/5 hover:text-white transition"
          >
            <ClipboardCheck size={20} />
            <span>Presenças</span>
          </a>

          <a
            href="salas.tsx"
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-white/50 hover:bg-white/5 hover:text-white transition"
          >
            <DoorOpen size={20} />
            <span>Salas</span>
          </a>

          <a
            href="alunos.tsx"
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-white/50 hover:bg-white/5 hover:text-white transition"
          >
            <Users size={20} />
            <span>Alunos</span>
          </a>
        </nav>

        <div className="border-t border-white/10 my-7" />

        <nav>
          <a
            href="settings.tsx"
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-white/50 hover:bg-white/5 hover:text-white transition"
          >
            <Settings size={20} />
            <span>Settings</span>
          </a>
        </nav>

        <div className="flex-1" />

        <div className="flex flex-col gap-3">
          <a
            href="ajuda.tsx"
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-white/50 hover:bg-white/5 hover:text-white transition"
          >
            <HelpCircle size={20} />
            <span>Ajuda</span>
          </a>

          <a
            href="Log.tsx"
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-white/50 hover:bg-white/5 hover:text-white transition"
          >
            <LogOut size={20} />
            <span>Log out</span>
          </a>
        </div>
      </aside>

        <div className="flex-1 flex flex-col">
          <div className="w-full bg-white p-4 shadow-lg flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, Lohran!</h1>
              <p className="text-lg text-gray-500">blablabla</p>
            </div>
          
            <div>
              <input
                type="text"
                placeholder="Pesquisar..."
                className="bg-gray-200 text-sm rounded-lg w-80 h-10 px-4"
              />
            </div>
          
            <div className="flex items-center gap-4">
              <BellRing size={20} />
              <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Profile"
                  className="rounded-full"
                />
              </div>
              <span className="text-lg font-semibold">Lohran</span>
            </div>
          </div>
          
        </div>
        
      
    </main>
  );
}
