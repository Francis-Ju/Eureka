
import { AudienceData } from './types';

export const BRANDS = ["L'Oréal Paris", "Lancôme", "YSL Beauty", "Kiehl's", "La Roche-Posay", "SkinCeuticals"];

export const INITIAL_AUDIENCE_DATA: AudienceData = {
  crm: [
    { id: 'membership', name: 'Membership Tier', tags: ['General Member', 'Silver Card', 'Gold Card', 'Platinum Card'] },
    { id: 'lifecycle', name: 'User Lifecycle', tags: ['New Customer', 'Active VIP', 'Dormant (30+ days)', 'Churn Risk'] },
    { id: 'demographics', name: 'Demographics', tags: ['Gen Z (18-25)', 'Young Professional (26-35)', 'Mature (36+)', 'Tier 1 City'] },
    { id: 'spending', name: 'Spending Power', tags: ['High Spender', 'Promotion Sensitive', 'Luxury Buyer'] }
  ],
  wecom: [
    { id: 'skin', name: 'Skin Type', tags: ['Normal Skin', 'Dry Skin', 'Oily Skin', 'Combination Skin', 'Sensitive Skin'] },
    { id: 'role', name: 'Occupation', tags: ['Student', 'Office Worker', 'Freelancer', 'Mom'] },
    { id: 'concerns', name: 'Skin Concerns', tags: ['Acne', 'Wrinkles', 'Dullness', 'Dehydration'] }
  ]
};

export const KB_FOLDERS = [
  "Brand Guidelines 2025",
  "Campaign Assets Q1",
  "Scientific Communication",
  "KOL Briefs"
];

export const MOCK_PRODUCTS = [
  { 
    id: 'p1', 
    name: 'Revitalift Filler Eye Cream (Purple Iron)', 
    data: {
      ingredients: 'Pro-Xylane Pro + Hyaluronic Acid',
      benefits: 'Fade Lines + Plump & Moisturize',
      usage: 'Massage around eyes + nasolabial folds'
    }
  },
  { 
    id: 'p2', 
    name: 'Youth Code Serum', 
    data: {
      ingredients: 'Bifida Ferment Lysate + Papain',
      benefits: 'Strengthen Barrier + Boost Absorption',
      usage: 'Use after cleansing, before toner'
    }
  },
  { 
    id: 'p3', 
    name: 'Glycolic Bright Serum', 
    data: {
      ingredients: 'Glycolic Acid + Niacinamide',
      benefits: 'Instant Glow + Reduce Dark Spots',
      usage: 'Daily morning/night usage'
    }
  }
];

export const DICTIONARY = {
  zh: {
    appName: "L'Oréal Eureka",
    nav: { generation: "智能创作", knowledge: "知识中枢", diagnosis: "全域诊断", analysis: "选题分析", management: "系统配置" },
    gen: {
      title: "智能文案创作",
      sections: { brand: "品牌基因", strategy: "内容策略", audience: "动态人群", kb: "知识库调用", config: "生成配置" },
      fields: { 
        brand: "所属品牌", baPersona: "BA 属性", scenario: "沟通场景", style: "沟通风格", 
        mimicry: "AI 风格仿写", sellingPoints: "核心卖点", 
        knowledgeSelector: "点击选择 CRM / 企微标签...",
        kbFolder: "品牌资产文件夹", kbProduct: "关联产品",
        length: "篇幅", extras: "附加元素", compliance: "合规与边界"
      },
      actions: { generate: "立即生成", generating: "Eureka 运算中...", refine: "迭代优化", debug: "API 调试" },
      placeholders: {
        customTag: "自定义标签 (回车添加)...",
        sellingPoints: "输入产品功效、活动机制或营销主题...",
        mimicry: "粘贴优秀话术让 AI 模仿风格...",
        refine: "输入修改意见 (如: 更活泼一点)..."
      }
    }
  },
  en: {
    appName: "L'Oréal Eureka",
    nav: { generation: "Eureka Create", knowledge: "Knowledge Base", diagnosis: "Diagnosis", analysis: "Trend Analysis", management: "Settings" },
    gen: {
      title: "Smart Copywriting",
      sections: { brand: "Brand DNA", strategy: "Content Strategy", audience: "Dynamic Audience", kb: "Knowledge Base", config: "Config" },
      fields: { 
        brand: "Brand", baPersona: "BA Persona", scenario: "Scenario", style: "Style", 
        mimicry: "AI Style Mimicry", sellingPoints: "Core Selling Points", 
        knowledgeSelector: "Select CRM / WeCom tags...",
        kbFolder: "Asset Folder", kbProduct: "Link Product",
        length: "Length", extras: "Extras", compliance: "Compliance"
      },
      actions: { generate: "Generate", generating: "Processing...", refine: "Refine", debug: "Debug API" },
      placeholders: {
        customTag: "Custom tags (Enter to add)...",
        sellingPoints: "Enter benefits, campaign theme...",
        mimicry: "Paste text to mimic style...",
        refine: "Enter feedback..."
      }
    }
  }
};
