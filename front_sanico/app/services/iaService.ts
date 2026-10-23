import { testarGemini } from "../testeGemini";

export async function enviarParaIA(
  pergunta: string,
  historico: { tipo: string; texto: string }[],
  atualizarResposta: (texto: string) => void
) {
  await testarGemini(
    pergunta,
    historico,
    atualizarResposta
  );
}