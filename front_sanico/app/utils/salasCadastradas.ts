import { lerLista, salvarLista } from "~/utils/armazenamento";

const CHAVE = "educontrol:salas-novas";

export function lerSalasNovas() {
  return lerLista(CHAVE);
}

export function cadastrarSala(dados: any) {
  const sala = {
    nome: dados.nome.trim(),
    capacidade: String(parseInt(dados.capacidade, 10)),
    andar: dados.andar,
    turma: dados.turma,
    cor: dados.status,
  };
  const novas = lerSalasNovas();
  novas.push(sala);
  if (salvarLista(CHAVE, novas) === false) {
    return null;
  }
  return sala;
}
