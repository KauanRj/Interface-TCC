import { lerLista, salvarLista } from "~/utils/armazenamento";
import { apenasDigitos } from "~/utils/validacoes";

const CHAVE = "educontrol:funcionarios-novos";

export function lerFuncionariosNovos() {
  return lerLista(CHAVE);
}

export function cadastrarFuncionario(dados: any, proximoId: number) {
  let fimContrato = "";
  if (dados.vinculo === "Contratado") {
    fimContrato = dados.fimContrato;
  }

  const funcionario = {
    id: proximoId,
    nome: dados.nome.trim(),
    cargo: dados.cargo,
    setor: dados.setor,
    status: "Ativo",
    vinculo: dados.vinculo,
    detalhes: {
      matricula: "F" + String(proximoId).padStart(2, "0") + String(Math.floor(Math.random() * 900) + 100),
      dataNascimento: dados.dataNascimento,
      cpf: dados.cpf,
      dataAdmissao: dados.dataAdmissao,
      fimContrato: fimContrato,
      jornada: dados.jornada,
      telefone: apenasDigitos(dados.telefone),
      email: dados.email.trim(),
      endereco: dados.endereco.trim(),
    },
  };

  const novos = lerFuncionariosNovos();
  novos.push(funcionario);
  if (salvarLista(CHAVE, novos) === false) {
    return null;
  }
  return funcionario;
}
