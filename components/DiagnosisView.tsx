import React, { useState } from 'react';
import { 
  BarChart2, TrendingUp, TrendingDown, Users, Zap, CheckCircle, 
  ThumbsUp, ThumbsDown, Activity, Calendar, Coins, MessageSquare, Flame
} from 'lucide-react';
import { MOCK_DIAGNOSIS_DATA } from '../constants';

const MetricCard = ({ label, value, change, trend, icon: Icon, color = "indigo" }: any) => {
  const isUp = trend === 'up';
  return (
    <div className="bg-[#151B2B] border border-eureka-border rounded-xl p-5 hover:border-eureka-primary/30 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
           <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">{label}</p>
           <h3 className="text-2xl font-bold text-white font-mono">{value}</h3>
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${color}-500/10 text-${color}-400`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs">
        <span className={`flex items-center gap-0.5 font-bold ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
           {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
           {Math.abs(change)}%
        </span>
        <span className="text-slate-500">vs 上一周期</span>
      </div>
    </div>
  );
};

const SimpleBarChart = ({ data }: { data: any[] }) => {
  const max = Math.max(...data.map(d => Math.max(d.valueA, d.valueB)));
  
  return (
    <div className="flex items-end justify-between h-48 gap-2 pt-6">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
          <div className="w-full flex gap-1 justify-center items-end h-full relative">
             {/* Tooltip */}
             <div className="absolute -top-8 bg-slate-800 text-[10px] text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
               企微: {d.valueA} | 小红书: {d.valueB}
             </div>
             {/* Bar A (WeCom) */}
             <div 
               style={{ height: `${(d.valueA / max) * 100}%` }} 
               className="w-3 bg-eureka-primary rounded-t-sm hover:brightness-110 transition-all"
             ></div>
             {/* Bar B (RedBook) */}
             <div 
               style={{ height: `${(d.valueB / max) * 100}%` }} 
               className="w-3 bg-pink-500 rounded-t-sm hover:brightness-110 transition-all"
             ></div>
          </div>
          <span className="text-[10px] text-slate-500 font-mono uppercase">{d.label}</span>
        </div>
      ))}
    </div>
  );
};

export const DiagnosisView = () => {
  const [timeRange, setTimeRange] = useState('Week');
  const { metrics, genChart, topRegions, interaction } = MOCK_DIAGNOSIS_DATA;

  return (
    <div className="flex flex-col h-full bg-eureka-dark overflow-y-auto p-8 custom-scrollbar space-y-8">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-light text-white mb-1 flex items-center gap-3">
             <Activity className="text-eureka-accent" /> 全域数据诊断
          </h2>
          <p className="text-xs text-slate-500">实时追踪内容生成效率、Token 消耗及全域 BA 活跃度。</p>
        </div>
        <div className="flex bg-[#0F1623] border border-eureka-border rounded-lg p-1">
          {['Day', 'Week', 'Month'].map(r => (
            <button 
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${timeRange === r ? 'bg-eureka-panel text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* 1. Content Generation & Token Stats */}
      <section>
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><Zap size={16} className="text-yellow-400"/> 内容生成数据看板</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
           <MetricCard label="Token 总消耗" value={metrics[0].value} change={metrics[0].change} trend={metrics[0].trend} icon={Coins} color="yellow" />
           <MetricCard label="Token 余额" value={metrics[1].value} change={metrics[1].change} trend={metrics[1].trend} icon={Coins} color="emerald" />
           <MetricCard label="生成内容总量" value={metrics[2].value} change={metrics[2].change} trend={metrics[2].trend} icon={MessageSquare} color="indigo" />
           <MetricCard label="Token/文案 均值" value="245" change={-1.5} trend="down" icon={Zap} color="pink" />
        </div>
        
        <div className="bg-[#151B2B] border border-eureka-border rounded-xl p-6">
           <div className="flex justify-between items-center mb-4">
              <h4 className="text-sm font-bold text-slate-200">渠道生成趋势 (WeCom vs RedBook)</h4>
              <div className="flex gap-4 text-[10px]">
                 <div className="flex items-center gap-2"><div className="w-2 h-2 bg-eureka-primary rounded-full"></div> 企微 1v1</div>
                 <div className="flex items-center gap-2"><div className="w-2 h-2 bg-pink-500 rounded-full"></div> 小红书</div>
              </div>
           </div>
           <SimpleBarChart data={genChart} />
        </div>
      </section>

      {/* 2. BA Insights */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#151B2B] border border-eureka-border rounded-xl p-6">
           <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2"><Users size={16} className="text-indigo-400"/> 区域/城市活跃度 TOP 5</h3>
           <div className="space-y-4">
             {topRegions.map((region, idx) => (
               <div key={region.name} className="flex items-center gap-4">
                 <span className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold ${idx < 3 ? 'bg-white/10 text-white' : 'text-slate-600'}`}>0{idx + 1}</span>
                 <span className="text-xs text-slate-300 w-24">{region.name}</span>
                 <div className="flex-1 h-2 bg-[#0B0F19] rounded-full overflow-hidden">
                   <div style={{ width: `${region.value}%` }} className="h-full bg-tech-gradient rounded-full"></div>
                 </div>
                 <span className="text-xs font-mono text-slate-400">{region.value}%</span>
               </div>
             ))}
           </div>
        </div>

        <div className="bg-[#151B2B] border border-eureka-border rounded-xl p-6 flex flex-col">
           <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2"><CheckCircle size={16} className="text-emerald-400"/> 迭代反馈洞察</h3>
           <div className="flex-1 flex flex-col justify-center items-center gap-6">
              <div className="relative w-32 h-32 rounded-full border-8 border-[#0B0F19]" style={{ background: 'conic-gradient(#10B981 75%, #F43F5E 0)' }}>
                 <div className="absolute inset-2 bg-[#151B2B] rounded-full flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-white">75%</span>
                    <span className="text-[10px] text-slate-500">满意度</span>
                 </div>
              </div>
              <div className="flex gap-8 w-full justify-center">
                 <div className="text-center">
                    <div className="flex items-center gap-1 text-emerald-400 justify-center mb-1"><ThumbsUp size={14}/> 2,450</div>
                    <div className="text-[10px] text-slate-500">点赞 (采纳)</div>
                 </div>
                 <div className="text-center">
                    <div className="flex items-center gap-1 text-rose-400 justify-center mb-1"><ThumbsDown size={14}/> 812</div>
                    <div className="text-[10px] text-slate-500">修改 (重写)</div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 3. Performance Data */}
      <section>
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><Flame size={16} className="text-orange-400"/> 业务效果数据</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
           {interaction.map((metric, idx) => (
             <div key={idx} className="bg-[#151B2B] border border-eureka-border rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#0B0F19] flex items-center justify-center text-slate-400 border border-white/5">
                   {idx === 0 ? <MessageSquare size={16} /> : idx === 1 ? <CheckCircle size={16} /> : <Activity size={16} />}
                </div>
                <div>
                   <div className="text-[10px] text-slate-500 uppercase tracking-wide mb-0.5">{metric.label}</div>
                   <div className="text-lg font-bold text-white flex items-end gap-2">
                     {metric.value} 
                     <span className={`text-[10px] mb-1 ${metric.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                       {metric.trend === 'up' ? '↑' : '↓'} {Math.abs(metric.change)}%
                     </span>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </section>
      
    </div>
  );
};