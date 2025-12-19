
import { GoogleGenAI, Type } from "@google/genai";
import { GameStats, TurnResult, LifeStage, TurnPlan } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const RANDOM_INCIDENTS = [
  { text: "系统遭遇黑客攻击，你的数字资产减半！", gold: -0.5, stress: 20, label: "黑客入侵" },
  { text: "你在数字垃圾场发现了一枚远古比特币。", gold: 1000, stress: -5, label: "意外财富" },
  { text: "由于过度疲劳，你触发了神经元过热警告。", str: -10, stress: 30, label: "系统过热" },
  { text: "你的代码片段被选为行业标准，声望暴涨。", chr: 20, int: 10, label: "技术破圈" },
  { text: "全球算力危机爆发，所有维护费用翻倍。", gold: -300, stress: 15, label: "算力危机" },
  { text: "你被抽中参与星际移民实验（数字版）。", chr: 15, int: 15, label: "先行者" },
];

const MOCK_TEMPLATES = {
  INFANCY: [
    "你在摇篮中感受着{s}。世界在你眼中呈现出破碎而迷人的光影，你的神经网络正在加速构建。",
    "通过对{s}的深度感知，你第一次意识到了‘自我’与‘外界’的边界。",
    "那些关于{s}的原始记忆，将在你未来的潜意识里埋下不可磨灭的种子。"
  ],
  SCHOOL: [
    "这个月你沉浸在{s}的海洋里。虽然卷子堆积如山，但你似乎掌握了一些逻辑的窍门。",
    "你在{s}课上展现出的天赋惊动了老师，那种智力上的优越感让你第一次尝到了权力的滋味。",
    "为了兼顾{s}，你不得不牺牲掉几乎所有的午休时间，黑眼圈成了你的勋章。"
  ],
  WORK: {
    SLACK: "你选择了“{p}”项目。在执行过程中你决定摸鱼平衡，深谙‘薪水是发给准时坐在工位上的人，而不是发给拼命的人’这一职场真理。",
    GRIND: "在“{p}”项目中，你开启了疯狂内卷模式。凌晨三点的咖啡虽然苦涩，但看着进度条反超对手，你感到了一种扭曲的快感。",
    INNOVATE: "面对“{p}”，你选择了思维破圈。你用一个连老板都没听过的维度解决了陈年旧疾，全公司都在私下议论你的背景。"
  }
};

export function generateMockTurnNarrative(
  stats: GameStats,
  plan: TurnPlan,
  stage: LifeStage
): TurnResult {
  let description = "";
  let socialMedia = "";
  const changes: Partial<GameStats> = {
    INT: Math.floor(Math.random() * 5) + 3,
    STR: Math.floor(Math.random() * 3) + 1,
    CHR: Math.floor(Math.random() * 4) + 2,
    STRS: Math.floor(Math.random() * 8)
  };

  const getRandom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

  // 25% 概率触发随机事件
  const isFate = Math.random() < 0.25;
  let fateDetails = null;

  if (stage === 'INFANCY') {
    const sText = plan.infancySensations.join('与') || '虚无';
    description = getRandom(MOCK_TEMPLATES.INFANCY).replace('{s}', sText);
    socialMedia = "人类幼崽的第一步，是从学会感知痛苦与愉悦开始的。";
  } else if (stage === 'SCHOOL') {
    const sText = plan.schoolSubjects.join('、') || '发呆';
    description = getRandom(MOCK_TEMPLATES.SCHOOL).replace('{s}', sText);
    socialMedia = "学历不是终点，但没有学历，你可能连起跑线在哪都看不见。";
  } else if (stage === 'WORK' && plan.workProject) {
    description = MOCK_TEMPLATES.WORK[plan.workProject.style]
      .replace('{p}', plan.workProject.label);
    socialMedia = "所谓职业道德，就是把灵魂按月租借给资本家的过程。";
    // Ensure project rewards are integers
    changes.GOLD = Math.floor(plan.workProject.intensity * 150 + (Math.random() * 50));
  }

  // 注入命运干扰
  if (isFate) {
    fateDetails = getRandom(RANDOM_INCIDENTS);
    description = `[${fateDetails.label}] ${fateDetails.text} \n\n ${description}`;
    if (fateDetails.gold !== undefined) {
       // Ensure gold changes are always integers, especially for multipliers like -0.5
       const goldImpact = fateDetails.gold < 0 && fateDetails.gold > -1
         ? Math.floor(stats.GOLD * fateDetails.gold) 
         : Math.floor(fateDetails.gold);
       changes.GOLD = (changes.GOLD || 0) + goldImpact;
    }
    if (fateDetails.stress) changes.STRS = (changes.STRS || 0) + fateDetails.stress;
    if (fateDetails.int) changes.INT = (changes.INT || 0) + fateDetails.int;
    if (fateDetails.str) changes.STR = (changes.STR || 0) + fateDetails.str;
    if (fateDetails.chr) changes.CHR = (changes.CHR || 0) + fateDetails.chr;
  }

  return {
    text: description,
    socialMedia: isFate ? `「命运扰动：${fateDetails?.label}」` : socialMedia,
    changes: changes
  };
}

export async function generateTurnNarrative(
  stats: GameStats,
  plan: TurnPlan,
  stage: LifeStage
): Promise<TurnResult> {
  const systemPrompt = `你是一个具有深刻洞察力和讽刺文笔的模拟经营叙事引擎。
  当前阶段：${stage} (月度 M${stats.TURN})。
  风险偏好：${plan.riskAppetite}
  输入：${JSON.stringify(plan)}

  ## 特殊指令：熵值注入
  请在生成叙事时，有一定概率注入“突发外部干扰”。比如：
  - 宏观经济波动导致资产缩水或暴增。
  - 意外的人际关系冲突或奇遇。
  - 身体/系统的突发状况。
  
  如果注入了此类干扰，请在 text 开头用 [命运干预] 标出。
  
  要求：
  1. 文笔犀利，逻辑自洽，返回JSON格式。
  2. 包含 text, socialMedia, 以及数值变动 changes。
  3. **非常重要**：changes 中的 GOLD (Credit) 必须是整数，严禁出现小数。`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: systemPrompt,
      config: { 
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING },
            socialMedia: { type: Type.STRING },
            changes: {
              type: Type.OBJECT,
              properties: {
                STR: { type: Type.INTEGER },
                INT: { type: Type.INTEGER },
                CHR: { type: Type.INTEGER },
                GOLD: { type: Type.INTEGER },
                STRS: { type: Type.INTEGER },
              }
            }
          }
        }
      },
    });
    const parsed = JSON.parse(response.text || "{}");
    // Extra safety: force integer on GOLD if AI hallucinates float
    if (parsed.changes && typeof parsed.changes.GOLD === 'number') {
      parsed.changes.GOLD = Math.floor(parsed.changes.GOLD);
    }
    return parsed;
  } catch (error) {
    return generateMockTurnNarrative(stats, plan, stage);
  }
}
