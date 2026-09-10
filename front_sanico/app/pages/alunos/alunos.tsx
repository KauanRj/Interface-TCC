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
}from "lucide-react";
import Lohran from "../../../public/lohran.png";
import { useNavigate } from "react-router";

export function Alunos() {
  const navigate = useNavigate();
  return (
    <main className="app-shell block-s">
   
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
            className="app-nav-active"
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
            <div >
              <h1 className="text-2xl font-bold py-4 p-2">Alunos</h1>
              <p className="app-muted">Gerencie os alunos da sua instituição</p>
            </div>
          
          
            <div className="flex items-center gap-4">
              <BellRing size={20} />
              <div className="app-avatar">
                <img
                  src={Lohran}
                  alt="Profile"
                  className="rounded-full"
                />
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-[#f5fffc]">Lohran</span>
            </div>
          </div> 


          <div className="app-page-grid"> 

            <div className="app-card h-40 p-5">

              <h1 className="absolute top-6 left-4 right-0 text-2xl font-bold text-gray-950 dark:text-[#f5fffc]">
                Pesquisar alunos por nome, email ou matrícula
              </h1>

              <div className="mt-16">
                <input 
                  type="text"
                  placeholder="Ex: kauan, kauan@email.com, 123456"
                  className="app-input w-full h-14"
                />
              </div>
            </div>
            

          <div className="app-card min-h-60 p-4">

            <table className="w-full text-left border-collapse ">
              <thead>
                <tr>
                  <th className="py-4 p-2">Nome</th>
                  <th>Email</th>
                  <th>Matrícula</th>
                  <th>Série/turma</th>
                  <th>CPF</th>
                  <th>Data de nascimento</th>
                  <th>Responsável</th>
                </tr>
              </thead>
              <tbody className="border-t border-gray-300 dark:border-gray-700">
                <tr >
                  <td className="py-4 p-2">Kauan</td>
                  <td>kauan@email.com</td>
                  <td>123456</td>
                  <td>6º ano</td>
                  <td>123.456.789-00</td>
                  <td>01/01/2010</td>
                  <td>Maria Silva</td>
                </tr>
                <tr className="border-t border-gray-300 dark:bg-gray-700">
                  <td className="py-4 p-2">João</td>
                  <td>joao@email.com</td>
                  <td>654321</td>
                  <td>7º ano</td>
                  <td>987.654.321-00</td>
                  <td>02/02/2011</td>
                  <td>José Santos</td>
                </tr>

              </tbody>
            </table>
          </div>  
          </div>       
        </div>
        
        
      
    </main>
  );
}
