import { useEffect, useState } from "react";
import { X, Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import { detalhesCompletosFuncionario, salvarContatoFuncionario } from "~/utils/detalhesFuncionario";
import { mascararCpf } from "~/utils/detalhesAluno";
import { validarEmail, validarTelefone, formatarTelefone } from "~/utils/validacoes";
import { formatarDataCurta } from "~/utils/formatacao";

function Campo({ rotulo, valor }: any) {
  return (
    <div>
      <p className="text-xs text-gray-500 dark:text-[#8fb1aa]">{rotulo}</p>
      <p className="text-sm font-medium">{valor}</p>
    </div>
  );
}

export function DetalhesFuncionario({ funcionario, aoFechar, podeEditar, podeExcluir }: any) {
  const [dados, setDados] = useState<any>(() => detalhesCompletosFuncionario(funcionario));
  const [cpfVisivel, setCpfVisivel] = useState(false);
  const [editando, setEditando] = useState(false);
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [erro, setErro] = useState("");
  const [aviso, setAviso] = useState("");

  useEffect(() => {
    function aoApertar(e: KeyboardEvent) {
      if (e.key === "Escape") {
        aoFechar();
      }
    }
    window.addEventListener("keydown", aoApertar);
    return () => window.removeEventListener("keydown", aoApertar);
  }, []);

  function comecarEdicao() {
    setTelefone(formatarTelefone(dados.telefone));
    setEmail(dados.email);
    setEndereco(dados.endereco);
    setErro("");
    setAviso("");
    setEditando(true);
  }

  function salvar() {
    let mensagem = "";
    if (telefone.trim() === "") {
      mensagem = "Informe o telefone.";
    }
    if (mensagem === "") {
      mensagem = validarTelefone(telefone);
    }
    if (mensagem === "") {
      mensagem = validarEmail(email);
    }
    if (mensagem === "" && endereco.trim().length < 5) {
      mensagem = "Informe o endereço.";
    }
    if (mensagem !== "") {
      setErro(mensagem);
      return;
    }

    salvarContatoFuncionario(funcionario.id, {
      telefone: telefone.replace(/\D/g, ""),
      email: email.trim(),
      endereco: endereco.trim(),
    });
    setDados(detalhesCompletosFuncionario(funcionario));
    setEditando(false);
    setErro("");
    setAviso("Contato atualizado neste navegador. A gravação definitiva depende da API.");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={aoFechar}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={"Detalhes de " + funcionario.nome}
        className="app-card max-h-[90vh] w-full max-w-3xl overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">{funcionario.nome}</h2>
            <p className="app-muted text-sm">
              {funcionario.cargo} · Matrícula {dados.matricula}
            </p>
          </div>
          <button type="button" onClick={aoFechar} aria-label="Fechar" className="cursor-pointer">
            <X size={20} />
          </button>
        </div>

        {aviso !== "" && (
          <p className="mb-4 rounded-lg bg-emerald-500/15 p-3 text-sm text-emerald-500">{aviso}</p>
        )}

        <h3 className="app-report-title mb-2">Dados do funcionário</h3>
        <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-3">
          <Campo rotulo="Data de nascimento" valor={formatarDataCurta(dados.dataNascimento)} />
          <div>
            <p className="text-xs text-gray-500 dark:text-[#8fb1aa]">CPF</p>
            <p className="flex items-center gap-2 text-sm font-medium">
              {cpfVisivel ? dados.cpf : mascararCpf(dados.cpf)}
              <button
                type="button"
                onClick={() => setCpfVisivel(!cpfVisivel)}
                aria-label={cpfVisivel ? "Ocultar CPF" : "Mostrar CPF"}
                className="cursor-pointer text-[#22c7a9]"
              >
                {cpfVisivel ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </p>
          </div>
          <Campo rotulo="Status" valor={funcionario.status} />
        </div>

        <h3 className="app-report-title mb-2">Vínculo</h3>
        <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-3">
          <div>
            <p className="text-xs text-gray-500 dark:text-[#8fb1aa]">Tipo de vínculo</p>
            <span className={funcionario.vinculo === "Efetivo" ? "app-status-green" : "app-status-yellow"}>
              {funcionario.vinculo}
            </span>
          </div>
          <Campo rotulo="Cargo" valor={funcionario.cargo} />
          <Campo rotulo="Setor" valor={funcionario.setor} />
          <Campo rotulo="Data de admissão" valor={formatarDataCurta(dados.dataAdmissao)} />
          {funcionario.vinculo === "Contratado" && (
            <Campo rotulo="Fim do contrato" valor={formatarDataCurta(dados.fimContrato)} />
          )}
          <Campo rotulo="Jornada" valor={dados.jornada} />
        </div>

        <div className="mb-2 flex items-center justify-between">
          <h3 className="app-report-title">Contato</h3>
          {podeEditar && !editando && (
            <button
              type="button"
              onClick={comecarEdicao}
              className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-[#22c7a9]"
            >
              <Pencil size={14} />
              Editar contato
            </button>
          )}
        </div>

        {!editando && (
          <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-3">
            <Campo rotulo="Telefone" valor={formatarTelefone(dados.telefone)} />
            <Campo rotulo="E-mail" valor={dados.email} />
            <div className="col-span-2 md:col-span-3">
              <Campo rotulo="Endereço" valor={dados.endereco} />
            </div>
          </div>
        )}

        {editando && (
          <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs text-gray-500">Telefone</label>
              <input
                className="app-input w-full"
                value={telefone}
                onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-500">E-mail</label>
              <input className="app-input w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-xs text-gray-500">Endereço</label>
              <input className="app-input w-full" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
            </div>
            {erro !== "" && <p className="col-span-full text-sm text-red-500">{erro}</p>}
            <div className="col-span-full flex justify-end gap-2">
              <button type="button" onClick={() => setEditando(false)} className="cursor-pointer rounded-lg px-4 py-2 text-sm">
                Cancelar
              </button>
              <button type="button" onClick={salvar} className="app-button-relatorio">
                Salvar contato
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-gray-500">Dados fictícios de exemplo.</p>
          <div className="flex gap-2">
            {podeExcluir && (
              <button
                type="button"
                disabled
                title="Disponível após a integração com a API"
                className="flex cursor-not-allowed items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-500 opacity-50"
              >
                <Trash2 size={16} />
                Desligar funcionário
              </button>
            )}
            <button type="button" onClick={aoFechar} className="app-button-relatorio">
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
