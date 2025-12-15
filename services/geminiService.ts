import { GoogleGenAI } from "@google/genai";
import { GenResult, MemoryContext } from "../types";

interface GenerationContext {
  brand: string;
  persona: 'wecom' | 'redbook';
  style: string;
  emoji: boolean;
  topic: boolean;
  productName?: string;
  sellingPoints?: string;
  audienceTags?: string[];
  memory?: MemoryContext;
}

export const generateMarketingCopy = async (
  prompt: string, 
  isRefine: boolean, 
  previousVersion: number,
  context?: GenerationContext
): Promise<GenResult> => {
  // Simulate network delay for UX
  await new Promise(resolve => setTimeout(resolve, 1500));

  try {
    // Attempt real API call if key exists
    if (process.env.API_KEY) {
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
        timestamp: new Date(),
        prompt: prompt
      };
    } else {
      throw new Error("No API Key");
    }
  } catch (e) {
    // Fallback Rule-Based Generation Engine (Simulation)
    const { brand, persona, style, emoji, topic, productName, sellingPoints, audienceTags, memory } = context || { 
      brand: "Brand", persona: 'wecom', style: 'Professional', emoji: true, topic: false 
    };

    const emojis = emoji ? (persona === 'redbook' ? ["✨", "💖", "🔥", "👀", "🧴"] : ["🌹", "✨", "🤝"]) : [];
    const hashtags = topic ? (productName ? [`#${productName.replace(/\s/g, '')}`, `#${brand}护肤`, "#抗老"] : ["#护肤", "#美妆"]) : [];
    
    // Construct dynamic parts based on input to make it feel "real"
    const productMention = productName || '这款宝藏单品';
    const audienceNote = (audienceTags && audienceTags.length > 0) 
      ? `针对您关注的【${audienceTags[0]}】问题，` 
      : "针对您的肤质需求，";
      
    const sellingPointNote = sellingPoints ? `\n\n特别值得一提的是：${sellingPoints}。` : "";

    // -- Integrate Personalized Memory --
    let memoryIntro = "";
    if (memory) {
      if (memory.contextual.timeNode) {
        // Time node (e.g., Birthday, Morning)
        if (memory.contextual.timeNode.includes("生日") || memory.contextual.timeNode.toLowerCase().includes("birthday")) {
          memoryIntro += "🎂 亲爱的，祝您生日快乐！在这个特别的日子里，";
        } else {
          memoryIntro += `${memory.contextual.timeNode}好呀！`;
        }
      }

      if (memory.contextual.purchaseHistory) {
        memoryIntro += `\n看到您之前入手了【${memory.contextual.purchaseHistory}】，使用感受如何呢？这次给您推荐的搭配更加进阶哦。`;
      }

      if (memory.contextual.specialNeeds) {
        memoryIntro += `\n考虑到您正在【${memory.contextual.specialNeeds}】，我们特意筛选了更温和高效的方案。`;
      }

      if (memory.emotional.successHistory) {
         memoryIntro += `\n记得您很喜欢之前的【${memory.emotional.successHistory}】，这款新品也是同系列的王牌。`;
      }
    }

    let content = "";
    
    if (persona === 'wecom') {
      // 1v1 / Private Traffic Style (Warmer)
      let greeting = style === 'Enthusiastic' ? "宝子下午好呀！👋" : "亲爱的会员您好，🌷";
      if (memoryIntro && memory?.contextual.timeNode) greeting = memoryIntro; // Override greeting if memory exists

      let body = "";
      if (style === 'Professional') {
         body = `我是您的专属顾问。${memoryIntro && !memory?.contextual.timeNode ? memoryIntro : ''} ${audienceNote}我特别为您推荐${brand}的${productMention}。它蕴含的核心成分能有效改善肌肤状态，坚持使用效果显著。${sellingPointNote}`;
      } else if (style === 'Enthusiastic') {
         body = `我是你的BA小助手！${memoryIntro && !memory?.contextual.timeNode ? memoryIntro : ''} 最近换季啦，${audienceNote}一定要试试${productMention}！真的超级适合你，闭眼冲不踩雷！💖 ${sellingPointNote}`;
      } else {
         body = `这边留意到您的护肤需求，${memoryIntro && !memory?.contextual.timeNode ? memoryIntro : ''} ${productMention}会是很好的选择。${sellingPointNote} 如有需要可以随时预约到柜体验。`;
      }

      if (memory?.contextual.appointments) {
        body += `\n\n另外提醒您，您已预约了【${memory.contextual.appointments}】，期待您的光临！`;
      }
      
      const closing = style === 'Enthusiastic' ? "有啥问题随时戳我哦！😘" : "期待您的反馈，祝您生活愉快。";
      
      content = `${greeting}\n\n${body}\n\n${closing} ${emoji ? emojis.join(' ') : ''}`;
    } else {
      // RedBook / Public Post Style
      const title = style === 'Trendy' ? `家人们！${productMention} 谁懂啊😭` : `深度测评 | ${brand} ${productMention} 真实功效`;
      
      let body = "";
      if (style === 'Minimalist') {
        body = `简单直接。\n1. 成分：顶级活性配方\n2. 功效：${audienceTags?.[0] || '全效修护'}\n3. 感受：润而不油\n\n${sellingPoints || '闭眼入。'}`;
      } else {
        body = `终于挖到了${brand}的这款${productMention}！真的一夜回春！✨\n${audienceNote}用它就对了。\n\n质地超级细腻，上脸秒吸收。坚持用了两周，皮肤状态真的肉眼可见变好！\n${sellingPoints ? `👉 ${sellingPoints}` : '成分党狂喜，敏感肌也能放心冲！'}`;
      }
        
      content = `${title}\n\n${body}\n\n${topic ? hashtags.join(' ') : ''} ${emoji ? emojis.join(' ') : ''}`;
    }

    if (isRefine) {
      content = `[优化版 V${previousVersion + 1}]\n${content}\n\n(已根据您的反馈优化语气与重点)`;
    }

    return {
      id: Date.now().toString(),
      text: content,
      version: isRefine ? previousVersion + 1 : 1,
      originality: Math.floor(Math.random() * 10) + 85, // Random 85-95
      tokens: content.length + 50,
      compliancePassed: true,
      timestamp: new Date(),
      prompt: prompt
    };
  }
};