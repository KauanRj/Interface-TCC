import { detalhesDoFuncionario } from "~/data/funcionariosFicticios";

const CHAVE = "educontrol:funcionarios-contato";

function lerEdicoes() {
  try {
    const texto = localStorage.getItem(CHAVE);
    if (texto) {
      return JSON.parse(texto);
    }
  } catch {
    return {};
  }
  return {};
}

export function detalhesCompletosFuncionario(funcionario: any) {
  let base: any = detalhesDoFuncionario(funcionario);
  if (funcionario.detalhes) {
    base = { ...funcionario.detalhes };
  }
  const editado = lerEdicoes()[funcionario.id];
  if (editado) {
    base.telefone = editado.telefone;
    base.email = editado.email;
    base.endereco = editado.endereco;
  }
  return base;
}

export function salvarContatoFuncionario(funcionarioId: number, contato: any) {
  const edicoes = lerEdicoes();
  edicoes[funcionarioId] = contato;
  try {
    localStorage.setItem(CHAVE, JSON.stringify(edicoes));
  } catch {
    return;
  }
}
