import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserProfile, M7Plan } from "../types";

// Schema definition for Structured Output
const m7PlanSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    recommendedProducts: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          brand: { type: Type.STRING },
          type: { type: Type.STRING },
          reason: { type: Type.STRING },
          keyIngredients: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["name", "brand", "type", "reason", "keyIngredients"],
      },
    },
    skincareRoutine: {
      type: Type.OBJECT,
      properties: {
        morning: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              stepName: { type: Type.STRING },
              description: { type: Type.STRING },
              products: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["stepName", "description", "products"],
          },
        },
        evening: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              stepName: { type: Type.STRING },
              description: { type: Type.STRING },
              products: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["stepName", "description", "products"],
          },
        },
      },
      required: ["morning", "evening"],
    },
    facialArchitecture: {
      type: Type.OBJECT,
      properties: {
        analysis: { type: Type.STRING, description: "Analysis of how to improve facial definition (mewing, jawline, etc)" },
        exercises: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              frequency: { type: Type.STRING },
            },
            required: ["name", "description", "frequency"],
          },
        },
      },
      required: ["analysis", "exercises"],
    },
    physiqueStrategy: {
      type: Type.OBJECT,
      properties: {
        analysis: { type: Type.STRING },
        tips: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              category: { type: Type.STRING, enum: ["Treino", "Nutrição", "Lifestyle"] },
              advice: { type: Type.STRING },
            },
            required: ["category", "advice"],
          },
        },
      },
      required: ["analysis", "tips"],
    },
  },
  required: ["recommendedProducts", "skincareRoutine", "facialArchitecture", "physiqueStrategy"],
};

export const generateM7Plan = async (profile: UserProfile): Promise<M7Plan> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Atue como M7, uma Inteligência Artificial de elite focada em "Aesthetic Intelligence" (Estética, Skincare e Desenvolvimento Físico).
    
    Perfil do Usuário:
    - Nome: ${profile.name}
    - Idade: ${profile.age}
    - Gênero: ${profile.gender}
    - Tipo de Pele: ${profile.skinType}
    - Preocupações Principais: ${profile.concerns.join(", ")}
    - Objetivos Estéticos (Rosto/Corpo): ${profile.goals.join(", ")}
    - Preferências: ${profile.preferences}

    Gere um plano personalizado completo em JSON seguindo o schema.
    
    Diretrizes:
    1. Skincare: Sugira produtos reais e de alta qualidade (considere marcas acessíveis se não especificado, ou marcas de luxo se o perfil sugerir). Explique o "Porquê" cientificamente.
    2. Arquitetura Facial: Inclua dicas para definir o rosto (ex: Gua Sha, Mewing, massagem facial, redução de inchaço) baseado nos objetivos.
    3. Físico: Dê dicas estratégicas de treino e nutrição alinhadas aos objetivos (ex: secar, ganhar massa, postura).
    
    Mantenha o tom: Profissional, futurista, direto e encorajador.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: m7PlanSchema,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as M7Plan;
  } catch (error) {
    console.error("Error generating M7 Plan:", error);
    throw error;
  }
};