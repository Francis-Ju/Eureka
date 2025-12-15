import React, { useState } from 'react';
import { Sparkles, TrendingUp, Database, BarChart2, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { Language, ModuleType, User } from '../types';
import { DICTIONARY } from '../constants';

export const Sidebar = ({ 
  lang, activeModule, onNavigate, user
}: { 
  lang: Language, activeModule: ModuleType, onNavigate: (m: ModuleType) => void, user: User
}) => {
  const [collapsed, setCollapsed] = useState(false);
  
  // Defensive check to ensure dictionary exists
  const dict = DICTIONARY[lang] || DICTIONARY['zh'];
  const nav = dict.nav;

  // Generate initials for avatar if needed
  const initials = user.avatar || user.username.slice(0, 2).toUpperCase();

  return (
    <div className={`${collapsed ? 'w-20' : 'w-64'} bg-eureka-dark border-r border-eureka-border flex flex-col justify-between shrink-0 z-30 transition-all duration-300 relative`}>
      {/* Toggle Button */}
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-8 z-50 w-6 h-6 bg-eureka-panel border border-eureka-border rounded-full flex items-center justify-center text-slate-400 hover:text-white shadow-[0_0_10px_rgba(0,0,0,0.3)] hover:scale-110 transition-all"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      <div>
        <div className={`h-16 flex items-center ${collapsed ? 'justify-center' : 'px-6'} border-b border-eureka-border gap-3 overflow-hidden transition-all`}>
           <div className="w-8 h-8 bg-tech-gradient rounded-lg flex items-center justify-center text-white font-bold shadow-lg shrink-0">E</div>
           <span className={`font-bold text-sm tracking-widest text-white whitespace-nowrap transition-opacity duration-300 ${collapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'}`}>
             L'ORÉAL <span className="font-light text-indigo-300">EUREKA</span>
           </span>
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
              className={`w-full flex items-center p-3 rounded-lg transition-all group relative overflow-hidden ${
                collapsed ? 'justify-center px-0' : ''
              } ${activeModule === item.id ? 'text-white shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'text-slate-500 hover:text-indigo-200 hover:bg-white/5'}`}
              title={collapsed ? item.label : ''}
            >
              {activeModule === item.id && <div className="absolute inset-0 bg-tech-gradient opacity-100"></div>}
              <item.icon size={18} className="relative z-10" />
              {!collapsed && <span className={`relative z-10 ml-3 text-sm font-medium ${activeModule === item.id ? 'font-bold' : ''}`}>{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-eureka-border bg-[#080B14]">
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
           <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white border border-slate-500 shrink-0">{initials}</div>
           {!collapsed && (
             <div className="text-xs text-slate-400 overflow-hidden animate-in fade-in duration-300">
               <p className="text-white font-medium truncate">{user.username}</p>
               <p className="truncate opacity-70">{user.role}</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};