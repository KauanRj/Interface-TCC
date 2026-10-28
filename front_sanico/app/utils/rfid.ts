import { alunosDeHoje, lerRegistros, salvarRegistros, horaAgora } from "~/utils/registroHoje";
import { textoDaData } from "~/utils/filtros";

const CHAVE_ATIVO = "educontrol:rfid-ativo";
const CHAVE_ULTIMA = "educontrol:rfid-ultima";

export const LIMITE_ATRASO = "07:15";

export function leitorAtivo() {
  try {
    return localStorage.getItem(CHAVE_ATIVO) !== "nao";
  } catch {
    return true;
  }
}

export function definirLeitorAtivo(ativo: boolean) {
  try {
    localStorage.setItem(CHAVE_ATIVO, ativo ? "sim" : "nao");
  } catch {
    return;
  }
}

export function ultimaLeitura() {
  try {
    const texto = localStorage.getItem(CHAVE_ULTIMA);
    if (texto) {
      const dados = JSON.parse(texto);
      if (dados.data === textoDaData(new Date())) {
        return dados;
      }
    }
  } catch {
    return null;
  }
  return null;
}

export function lerCartao(cartao: string, hora: string = horaAgora()) {
  const numero = cartao.trim();

  if (leitorAtivo() === false) {
    return { ok: false, mensagem: "O leitor está inativo. Ative o leitor para registrar presenças." };
  }
  if (numero === "") {
    return { ok: false, mensagem: "Informe o número do cartão." };
  }

  const alunos = alunosDeHoje();
  let aluno: any = null;
  for (let i = 0; i < alunos.length; i++) {
    if (alunos[i].cartao === numero) {
      aluno = alunos[i];
    }
  }
  if (aluno === null) {
    return { ok: false, mensagem: "Cartão " + numero + " não está cadastrado." };
  }
  if (aluno.statusHoje !== "Pendente") {
    return {
      ok: false,
      mensagem: aluno.nome + " já tem presença registrada hoje (" + aluno.statusHoje + ").",
    };
  }

  let status = "Presente";
  if (hora > LIMITE_ATRASO) {
    status = "Atrasado";
  }

  const registros: any = lerRegistros();
  registros[aluno.id] = { status: status, entrada: hora };
  salvarRegistros(registros);

  const leitura = { data: textoDaData(new Date()), nome: aluno.nome, status: status, hora: hora, cartao: numero };
  try {
    localStorage.setItem(CHAVE_ULTIMA, JSON.stringify(leitura));
  } catch {
    return { ok: true, mensagem: aluno.nome + ": " + status + " às " + hora + ".", leitura: leitura };
  }
  return { ok: true, mensagem: aluno.nome + ": " + status + " às " + hora + ".", leitura: leitura };
}
