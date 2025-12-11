
import React from 'react';
import { ArrowUpRight, Edit3 } from 'lucide-react';
import { Badge } from './UIComponents';

export const AnalysisView = ({ onUseTrend }: { onUseTrend: (t: string) => void }) => (
  <div className="flex-1 p-10 bg-eureka-dark overflow-y-auto">
    <h2 className="text-3xl font-light text-white mb-8">Trend <span className="font-bold text-eureka-primary">Radar</span></h2>
    <div className="grid grid-cols-3 gap-6">
      {[
        { t: "Glass Skin", g: "+124%", c: "Skincare" },
        { t: "Morning C Night A", g: "+89%", c: "Routine" },
        { t: "Clean Beauty", g: "+56%", c: "Concept" }
      ].map((item, i) => (
        <div key={i} className="glass-panel p-6 rounded-xl hover:border-eureka-primary/50 transition-all group relative overflow-hidden">
           <div className="flex justify-between items-start mb-6">
             <Badge color="outline">{item.c}</Badge>
             <span className="text-emerald-400 text-xs font-bold flex items-center gap-1"><ArrowUpRight size={12}/> {item.g}</span>
           </div>
           <h3 className="text-xl font-medium text-white mb-6 group-hover:text-eureka-accent">{item.t}</h3>
           <button onClick={() => onUseTrend(item.t)} className="w-full py-2 border border-eureka-border text-slate-300 text-xs font-bold uppercase rounded hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2">
             <Edit3 size={14} /> Use for Mimicry
           </button>
        </div>
      ))}
    </div>
  </div>
);
