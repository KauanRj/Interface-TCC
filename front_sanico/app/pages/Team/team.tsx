import {
  Mail,
  Users,
  Plus,
  ShieldCheck,
  GraduationCap,
  BriefcaseBusiness,
  ClipboardList,
  UserCog,
  Phone,
  Search,
  Filter,
} from "lucide-react";
import { useState } from "react";
import { Notificacoes } from "~/components/Notificacoes";
import { DetalhesFuncionario } from "~/components/DetalhesFuncionario";
import { NovoFuncionario } from "~/components/NovoFuncionario";
import { lerFuncionariosNovos } from "~/utils/funcionariosCadastrados";
import { FUNCIONARIOS_BASE } from "~/data/funcionariosFicticios";
import { Sidebar } from "~/components/Sidebar";
import { useUsuario } from "~/hooks/useUsuario";
import Lohran from "../../../public/lohran-avatar.png";

export function Team() {
  const [filtrosAbertos, setFiltrosAbertos] = useState(false);
  const { pode, usuario } = useUsuario();
  const [funcionarioAberto, setFuncionarioAberto] = useState<any>(null);

  const funcionariosBase = FUNCIONARIOS_BASE;
  const [funcionariosNovos, setFuncionariosNovos] = useState<any[]>(lerFuncionariosNovos);
  const [cadastroAberto, setCadastroAberto] = useState(false);
  const [aviso, setAviso] = useState("");
  const funcionarios = funcionariosBase.concat(funcionariosNovos);

  let proximoId = 1;
  for (let i = 0; i < funcionarios.length; i++) {
    if (funcionarios[i].id >= proximoId) {
      proximoId = funcionarios[i].id + 1;
    }
  }

  function aoCadastrar(funcionario: any) {
    setFuncionariosNovos(lerFuncionariosNovos());
    setCadastroAberto(false);
    setAviso(funcionario.nome + " foi cadastrado neste navegador. O cadastro definitivo depende da integração com a API.");
    setTimeout(() => setAviso(""), 6000);
  }

  const cargos = [
    { nome: "Professores", quantidade: 24, largura: "88%" },
    { nome: "Coordenadores", quantidade: 5, largura: "55%" },
    { nome: "Administrativo", quantidade: 7, largura: "65%" },
    { nome: "Supervisão", quantidade: 3, largura: "38%" },
  ];


  return (
    <main className="app-shell">
   
      <Sidebar ativo="/team" />

        <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
          <div className="app-header">
            <div >
              <h1 className="text-2xl font-bold">Team</h1>
              <p className="app-muted">Gerencie a equipe e acompanhe responsabilidades</p>
            </div>

            <div className="app-header-actions">
              {pode("usuarios.gerenciar") && (
                <button
                  type="button"
                  onClick={() => setCadastroAberto(true)}
                  className="app-button-relatorio">
                  <Plus size={18} />
                  Novo funcionário
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

            <div className="app-page-grid">

            {aviso && (
              <div
                role="status"
                className="rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-700 dark:text-green-300"
              >
                {aviso}
              </div>
            )}

              <div className="app-grid-team">
                <div className="app-report-stat">
                  <div className="app-report-icon bg-cyan-500/15 text-cyan-500">
                    <Users size={20} />
                  </div>
                  <div>
                    <p>Total da equipe</p>
                    <span>50</span>
                  </div>
                </div>

                <div className="app-report-stat">
                  <div className="app-report-icon bg-emerald-500/15 text-emerald-500">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <p>Professores</p>
                    <span>32</span>
                  </div>
                </div>

                <div className="app-report-stat">
                  <div className="app-report-icon bg-indigo-500/15 text-indigo-500">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p>Coordenadores</p>
                    <span>3</span>
                  </div>
                </div>

                <div className="app-report-stat">
                  <div className="app-report-icon bg-orange-500/15 text-orange-500">
                    <BriefcaseBusiness size={20} />
                  </div>
                  <div>
                    <p>Administrativo</p>
                    <span>6</span>
                  </div>
                </div>

                <div className="app-report-stat">
                  <div className="app-report-icon bg-rose-500/15 text-rose-500">
                    <UserCog size={20} />
                  </div>
                  <div>
                    <p>Supervisores</p>
                    <span>4</span>
                  </div>
                </div>

                <div className="app-report-stat">
                  <div className="app-report-icon bg-violet-500/15 text-violet-500">
                    <ClipboardList size={20} />
                  </div>
                  <div>
                    <p>Secretarios</p>
                    <span>5</span>
                  </div>
                </div>
              </div>

              <div className="app-report-filters">
                <div className="app-report-search col-span-3">
                  <label>Pesquisar</label>
                  <div>
                    <Search size={17} />
                    <input placeholder="Pesquisar funcionário..." />
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
                      <label>Cargo</label>
                      <select>
                        <option>Todos os cargos</option>
                        <option>Professor</option>
                        <option>Coordenador</option>
                        <option>Secretário</option>
                      </select>
                    </div>

                    <div>
                      <label>Setor</label>
                      <select>
                        <option>Todos os setores</option>
                        <option>Pedagógico</option>
                        <option>Administrativo</option>
                      </select>
                    </div>

                    <div>
                      <label>Vínculo</label>
                      <select>
                        <option>Todos</option>
                        <option>Efetivo</option>
                        <option>Contratado</option>
                      </select>
                    </div>

                    <div>
                      <label>Status</label>
                      <select>
                        <option>Todos</option>
                        <option>Ativo</option>
                        <option>Pendente</option>
                      </select>
                    </div>
                  </>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
                <div className="app-card overflow-hidden p-4">
                  <h2 className="app-report-title mb-4">Funcionários cadastrados</h2>

                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-left dark:border-white/10">
                        <th className="py-3 p-2">#</th>
                        <th>Nome</th>
                        <th>Cargo</th>
                        <th>Setor</th>
                        <th>Vínculo</th>
                        <th>Status</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {funcionarios.map((funcionario) => (
                        <tr
                          key={funcionario.id}
                          className="border-b border-slate-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-[#101f27]"
                        >
                          <td className="py-3 p-2">{funcionario.id}</td>
                          <td>{funcionario.nome}</td>
                          <td>{funcionario.cargo}</td>
                          <td>{funcionario.setor}</td>
                          <td>
                            <span className={funcionario.vinculo === "Efetivo" ? "app-status-green" : "app-status-yellow"}>
                              {funcionario.vinculo}
                            </span>
                          </td>
                          <td>
                            <span className={funcionario.status === "Ativo" ? "app-status-green" : "app-status-yellow"}>
                              {funcionario.status}
                            </span>
                          </td>
                          <td>
                            <button
                              type="button"
                              aria-label={"Ver detalhes de " + funcionario.nome}
                              title="Ver detalhes"
                              onClick={() => setFuncionarioAberto(funcionario)}
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

                <aside className="grid gap-4">
                  <div className="app-card p-4">
                    <h2 className="app-report-title mb-4">Distribuição por cargo</h2>

                    <div className="space-y-4">
                      {cargos.map((cargo) => (
                        <div key={cargo.nome}>
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span>{cargo.nome}</span>
                            <strong>{cargo.quantidade}</strong>
                          </div>
                          <div className="h-2 rounded-full bg-gray-200 dark:bg-white/10">
                            <div className="h-2 rounded-full bg-[#22c7a9]" style={{ width: cargo.largura }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="app-card p-4">
                    <h2 className="app-report-title mb-4">Contatos rápidos</h2>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3">
                        <Mail size={18} className="text-cyan-500" />
                        <span>Admir@educontrol.com</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone size={18} className="text-emerald-500" />
                        <span>(02) 4002-8922</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <ClipboardList size={18} className="text-violet-500" />
                        <span>4 tarefas pendentes</span>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
          
        </div>
        
      
    {funcionarioAberto && (
        <DetalhesFuncionario
          funcionario={funcionarioAberto}
          aoFechar={() => setFuncionarioAberto(null)}
          podeEditar={pode("usuarios.gerenciar")}
          podeExcluir={pode("usuarios.gerenciar")}
        />
      )}
    {cadastroAberto && (
        <NovoFuncionario
          aoFechar={() => setCadastroAberto(false)}
          aoSalvar={aoCadastrar}
          proximoId={proximoId}
          funcionariosExistentes={funcionarios}
        />
      )}
      </main>
  );
}
