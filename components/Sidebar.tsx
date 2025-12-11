import React from 'react';
import { Sparkles, TrendingUp, Database, BarChart2, Settings } from 'lucide-react';
import { Language, ModuleType } from '../types';
import { DICTIONARY } from '../constants';

export const Sidebar = ({ 
  lang, activeModule, onNavigate 
}: { 
  lang: Language, activeModule: ModuleType, onNavigate: (m: ModuleType) => void 
}) => {
  // Defensive check to ensure dictionary exists
  const dict = DICTIONARY[lang] || DICTIONARY['zh'];
  const nav = dict.nav;

  return (
    <div className="w-64 bg-eureka-dark border-r border-eureka-border flex flex-col justify-between shrink-0 z-30">
      <div>
        <div className="h-16 flex items-center px-6 border-b border-eureka-border gap-3">
           <div className="w-8 h-8 bg-tech-gradient rounded-lg flex items-center justify-center text-white font-bold shadow-lg">E</div>
           <span className="font-bold text-sm tracking-widest text-white">L'ORÉAL <span className="font-light text-indigo-300">EUREKA</span></span>
        </div>
        <nav className="p-4 space-y-2">
          {[
            { id: 'generation', label: nav.generation, icon: Sparkles },
            { id: 'analysis', label: nav.analysis, icon: TrendingUp },
            { id: 'knowledge', label: nav.knowledge, icon: Database },
            { id: 'diagnosis', label: nav.diagnosis, icon: BarChart2 },
            { id: 'management', label: nav.management, icon: Settings },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as ModuleType)}
              className={`w-full flex items-center p-3 rounded-lg transition-all group relative overflow-hidden ${activeModule === item.id ? 'text-white shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'text-slate-500 hover:text-indigo-200 hover:bg-white/5'}`}
            >
              {activeModule === item.id && <div className="absolute inset-0 bg-tech-gradient opacity-100"></div>}
              <item.icon size={18} className="relative z-10" />
              <span className={`relative z-10 ml-3 text-sm font-medium ${activeModule === item.id ? 'font-bold' : ''}`}>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-eureka-border bg-[#080B14]">
        <div className="flex items-center gap-3">
           <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white border border-slate-500">JD</div>
           <div className="text-xs text-slate-400"><p className="text-white font-medium">Jane Doe</p><p>Global Marketing</p></div>
        </div>
      </div>
    </div>
  );
};