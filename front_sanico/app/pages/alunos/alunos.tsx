import {
  TrendingUp,
  Search,
  Plus,
  AlertTriangle,
  UserRound,
  ChartNoAxesColumnIncreasing,
  ChartNoAxesCombined,
  Filter,
} from "lucide-react";
import { Notificacoes } from "~/components/Notificacoes";
import { NovoAluno } from "~/components/NovoAluno";
import { DetalhesAluno } from "~/components/DetalhesAluno";
import { Sidebar } from "~/components/Sidebar";
import { Paginacao } from "~/components/Paginacao";
import { usePaginacao } from "~/hooks/usePaginacao";
import { todosOsAlunos } from "~/utils/alunosCadastrados";
import { useState } from "react";
import { filtrarAlunos, textoDaData } from "~/utils/filtros";
import { useUsuario } from "~/hooks/useUsuario";
import Lohran from "../../../public/lohran-avatar.png";

export function Alunos() {
  const [filtrosAbertos, setFiltrosAbertos] = useState(false);
  const { pode, usuario } = useUsuario();

  const [alunoAberto, setAlunoAberto] = useState<any>(null);
  const [lista, setLista] = useState<any[]>(todosOsAlunos);
  const [cadastroAberto, setCadastroAberto] = useState(false);
  const [aviso, setAviso] = useState("");
  const [busca, setBusca] = useState("");
  const [turma, setTurma] = useState("Todas as turmas");
  const [status, setStatus] = useState("Todos");
  const [ordem, setOrdem] = useState("Todos");

  const todos = lista;
  const alunos = filtrarAlunos(todos, busca, turma, status, ordem);
  const paginacao = usePaginacao(alunos);

  let emAtencao = 0;
  let novasMatriculas = 0;
  const mesAtual = textoDaData(new Date()).slice(0, 7);
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].situacao === "Em atenção") {
      emAtencao = emAtencao + 1;
    }
    if (todos[i].detalhes && todos[i].detalhes.dataMatricula.slice(0, 7) === mesAtual) {
      novasMatriculas = novasMatriculas + 1;
    }
  }

  function aoCadastrar(aluno: any) {
    setLista(todosOsAlunos());
    setCadastroAberto(false);
    setBusca("");
    setTurma("Todas as turmas");
    setStatus("Todos");
    paginacao.irPara(0);
    setAviso(aluno.nome + " foi cadastrado neste navegador. O cadastro definitivo depende da integração com a API.");
    setTimeout(() => setAviso(""), 6000);
  }
  return (
    <main className="app-shell block-s">
   
      <Sidebar ativo="/alunos" />

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="app-header">
            <div >
              <h1 className="text-2xl font-bold">Alunos</h1>
              <p className="app-muted">Gerencie os alunos da sua instituição</p>
            </div>

            <div className="app-header-actions">
              {pode("alunos.cadastrar") && (
                <button
                  type="button"
                  onClick={() => setCadastroAberto(true)}
                  className="app-button-relatorio">
                  <Plus size={18} />
                  Novo aluno
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

          <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="app-grid-relatorio p-5"> 
            <div className="app-report-stat relative">
              <div className="app-report-icon blue">
                <UserRound size={20} />
              </div>
              <div>
                <div>
                  <p>Total de alunos</p>
                  <span>{todos.length}</span>
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
                <TrendingUp size={20} />
              </div>
              <div>
                <div>
                  <p>Ativos</p>
                  <span>{todos.length}</span>
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
              <div className="app-report-icon yellow">
                <AlertTriangle size={20} />
              </div>
              <div className="  flex justify-around">

                <div>
                  <p>Alunos em atenção</p>
                  <span>{emAtencao}</span>
                </div>
                 

                  <div className="flex justify-end gap-1">
                    <ChartNoAxesCombined 
                    size={20}
                    className="absolute bottom-5 right-5 text-yellow-300  "
                  />

                  </div>
              </div> 
            </div>

            <div className="app-report-stat relative">
              <div className="app-report-icon purple">
                <ChartNoAxesColumnIncreasing size={20} />
              </div>
              <div>
                <div>
                  <p>Novas matrículas</p>
                  <span>{novasMatriculas}</span>
                </div>

                <div className="flex justify-end gap-1">
                    <ChartNoAxesCombined 
                    size={20}
                    className="absolute bottom-5 right-5 text-purple-300  "
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
                    placeholder="Pesquisar aluno..."
                    value={busca}
                    onChange={(e) => {
                      setBusca(e.target.value);
                      paginacao.irPara(0);
                    }}
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
                <label>Turma</label>
                <select
                  value={turma}
                  onChange={(e) => {
                    setTurma(e.target.value);
                    paginacao.irPara(0);
                  }}
                >
                  <option>Todas as turmas</option>
                  <option>7º Ano A</option>
                  <option>7º Ano B</option>
                  <option>8º Ano A</option>
                  <option>8º Ano B</option>
                  <option>9º Ano A</option>
                  <option>9º Ano B</option>
                </select>
              </div>

              <div>
                <label>Status</label>
                <select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    paginacao.irPara(0);
                  }}
                >
                  <option>Todos</option>
                  <option>Bom</option>
                  <option>Em atenção</option>
                  <option>Risco</option>
                </select>
              </div>

              <div>
                <label>Ordenar</label>
                <select
                  value={ordem}
                  onChange={(e) => {
                    setOrdem(e.target.value);
                    paginacao.irPara(0);
                  }}
                >
                  <option>Todos</option>
                  <option>Ordem alfabética</option>
                  <option>Média crescente</option>
                  <option>Média decrescente</option>
                </select>
              </div>

              </>
              )}
            </div>
            

          <div className="app-card min-h-60 p-4">

            <table className="w-full text-left border-collapse ">
              <thead>
              <tr className="border-b  border-slate-200 text-left dark:border-white/10">
                <th className=" py-3 p-2">#</th>
                <th>Aluno</th>
                <th>Turma</th>
                <th>Presença</th>
                <th>Média</th>
                <th>Situação</th>
                <th>Ações</th>
              </tr>
            </thead>
              <tbody>
              {alunos.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center app-muted">
                    Nenhum aluno encontrado com esses filtros.
                  </td>
                </tr>
              )}
              {paginacao.bloco.map((aluno) => (
                <tr
                  key={aluno.id}
                  className="border-b border-slate-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-[#101f27]"
                >
                  <td className="py-3 p-2  ">{aluno.id}</td>
                  <td>{aluno.nome}</td>
                  <td>{aluno.turma}</td>
                  <td>{aluno.presenca}</td>
                  <td>{aluno.media}</td>
                  <td>
                    <span className={aluno.situacao === "Bom" ? "app-status-green" : aluno.situacao === "Em atenção" ? "app-status-yellow" : "app-status-red"}>
                      {aluno.situacao}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      aria-label={"Ver detalhes de " + aluno.nome}
                      title="Ver detalhes"
                      onClick={() => setAlunoAberto(aluno)}
                      className="cursor-pointer px-2"
                    >
                      •••
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>

          <Paginacao
 paginaAtual={paginacao.paginaAtual}
 totalPaginas={paginacao.totalPaginas}
 totalItens={paginacao.totalItens}
 tamanho={paginacao.tamanho}
 irPara={paginacao.irPara}
 />
          </div>
          </div>
        </div>
        
        
      
    {alunoAberto && (
        <DetalhesAluno
          aluno={alunoAberto}
          aoFechar={() => setAlunoAberto(null)}
          podeEditar={pode("alunos.editar")}
          podeExcluir={pode("alunos.excluir")}
        />
      )}
    {cadastroAberto && <NovoAluno aoFechar={() => setCadastroAberto(false)} aoSalvar={aoCadastrar} />}
      </main>
  );
}
