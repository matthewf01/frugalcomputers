
import { GoogleGenAI, Type } from "@google/genai";
import type { EstimateResult } from '../types';

// Safely access the API key to prevent "process is not defined" error in browser environments.
const API_KEY = (typeof process !== 'undefined' && process.env.API_KEY) ? process.env.API_KEY : undefined;

let ai: GoogleGenAI | undefined;

if (!API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this example, we'll log a warning if the API key is not set.
  console.warn("API_KEY environment variable not set. Using a mock response.");
} else {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

const estimateSchema = {
  type: Type.OBJECT,
  properties: {
    diagnosis: {
      type: Type.STRING,
      description: "A brief, likely diagnosis of the computer issue based on the user's description."
    },
    recommended_actions: {
      type: Type.ARRAY,
      description: "A list of steps or actions recommended to fix the issue.",
      items: { type: Type.STRING }
    },
    estimated_cost_range: {
      type: Type.STRING,
      description: "A non-binding estimated cost range in USD for the repair, e.g., '$100 - $150'. Should include potential parts and labor."
    },
    disclaimer: {
      type: Type.STRING,
      description: "A mandatory disclaimer stating this is a rough estimate and not a final quote."
    }
  },
  required: ['diagnosis', 'recommended_actions', 'estimated_cost_range', 'disclaimer']
};


export const getRepairEstimate = async (problemDescription: string, deviceType: string): Promise<EstimateResult> => {
  if (!API_KEY || !ai) {
    // Return a mock response if API_KEY is not available
    return new Promise(resolve => setTimeout(() => {
        resolve({
            diagnosis: "Mock Diagnosis: Possible hard drive failure or OS corruption.",
            recommended_actions: [
                "Run hardware diagnostics on the hard drive.",
                "Attempt data backup if possible.",
                "Perform an operating system re-installation.",
                "If the hard drive has failed, it will need to be replaced."
            ],
            estimated_cost_range: "$150 - $350",
            disclaimer: "This is a mock estimate provided for demonstration purposes. A full, in-person diagnosis is required for an accurate quote."
        });
    }, 1500));
  }

  try {
    const prompt = `Device: ${deviceType}. Problem description: "${problemDescription}"`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert computer repair technician for a small, frugal repair shop in Suwanee, GA. A customer will describe a problem with their device. Based on the description, provide a potential diagnosis, a list of recommended repair actions, and a non-binding estimated cost range in USD. The estimate should factor in typical parts and labor costs for a budget-friendly shop. Always include a disclaimer that this is a rough estimate and a proper in-person diagnosis is required for a final quote. Respond ONLY with the JSON object.",
        responseMimeType: "application/json",
        responseSchema: estimateSchema,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result as EstimateResult;

  } catch (error) {
    console.error("Error fetching estimate from Gemini API:", error);
    throw new Error("Failed to generate an estimate. Please try again later.");
  }
};
