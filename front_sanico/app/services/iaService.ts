import { testarGemini } from "../testeGemini";

export async function enviarParaIA(
  pergunta: string,
  historico: { tipo: string; texto: string }[],
  atualizarResposta: (texto: string) => void,
  perfil?: string | null
) {
  await testarGemini(
    pergunta,
    historico,
    atualizarResposta,
    perfil
  );
}