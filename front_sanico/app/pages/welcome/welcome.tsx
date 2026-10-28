  import {
    TrendingUp,
    TrendingDown,
    X,
  } from "lucide-react";
  import { useEffect, useState } from "react";
  import { Notificacoes } from "~/components/Notificacoes";
import { DetalhesAluno } from "~/components/DetalhesAluno";
import { acharAlunoPorNome } from "~/utils/alunosCadastrados";
import { LeitorRfid } from "~/components/LeitorRfid";
import { BuscaGlobal } from "~/components/BuscaGlobal";
import { DetalhesFuncionario } from "~/components/DetalhesFuncionario";
import { useNavigate } from "react-router";
import { Sidebar } from "~/components/Sidebar";
import { primeiroNome } from "~/utils/formatacao";
import { useUsuario } from "~/hooks/useUsuario";
import { alunosDeHoje } from "~/utils/registroHoje";
import { resumoDoDia, porcentagem } from "~/utils/resumoDia";
  import Lohran from "../../../public/lohran-avatar.png";

  import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";


  export function Welcome() {
    const { usuario, pode } = useUsuario();
    const [alunoAberto, setAlunoAberto] = useState<any>(null);
    const [categoria, setCategoria] = useState("");
    const [leituras, setLeituras] = useState(0);
    const [funcionarioAberto, setFuncionarioAberto] = useState<any>(null);
    const navigate = useNavigate();

    function escolherResultado(resultado: any) {
      if (resultado.tipo === "Aluno") {
        setAlunoAberto(resultado.item);
      }
      if (resultado.tipo === "Funcionário") {
        setFuncionarioAberto(resultado.item);
      }
      if (resultado.tipo === "Sala") {
        navigate("/salas");
      }
    }

    const resumo = resumoDoDia(alunosDeHoje());
    const pctPresentes = porcentagem(resumo.presentes.length, resumo.total);
    const pctFaltas = porcentagem(resumo.faltas.length, resumo.total);
    const pctPendentes = 100 - pctPresentes - pctFaltas;

    useEffect(() => {
      if (categoria === "") {
        return;
      }

      function aoTeclar(evento: any) {
        if (evento.key === "Escape") {
          setCategoria("");
        }
      }

      window.addEventListener("keydown", aoTeclar);
      return () => window.removeEventListener("keydown", aoTeclar);
    }, [categoria]);

    let listaDoModal: any[] = [];
    if (categoria === "Presentes") {
      listaDoModal = resumo.presentes;
    }
    if (categoria === "Pendentes") {
      listaDoModal = resumo.pendentes;
    }
    if (categoria === "Faltou") {
      listaDoModal = resumo.faltas;
    }

    function classeStatus(status: string) {
      if (status === "Presente") {
        return "app-status-green";
      }
      if (status === "Atrasado" || status === "Pendente") {
        return "app-status-yellow";
      }
      if (status === "Justificado") {
        return "app-status-gray";
      }
      return "app-status-red";
    }


    const dadosFrequencia = [
      { dia: "5", presentes: 800, faltosos: 250, pendentes: 150 },
      { dia: "6", presentes: 700, faltosos: 210, pendentes: 290 },
      { dia: "7", presentes: 700, faltosos: 100, pendentes: 400 },
      { dia: "8", presentes: 850, faltosos: 300, pendentes: 50 },
      { dia: "9", presentes: 600, faltosos: 300, pendentes: 200 },
      { dia: "10", presentes: 800, faltosos: 350, pendentes: 50 },
      { dia: "11", presentes: 780, faltosos: 120, pendentes: 300 },
      { dia: "12", presentes: 1000, faltosos: 50, pendentes: 150 },
      { dia: "13", presentes: 600, faltosos: 320, pendentes: 280 },
      { dia: "14", presentes: 800, faltosos: 100, pendentes: 300 },
    ];

    const cardsInicio = [
      { titulo: "Presentes", valor: String(resumo.presentes.length), texto: pctPresentes + "% do total", tipo: "strong" },
      { titulo: "Pendentes", valor: String(resumo.pendentes.length), texto: "aguardando marcação", tipo: "normal" },
      { titulo: "Faltou", valor: String(resumo.faltas.length), texto: pctFaltas + "% do total", tipo: "normal" },
    ];

    const preRelatorio = [
      { label: "presentes", valor: resumo.presentes.length, cor: "bg-emerald-500", categoria: "Presentes" },
      { label: "faltosos", valor: resumo.faltas.length, cor: "bg-red-500", categoria: "Faltou" },
      { label: "faltam marcar presença", valor: resumo.pendentes.length, cor: "bg-yellow-500", categoria: "Pendentes" },
    ];

    const alunosAtencao = [
      { id: 1, nome: "Carlos Eduardo", turma: "9º Ano A", motivo: "Média baixa", status: "Risco" },
      { id: 2, nome: "Bruno Almeida", turma: "8º Ano B", motivo: "Frequência baixa", status: "Atenção" },
      { id: 3, nome: "Igor Fernandes", turma: "7º Ano A", motivo: "Faltas recentes", status: "Risco" },
      { id: 4, nome: "Lucas Pereira", turma: "8º Ano A", motivo: "Notas pendentes", status: "Atenção" },
    ];

    return (
      <main className="app-shell">

        <Sidebar ativo="/home" />

        <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
          <div className="app-header">
            <div>
              <h1 className="app-title">
                Bem-vindo de volta, {primeiroNome(usuario?.nome)}!
              </h1>
              <p className="app-muted">
                O que deseja fazer ou ver hoje?
              </p>
            </div>

            <div>
              <BuscaGlobal
                podeVer={{ alunos: pode("pagina.alunos"), equipe: pode("pagina.team"), salas: pode("pagina.salas") }}
                aoEscolher={escolherResultado}
              />
            </div>

            <div className="flex items-center gap-4">
              <Notificacoes className="text-gray-900 dark:text-[#f5fffc]" />

              <div className="app-avatar">
                <img
                  src={Lohran}
                  alt={usuario?.nome ?? "Usuário"}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>

              <span className="text-lg font-semibold text-gray-900 dark:text-[#f5fffc]">
                {usuario?.nome ?? ""}
              </span>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="app-page-grid">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {cardsInicio.map((card) => (
                <div
                  key={card.titulo}
                  role="button"
                  tabIndex={0}
                  onClick={() => setCategoria(card.titulo)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setCategoria(card.titulo);
                    }
                  }}
                  title={"Ver alunos: " + card.titulo}
                  className={`cursor-pointer ${card.tipo === "strong" ? "app-card-strong min-h-36 p-5" : "app-card min-h-36 p-5"}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className={card.tipo === "strong" ? "text-sm font-semibold text-white" : "text-sm font-semibold text-gray-900 dark:text-white"}>
                        {card.titulo}
                      </p>
                      <strong className={card.tipo === "strong" ? "mt-3 block text-3xl text-white" : "mt-3 block text-3xl text-gray-900 dark:text-white"}>
                        {card.valor}
                      </strong>
                      <span className={card.tipo === "strong" ? "text-sm text-white/70" : "text-sm text-gray-500 dark:text-[#8fb1aa]"}>
                        {card.texto}
                      </span>
                    </div>

                    <span className={card.tipo === "strong" ? "text-white/80" : "text-[#22c7a9]"}>
                      ›
                    </span>
                  </div>

                  <div className={card.tipo === "strong" ? "absolute bottom-5 left-5 text-white/80" : "absolute bottom-5 left-5 text-gray-500 dark:text-[#8fb1aa]"}>
                    {card.titulo === "Faltou" ? <TrendingDown size={18} /> : <TrendingUp size={18} />}
                  </div>
                </div>
              ))}
            </div>

            <LeitorRfid podeAlterar={pode("configuracoes.rfid")} aoLer={() => setLeituras(leituras + 1)} />

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
              <div className="app-card min-h-80 overflow-hidden p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="app-report-title">Gráfico de frequência</h2>
                  <select className="h-9 rounded-lg border border-slate-300 bg-gray-200 px-3 text-sm dark:border-white/10 dark:bg-[#0c171d] dark:text-white">
                    <option>Últimos 14 dias</option>
                    <option>Últimos 30 dias</option>
                  </select>
                </div>

                <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={dadosFrequencia}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="0"
                      vertical={true}
                      horizontal={false}
                      className="opacity-30"
                    />

                    <XAxis
                      dataKey="dia"
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <YAxis
                      tick={{ fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      width={40}
                    />

                    <Tooltip />
                  
                    <Line
                      type="monotone"
                      dataKey="presentes"
                      stroke="#22c7a9"
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 5 }}
                    />

                    <Line
                      type="monotone"
                      dataKey="faltosos"
                      stroke="#f59e0b"
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 5 }}
                    />

                    <Line
                      type="monotone"
                      dataKey="pendentes"
                      stroke="#2f8de4"
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              </div>

              <aside className="app-card min-h-80 p-5">
                <h2 className="app-report-title mb-5">Pré-relatório</h2>

                <div className="flex justify-center">
                  <div className="flex h-36 w-36 items-center justify-center rounded-full" style={{ background: `conic-gradient(#22c7a9 0 ${pctPresentes}%, #ef4444 ${pctPresentes}% ${pctPresentes + pctFaltas}%, #f59e0b ${pctPresentes + pctFaltas}% 100%)` }}>
                    <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white dark:bg-[#0a141a]">
                      <strong className="text-2xl text-gray-900 dark:text-white">{pctPresentes}%</strong>
                      <span className="text-xs text-gray-500 dark:text-[#8fb1aa]">presença</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {preRelatorio.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setCategoria(item.categoria)}
                      title={"Ver alunos: " + item.categoria}
                      className="flex w-full cursor-pointer items-center justify-between rounded-md px-1 py-1 text-sm hover:bg-black/5 dark:hover:bg-white/5"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`h-3 w-3 rounded-sm ${item.cor}`} />
                        <span className="text-gray-600 dark:text-[#b9d2cc]">{item.label}</span>
                      </div>
                      <strong>{item.valor}</strong>
                    </button>
                  ))}
                </div>
              </aside>
            </div>

            <div className="app-card overflow-hidden p-4">
              <h2 className="app-report-title mb-4">Alunos que precisam de atenção</h2>

              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-left dark:border-white/10">
                    <th className="py-3 p-2">#</th>
                    <th>Aluno</th>
                    <th>Turma</th>
                    <th>Motivo</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {alunosAtencao.map((aluno) => (
                    <tr
                      key={aluno.id}
                      className="border-b border-slate-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-[#101f27]"
                    >
                      <td className="py-3 p-2">{aluno.id}</td>
                      <td>{aluno.nome}</td>
                      <td>{aluno.turma}</td>
                      <td>{aluno.motivo}</td>
                      <td>
                        <span className={aluno.status === "Risco" ? "app-status-red" : "app-status-yellow"}>
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
            </div>
          </div>
          </div>
        </div>

        {categoria !== "" && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-modal-categoria"
            onClick={() => setCategoria("")}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl rounded-2xl border border-black/10 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#151515]"
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2
                    id="titulo-modal-categoria"
                    className="text-lg font-semibold text-[#17332e] dark:text-white"
                  >
                    {categoria}
                  </h2>

                  <p className="mt-1 text-sm text-[#6f8781] dark:text-[#8fa9a3]">
                    {listaDoModal.length} de {resumo.total} alunos hoje
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setCategoria("")}
                  aria-label="Fechar"
                  className="rounded-lg p-2 text-[#6f8781] transition hover:bg-black/5 hover:text-[#17332e] dark:text-[#8fa9a3] dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="max-h-[55vh] overflow-y-auto">
                {listaDoModal.length === 0 ? (
                  <p className="py-8 text-center text-sm text-[#6f8781] dark:text-[#8fa9a3]">
                    Nenhum aluno nesta categoria.
                  </p>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-left dark:border-white/10">
                        <th className="py-3 p-2">#</th>
                        <th>Aluno</th>
                        <th>Turma</th>
                        <th>Situação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listaDoModal.map((aluno) => (
                        <tr
                          key={aluno.id}
                          className="border-b border-slate-200 dark:border-white/5"
                        >
                          <td className="py-3 p-2">{aluno.id}</td>
                          <td>{aluno.nome}</td>
                          <td>{aluno.turma}</td>
                          <td>
                            <span className={classeStatus(aluno.statusHoje)}>
                              {aluno.statusHoje}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setCategoria("")}
                  className="rounded-xl border border-black/10 px-4 py-2.5 text-sm font-medium text-[#526a65] transition hover:bg-black/5 dark:border-white/10 dark:text-[#b9d2cc] dark:hover:bg-white/10"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      {alunoAberto && (
        <DetalhesAluno
          aluno={alunoAberto}
          aoFechar={() => setAlunoAberto(null)}
          podeEditar={pode("alunos.editar")}
          podeExcluir={pode("alunos.excluir")}
        />
      )}
    {funcionarioAberto && (
        <DetalhesFuncionario
          funcionario={funcionarioAberto}
          aoFechar={() => setFuncionarioAberto(null)}
          podeEditar={pode("usuarios.gerenciar")}
          podeExcluir={pode("usuarios.gerenciar")}
        />
      )}
      </main>
    );
  }

