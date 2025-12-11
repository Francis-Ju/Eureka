
import React, { useState } from 'react';
import { 
  ArrowUpRight, Calendar, Filter, Layers, Flame, ChevronDown, Sparkles, 
  Plus, X, Search, FileText, Globe, MessageSquare, Zap, Cpu, Tag
} from 'lucide-react';
import { MOCK_TRENDS_DATA } from '../constants';
import { TrendCategory, TrendItem } from '../types';

// Modal for Detailed Trend View
const TrendDetailModal = ({ item, onClose }: { item: TrendItem, onClose: () => void }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-5xl bg-[#151B2B] border border-eureka-border rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white z-10">
          <X size={24} />
        </button>

        <div className="flex h-full">
          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar border-r border-eureka-border">
            <h2 className="text-2xl font-bold text-eureka-accent mb-4">{item.title}</h2>
            
            {/* Meta Stats Row */}
            <div className="flex items-center gap-6 text-xs text-slate-400 mb-8 pb-6 border-b border-white/5">
              <div className="flex items-center gap-1.5"><Flame size={14} className="text-orange-500" /> <span className="text-orange-400 font-bold">{item.heat}</span> 热度</div>
              <div className="flex items-center gap-1.5"><Calendar size={14} /> {item.date}</div>
              <div className="flex items-center gap-1.5"><Globe size={14} /> {item.region || 'Global'}</div>
              <div className="flex items-center gap-1.5"><FileText size={14} /> {item.sourceCount || 3} 个资讯来源</div>
            </div>

            {/* Innovation Overview */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-white mb-3">创新概述</h3>
              <p className="text-sm text-slate-300 leading-7 bg-white/5 p-4 rounded-lg border border-white/5">
                {item.details?.overview || item.description}
              </p>
            </div>

            {/* Detailed Breakdown */}
            {item.details?.points && (
              <div className="space-y-6">
                {item.details.points.map((point, idx) => (
                  <div key={idx}>
                    <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-slate-700 flex items-center justify-center text-[10px] text-white">{idx + 1}</span>
                      {point.title}
                    </h4>
                    <ul className="pl-2 space-y-2">
                      {point.items.map((pi, pidx) => (
                        <li key={pidx} className="text-xs text-slate-400 pl-4 relative before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-slate-600 before:rounded-full">
                          {pi}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar / Action Area */}
          <div className="w-80 bg-[#0B0F19] p-6 flex flex-col shrink-0">
             <div className="mb-8">
               <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">技术领域</h4>
               <div className="flex flex-wrap gap-2">
                 {item.details?.tags?.map(tag => (
                   <span key={tag} className="px-2.5 py-1 rounded border border-slate-700 bg-slate-800 text-[10px] text-slate-300 flex items-center gap-1">
                     <Tag size={10} /> {tag}
                   </span>
                 )) || <span className="text-xs text-slate-600">无标签</span>}
               </div>
             </div>

             <div className="mt-auto space-y-3">
               <button className="w-full py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-200 text-xs font-bold rounded flex items-center justify-center gap-2 transition-all">
                 <Zap size={14} /> 查看技术雷达
               </button>
               <button className="w-full py-3 bg-tech-gradient text-white text-xs font-bold rounded shadow-lg hover:shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all">
                 <Cpu size={14} /> 生成AI趋势报告
               </button>
               <button className="w-full py-3 bg-pink-600/20 border border-pink-500/30 text-pink-300 hover:bg-pink-600/30 text-xs font-bold rounded flex items-center justify-center gap-2 transition-all">
                 <Sparkles size={14} /> 生成AI概念报告
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal for Adding New AI Collection
const AICollectionModal = ({ isOpen, onClose, onConfirm }: { isOpen: boolean, onClose: () => void, onConfirm: (topic: string) => void }) => {
  const [topic, setTopic] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = () => {
    if (!topic) return;
    setIsProcessing(true);
    // Simulate AI Processing
    setTimeout(() => {
      setIsProcessing(false);
      onConfirm(topic);
      setTopic("");
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-[#151B2B] border border-eureka-border rounded-xl shadow-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
          <Sparkles className="text-eureka-primary" size={20} /> AI 智能采集
        </h3>
        <p className="text-xs text-slate-400 mb-6">输入感兴趣的主题，AI将自动聚合全网最新趋势内容。</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-2">采集主题</label>
            <input 
              className="w-full bg-[#0B0F19] border border-eureka-border rounded px-3 py-2 text-sm text-white focus:border-eureka-primary outline-none"
              placeholder="例如：合成生物学护肤..."
              value={topic}
              onChange={e => setTopic(e.target.value)}
              autoFocus
            />
          </div>
          
          <button 
            onClick={handleConfirm}
            disabled={isProcessing || !topic}
            className="w-full py-2.5 bg-tech-gradient text-white text-sm font-bold rounded flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                正在扫描全网数据...
              </>
            ) : (
              '开始采集'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export const AnalysisView = ({ onUseTrend }: { onUseTrend: (t: string) => void }) => {
  const [trends, setTrends] = useState<TrendCategory[]>(MOCK_TRENDS_DATA);
  const [timeFilter, setTimeFilter] = useState('全部时间');
  const [categoryFilter, setCategoryFilter] = useState('全部形式');
  const [sortOrder, setSortOrder] = useState('热度降序');
  
  const [selectedTrendItem, setSelectedTrendItem] = useState<TrendItem | null>(null);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);

  // Filter Logic
  const filteredTrends = trends.filter(trend => {
    if (categoryFilter !== '全部形式' && trend.category !== categoryFilter) return false;
    return true;
  });

  const categories = ['全部形式', ...Array.from(new Set(MOCK_TRENDS_DATA.map(t => t.category)))];

  const handleAddTrendBlock = (topic: string) => {
    const newBlock: TrendCategory = {
      id: `new_${Date.now()}`,
      hashtag: `#${topic}`,
      category: 'AI 采集',
      description: `AI 刚刚为您生成的关于 "${topic}" 的最新趋势分析。`,
      count: 5,
      items: [
        { 
          id: `ai_${Date.now()}_1`, rank: 1, title: `${topic} 的最新突破`, date: '刚刚', heat: 99, 
          description: `AI 检测到关于 ${topic} 的讨论热度正在急剧上升，主要集中在技术应用层面。`,
          region: '全球', sourceCount: 15,
          details: {
             overview: `针对 ${topic} 的最新市场动态分析显示，该领域正在经历快速的技术迭代。`,
             points: [{ title: "核心发现", items: ["技术应用门槛降低", "消费者认知度提升"] }],
             tags: ["AI采集", "热点"]
          }
        },
        { 
          id: `ai_${Date.now()}_2`, rank: 2, title: `${topic} 市场应用案例`, date: '1小时前', heat: 85,
          description: `多个头部品牌开始尝试将 ${topic} 融入其核心产品线。`,
          details: { overview: "略", points: [], tags: [] } 
        },
        { id: `ai_${Date.now()}_3`, rank: 3, title: `消费者对 ${topic} 的反馈`, date: '2小时前', heat: 72, description: "社交媒体情感分析显示正面评价居多。", details: { overview: "略", points: [], tags: [] } },
        { id: `ai_${Date.now()}_4`, rank: 4, title: `${topic} 产业链分析`, date: '4小时前', heat: 60, description: "上游原材料供应趋于稳定。", details: { overview: "略", points: [], tags: [] } },
        { id: `ai_${Date.now()}_5`, rank: 5, title: `未来 6 个月 ${topic} 预测`, date: '今日', heat: 55, description: "预计将出现更多细分场景的应用。", details: { overview: "略", points: [], tags: [] } }
      ]
    };
    setTrends(prev => [newBlock, ...prev]);
  };

  const SelectButton = ({ icon: Icon, label, value, options, onChange }: { icon?: any, label?: string, value: string, options: string[], onChange: (v: string) => void }) => (
    <div className="relative group">
       <button className="flex items-center gap-2 bg-[#0F1623] border border-eureka-border text-slate-300 px-3 py-1.5 rounded-md text-xs font-medium hover:border-eureka-primary/50 hover:text-white transition-all">
         {Icon && <Icon size={14} className="text-slate-500" />}
         {label && <span className="text-slate-500">{label}:</span>}
         <span>{value}</span>
         <ChevronDown size={14} className="text-slate-500" />
       </button>
       <select 
         className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
         value={value} onChange={(e) => onChange(e.target.value)}
       >
         {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
       </select>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-eureka-dark overflow-hidden relative">
      <TrendDetailModal item={selectedTrendItem!} onClose={() => setSelectedTrendItem(null)} />
      <AICollectionModal isOpen={isCollectionModalOpen} onClose={() => setIsCollectionModalOpen(false)} onConfirm={handleAddTrendBlock} />

      {/* Top Filter Bar */}
      <div className="h-16 border-b border-eureka-border bg-[#0B0F19] px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm mr-4">
            <Flame size={18} className="text-eureka-accent" /> 创新看板
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">时间:</span>
            <SelectButton value={timeFilter} options={['近24小时', '近一周', '近一月', '全部时间']} onChange={setTimeFilter} />
          </div>

          <div className="flex items-center gap-2">
             <span className="text-xs text-slate-500">区域:</span>
             <SelectButton value="全球" options={['全球', '中国', '亚太']} onChange={() => {}} />
          </div>

           <div className="flex items-center gap-2">
             <span className="text-xs text-slate-500">内容形式:</span>
             <SelectButton value={categoryFilter} options={categories} onChange={setCategoryFilter} />
           </div>

           {/* New AI Collection Button */}
           <button 
             onClick={() => setIsCollectionModalOpen(true)}
             className="ml-4 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/50 text-indigo-300 rounded text-xs font-bold hover:bg-indigo-500/20 hover:text-white transition-all flex items-center gap-2"
           >
             <Sparkles size={12} /> AI 获取最新趋势
           </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">排序:</span>
          <SelectButton value={sortOrder} options={['热度降序', '最新发布', '相关性']} onChange={setSortOrder} />
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrends.map(trend => (
            <div key={trend.id} className="bg-[#151B2B] border border-eureka-border rounded-xl flex flex-col hover:border-eureka-primary/40 transition-all group overflow-hidden shadow-lg animate-in fade-in zoom-in-95 duration-300">
              {/* Card Header */}
              <div className="p-5 border-b border-white/5 bg-[#1A2030]/50">
                <div className="flex justify-between items-start mb-1">
                   <h3 className="text-base font-bold text-white group-hover:text-eureka-primary transition-colors">{trend.hashtag}</h3>
                   <span className="text-[10px] bg-white/5 text-slate-400 px-2 py-0.5 rounded border border-white/5">{trend.items.length} 个热门选题</span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mt-1">{trend.description}</p>
              </div>

              {/* List Items */}
              <div className="flex-1 p-2">
                {trend.items.slice(0, 5).map((item, idx) => (
                  <div 
                    key={item.id} 
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group/item"
                    onClick={() => setSelectedTrendItem(item)}
                  >
                    <div className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${idx < 3 ? 'bg-eureka-primary text-white' : 'bg-slate-700 text-slate-300'}`}>
                      {item.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-slate-300 group-hover/item:text-indigo-300 font-medium leading-snug mb-1">
                        {item.title}
                      </div>
                      {item.description && (
                         <div className="text-[10px] text-slate-500 leading-tight line-clamp-2 mb-1.5">
                            {item.description}
                         </div>
                      )}
                      <div className="flex items-center justify-between text-[10px] text-slate-600 border-t border-white/5 pt-1.5 mt-1">
                        <span>{item.date}</span>
                        <span className="flex items-center gap-1 group-hover/item:text-orange-400 transition-colors">热度 {item.heat}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Footer Action */}
              <div className="p-3 border-t border-white/5 bg-black/20">
                 <button 
                   onClick={(e) => { e.stopPropagation(); /* Refresh logic simulation */ }}
                   className="w-full py-2 text-xs font-bold text-slate-400 hover:text-white hover:bg-white/5 rounded transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
                 >
                   <Sparkles size={14} /> AI 获取最新趋势选题
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
