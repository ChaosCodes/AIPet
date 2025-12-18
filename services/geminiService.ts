
import { GoogleGenAI, Type } from "@google/genai";
import { GameStats, GameEvent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateNarrativeEvent(
  stats: GameStats,
  location: string
): Promise<GameEvent> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `你是一个宠物养成游戏的叙事引擎。
      宠物正在进行：${location}。
      当前数值：力量:${stats.STR}, 智力:${stats.INT}, 魅力:${stats.CHR}, 金钱:${stats.GOLD}, 压力:${stats.STRS}, 月份:${stats.TURN}/24。
      
      请生成一个有趣的短故事情节（中文）。
      要求：描述宠物的经历，并返回对应的数值变化。
      返回格式必须是一个JSON对象。`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: {
              type: Type.STRING,
              description: "事件描述文本",
            },
            changes: {
              type: Type.OBJECT,
              properties: {
                STR: { type: Type.INTEGER },
                INT: { type: Type.INTEGER },
                CHR: { type: Type.INTEGER },
                GOLD: { type: Type.INTEGER },
                STRS: { type: Type.INTEGER },
              },
            },
          },
          required: ["text", "changes"],
        },
      },
    });

    const result = JSON.parse(response.text || "{}");
    return {
      location,
      text: result.text || "发生了一些神秘的事情...",
      changes: result.changes || {}
    };
  } catch (error) {
    console.error("Gemini API Error, falling back to mock:", error);
    throw error;
  }
}
