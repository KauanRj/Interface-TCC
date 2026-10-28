import {
  DoorOpen,
  Search,
  Plus,
  WrenchOff,
  ChartNoAxesCombined,
  Building2,
  DoorClosed,
  Filter,
} from "lucide-react";
import { Notificacoes } from "~/components/Notificacoes";
import { NovaSala } from "~/components/NovaSala";
import { lerSalasNovas } from "~/utils/salasCadastradas";
import { SALAS_BASE } from "~/data/salasFicticias";
import { Sidebar } from "~/components/Sidebar";
import { useState } from "react";
import { filtrarSalas } from "~/utils/filtros";
import { useUsuario } from "~/hooks/useUsuario";
import Lohran from "../../../public/lohran-avatar.png";


export function Salas() {
  const [filtrosAbertos, setFiltrosAbertos] = useState(false);
  const { pode, usuario } = useUsuario();
  const salasBase = SALAS_BASE;
  const [salasNovas, setSalasNovas] = useState<any[]>(lerSalasNovas);
  const [cadastroAberto, setCadastroAberto] = useState(false);
  const [aviso, setAviso] = useState("");
  const todasSalas = salasBase.concat(salasNovas);

  let emUso = 0;
  let disponiveis = 0;
  let emManutencao = 0;
  for (let i = 0; i < todasSalas.length; i++) {
    if (todasSalas[i].cor === "Em uso") {
      emUso = emUso + 1;
    }
    if (todasSalas[i].cor === "Disponível") {
      disponiveis = disponiveis + 1;
    }
    if (todasSalas[i].cor === "Em manutenção") {
      emManutencao = emManutencao + 1;
    }
  }

  function aoCadastrar(sala: any) {
    setSalasNovas(lerSalasNovas());
    setCadastroAberto(false);
    setBusca("");
    setAndar("Todos os andares");
    setStatus("Todos os status");
    setTurma("Todas as turmas");
    setAviso(sala.nome + " foi cadastrada neste navegador. O cadastro definitivo depende da integração com a API.");
    setTimeout(() => setAviso(""), 6000);
  }

  const [busca, setBusca] = useState("");
  const [andar, setAndar] = useState("Todos os andares");
  const [status, setStatus] = useState("Todos os status");
  const [turma, setTurma] = useState("Todas as turmas");

  const salas = filtrarSalas(todasSalas, busca, andar, status, turma);
  return (
    <main className="app-shell">
   
      <Sidebar ativo="/salas" />

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="app-header">
            <div>
              <h1 className="text-2xl font-bold">Salas e turmas</h1>
              <p className="app-muted">
                {pode("salas.gerenciar")
                  ? "Gerencie as salas e turmas da sua instituição"
                  : "Consulte as salas e turmas da sua instituição"}
              </p>
            </div>

        


            <div className="app-header-actions">
              {pode("salas.gerenciar") && (
                <button
                  type="button"
                  onClick={() => setCadastroAberto(true)}
                  className="app-button-relatorio">
                  <Plus size={18} />
                  Nova sala
                </button>
              )}

              <Notificacoes />
              <div className="app-avatar">
                <img
                  src={Lohran}
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-[#f5fffc]">{usuario?.nome ?? ""}</span>
            </div>
          </div>

          <div className="app-grid-relatorio p-5"> 
            <div className="app-report-stat relative">
              <div className="app-report-icon blue">
                <Building2 size={20} />
              </div>
              <div>
                <div>
                  <p>Total de salas</p>
                  <span>{todasSalas.length}</span>
                </div>
                

                <div className="flex justify-end gap-1">
                    <ChartNoAxesCombined
                    size={20}
                    className="absolute bottom-5 right-5 text-blue-300  "
                  />

                </div>
                
              </div>
            </div>

            <div className="app-report-stat relative">
              <div className="app-report-icon green">
                <DoorClosed size={20} />
              </div>
              <div>
                <div>
                  <p>Salas em uso</p>
                  <span>{emUso}</span>
                </div>
                

                <div className="flex justify-end gap-1">
                    <ChartNoAxesCombined 
                    size={20}
                    className="absolute bottom-5 right-5 text-green-300  "
                  />

                </div>
                
              </div>
            </div>

            <div className="app-report-stat relative">
              <div className="app-report-icon gray">
                <DoorOpen size={20} />
              </div>
              <div>
                <div>
                  <p>Salas disponíveis</p>
                  <span>{disponiveis}</span>
                </div>
                

                <div className="flex justify-end gap-1">
                    <ChartNoAxesCombined 
                    size={20}
                    className="absolute bottom-5 right-5 text-gray-300  "
                  />

                </div>
                
              </div>
            </div>

            <div className="app-report-stat relative">
              <div className="app-report-icon red">
                <WrenchOff size={20} />
              </div>  
              <div>
                <div>
                  <p>Salas em manutenção</p>
                  <span>{emManutencao}</span>
                </div>
                

                <div className="flex justify-end gap-1">
                    <ChartNoAxesCombined 
                    size={20}
                    className="absolute bottom-5 right-5 text-red-300  "
                  />

                </div>
                
              </div>
            </div>
            
          
          </div> 


          <div className="app-page-grid">

            {aviso && (
              <div
                role="status"
                className="rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-700 dark:text-green-300"
              >
                {aviso}
              </div>
            )}

            <div className="app-report-filters">

              <div className="app-report-search col-span-3">
                <label>Pesquisar</label>
                <div>
                  <Search size={17} />
                  <input
                    placeholder="Buscar sala..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  className="app-button-filtrar"
                  aria-expanded={filtrosAbertos}
                  onClick={() => setFiltrosAbertos(!filtrosAbertos)}
                >
                  <Filter size={16} />
                  Filtrar
                </button>
              </div>

              {filtrosAbertos && (
              <>

              <div>
                <label>Andar</label>
                <select value={andar} onChange={(e) => setAndar(e.target.value)}>
                  <option>Todos os andares</option>
                  <option>Térreo</option>
                  <option>1º Andar</option>
                  <option>2º Andar</option>
                </select>
              </div>

              <div>
                <label>Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option>Todos os status</option>
                  <option>Em uso</option>
                  <option>Em manutenção</option>
                  <option>Disponível</option>
                </select>
              </div>

              <div>
                <label>Turma</label>
                <select value={turma} onChange={(e) => setTurma(e.target.value)}>
                  <option>Todas as turmas</option>
                  <option>6º Ano</option>
                  <option>7º Ano</option>
                  <option>8º Ano</option>
                  <option>9º Ano</option>
                  <option>1º Ano EM</option>
                  <option>2º Ano EM</option>
                  <option>3º Ano EM</option>
                </select>
              </div>

              </>
              )}
            </div>  


            <div className="app-card min-h-60 p-2">

            <table className="w-full text-left border-collapse ">
              <thead>
              <tr className="border-b  border-slate-200 text-left dark:border-white/10">
                
                <th className=" py-3 p-2">Salas</th>
                <th>Capacidade</th>
                <th>Andar</th>
                <th>Turma</th>
                <th>Status</th>
                
              </tr>
            </thead>
              <tbody>
              {salas.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center app-muted">
                    Nenhuma sala encontrada com esses filtros.
                  </td>
                </tr>
              )}
              {salas.map((salas) => (
                <tr
                  key={salas.nome}
                  className="border-b border-slate-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-[#101f27]"
                >
                  <td className="py-3 p-2  ">{salas.nome}</td>
                  <td>{salas.capacidade}</td>
                  <td>{salas.andar}</td>
                  <td>{salas.turma}</td>
                  <td>
                    
                    <span className={salas.cor === "Em uso" ? "app-status-green" : salas.cor === "Em manutenção" ? "app-status-red" : "app-status-gray"}>
                      {salas.cor}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>

          </div>

            
          
          
        </div>

        

              
      
    {cadastroAberto && (
        <NovaSala aoFechar={() => setCadastroAberto(false)} aoSalvar={aoCadastrar} salasExistentes={todasSalas} />
      )}
      </main>
  );
}
