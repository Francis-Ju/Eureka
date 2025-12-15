import React, { useState, useEffect, useMemo } from 'react';
import { 
  Globe, Layers, MessageSquare, Flame, Users, Search, Edit3, 
  RefreshCw, Sparkles, CheckCircle, Copy, Database, Sliders, Terminal, Eye,
  BrainCircuit, Clock, Heart, AlertTriangle, History, Calendar, ShoppingBag,
  ChevronRight, ChevronDown, List
} from 'lucide-react';
import { Language, AudienceData, GenResult, User, MemoryContext } from '../types';
import { DICTIONARY, KB_FOLDERS, MOCK_PRODUCTS, BRANDS } from '../constants';
import { generateMarketingCopy } from '../services/geminiService';
import { SectionHeader, TechSelect, InputLabel, RadioCard, Badge, TechInput, TechSwitch, CodeViewer } from './UIComponents';
import { AudienceSelectionModal } from './AudienceSelectionModal';

// --- Sub-components defined outside to maintain focus stability ---

const PersonalizedMemorySection = ({ 
  memory, 
  updateMemory, 
  knowledgeTags, 
  setKnowledgeTags, 
  customTags, 
  setCustomTags, 
  tagInput, 
  setTagInput, 
  setIsModalOpen 
}: {
  memory: MemoryContext,
  updateMemory: (section: keyof MemoryContext, field: string, value: string) => void,
  knowledgeTags: string[],
  setKnowledgeTags: React.Dispatch<React.SetStateAction<string[]>>,
  customTags: string[],
  setCustomTags: React.Dispatch<React.SetStateAction<string[]>>,
  tagInput: string,
  setTagInput: (v: string) => void,
  setIsModalOpen: (v: boolean) => void
}) => (
  <div className="space-y-4">
    <SectionHeader icon={BrainCircuit} title="个性化记忆 (Personalized Memory)" />
    
    {/* 1. Basic Memory (Replaces Dynamic Audience) */}
    <div className="space-y-2">
      <h4 className="flex items-center gap-2 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
        <Users size={10} /> 基础记忆 (Basic)
      </h4>
      <div>
        <div onClick={() => setIsModalOpen(true)} className="w-full min-h-[34px] bg-[#0B0F19] border border-eureka-border rounded-md px-2 py-1.5 cursor-pointer hover:border-eureka-primary/50 transition-all group relative flex items-center mb-2">
          {knowledgeTags.length === 0 ? (
            <div className="flex items-center text-slate-500 text-[10px]"><Search size={12} className="mr-2 opacity-50" /> 选择人群标签...</div>
          ) : (
            <div className="flex flex-wrap gap-1">
              {knowledgeTags.map(tag => <Badge key={tag} color="active" onRemove={() => setKnowledgeTags(prev => prev.filter(t => t !== tag))}>{tag}</Badge>)}
            </div>
          )}
          <div className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity"><Edit3 size={12} className="text-slate-400" /></div>
        </div>
        
        <TechInput 
          value={tagInput} 
          onChange={setTagInput} 
          onEnter={() => { if(tagInput) { setCustomTags(p => [...p, tagInput]); setTagInput(""); } }} 
          placeholder="自定义标签 (回车添加)..." 
        />
        {customTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
             {customTags.map(tag => <Badge key={tag} onRemove={() => setCustomTags(p => p.filter(t => t !== tag))}>{tag}</Badge>)}
          </div>
        )}
      </div>
    </div>

    {/* 2. Contextual Memory */}
    <div className="space-y-2 mt-4">
      <h4 className="flex items-center gap-2 text-[10px] font-bold text-purple-400 uppercase tracking-widest">
        <Clock size={10} /> 情景记忆 (Contextual)
      </h4>
      <div className="space-y-2">
        <TechInput 
          value={memory.contextual.timeNode} 
          onChange={(v) => updateMemory('contextual', 'timeNode', v)} 
          placeholder="时间节点 (如: 生日, 早晨)" 
          icon={Calendar}
        />
        <TechInput 
          value={memory.contextual.specialNeeds} 
          onChange={(v) => updateMemory('contextual', 'specialNeeds', v)} 
          placeholder="特殊需求 (如: 备婚, 孕期)" 
          icon={AlertTriangle}
        />
        <TechInput 
          value={memory.contextual.purchaseHistory} 
          onChange={(v) => updateMemory('contextual', 'purchaseHistory', v)} 
          placeholder="购买历史 (如: 购买了紫熨斗)" 
          icon={ShoppingBag}
        />
      </div>
    </div>

    {/* 3. Emotional Memory */}
    <div className="space-y-2 mt-4">
      <h4 className="flex items-center gap-2 text-[10px] font-bold text-pink-400 uppercase tracking-widest">
        <Heart size={10} /> 情感记忆 (Emotional)
      </h4>
      <div className="space-y-2">
        <TechInput 
          value={memory.emotional.communicationPref} 
          onChange={(v) => updateMemory('emotional', 'communicationPref', v)} 
          placeholder="沟通偏好 (如: 喜欢闲聊)" 
          icon={MessageSquare}
        />
        <TechInput 
          value={memory.emotional.sensitiveTopics} 
          onChange={(v) => updateMemory('emotional', 'sensitiveTopics', v)} 
          placeholder="敏感话题 (如: 价格敏感)" 
          icon={AlertTriangle}
        />
        <TechInput 
          value={memory.emotional.successHistory} 
          onChange={(v) => updateMemory('emotional', 'successHistory', v)} 
          placeholder="成功经历 (如: 种草过 VC)" 
          icon={History}
        />
      </div>
    </div>
  </div>
);

// --- Real-time Prompt Preview Component (Highlighted) ---
const PromptPreviewPanel = ({ promptText }: { promptText: string }) => {
  return (
    <div className="border-t border-eureka-accent/30 bg-[#0B0F19] relative group z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-eureka-accent via-eureka-primary to-transparent opacity-50"></div>
      
      <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-eureka-accent/10 to-transparent">
        <div className="flex items-center gap-2">
           <div className="w-1.5 h-1.5 rounded-full bg-eureka-accent animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.8)]"></div>
           <span className="text-[10px] font-bold uppercase tracking-widest text-eureka-accent">Live Prompt 预览</span>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-[9px] text-slate-500 font-mono">Real-time Context</span>
           <Terminal size={12} className="text-slate-600" />
        </div>
      </div>
      
      <div className="px-4 pb-4">
        <div className="bg-black/40 border border-white/5 rounded-md p-3 relative overflow-hidden group-hover:border-eureka-accent/30 transition-colors">
           <p className="text-[10px] font-mono text-indigo-100/80 leading-relaxed whitespace-pre-wrap h-24 overflow-y-auto custom-scrollbar">
            {promptText}
          </p>
          <div className="absolute bottom-0 right-0 p-2 bg-gradient-to-tl from-black/80 to-transparent pointer-events-none">
             <Eye size={12} className="text-slate-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const GenerationView = ({ 
  lang, audienceData, prefilledMimicry, setPrefilledMimicry, currentUser 
}: { 
  lang: Language, audienceData: AudienceData, prefilledMimicry: string, setPrefilledMimicry: (s: string) => void, currentUser: User
}) => {
  // -- Core State --
  const [brand, setBrand] = useState(currentUser.brand);
  const [baPersona, setBaPersona] = useState<'wecom' | 'redbook'>('wecom');
  const [scenarioType, setScenarioType] = useState('lifecycle');
  const [selectedScenario, setSelectedScenario] = useState('新客欢迎 (New Customer Welcome)');
  const [commStyle, setCommStyle] = useState('专业 (Professional)');
  
  const [mimicry, setMimicry] = useState(prefilledMimicry);
  const [sellingPoints, setSellingPoints] = useState("");

  // -- Audience (Basic Memory) --
  const [knowledgeTags, setKnowledgeTags] = useState<string[]>([]);
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // -- Advanced Memory (Contextual & Emotional) --
  const [memory, setMemory] = useState<MemoryContext>({
    contextual: {
      timeNode: "",
      specialNeeds: "",
      purchaseHistory: "",
      appointments: ""
    },
    emotional: {
      communicationPref: "",
      sensitiveTopics: "",
      successHistory: ""
    }
  });

  // -- Knowledge Base --
  const [kbFolder, setKbFolder] = useState("");
  const [kbProduct, setKbProduct] = useState("");
  const selectedProductData = MOCK_PRODUCTS.find(p => p.id === kbProduct)?.data;

  // -- Config & Compliance --
  const [lengthConfig, setLengthConfig] = useState('中篇 (Medium)');
  const [extraEmoji, setExtraEmoji] = useState(true);
  const [extraTopic, setExtraTopic] = useState(false);
  const [compFilter, setCompFilter] = useState(true);
  const [compEffect, setCompEffect] = useState(true);
  const [compBrand, setCompBrand] = useState(true);

  // -- Output & UI --
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<GenResult[]>([]);
  const [activeResultIdx, setActiveResultIdx] = useState(-1);
  const [refineInput, setRefineInput] = useState("");
  const [showApiDebug, setShowApiDebug] = useState(false);
  const [showHistory, setShowHistory] = useState(true);
  
  // Prompt Editing State
  const [viewPromptId, setViewPromptId] = useState<string | null>(null);
  const [editedPrompt, setEditedPrompt] = useState("");

  useEffect(() => { if (prefilledMimicry) setMimicry(prefilledMimicry); }, [prefilledMimicry]);
  
  useEffect(() => {
    if (viewPromptId && activeResultIdx >= 0) {
      setEditedPrompt(results[activeResultIdx].prompt || "");
    }
  }, [viewPromptId, activeResultIdx, results]);

  const updateMemory = (section: keyof MemoryContext, field: string, value: string) => {
    setMemory(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // --- Real-time Prompt Construction (Memoized) ---
  const livePrompt = useMemo(() => {
    const identityContext = `You are a dedicated, empathetic Beauty Advisor (BA) for the premium brand "${brand}". 
YOUR GOAL: Build a sincere relationship with the customer. 
TONE INSTRUCTION: Be warm, human, and caring. Avoid robotic language. Use "We" and "You".
CHANNEL: "${baPersona === 'wecom' ? 'WeChat Work (Private 1v1 Chat)' : 'Xiaohongshu (RedBook)'}"`;
    
    const scenarioContext = `SCENARIO: ${selectedScenario}. 
STYLE MODE: ${commStyle}.`;
    
    const audienceList = [...knowledgeTags, ...customTags].join(', ');
    const basicMemory = audienceList ? `[BASIC MEMORY - Tags]: ${audienceList}` : '';

    const contextualMemory = `[CONTEXTUAL MEMORY]:
- Time/Occasion: ${memory.contextual.timeNode || 'General'}
- Special Needs: ${memory.contextual.specialNeeds || 'None'}
- Purchase History: ${memory.contextual.purchaseHistory || 'None'}
- Upcoming Appointment: ${memory.contextual.appointments || 'None'}`;

    const emotionalMemory = `[EMOTIONAL MEMORY]:
- Comm Preference: ${memory.emotional.communicationPref || 'Standard'}
- Avoid Topics: ${memory.emotional.sensitiveTopics || 'None'}
- Past Success: ${memory.emotional.successHistory || 'None'}`;

    const memoryInstruction = `\nCRITICAL INSTRUCTION: Use the above MEMORY details to personalize the text. Mention their past purchases or appointments if relevant. Avoid sensitive topics. Match their communication preference.`;

    let productContext = "";
    if (selectedProductData) {
      const productName = MOCK_PRODUCTS.find(p => p.id === kbProduct)?.name;
      productContext = `\n[PRODUCT FOCUS]
- Name: ${productName}
- Ingredients: ${selectedProductData.ingredients}
- Benefits: ${selectedProductData.benefits}`;
    }

    const pointsContext = sellingPoints ? `\n[SELLING POINTS]: "${sellingPoints}"` : "";
    const mimicryContext = mimicry ? `\n[STYLE MIMICRY]: "${mimicry}"` : "";

    const formattingContext = `\n[FORMAT]
- Length: ${lengthConfig}
- Emojis: ${extraEmoji ? 'Yes' : 'No'}
- Hashtags: ${extraTopic ? 'Yes' : 'No'}`;

    const complianceContext = `\n[COMPLIANCE]
${compFilter ? '- No absolute terms.' : ''}
${compEffect ? '- Soften efficacy claims.' : ''}`;

    return `${identityContext}\n${scenarioContext}\n\n${basicMemory}\n${contextualMemory}\n${emotionalMemory}${memoryInstruction}${productContext}${pointsContext}${mimicryContext}${formattingContext}${complianceContext}\n\nTASK: Generate content now.`;
  }, [brand, baPersona, selectedScenario, commStyle, knowledgeTags, customTags, memory, kbProduct, selectedProductData, sellingPoints, mimicry, lengthConfig, extraEmoji, extraTopic, compFilter, compEffect, compBrand]);

  const getPayload = (isRefine = false) => {
    let prompt = livePrompt;
    if (isRefine) prompt += `\n\n[REFINEMENT]: ${refineInput}`;
    
    return {
      brand,
      persona: baPersona,
      scenario: selectedScenario,
      audience: { knowledgeTags, customTags },
      memory, 
      context: { kbFolder, product: selectedProductData, sellingPoints, mimicry, productName: MOCK_PRODUCTS.find(p => p.id === kbProduct)?.name },
      config: { length: lengthConfig, emoji: extraEmoji, topic: extraTopic },
      compliance: { filter: compFilter, effect: compEffect, brandCheck: compBrand },
      prompt
    };
  };

  const getApiRequestData = () => {
    const payload = getPayload();
    return {
      url: "https://api.loreal-eureka.internal/v1/content/generate",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eu_sk_live_...",
        "X-Tenant-ID": brand.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      },
      body: payload
    };
  };

  const executeGeneration = async (promptText: string, isRefine: boolean) => {
    setLoading(true);
    const previousVersion = activeResultIdx >= 0 ? results[activeResultIdx].version : 0;
    
    const payload = getPayload(isRefine);
    const configContext = {
      brand,
      persona: baPersona,
      style: commStyle,
      emoji: extraEmoji,
      topic: extraTopic,
      productName: payload.context.productName,
      sellingPoints: sellingPoints,
      audienceTags: [...knowledgeTags, ...customTags],
      memory: memory
    };

    const newRes = await generateMarketingCopy(promptText, isRefine, previousVersion, configContext);
    newRes.prompt = promptText;
    
    setResults(prev => [...prev, newRes]);
    setActiveResultIdx(prev => prev + 1);
    setRefineInput("");
    setLoading(false);
  }

  const handleGenerate = async (isRefine = false) => {
    if (!sellingPoints && !kbProduct && !isRefine) {
      alert("请输入核心卖点或选择关联产品以生成内容。");
      return;
    }
    const payload = getPayload(isRefine);
    await executeGeneration(payload.prompt, isRefine);
  };

  const handleRegenerateFromPrompt = async () => {
    if (!editedPrompt) return;
    await executeGeneration(editedPrompt, true);
  };

  // -- Sections --
  const BrandSection = () => (
    <div className="space-y-4">
      <SectionHeader icon={Globe} title="品牌基因 (Brand DNA)" />
      <TechSelect value={brand} onChange={setBrand} options={BRANDS} className="opacity-60 cursor-not-allowed" />
    </div>
  );

  const StrategySection = () => (
    <div className="space-y-5">
      <SectionHeader icon={Layers} title="内容策略 (Content Strategy)" />
      <div>
        <InputLabel label="BA 属性 (Persona)" />
        <div className="flex gap-3">
          <RadioCard label="企业微信 BA" icon={MessageSquare} selected={baPersona === 'wecom'} onClick={() => { setBaPersona('wecom'); setScenarioType('lifecycle'); setSelectedScenario('新客欢迎 (Welcome)'); }} />
          <RadioCard label="小红书 BA" icon={Flame} color="pink" selected={baPersona === 'redbook'} onClick={() => { setBaPersona('redbook'); setScenarioType(''); setSelectedScenario('成分深度析 (Analysis)'); }} />
        </div>
      </div>
      <div className="animate-in fade-in duration-300">
        <InputLabel label="沟通场景 (Scenario)" />
        {baPersona === 'wecom' ? (
          <div className="space-y-3">
            <div className="flex gap-4 border-b border-white/5 pb-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className={`w-3 h-3 rounded-full border ${scenarioType === 'lifecycle' ? 'border-eureka-primary bg-eureka-primary' : 'border-slate-600 group-hover:border-slate-400'}`}></div>
                <span className={`text-[11px] ${scenarioType === 'lifecycle' ? 'text-white' : 'text-slate-500'}`}>生命周期 (Lifecycle)</span>
                <input type="radio" className="hidden" checked={scenarioType === 'lifecycle'} onChange={() => { setScenarioType('lifecycle'); setSelectedScenario('新客欢迎 (Welcome)'); }} />
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                 <div className={`w-3 h-3 rounded-full border ${scenarioType === 'moments' ? 'border-eureka-primary bg-eureka-primary' : 'border-slate-600 group-hover:border-slate-400'}`}></div>
                 <span className={`text-[11px] ${scenarioType === 'moments' ? 'text-white' : 'text-slate-500'}`}>朋友圈 (Moments)</span>
                 <input type="radio" className="hidden" checked={scenarioType === 'moments'} onChange={() => { setScenarioType('moments'); setSelectedScenario('产品种草 (Seeding)'); }} />
              </label>
            </div>
            <TechSelect value={selectedScenario} onChange={setSelectedScenario} options={scenarioType === 'lifecycle' ? ["新客欢迎 (Welcome)", "复购提醒 (Repurchase)", "售后关怀 (Care)", "沉睡激活 (Wake-up)"] : ["产品种草 (Seeding)", "活动预热 (Warm-up)", "会员权益 (Benefits)"]} />
          </div>
        ) : (
          <TechSelect value={selectedScenario} onChange={setSelectedScenario} options={["成分深度析 (Analysis)", "明星同款 (Celebrity)", "产品Vlog (Vlog)"]} />
        )}
      </div>
      <div>
        <InputLabel label="沟通风格 (Style)" />
        <div className="grid grid-cols-2 gap-2">
          {['专业 (Professional)', '热情 (Enthusiastic)', '极简 (Minimalist)', '潮流 (Trendy)'].map(s => (
            <button key={s} onClick={() => setCommStyle(s)} className={`px-3 py-2 text-[10px] rounded border transition-all text-left ${commStyle === s ? 'bg-eureka-primary text-white border-eureka-primary shadow-md' : 'bg-eureka-panel text-slate-400 border-eureka-border hover:border-slate-500 hover:text-slate-300'}`}>{s}</button>
          ))}
        </div>
      </div>
      <div className="pt-2 border-t border-white/5 mt-2">
        <InputLabel label="AI 风格仿写 (Mimicry)" />
        <textarea 
          className="w-full h-16 p-3 text-xs bg-[#0B0F19] border border-eureka-border rounded-md resize-none outline-none focus:border-eureka-primary focus:ring-1 focus:ring-eureka-primary text-slate-300"
          placeholder="粘贴一段优秀话术让 AI 模仿语气..."
          value={mimicry} onChange={e => setMimicry(e.target.value)}
        />
      </div>
      <div>
        <InputLabel label="核心卖点 (Selling Points)" />
        <div className="flex flex-wrap gap-2 mb-2">
          {['产品核心功效', '大促活动机制', '明星代言事件'].map(chip => (
            <button key={chip} onClick={() => setSellingPoints(p => p + (p ? ' ' : '') + `[${chip}]`)} className="px-2 py-0.5 border border-white/10 rounded text-[10px] text-eureka-accent hover:bg-white/5 transition-colors">+ {chip}</button>
          ))}
        </div>
        <textarea 
          className="w-full h-16 p-3 text-xs bg-[#0B0F19] border border-eureka-border rounded-md resize-none outline-none focus:border-eureka-primary"
          placeholder="输入产品功效、活动机制或营销主题..."
          value={sellingPoints} onChange={e => setSellingPoints(e.target.value)}
        />
      </div>
    </div>
  );

  const KnowledgeBaseSection = () => (
    <div className="space-y-4">
      <SectionHeader icon={Database} title="知识库调用 (Knowledge Base)" />
      <div>
        <InputLabel label="品牌资产文件夹 (Assets)" />
        <div className="relative">
          <select 
            className="w-full text-xs bg-[#0F1623] border border-eureka-border text-slate-200 rounded-md py-2.5 px-3 appearance-none outline-none focus:border-eureka-primary cursor-pointer"
            value={kbFolder} onChange={(e) => setKbFolder(e.target.value)}
          >
            <option value="">选择资产文件夹...</option>
            {KB_FOLDERS.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
          <div className="absolute right-3 top-3 text-slate-500 pointer-events-none">▼</div>
        </div>
      </div>
      <div>
        <InputLabel label="关联产品 (Product)" />
        <div className="relative">
          <select 
            className="w-full text-xs bg-[#0F1623] border border-eureka-border text-slate-200 rounded-md py-2.5 px-3 appearance-none outline-none focus:border-eureka-primary cursor-pointer"
            value={kbProduct} onChange={(e) => setKbProduct(e.target.value)}
          >
            <option value="">链接产品信息...</option>
            {MOCK_PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <div className="absolute right-3 top-3 text-slate-500 pointer-events-none">▼</div>
        </div>
        {selectedProductData && (
          <div className="mt-3 p-3 bg-indigo-900/20 border border-indigo-500/30 rounded-lg animate-in fade-in zoom-in-95 duration-200">
             <div className="text-[10px] space-y-1.5 text-indigo-200">
                <div className="flex gap-2"><span className="text-indigo-400 font-bold w-12 shrink-0">✅ ING:</span> {selectedProductData.ingredients}</div>
                <div className="flex gap-2"><span className="text-indigo-400 font-bold w-12 shrink-0">✅ BEN:</span> {selectedProductData.benefits}</div>
                <div className="flex gap-2"><span className="text-indigo-400 font-bold w-12 shrink-0">✅ USE:</span> {selectedProductData.usage}</div>
             </div>
          </div>
        )}
      </div>
    </div>
  );

  const ConfigPanel = () => (
    <div className="px-4 py-3 bg-[#0F1623] border-t border-eureka-border">
      <div className="flex items-center justify-between mb-2">
         <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1.5">
            <Sliders size={12} /> 生成配置 (Settings)
         </span>
         <span className="text-[9px] text-slate-600">可调整</span>
      </div>

      <div className="flex flex-col gap-2">
         {/* Row 1: Length & Extras */}
         <div className="flex items-center justify-between gap-2">
            <div className="flex items-center bg-black/30 rounded border border-white/5 p-0.5">
               {['短', '中', '长'].map(l => (
                 <button 
                   key={l} 
                   onClick={() => setLengthConfig(l === '短' ? '短 (Short)' : l === '中' ? '中篇 (Medium)' : '长 (Long)')}
                   className={`px-3 py-1 text-[9px] rounded transition-all ${lengthConfig.startsWith(l) ? 'bg-eureka-primary text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                 >
                   {l}
                 </button>
               ))}
            </div>
            <div className="flex items-center gap-1.5">
               <button onClick={() => setExtraEmoji(!extraEmoji)} className={`px-2 py-1 text-[9px] rounded border transition-all ${extraEmoji ? 'bg-indigo-900/30 border-indigo-500/40 text-indigo-300' : 'bg-transparent border-slate-700 text-slate-500 hover:border-slate-500'}`}>😊 Emoji</button>
               <button onClick={() => setExtraTopic(!extraTopic)} className={`px-2 py-1 text-[9px] rounded border transition-all ${extraTopic ? 'bg-pink-900/30 border-pink-500/40 text-pink-300' : 'bg-transparent border-slate-700 text-slate-500 hover:border-slate-500'}`}># Topic</button>
            </div>
         </div>

         {/* Row 2: Compliance (Minimal) */}
         <div className="flex items-center gap-3 pt-1">
            {[
              { label: '敏感词', checked: compFilter, set: setCompFilter },
              { label: '功效标注', checked: compEffect, set: setCompEffect },
              { label: '品牌合规', checked: compBrand, set: setCompBrand },
            ].map((item, idx) => (
               <label key={idx} className="flex items-center gap-1.5 cursor-pointer group select-none">
                  <div className={`w-1.5 h-1.5 rounded-full transition-colors ${item.checked ? 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]' : 'bg-slate-700'}`}></div>
                  <span className={`text-[9px] transition-colors ${item.checked ? 'text-slate-300' : 'text-slate-600'} group-hover:text-slate-200`}>{item.label}</span>
                  <input type="checkbox" className="hidden" checked={item.checked} onChange={() => item.set(!item.checked)} />
               </label>
            ))}
         </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-full bg-eureka-dark overflow-hidden">
      <AudienceSelectionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} audienceData={audienceData} selectedTags={knowledgeTags} onConfirm={setKnowledgeTags} />
      <CodeViewer isOpen={showApiDebug} onClose={() => setShowApiDebug(false)} data={getApiRequestData()} />

      {/* Left Panel: Configuration */}
      <div className="w-[450px] flex-none border-r border-eureka-border bg-[#0F1623]/80 flex flex-col h-full z-10">
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          <BrandSection />
          <StrategySection />
          {/* Personalized Memory */}
          <PersonalizedMemorySection 
            memory={memory}
            updateMemory={updateMemory}
            knowledgeTags={knowledgeTags}
            setKnowledgeTags={setKnowledgeTags}
            customTags={customTags}
            setCustomTags={setCustomTags}
            tagInput={tagInput}
            setTagInput={setTagInput}
            setIsModalOpen={setIsModalOpen}
          />
          <KnowledgeBaseSection />
        </div>
        
        {/* Prompt Preview & Config */}
        <div className="shrink-0 bg-[#0F1623] z-10 shadow-[0_-5px_20px_rgba(0,0,0,0.3)]">
          {/* Real-time Prompt Preview */}
          <PromptPreviewPanel promptText={livePrompt} />

          <div className="border-t border-eureka-border">
            <ConfigPanel />
            
            <div className="p-4 pt-2 flex gap-2">
              <button 
                onClick={() => handleGenerate(false)} disabled={loading || (!sellingPoints && !kbProduct)}
                className="flex-1 py-3 bg-tech-gradient hover:bg-tech-gradient-hover text-white font-bold uppercase tracking-widest text-xs rounded-md shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <RefreshCw className="animate-spin" size={16} /> : <Sparkles size={16} />}
                {loading ? "正在生成 (GENERATING)" : "立即生成 (GENERATE)"}
              </button>
              <button 
                 onClick={() => setShowApiDebug(true)}
                 className="w-12 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md flex items-center justify-center border border-slate-700"
                 title="API Debug"
              >
                 <Terminal size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Center Panel: Results */}
      <div className="flex-1 bg-black/40 relative flex flex-col h-full overflow-hidden">
        <div className="absolute inset-0 bg-glow pointer-events-none"></div>
        {results.length === 0 ? (
          // Simple Empty State
          <div className="flex-1 flex flex-col items-center justify-center text-slate-600 animate-in fade-in duration-500">
             <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/5 shadow-2xl">
                <BrainCircuit size={32} className="text-slate-500" />
             </div>
             <p className="text-sm font-bold tracking-widest uppercase mb-2">等待生成 (Waiting for Generation)</p>
             <p className="text-xs text-slate-500">在左侧配置参数后点击"立即生成"</p>
          </div>
        ) : (
          <>
            <div className="h-14 bg-eureka-panel/50 border-b border-eureka-border flex items-center justify-between px-6 shrink-0 z-20">
              <div className="flex items-center gap-4">
                 <Badge color="success"><CheckCircle size={12} /> 合规检测通过 (Pass)</Badge>
                 {activeResultIdx >= 0 && results[activeResultIdx] && (
                   <div className="flex gap-3 text-[10px] text-slate-400 font-mono items-center">
                     <span>原创度: {results[activeResultIdx].originality}%</span>
                     <span className="w-px h-3 bg-white/10"></span>
                     <span>Tokens: {results[activeResultIdx].tokens}</span>
                   </div>
                 )}
              </div>
              <div className="flex gap-3 items-center">
                 <button 
                   onClick={() => setViewPromptId(viewPromptId ? null : results[activeResultIdx].id)} 
                   className={`text-[10px] flex items-center gap-1 px-2 py-1 rounded border transition-all ${viewPromptId ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300' : 'bg-transparent border-slate-700 text-slate-500 hover:text-slate-300'}`}
                 >
                   <Eye size={12}/> {viewPromptId ? '隐藏 Prompt' : '查看 Prompt'}
                 </button>
                 <button 
                   onClick={() => setShowHistory(!showHistory)}
                   className={`text-[10px] flex items-center gap-1 px-2 py-1 rounded border transition-all ${showHistory ? 'bg-eureka-primary text-white border-eureka-primary' : 'bg-transparent border-slate-700 text-slate-500 hover:text-slate-300'}`}
                 >
                   <List size={12}/> 历史记录
                 </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 z-10">
               {activeResultIdx >= 0 && results[activeResultIdx] && (
                 <div className="max-w-3xl mx-auto space-y-4">
                    {/* Prompt Editor / Viewer */}
                    {viewPromptId === results[activeResultIdx].id && (
                      <div className="p-4 rounded-lg bg-black/40 border border-indigo-500/30 animate-in slide-in-from-top-2 relative">
                        <div className="flex justify-between items-center mb-2">
                           <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Debug & Edit Prompt</div>
                           <button 
                             onClick={handleRegenerateFromPrompt}
                             className="text-[10px] bg-indigo-600 hover:bg-indigo-500 text-white px-2 py-1 rounded flex items-center gap-1 transition-colors"
                             title="Regenerate with this specific prompt"
                           >
                             <RefreshCw size={10} /> 重新生成
                           </button>
                        </div>
                        <textarea 
                          className="w-full h-32 bg-[#0F1623] text-xs text-slate-300 font-mono border border-slate-700 rounded p-2 outline-none focus:border-indigo-500 custom-scrollbar resize-none"
                          value={editedPrompt}
                          onChange={(e) => setEditedPrompt(e.target.value)}
                        />
                      </div>
                    )}
                    
                    {/* Content Card */}
                    <div className="glass-panel p-8 rounded-xl relative group border-t-2 border-t-eureka-primary">
                      <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">{results[activeResultIdx].text}</div>
                      <button className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white rounded hover:bg-white/5 opacity-0 group-hover:opacity-100 transition-all"><Copy size={16}/></button>
                    </div>
                 </div>
               )}
            </div>

            <div className="p-4 bg-eureka-panel border-t border-eureka-border z-20">
               <div className="max-w-3xl mx-auto flex gap-2">
                 <input 
                   className="flex-1 bg-[#0B0F19] border border-eureka-border rounded-md px-4 py-2 text-xs text-white outline-none focus:border-eureka-primary"
                   placeholder="输入修改意见 (如: 语气再活泼一点)..."
                   value={refineInput}
                   onChange={e => setRefineInput(e.target.value)}
                   onKeyDown={e => e.key === 'Enter' && handleGenerate(true)}
                 />
                 <button onClick={() => handleGenerate(true)} disabled={loading} className="px-4 py-2 bg-white text-black text-xs font-bold rounded-md hover:bg-slate-200 transition-colors flex items-center gap-2">
                   <Sparkles size={14} className="text-eureka-primary" /> 迭代优化 (Refine)
                 </button>
               </div>
            </div>
          </>
        )}
      </div>

      {/* Right Sidebar: History Panel */}
      {showHistory && (
        <div className="w-[280px] bg-[#0F1623] border-l border-eureka-border flex flex-col shrink-0 animate-in slide-in-from-right-10">
          <div className="p-4 border-b border-eureka-border flex items-center justify-between">
             <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider">
               <History size={14} className="text-eureka-accent" /> 
               历史记录 ({currentUser.username})
             </div>
             <button onClick={() => setShowHistory(false)} className="text-slate-500 hover:text-white"><ChevronRight size={16}/></button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
            {results.length === 0 ? (
              <div className="text-center py-10 text-slate-600 text-xs">暂无生成记录</div>
            ) : (
              results.slice().reverse().map((res, index) => {
                // Calculate original index because we reversed the array
                const originalIndex = results.length - 1 - index;
                const isActive = originalIndex === activeResultIdx;
                
                return (
                  <div 
                    key={res.id} 
                    onClick={() => setActiveResultIdx(originalIndex)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      isActive 
                        ? 'bg-eureka-primary/20 border-eureka-primary shadow-lg' 
                        : 'bg-[#151B2B] border-white/5 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isActive ? 'bg-eureka-primary text-white' : 'bg-slate-700 text-slate-300'}`}>V{res.version}</span>
                      <span className="text-[10px] text-slate-500">{res.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 line-clamp-3 leading-relaxed mb-2 opacity-80">
                      {res.text}
                    </p>
                    <div className="flex gap-2 border-t border-white/5 pt-2 mt-1">
                      <span className="text-[9px] text-slate-500 bg-black/20 px-1.5 rounded border border-white/5 truncate max-w-[100px]">
                         {res.prompt?.slice(0, 15)}...
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};