import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { CampoFormulario } from "~/components/CampoFormulario";
import { cadastrarSala } from "~/utils/salasCadastradas";

const TURMAS = ["Sem turma", "7º Ano A", "7º Ano B", "8º Ano A", "8º Ano B", "9º Ano A", "9º Ano B"];

export function NovaSala({ aoFechar, aoSalvar, salasExistentes }: any) {
  const [form, setForm] = useState({
    nome: "",
    capacidade: "",
    andar: "Térreo",
    turma: "Sem turma",
    status: "Disponível",
  });
  const [erros, setErros] = useState<any>({});

  useEffect(() => {
    function aoApertar(e: KeyboardEvent) {
      if (e.key === "Escape") {
        aoFechar();
      }
    }
    window.addEventListener("keydown", aoApertar);
    return () => window.removeEventListener("keydown", aoApertar);
  }, []);

  function mudar(campo: string, valor: string) {
    const novo: any = { ...form };
    novo[campo] = valor;
    setForm(novo);
  }

  function salvar() {
    const novosErros: any = {};
    const nome = form.nome.trim();

    if (nome === "") {
      novosErros.nome = "Informe o nome da sala.";
    } else if (nome.length > 30) {
      novosErros.nome = "O nome deve ter no máximo 30 caracteres.";
    } else {
      for (let i = 0; i < salasExistentes.length; i++) {
        if (salasExistentes[i].nome.toLowerCase() === nome.toLowerCase()) {
          novosErros.nome = "Já existe uma sala com esse nome.";
        }
      }
    }

    const capacidade = parseInt(form.capacidade, 10);
    if (isNaN(capacidade) || String(capacidade) !== form.capacidade.trim()) {
      novosErros.capacidade = "Informe a capacidade com números inteiros.";
    } else if (capacidade < 1 || capacidade > 100) {
      novosErros.capacidade = "A capacidade deve ficar entre 1 e 100.";
    }

    if (form.turma !== "Sem turma") {
      for (let i = 0; i < salasExistentes.length; i++) {
        if (salasExistentes[i].turma === form.turma) {
          novosErros.turma = "Essa turma já está em " + salasExistentes[i].nome + ".";
        }
      }
    }

    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) {
      return;
    }

    const sala = cadastrarSala(form);
    if (sala === null) {
      setErros({ nome: "Não foi possível salvar neste navegador." });
      return;
    }
    aoSalvar(sala);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={aoFechar}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Nova sala"
        className="app-card max-h-[90vh] w-full max-w-xl overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className="text-xl font-bold">Nova sala</h2>
          <button type="button" onClick={aoFechar} aria-label="Fechar" className="cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          <CampoFormulario rotulo="Nome da sala" erro={erros.nome}>
            <input
              className="app-input w-full"
              placeholder="Sala 5"
              value={form.nome}
              onChange={(e) => mudar("nome", e.target.value)}
            />
          </CampoFormulario>
          <CampoFormulario rotulo="Capacidade (alunos)" erro={erros.capacidade}>
            <input
              className="app-input w-full"
              inputMode="numeric"
              value={form.capacidade}
              onChange={(e) => mudar("capacidade", e.target.value)}
            />
          </CampoFormulario>
          <CampoFormulario rotulo="Andar">
            <select className="app-input w-full" value={form.andar} onChange={(e) => mudar("andar", e.target.value)}>
              <option>Térreo</option>
              <option>1º Andar</option>
              <option>2º Andar</option>
            </select>
          </CampoFormulario>
          <CampoFormulario rotulo="Turma" erro={erros.turma}>
            <select className="app-input w-full" value={form.turma} onChange={(e) => mudar("turma", e.target.value)}>
              {TURMAS.map((turma) => (
                <option key={turma}>{turma}</option>
              ))}
            </select>
          </CampoFormulario>
          <CampoFormulario rotulo="Status">
            <select className="app-input w-full" value={form.status} onChange={(e) => mudar("status", e.target.value)}>
              <option>Disponível</option>
              <option>Em uso</option>
              <option>Em manutenção</option>
            </select>
          </CampoFormulario>
        </div>

        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-gray-500">Salvo neste navegador (simulação até a API).</p>
          <div className="flex gap-2">
            <button type="button" onClick={aoFechar} className="cursor-pointer rounded-lg px-4 py-2 text-sm">
              Cancelar
            </button>
            <button type="button" onClick={salvar} className="app-button-relatorio">
              Salvar sala
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
