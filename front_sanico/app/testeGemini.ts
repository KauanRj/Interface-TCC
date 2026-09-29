import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function testarGemini(pergunta: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: pergunta,
  });

  return response.text || "";
}