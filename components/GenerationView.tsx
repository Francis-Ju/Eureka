
import React, { useState, useEffect } from 'react';
import { 
  Globe, Layers, MessageSquare, Flame, Users, Search, Edit3, 
  RefreshCw, Sparkles, Hexagon, CheckCircle, Copy, Database, Sliders, Terminal, Eye, Play, Save
} from 'lucide-react';
import { Language, AudienceData, GenResult, User } from '../types';
import { DICTIONARY, KB_FOLDERS, MOCK_PRODUCTS, BRANDS } from '../constants';
import { generateMarketingCopy } from '../services/geminiService';
import { SectionHeader, TechSelect, InputLabel, RadioCard, Badge, TechInput, TechSwitch, CodeViewer } from './UIComponents';
import { AudienceSelectionModal } from './AudienceSelectionModal';

export const GenerationView = ({ 
  lang, audienceData, prefilledMimicry, setPrefilledMimicry, currentUser 
}: { 
  lang: Language, audienceData: AudienceData, prefilledMimicry: string, setPrefilledMimicry: (s: string) => void, currentUser: User
}) => {
  const t = DICTIONARY[lang].gen;
  
  // -- Core State --
  const [brand, setBrand] = useState(currentUser.brand); // Default to logged-in brand
  const [baPersona, setBaPersona] = useState<'wecom' | 'redbook'>('wecom');
  const [scenarioType, setScenarioType] = useState('lifecycle');
  const [selectedScenario, setSelectedScenario] = useState('');
  const [commStyle, setCommStyle] = useState('Professional');
  
  // -- Moved Context State (Mimicry & Selling Points) --
  const [mimicry, setMimicry] = useState(prefilledMimicry);
  const [sellingPoints, setSellingPoints] = useState("");

  // -- Audience --
  const [knowledgeTags, setKnowledgeTags] = useState<string[]>([]);
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // -- Knowledge Base --
  const [kbFolder, setKbFolder] = useState("");
  const [kbProduct, setKbProduct] = useState("");
  const selectedProductData = MOCK_PRODUCTS.find(p => p.id === kbProduct)?.data;

  // -- Config & Compliance --
  const [lengthConfig, setLengthConfig] = useState('Medium (80 chars)');
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
  
  // Prompt Editing State
  const [viewPromptId, setViewPromptId] = useState<string | null>(null);
  const [editedPrompt, setEditedPrompt] = useState("");

  useEffect(() => { if (prefilledMimicry) setMimicry(prefilledMimicry); }, [prefilledMimicry]);
  
  // Initialize edited prompt when viewing a result's prompt
  useEffect(() => {
    if (viewPromptId && activeResultIdx >= 0) {
      setEditedPrompt(results[activeResultIdx].prompt || "");
    }
  }, [viewPromptId, activeResultIdx, results]);

  const getPayload = (isRefine = false) => {
    let productContext = "";
    if (selectedProductData) {
      productContext = ` Product Data: [Ingredients: ${selectedProductData.ingredients}, Benefits: ${selectedProductData.benefits}, Usage: ${selectedProductData.usage}]`;
    }

    const configInstructions = `Length: ${lengthConfig}. ${extraEmoji ? 'Include Emojis.' : ''} ${extraTopic ? 'Include Channel Topics.' : ''}`;
    const complianceInstructions = `Compliance: ${compFilter ? 'Filter sensitive words.' : ''} ${compEffect ? 'Mark effect claims.' : ''} ${compBrand ? 'Strict brand guidelines.' : ''}`;

    // Force Chinese output
    const languageInstruction = "IMPORTANT: GENERATE THE CONTENT IN CHINESE (SIMPLIFIED) ONLY.";

    let prompt = `Role: Marketing Copywriter. Brand: ${brand}. Persona: ${baPersona}. Scenario: ${selectedScenario}. Style: ${commStyle}. Audience: ${knowledgeTags.join(',')}, ${customTags.join(',')}. Reference: ${kbFolder}. ${productContext}. Topic: ${sellingPoints}. ${mimicry ? `Mimic Style: ${mimicry}` : ''}. ${configInstructions}. ${complianceInstructions}. ${languageInstruction}`;
    
    if (isRefine) prompt += ` REFINE REQUEST: ${refineInput}`;
    
    return {
      brand,
      persona: baPersona,
      scenario: selectedScenario,
      audience: { knowledgeTags, customTags },
      context: { kbFolder, product: selectedProductData, sellingPoints, mimicry },
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
        "Authorization": "Bearer eu_sk_live_839218209321",
        "X-Tenant-ID": brand.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        "X-Request-ID": `req_${Date.now()}`
      },
      body: payload
    };
  };

  const executeGeneration = async (promptText: string, isRefine: boolean) => {
    setLoading(true);
    const previousVersion = activeResultIdx >= 0 ? results[activeResultIdx].version : 0;
    
    const newRes = await generateMarketingCopy(promptText, isRefine, previousVersion);
    newRes.prompt = promptText;
    
    setResults(prev => [...prev, newRes]);
    setActiveResultIdx(prev => prev + 1);
    setRefineInput("");
    setLoading(false);
  }

  const handleGenerate = async (isRefine = false) => {
    if (!sellingPoints && !kbProduct && !isRefine) return;
    const payload = getPayload(isRefine);
    await executeGeneration(payload.prompt, isRefine);
  };

  const handleRegenerateFromPrompt = async () => {
    if (!editedPrompt) return;
    // Treat as a refinement/regeneration
    await executeGeneration(editedPrompt, true);
  };

  // -- Sub-Components --
  const BrandSection = () => (
    <div className="space-y-4">
      <SectionHeader icon={Globe} title={t.sections.brand} />
      <TechSelect 
        value={brand} 
        onChange={setBrand} 
        options={BRANDS} 
      />
    </div>
  );

  const StrategySection = () => (
    <div className="space-y-5">
      <SectionHeader icon={Layers} title={t.sections.strategy} />
      
      {/* 1. BA Persona */}
      <div>
        <InputLabel label={t.fields.baPersona} />
        <div className="flex gap-3">
          <RadioCard label="WeCom BA" icon={MessageSquare} selected={baPersona === 'wecom'} onClick={() => { setBaPersona('wecom'); setScenarioType('lifecycle'); setSelectedScenario(''); }} />
          <RadioCard label="RedBook BA" icon={Flame} color="pink" selected={baPersona === 'redbook'} onClick={() => { setBaPersona('redbook'); setScenarioType(''); setSelectedScenario('Ingredient Analysis'); }} />
        </div>
      </div>

      {/* 2. Scenario */}
      <div className="animate-in fade-in duration-300">
        <InputLabel label={t.fields.scenario} />
        {baPersona === 'wecom' ? (
          <div className="space-y-3">
            <div className="flex gap-4 border-b border-white/5 pb-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className={`w-3 h-3 rounded-full border ${scenarioType === 'lifecycle' ? 'border-eureka-primary bg-eureka-primary' : 'border-slate-600 group-hover:border-slate-400'}`}></div>
                <span className={`text-[11px] ${scenarioType === 'lifecycle' ? 'text-white' : 'text-slate-500'}`}>Lifecycle (1v1)</span>
                <input type="radio" className="hidden" checked={scenarioType === 'lifecycle'} onChange={() => setScenarioType('lifecycle')} />
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                 <div className={`w-3 h-3 rounded-full border ${scenarioType === 'moments' ? 'border-eureka-primary bg-eureka-primary' : 'border-slate-600 group-hover:border-slate-400'}`}></div>
                 <span className={`text-[11px] ${scenarioType === 'moments' ? 'text-white' : 'text-slate-500'}`}>Moments</span>
                 <input type="radio" className="hidden" checked={scenarioType === 'moments'} onChange={() => setScenarioType('moments')} />
              </label>
            </div>
            <TechSelect value={selectedScenario} onChange={setSelectedScenario} options={scenarioType === 'lifecycle' ? ["New Customer Welcome", "Repurchase Reminder", "After-sales Care", "Dormant Activation"] : ["Product Seeding", "Event Warm-up", "Exclusive Benefits"]} />
          </div>
        ) : (
          <TechSelect value={selectedScenario} onChange={setSelectedScenario} options={["Ingredient Analysis", "Celebrity Style", "Product Vlog"]} />
        )}
      </div>

      {/* 3. Style */}
      <div>
        <InputLabel label={t.fields.style} />
        <div className="grid grid-cols-2 gap-2">
          {['Professional', 'Enthusiastic', 'Minimalist', 'Trendy'].map(s => (
            <button key={s} onClick={() => setCommStyle(s)} className={`px-3 py-2 text-[10px] rounded border transition-all text-left ${commStyle === s ? 'bg-eureka-primary text-white border-eureka-primary shadow-md' : 'bg-eureka-panel text-slate-400 border-eureka-border hover:border-slate-500 hover:text-slate-300'}`}>{s}</button>
          ))}
        </div>
      </div>

      {/* 4. Mimicry (Moved here) */}
      <div className="pt-2 border-t border-white/5 mt-2">
        <InputLabel label={t.fields.mimicry} />
        <textarea 
          className="w-full h-16 p-3 text-xs bg-[#0B0F19] border border-eureka-border rounded-md resize-none outline-none focus:border-eureka-primary focus:ring-1 focus:ring-eureka-primary text-slate-300"
          placeholder={t.placeholders.mimicry}
          value={mimicry} onChange={e => setMimicry(e.target.value)}
        />
      </div>

      {/* 5. Selling Points (Moved here) */}
      <div>
        <InputLabel label={t.fields.sellingPoints} />
        <div className="flex flex-wrap gap-2 mb-2">
          {['Product Benefits', 'Campaign Theme', 'Celebrity Event'].map(chip => (
            <button key={chip} onClick={() => setSellingPoints(p => p + ` [${chip}]`)} className="px-2 py-0.5 border border-white/10 rounded text-[10px] text-eureka-accent hover:bg-white/5 transition-colors">+ {chip}</button>
          ))}
        </div>
        <textarea 
          className="w-full h-16 p-3 text-xs bg-[#0B0F19] border border-eureka-border rounded-md resize-none outline-none focus:border-eureka-primary"
          placeholder={t.placeholders.sellingPoints}
          value={sellingPoints} onChange={e => setSellingPoints(e.target.value)}
        />
      </div>
    </div>
  );

  const AudienceSection = () => (
    <div className="space-y-4">
      <SectionHeader icon={Users} title={t.sections.audience} />
      <div>
        <InputLabel label="Knowledge Base Tags" subLabel="CRM & WeCom" />
        <div onClick={() => setIsModalOpen(true)} className="w-full min-h-[38px] bg-[#0B0F19] border border-eureka-border rounded-md px-3 py-2 cursor-pointer hover:border-eureka-primary/50 transition-all group relative flex items-center">
          {knowledgeTags.length === 0 ? (
            <div className="flex items-center text-slate-500 text-xs"><Search size={14} className="mr-2 opacity-50" />{t.fields.knowledgeSelector}</div>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {knowledgeTags.map(tag => <Badge key={tag} color="active" onRemove={() => setKnowledgeTags(prev => prev.filter(t => t !== tag))}>{tag}</Badge>)}
            </div>
          )}
          <div className="absolute right-3 opacity-0 group-hover:opacity-100 transition-opacity"><Edit3 size={12} className="text-slate-400" /></div>
        </div>
      </div>
      <div>
        <InputLabel label="Custom Context Tags" />
        <div className="bg-eureka-panel border border-eureka-border rounded-lg p-3">
          <div className="flex flex-wrap gap-2 mb-3">
            {customTags.map(tag => <Badge key={tag} onRemove={() => setCustomTags(p => p.filter(t => t !== tag))}>{tag}</Badge>)}
          </div>
          <TechInput value={tagInput} onChange={setTagInput} onEnter={() => { if(tagInput) { setCustomTags(p => [...p, tagInput]); setTagInput(""); } }} placeholder={t.placeholders.customTag} />
        </div>
      </div>
    </div>
  );

  const KnowledgeBaseSection = () => (
    <div className="space-y-4">
      <SectionHeader icon={Database} title={t.sections.kb} />
      <div>
        <InputLabel label={t.fields.kbFolder} />
        <div className="relative">
          <select 
            className="w-full text-xs bg-[#0F1623] border border-eureka-border text-slate-200 rounded-md py-2.5 px-3 appearance-none outline-none focus:border-eureka-primary cursor-pointer"
            value={kbFolder} onChange={(e) => setKbFolder(e.target.value)}
          >
            <option value="">Select Asset Folder...</option>
            {KB_FOLDERS.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
          <div className="absolute right-3 top-3 text-slate-500 pointer-events-none">▼</div>
        </div>
      </div>
      <div>
        <InputLabel label={t.fields.kbProduct} />
        <div className="relative">
          <select 
            className="w-full text-xs bg-[#0F1623] border border-eureka-border text-slate-200 rounded-md py-2.5 px-3 appearance-none outline-none focus:border-eureka-primary cursor-pointer"
            value={kbProduct} onChange={(e) => setKbProduct(e.target.value)}
          >
            <option value="">Link Product...</option>
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
    <div className="grid grid-cols-2 gap-x-6 gap-y-4 pt-4 border-t border-eureka-border bg-[#0F1623]">
      {/* Col 1 */}
      <div className="space-y-3">
        <InputLabel label={t.fields.length} className="mb-1" />
        <div className="flex gap-1 bg-black/40 p-1 rounded border border-white/5">
           {['Short', 'Medium', 'Long'].map(l => (
             <button key={l} onClick={() => setLengthConfig(l)} className={`flex-1 text-[9px] py-1 rounded transition-colors ${lengthConfig.includes(l) ? 'bg-eureka-primary text-white' : 'text-slate-500 hover:text-slate-300'}`}>
               {l}
             </button>
           ))}
        </div>
        <InputLabel label={t.fields.extras} className="mb-1 mt-2" />
        <div className="flex gap-2">
           <button onClick={() => setExtraEmoji(!extraEmoji)} className={`px-2 py-1 text-[9px] rounded border ${extraEmoji ? 'bg-indigo-900/40 border-indigo-500 text-indigo-300' : 'bg-transparent border-slate-700 text-slate-500'}`}>😊 Emoji</button>
           <button onClick={() => setExtraTopic(!extraTopic)} className={`px-2 py-1 text-[9px] rounded border ${extraTopic ? 'bg-pink-900/40 border-pink-500 text-pink-300' : 'bg-transparent border-slate-700 text-slate-500'}`}># Topic</button>
        </div>
      </div>
      
      {/* Col 2 */}
      <div className="space-y-1">
         <InputLabel label={t.fields.compliance} className="mb-1" />
         <TechSwitch label="Filter Sensitive" checked={compFilter} onChange={setCompFilter} />
         <TechSwitch label="Mark Effects" checked={compEffect} onChange={setCompEffect} />
         <TechSwitch label="Brand Check" checked={compBrand} onChange={setCompBrand} />
      </div>
    </div>
  );

  return (
    <div className="flex h-full bg-eureka-dark">
      <AudienceSelectionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} audienceData={audienceData} selectedTags={knowledgeTags} onConfirm={setKnowledgeTags} />
      <CodeViewer isOpen={showApiDebug} onClose={() => setShowApiDebug(false)} data={getApiRequestData()} />

      {/* Left Panel */}
      <div className="w-[450px] flex-none border-r border-eureka-border bg-[#0F1623]/80 flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          <BrandSection />
          <StrategySection />
          <AudienceSection />
          <KnowledgeBaseSection />
        </div>
        
        {/* Fixed Bottom Action Area */}
        <div className="shrink-0 p-4 bg-[#0F1623] border-t border-eureka-border z-10 shadow-[0_-5px_20px_rgba(0,0,0,0.3)]">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2 text-eureka-primary">
               <Sliders size={14} /> <span className="text-[10px] font-bold uppercase tracking-widest">Configuration</span>
            </div>
            <ConfigPanel />
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => handleGenerate(false)} disabled={loading || (!sellingPoints && !kbProduct)}
              className="flex-1 py-3 bg-tech-gradient hover:bg-tech-gradient-hover text-white font-bold uppercase tracking-widest text-xs rounded-md shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <RefreshCw className="animate-spin" size={16} /> : <Sparkles size={16} />}
              {loading ? t.actions.generating : t.actions.generate}
            </button>
            <button 
               onClick={() => setShowApiDebug(true)}
               className="w-12 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md flex items-center justify-center border border-slate-700"
               title={t.actions.debug}
            >
               <Terminal size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel (Results) */}
      <div className="flex-1 bg-black/40 relative flex flex-col h-full overflow-hidden">
        <div className="absolute inset-0 bg-glow pointer-events-none"></div>
        {results.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center z-10">
            <div className="w-20 h-20 bg-eureka-panel border border-eureka-border rounded-2xl flex items-center justify-center mb-6 shadow-2xl relative">
              <div className="absolute inset-0 bg-eureka-primary blur-2xl opacity-20"></div>
              <Hexagon size={40} className="text-eureka-accent relative z-10" />
            </div>
            <h3 className="text-2xl font-light text-white mb-2">Eureka <span className="font-bold text-transparent bg-clip-text bg-tech-gradient">Engine</span></h3>
            <p className="text-xs uppercase tracking-widest text-slate-500">Ready for Input</p>
          </div>
        ) : (
          <>
            <div className="h-14 bg-eureka-panel/50 border-b border-eureka-border flex items-center justify-between px-6 shrink-0 z-20">
              <div className="flex items-center gap-4">
                 <Badge color="success"><CheckCircle size={12} /> Compliance Pass</Badge>
                 {activeResultIdx >= 0 && results[activeResultIdx] && (
                   <div className="flex gap-3 text-[10px] text-slate-400 font-mono items-center">
                     <span>Orig: {results[activeResultIdx].originality}%</span>
                     <span className="w-px h-3 bg-white/10"></span>
                     <span>Tok: {results[activeResultIdx].tokens}</span>
                   </div>
                 )}
              </div>
              <div className="flex gap-3 items-center">
                 <button 
                   onClick={() => setViewPromptId(viewPromptId ? null : results[activeResultIdx].id)} 
                   className={`text-[10px] flex items-center gap-1 px-2 py-1 rounded border transition-all ${viewPromptId ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300' : 'bg-transparent border-slate-700 text-slate-500 hover:text-slate-300'}`}
                 >
                   <Eye size={12}/> {viewPromptId ? 'Hide Prompt' : 'View Prompt'}
                 </button>
                 <div className="flex gap-1 bg-black/30 p-1 rounded-md border border-white/5">
                  {results.map((r, i) => (
                    <button key={r.id} onClick={() => { setActiveResultIdx(i); setViewPromptId(null); }} className={`px-2.5 py-0.5 text-[10px] font-bold rounded ${i === activeResultIdx ? 'bg-eureka-primary text-white' : 'text-slate-500 hover:text-slate-300'}`}>V{r.version}</button>
                  ))}
                 </div>
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
                             <RefreshCw size={10} /> Regenerate
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
                   placeholder={t.placeholders.refine}
                   value={refineInput}
                   onChange={e => setRefineInput(e.target.value)}
                   onKeyDown={e => e.key === 'Enter' && handleGenerate(true)}
                 />
                 <button onClick={() => handleGenerate(true)} disabled={loading} className="px-4 py-2 bg-white text-black text-xs font-bold rounded-md hover:bg-slate-200 transition-colors flex items-center gap-2">
                   <Sparkles size={14} className="text-eureka-primary" /> Refine
                 </button>
               </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
