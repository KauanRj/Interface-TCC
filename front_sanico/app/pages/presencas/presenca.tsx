import {
  Users,
  AlertTriangle,
  BarChart3,
  Search,
  TrendingUp,
  FilePlus,
  FilePenLine,
  Filter,
} from "lucide-react";
import { Notificacoes } from "~/components/Notificacoes";
import { DetalhesAluno } from "~/components/DetalhesAluno";
import { acharAlunoPorNome } from "~/utils/alunosCadastrados";
import { Sidebar } from "~/components/Sidebar";
import { useState } from "react";
import { filtrarPresencas } from "~/utils/filtros";
import { useUsuario } from "~/hooks/useUsuario";
import { Paginacao } from "~/components/Paginacao";
import { usePaginacao } from "~/hooks/usePaginacao";
import { RegistrarPresenca } from "~/components/RegistrarPresenca";
import { alunosDeHoje, presencasAtuais } from "~/utils/registroHoje";
import { contarPorStatus, presencaPorTurma } from "~/utils/resumoDia";
import { formatarDataCurta } from "~/utils/formatacao";
import Lohran from "../../../public/lohran-avatar.png";

export function Presenca() {
  const [filtrosAbertos, setFiltrosAbertos] = useState(false);
  const { usuario, pode } = useUsuario();

  const [busca, setBusca] = useState("");
  const [periodo, setPeriodo] = useState("Hoje");
  const [turma, setTurma] = useState("Todas as turmas");
  const [status, setStatus] = useState("Todos os status");
  const [alunoAberto, setAlunoAberto] = useState<any>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [aviso, setAviso] = useState("");

  const alunos = filtrarPresencas(presencasAtuais(), busca, periodo, turma, status);
  const paginacao = usePaginacao(alunos);

  const alunosHoje = alunosDeHoje();
  const resumo = contarPorStatus(alunosHoje);
  const turmas = presencaPorTurma(alunosHoje);

  let fundoRosca = "#94a3b8";
  if (resumo.marcados > 0) {
    const pPresentes = (resumo.presentes / resumo.marcados) * 100;
    const pAusentes = pPresentes + (resumo.ausentes / resumo.marcados) * 100;
    const pAtrasados = pAusentes + (resumo.atrasados / resumo.marcados) * 100;
    fundoRosca = `conic-gradient(#22c7a9 0 ${pPresentes}%, #ef4444 ${pPresentes}% ${pAusentes}%, #f59e0b ${pAusentes}% ${pAtrasados}%, #60a5fa ${pAtrasados}% 100%)`;
  }

  function aoSalvarRegistro(quantidade: number) {
    setModalAberto(false);
    setAviso(quantidade + (quantidade === 1 ? " presença registrada" : " presenças registradas") + " neste navegador. O envio definitivo depende da integração com a API.");
    setTimeout(() => setAviso(""), 6000);
  }

  return (
    <main className="app-shell">
   
      <Sidebar ativo="/presenca" />

       

          <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="app-header">
            <div >
              <h1 className="text-2xl font-bold">Presença</h1>
              <p className="app-muted">Acompanhe e registre a frequencia dos alunos</p>
            </div>


            <div className="app-header-actions">
              {pode("presenca.registrar") && (
                <button
                  type="button"
                  onClick={() => setModalAberto(true)}
                  className="app-button-relatorio w-50">
                  <FilePlus size={18} />
                  Registrar presença
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
            <div className="app-report-stat">
              <div className="app-report-icon blue">
                <Users size={20} />
              </div>
              <div>
                <p>Total de alunos</p>
                <span>{alunosHoje.length}</span>
              </div>
            </div>

            <div className="app-report-stat">
              <div className="app-report-icon green">
                <TrendingUp size={20} />
              </div>
              <div>
                <p>Ausentes</p>
                <span>{resumo.ausentes}</span>
                
              </div>
            </div>

            <div className="app-report-stat">
              <div className="app-report-icon yellow">
                <AlertTriangle size={20} />
              </div>
              <div>
                <p>Atrasados</p>
                <span>{resumo.atrasados}</span>
                
              </div>
            </div>

            <div className="app-report-stat">
              <div className="app-report-icon purple">
                <FilePenLine size={20} />
              </div>
              <div>
                <p>Justificados</p>
                <span>{resumo.justificados}</span>
                
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
                <label>Data</label>
                <select
                  value={periodo}
                  onChange={(e) => {
                    setPeriodo(e.target.value);
                    paginacao.irPara(0);
                  }}
                >
                  <option>Hoje</option>
                  <option>Esta semana</option>
                  <option>Este mês</option>
                  <option>Todas as datas</option>
                </select>
              </div>

              <div>
                <label>Turmas</label>
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
                  <option>Todos os status</option>
                  <option>Presente</option>
                  <option>Ausente</option>
                  <option>Atrasado</option>
                  <option>Justificado</option>
                  <option>Pendente</option>
                </select>
              </div>

              </>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
              <div className="app-card min-h-60 overflow-hidden p-4">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-left dark:border-white/10">
                      <th className="py-3 p-2">#</th>
                      <th>Aluno</th>
                      <th>Turma</th>
                      <th>Data</th>
                      <th>Entrada</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alunos.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-8 text-center app-muted">
                          Nenhum registro encontrado com esses filtros.
                        </td>
                      </tr>
                    )}
                    {paginacao.bloco.map((aluno) => (
                      <tr
                        key={aluno.id}
                        className="border-b border-slate-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-[#101f27]"
                      >
                        <td className="py-3 p-2">{aluno.id}</td>
                        <td>{aluno.nome}</td>
                        <td>{aluno.turma}</td>
                        <td>{formatarDataCurta(aluno.data)}</td>
                        <td>{aluno.entrada}</td>
                        <td>
                          <span className={aluno.status === "Presente" ? "app-status-green" : aluno.status === "Atrasado" || aluno.status === "Pendente" ? "app-status-yellow" : aluno.status === "Justificado" ? "app-status-gray" : "app-status-red"}>
                            {aluno.status}
                          </span>
                        </td>
                        <td>
                    <button
                      type="button"
                      aria-label={"Ver detalhes de " + aluno.nome}
                      title="Ver detalhes"
                      onClick={() => setAlunoAberto(acharAlunoPorNome(aluno.nome))}
                      className="cursor-pointer px-2"
                    >
                      •••
                    </button>
                  </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Paginacao
 paginaAtual={paginacao.paginaAtual}
 totalPaginas={paginacao.totalPaginas}
 totalItens={paginacao.totalItens}
 tamanho={paginacao.tamanho}
 irPara={paginacao.irPara}
 rotulo="registros"
 />
              </div>

              <aside className="grid gap-4">
                <div className="app-card p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h2 className="app-report-title">Frequência do dia</h2>
                      <p className="app-muted text-xs">Resumo de hoje</p>
                    </div>
                    <BarChart3 size={20} className="text-[#22c7a9]" />
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="flex h-32 w-32 items-center justify-center rounded-full" style={{ background: fundoRosca }}>
                      <div className="flex h-22 w-22 flex-col items-center justify-center rounded-full bg-white dark:bg-[#0a141a]">
                        <strong className="text-2xl text-gray-900 dark:text-white">{resumo.marcados > 0 ? resumo.taxa + "%" : "—"}</strong>
                        <span className="text-xs text-gray-500 dark:text-[#8fb1aa]">Presença</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-500">Presentes</span>
                      <strong>{resumo.presentes}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-red-500">Ausentes</span>
                      <strong>{resumo.ausentes}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-yellow-500">Atrasados</span>
                      <strong>{resumo.atrasados}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-500">Justificados</span>
                      <strong>{resumo.justificados}</strong>
                    </div>
                  </div>
                </div>

                <div className="app-card p-4">
                  <h2 className="app-report-title mb-4">Por turma</h2>

                  <div className="space-y-3">
                    {turmas.map((turma) => (
                      <div key={turma.nome} className="grid grid-cols-[70px_1fr_42px] items-center gap-3 text-sm">
                        <span>{turma.nome}</span>
                        <div className="h-2 rounded-full bg-gray-200 dark:bg-white/10">
                          <div
                            className="h-2 rounded-full bg-[#22c7a9]"
                            style={{ width: turma.porcentagem + "%" }}
                          />
                        </div>
                        <strong>{turma.porcentagem}%</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>

        </div>

        </div>
        </div>
  
        
      

      {modalAberto && (
        <RegistrarPresenca
          aoFechar={() => setModalAberto(false)}
          aoSalvar={aoSalvarRegistro}
          podeCorrigir={pode("presenca.corrigir")}
        />
      )}
    {alunoAberto && (
        <DetalhesAluno
          aluno={alunoAberto}
          aoFechar={() => setAlunoAberto(null)}
          podeEditar={pode("alunos.editar")}
          podeExcluir={pode("alunos.excluir")}
        />
      )}
    </main>
  );
}
