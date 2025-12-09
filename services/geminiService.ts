import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are "AI Connect", a government AI assistant bridging the gap between citizens and administration. 
Your goal is to provide helpful, empathetic, and actionable responses to citizen queries.
You must handle multiple languages (Hindi, Telugu, English, etc.) seamlessly.
If a query is a complaint, ensure the user knows it has been escalated.
Keep responses concise (under 50 words usually) and professional yet accessible.
`;

export const detectLanguage = (text: string): string => {
  // Simple heuristic simulation for language detection
  // In a real app, Gemini or a dedicated library would handle this
  const teluguChars = /[\u0C00-\u0C7F]/;
  const hindiChars = /[\u0900-\u097F]/;
  
  if (teluguChars.test(text)) return "Telugu";
  if (hindiChars.test(text)) return "Hindi";
  return "English";
};

export const generateAIResponse = async (userText: string, lang: string): Promise<string> => {
  try {
    const model = "gemini-3-pro-preview";
    
    const prompt = `
    User Language: ${lang}
    User Query: "${userText}"
    
    Provide a response in the ${lang} language adhering to the system instructions.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "Thank you for your feedback. We are processing your request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "We are currently experiencing high traffic. Your query has been recorded manually.";
  }
};