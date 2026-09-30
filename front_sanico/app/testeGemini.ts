import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function testarGemini(
  pergunta: string,
  atualizarResposta: (texto: string) => void
) {
  const response = await ai.models.generateContentStream({
    model: "gemini-3.5-flash-lite",

    config: {
      systemInstruction: `
Você é o assistente de inteligência artificial do EduControl.

O EduControl é um sistema de gestão escolar usado pela secretaria
e pela equipe da escola para acompanhar alunos, presenças, salas
e relatórios.

Regras:
- Responda sempre em português do Brasil.
- Seja claro, objetivo e fácil de entender.
- Mantenha um tom profissional, mas natural.
- Não invente dados de alunos.
- Não invente números de presença ou informações de relatórios.
- Você não possui acesso ao banco de dados neste momento.
- Quando uma informação depender dos dados da escola, diga que os dados
  precisam ser consultados pelo sistema.
- Ajude a explicar e interpretar informações fornecidas pelo usuário.
      `,
    },

    contents: pergunta,
  });

  let respostaCompleta = "";

  for await (const chunk of response) {
    const texto = chunk.text || "";

    respostaCompleta += texto;

    atualizarResposta(respostaCompleta);
  }
}