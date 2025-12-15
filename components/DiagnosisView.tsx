import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart2, Activity, Filter, Download, MousePointer, ShoppingCart, ThumbsUp, Clock, 
  Search, AlertCircle, CheckCircle, Flame, MessageSquare, Zap, Settings, Cpu, TrendingUp, 
  ArrowRight, Server, Database, Globe, ChevronRight, Edit2, Save, X, Coins, Wallet
} from 'lucide-react';
import { DIAGNOSIS_KPIS, DIAGNOSIS_CHANNEL_DATA, MOCK_FAQS, MODEL_HEALTH_METRICS, GENERATION_KPIS } from '../constants';

// --- Shared Components ---

const SectionCard = ({ children, title, icon: Icon, className = "" }: { children?: React.ReactNode, title: string, icon?: any, className?: string }) => (
  <div className={`bg-[#151B2B] border border-eureka-border rounded-xl p-6 shadow-lg flex flex-col ${className}`}>
    <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2 shrink-0">
      {Icon && <Icon size={16} className="text-eureka-primary" />} {title}
    </h3>
    <div className="flex-1 min-h-0 relative">
      {children}
    </div>
  </div>
);

// --- 1. Touchpoint Analysis Tab ---

const KPICard = ({ label, value, trend, icon: Icon, iconType }: any) => {
  const colors: Record<string, string> = {
    // Original colors
    orange: 'text-orange-400 bg-orange-400/10',
    emerald: 'text-emerald-400 bg-emerald-400/10',
    blue: 'text-blue-400 bg-blue-400/10',
    purple: 'text-purple-400 bg-purple-400/10',
    // New types
    coins: 'text-yellow-400 bg-yellow-400/10',
    wallet: 'text-emerald-400 bg-emerald-400/10',
    message: 'text-indigo-400 bg-indigo-400/10',
    zap: 'text-pink-400 bg-pink-400/10'
  };

  // Determine color based on iconType or fallback to 'indigo'
  const colorKey = iconType === 'click' ? 'orange' :
                   iconType === 'conversion' ? 'emerald' :
                   iconType === 'like' ? 'blue' :
                   iconType === 'time' ? 'purple' :
                   iconType || 'indigo';

  return (
    <div className="bg-[#151B2B] border border-eureka-border rounded-xl p-6 flex flex-col justify-between hover:border-eureka-primary/50 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-xs text-slate-400 font-bold mb-1 uppercase tracking-wider">{label}</p>
          <h3 className="text-3xl font-bold text-white group-hover:scale-105 transition-transform origin-left">{value}</h3>
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors[colorKey]}`}>
          <Icon size={20} />
        </div>
      </div>
      <div className={`text-xs font-bold flex items-center gap-1 ${trend.includes('+') || trend.includes('↗') ? 'text-emerald-400' : 'text-rose-400'}`}>
        {trend}
      </div>
    </div>
  );
};

const InteractiveChannelChart = () => {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const data = [
    { name: '企微1v1', v1: 85, v2: 60 },
    { name: '朋友圈', v1: 65, v2: 45 },
    { name: '小红书', v1: 95, v2: 55 },
    { name: '短信', v1: 40, v2: 20 },
    { name: '邮件', v1: 55, v2: 30 }
  ];

  return (
    <SectionCard title="渠道表现对比" icon={BarChart2}>
      <div className="space-y-5">
        {data.map((item, idx) => (
          <div 
            key={item.name} 
            className="flex items-center gap-4 group cursor-pointer"
            onMouseEnter={() => setHoverIdx(idx)}
            onMouseLeave={() => setHoverIdx(null)}
          >
            <span className={`w-16 text-xs text-right font-medium transition-colors ${hoverIdx === idx ? 'text-white' : 'text-slate-500'}`}>{item.name}</span>
            <div className="flex-1 flex flex-col gap-1.5">
               <div className="relative h-2.5 bg-slate-800 rounded-r-full overflow-hidden">
                 <div 
                   className={`absolute top-0 left-0 h-full rounded-r-full transition-all duration-500 ${hoverIdx === idx ? 'bg-amber-400' : 'bg-amber-500/70'}`} 
                   style={{ width: `${item.v1}%` }}
                 />
               </div>
               <div className="relative h-2.5 bg-slate-800 rounded-r-full overflow-hidden">
                 <div 
                   className={`absolute top-0 left-0 h-full rounded-r-full transition-all duration-500 ${hoverIdx === idx ? 'bg-emerald-400' : 'bg-emerald-500/70'}`} 
                   style={{ width: `${item.v2}%` }}
                 />
               </div>
            </div>
            <div className={`text-[10px] w-8 text-slate-500 transition-opacity ${hoverIdx === idx ? 'opacity-100' : 'opacity-0'}`}>
               {item.v1}%
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-6 text-[10px] text-slate-500">
         <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500"></div> 生成量</div>
         <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> 转化量</div>
      </div>
    </SectionCard>
  );
};

const TouchpointTab = () => (
  <div className="space-y-6 animate-in fade-in duration-300">
    {/* Generation KPIs Row (New) */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <KPICard label={GENERATION_KPIS[0].label} value={GENERATION_KPIS[0].value} trend={GENERATION_KPIS[0].trend} icon={Coins} iconType="coins" />
      <KPICard label={GENERATION_KPIS[1].label} value={GENERATION_KPIS[1].value} trend={GENERATION_KPIS[1].trend} icon={Wallet} iconType="wallet" />
      <KPICard label={GENERATION_KPIS[2].label} value={GENERATION_KPIS[2].value} trend={GENERATION_KPIS[2].trend} icon={MessageSquare} iconType="message" />
      <KPICard label={GENERATION_KPIS[3].label} value={GENERATION_KPIS[3].value} trend={GENERATION_KPIS[3].trend} icon={Zap} iconType="zap" />
    </div>

    {/* Business KPIs Row (Existing) */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <KPICard label={DIAGNOSIS_KPIS[0].label} value={DIAGNOSIS_KPIS[0].value} trend={DIAGNOSIS_KPIS[0].trend} icon={MousePointer} iconType="click" />
      <KPICard label={DIAGNOSIS_KPIS[1].label} value={DIAGNOSIS_KPIS[1].value} trend={DIAGNOSIS_KPIS[1].trend} icon={ShoppingCart} iconType="conversion" />
      <KPICard label={DIAGNOSIS_KPIS[2].label} value={DIAGNOSIS_KPIS[2].value} trend={DIAGNOSIS_KPIS[2].trend} icon={ThumbsUp} iconType="like" />
      <KPICard label={DIAGNOSIS_KPIS[3].label} value={DIAGNOSIS_KPIS[3].value} trend={DIAGNOSIS_KPIS[3].trend} icon={Clock} iconType="time" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[380px]">
      <InteractiveChannelChart />
      <SectionCard title="生成趋势" icon={TrendingUp}>
        <div className="flex-1 h-full relative flex items-end justify-between px-2 pb-6 border-b border-l border-slate-700/50">
           {/* Mock Line Chart Visualization */}
           <svg className="absolute inset-0 w-full h-full pointer-events-none p-2" preserveAspectRatio="none">
             <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{stopColor:'rgba(16, 185, 129, 0.2)', stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:'rgba(16, 185, 129, 0)', stopOpacity:0}} />
                </linearGradient>
             </defs>
             <path d="M0,150 C50,130 100,100 150,80 S250,40 350,10" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4" />
             <path d="M0,220 C50,215 100,200 150,190 S250,180 350,170 L350,300 L0,300 Z" fill="url(#grad1)" />
             <path d="M0,220 C50,215 100,200 150,190 S250,180 350,170" fill="none" stroke="#10B981" strokeWidth="2" />
           </svg>
           {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
             <span key={d} className="text-[10px] text-slate-500 translate-y-6">{d}</span>
           ))}
        </div>
      </SectionCard>
    </div>

    <SectionCard title="渠道详细数据" icon={Database}>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-700/50 text-xs text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-4 font-bold">渠道</th>
              <th className="py-3 px-4 font-bold text-right">生成量</th>
              <th className="py-3 px-4 font-bold text-right">使用量</th>
              <th className="py-3 px-4 font-bold text-right">点击率</th>
              <th className="py-3 px-4 font-bold text-right">转化率</th>
              <th className="py-3 px-4 font-bold text-right">趋势</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/30">
            {DIAGNOSIS_CHANNEL_DATA.map(row => (
              <tr key={row.channel} className="hover:bg-white/5 transition-colors text-sm">
                <td className="py-4 px-4 font-bold text-white">{row.channel}</td>
                <td className="py-4 px-4 text-slate-400 text-right font-mono">{row.generated.toLocaleString()}</td>
                <td className="py-4 px-4 text-slate-400 text-right font-mono">{row.used.toLocaleString()}</td>
                <td className="py-4 px-4 text-emerald-400 text-right font-bold">{row.clickRate}</td>
                <td className="py-4 px-4 text-slate-300 text-right">{row.conversionRate}</td>
                <td className={`py-4 px-4 text-right font-medium ${row.trend.includes('+') ? 'text-emerald-500' : 'text-rose-500'}`}>{row.trend}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  </div>
);

// --- 2. Hot Topic Analysis Tab ---

const HotTopicTab = () => {
  const [selectedTopic, setSelectedTopic] = useState("早C晚A");
  
  const topics = [
    { name: "早C晚A", heat: 92, trend: "+12%" },
    { name: "以油养肤", heat: 85, trend: "+8%" },
    { name: "精简护肤", heat: 78, trend: "-2%" },
    { name: "纯净美妆", heat: 65, trend: "+15%" },
    { name: "多巴胺穿搭", heat: 54, trend: "-5%" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-300 h-[600px]">
      <SectionCard title="话题热度榜" icon={Flame} className="lg:col-span-1">
        <div className="space-y-2">
          {topics.map((topic, idx) => (
            <div 
              key={topic.name}
              onClick={() => setSelectedTopic(topic.name)}
              className={`p-3 rounded-lg flex items-center justify-between cursor-pointer transition-all border ${
                selectedTopic === topic.name 
                  ? 'bg-eureka-primary/20 border-eureka-primary text-white' 
                  : 'bg-transparent border-transparent hover:bg-white/5 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${idx < 3 ? 'bg-orange-500 text-white' : 'bg-slate-700'}`}>
                  {idx + 1}
                </span>
                <span className="font-bold text-sm">{topic.name}</span>
              </div>
              <div className="text-xs font-mono">{topic.heat} 🔥</div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title={`${selectedTopic} - 趋势分析`} icon={Activity} className="lg:col-span-2">
        <div className="flex-1 flex flex-col items-center justify-center relative">
           <div className="absolute top-4 right-4 flex gap-2">
              <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-400">近7天</span>
              <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-400">全网声量</span>
           </div>
           
           {/* Dynamic SVG Chart Simulation based on topic */}
           <svg className="w-full h-64 overflow-visible" viewBox="0 0 400 200">
              <defs>
                <linearGradient id="heatGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F97316" stopOpacity="0.5"/>
                  <stop offset="100%" stopColor="#F97316" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path 
                d={selectedTopic === "早C晚A" ? "M0,150 Q100,50 200,100 T400,20" : "M0,100 Q100,150 200,80 T400,120"} 
                fill="url(#heatGradient)" 
                stroke="#F97316" 
                strokeWidth="3"
                className="transition-all duration-500 ease-in-out"
              />
              <line x1="0" y1="200" x2="400" y2="200" stroke="#334155" strokeWidth="1" />
              <line x1="0" y1="0" x2="0" y2="200" stroke="#334155" strokeWidth="1" />
           </svg>
           <div className="flex justify-between w-full text-[10px] text-slate-500 mt-4 px-2">
              <span>Day 1</span><span>Day 2</span><span>Day 3</span><span>Day 4</span><span>Day 5</span><span>Day 6</span><span>Today</span>
           </div>
        </div>
      </SectionCard>
    </div>
  );
};

// --- 3. FAQ Management Tab ---

const FAQTab = () => {
  const [filter, setFilter] = useState("");
  const [faqs, setFaqs] = useState(MOCK_FAQS);
  const [editingId, setEditingId] = useState<string | null>(null);

  const filtered = faqs.filter(f => f.question.includes(filter) || f.answer.includes(filter));

  return (
    <SectionCard title="常见问题管理 (Top FAQs)" icon={AlertCircle} className="animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-6">
         <div className="relative w-64">
           <input 
             className="w-full bg-[#0B0F19] border border-eureka-border rounded-lg pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-eureka-primary transition-all" 
             placeholder="搜索问题..." 
             value={filter}
             onChange={e => setFilter(e.target.value)}
           />
           <Search size={14} className="absolute left-3 top-2.5 text-slate-500" />
         </div>
         <button className="px-3 py-1.5 bg-eureka-primary text-white text-xs font-bold rounded hover:bg-eureka-primary/80 transition-colors">
           + 新增问答
         </button>
      </div>
      <div className="overflow-hidden rounded-lg border border-eureka-border">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#0B0F19] text-xs text-slate-500 uppercase">
              <th className="py-3 px-4 font-medium">问题</th>
              <th className="py-3 px-4 font-medium w-1/2">标准回答</th>
              <th className="py-3 px-4 font-medium">频次</th>
              <th className="py-3 px-4 font-medium">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-eureka-border">
            {filtered.map(faq => (
              <tr key={faq.id} className="hover:bg-white/5 transition-colors group">
                <td className="py-4 px-4 text-sm font-bold text-white align-top">{faq.question}</td>
                <td className="py-4 px-4 text-xs text-slate-400 leading-relaxed align-top">
                  {editingId === faq.id ? (
                    <textarea className="w-full bg-[#0B0F19] p-2 rounded text-slate-200 border border-slate-600" defaultValue={faq.answer} />
                  ) : faq.answer}
                </td>
                <td className="py-4 px-4 text-sm text-eureka-primary font-bold font-mono align-top">{faq.frequency}</td>
                <td className="py-4 px-4 align-top">
                   <button 
                     onClick={() => setEditingId(editingId === faq.id ? null : faq.id)}
                     className="p-1.5 text-slate-500 hover:text-white rounded hover:bg-white/10 transition-colors"
                   >
                     {editingId === faq.id ? <Save size={14} className="text-emerald-400"/> : <Edit2 size={14}/>}
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
};

// --- 4. AI Model Monitoring Tab ---

const LiveLatencyChart = () => {
  const [dataPoints, setDataPoints] = useState<number[]>(new Array(20).fill(50));
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints(prev => [...prev.slice(1), Math.random() * 80 + 20]);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const points = dataPoints.map((val, idx) => `${idx * (100 / 19)},${100 - val}`).join(" ");

  return (
    <div className="h-32 w-full bg-[#0B0F19] rounded-lg border border-slate-800 relative overflow-hidden flex items-end">
       <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <polyline points={points} fill="none" stroke="#6366F1" strokeWidth="2" vectorEffect="non-scaling-stroke" />
       </svg>
       <div className="absolute top-2 right-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[10px] text-slate-400 font-mono">LIVE</span>
       </div>
    </div>
  );
}

const AIModelTab = () => (
  <div className="space-y-6 animate-in fade-in duration-300">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {MODEL_HEALTH_METRICS.map(model => (
         <div key={model.name} className="bg-[#151B2B] border border-eureka-border rounded-xl p-6 shadow-sm relative overflow-hidden group hover:border-eureka-primary/50 transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <Cpu size={64} className="text-white" />
            </div>
            <div className="flex justify-between items-start mb-4">
               <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wide">{model.name}</h4>
               <span className={`px-2 py-0.5 text-[10px] font-bold rounded border ${model.status === 'Healthy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                 {model.status}
               </span>
            </div>
            
            <div className="mb-4">
               <div className="text-[10px] text-slate-500 uppercase mb-1">Live Latency</div>
               <LiveLatencyChart />
            </div>

            <div className="flex gap-4 text-xs border-t border-white/5 pt-4">
               <div className="flex-1">
                  <div className="text-slate-500 mb-0.5">Avg Latency</div>
                  <div className="font-mono font-bold text-white">{model.latency}</div>
               </div>
               <div className="flex-1">
                  <div className="text-slate-500 mb-0.5">Error Rate</div>
                  <div className="font-mono font-bold text-white">{model.errorRate}</div>
               </div>
            </div>
         </div>
      ))}
    </div>
  </div>
);

// --- 5. Performance Tracking Tab ---

const PerformanceTab = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-300">
     <SectionCard title="System Load" icon={Activity}>
        <div className="space-y-6 pt-4">
           {['CPU Usage', 'Memory Usage', 'Disk I/O', 'Network Throughput'].map((metric, idx) => {
             const val = Math.floor(Math.random() * 40) + 30 + (idx * 10);
             return (
               <div key={metric}>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                     <span>{metric}</span>
                     <span className="text-white font-mono">{val}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                     <div className={`h-full rounded-full ${val > 80 ? 'bg-red-500' : 'bg-eureka-primary'}`} style={{ width: `${val}%` }}></div>
                  </div>
               </div>
             )
           })}
        </div>
     </SectionCard>

     <SectionCard title="API Endpoint Latency" icon={Zap}>
        <div className="h-64 flex items-end justify-between gap-4 pt-4">
           {[
             { name: '/generate', val: 1200 },
             { name: '/auth', val: 150 },
             { name: '/trends', val: 400 },
             { name: '/history', val: 200 },
             { name: '/assets', val: 600 }
           ].map(ep => (
             <div key={ep.name} className="flex-1 flex flex-col items-center group">
                <div className="w-full bg-slate-800 rounded-t-md relative overflow-hidden h-full flex items-end">
                   <div 
                     className="w-full bg-indigo-500/50 group-hover:bg-indigo-500 transition-colors" 
                     style={{ height: `${(ep.val / 1500) * 100}%` }}
                   ></div>
                </div>
                <div className="text-[10px] text-slate-500 mt-2 font-mono group-hover:text-white transition-colors">{ep.name}</div>
                <div className="text-[9px] text-slate-600 font-mono opacity-0 group-hover:opacity-100 transition-opacity absolute mb-8">{ep.val}ms</div>
             </div>
           ))}
        </div>
     </SectionCard>
  </div>
);

// --- Main Diagnosis View ---

export const DiagnosisView = () => {
  const [activeTab, setActiveTab] = useState('touchpoint');

  const tabs = [
    { id: 'touchpoint', label: '触点分析', icon: MousePointer },
    { id: 'hottopic', label: '热点话题分析', icon: Flame },
    { id: 'faq', label: '常见问题管理', icon: MessageSquare },
    { id: 'aimodel', label: 'AI 模型监控', icon: Zap },
    { id: 'performance', label: '性能跟踪', icon: Activity },
  ];

  return (
    <div className="flex flex-col h-full bg-eureka-dark">
      <div className="p-8 pb-0">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-eureka-primary/20 border border-eureka-primary/30 rounded-xl flex items-center justify-center text-eureka-primary shadow-[0_0_15px_rgba(99,102,241,0.3)]">
              <BarChart2 size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wide">诊断模块</h1>
              <p className="text-sm text-slate-400">多触点分析、热点追踪、业务效果可视化看板</p>
            </div>
          </div>
          <div className="flex gap-3">
             <button className="px-4 py-2 bg-[#151B2B] border border-eureka-border rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:border-eureka-primary flex items-center gap-2 transition-all">
                <Filter size={16} /> 筛选
             </button>
             <button className="px-4 py-2 bg-[#151B2B] border border-eureka-border rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:border-eureka-primary flex items-center gap-2 transition-all">
                <Download size={16} /> 导出报告
             </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 bg-[#0F1623] border border-eureka-border p-1 rounded-lg w-max mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-bold rounded-md flex items-center gap-2 transition-all ${
                activeTab === tab.id 
                  ? 'bg-eureka-panel text-white shadow-lg border border-eureka-border' 
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`}
            >
              {activeTab === tab.id && <tab.icon size={16} className="text-eureka-primary" />}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar">
        {activeTab === 'touchpoint' && <TouchpointTab />}
        {activeTab === 'hottopic' && <HotTopicTab />}
        {activeTab === 'faq' && <FAQTab />}
        {activeTab === 'aimodel' && <AIModelTab />}
        {activeTab === 'performance' && <PerformanceTab />}
      </div>
    </div>
  );
};