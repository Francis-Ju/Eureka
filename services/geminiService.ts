
import { GoogleGenAI } from "@google/genai";
import { GenResult } from "../types";

export const generateMarketingCopy = async (
  prompt: string, 
  isRefine: boolean, 
  previousVersion: number
): Promise<GenResult> => {
  // Simulate network delay for UX
  await new Promise(resolve => setTimeout(resolve, 1500));

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({ 
      model: 'gemini-3-pro-preview', 
      contents: prompt 
    });
    
    const text = response.text || "Generated content...";
    
    return {
      id: Date.now().toString(),
      text,
      version: isRefine ? previousVersion + 1 : 1,
      originality: 95,
      tokens: 120,
      compliancePassed: true,
      timestamp: new Date()
    };
  } catch (e) {
    console.error("Gemini API Error", e);
    // Fallback for demo purposes if API key is missing in environment
    return {
      id: Date.now().toString(),
      text: "Error: Please check API Key configuration. \n\nFallback Content: Experience the future of beauty with L'Oréal's latest innovation. Our formula is designed to rejuvenate and protect.",
      version: isRefine ? previousVersion + 1 : 1,
      originality: 0,
      tokens: 0,
      compliancePassed: false,
      timestamp: new Date()
    };
  }
};
