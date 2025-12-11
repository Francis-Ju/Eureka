
import React, { useState } from 'react';
import { BookOpen, Database, MessageSquare, FileText, Plus } from 'lucide-react';
import { AudienceData } from '../types';
import { Badge } from './UIComponents';

export const KnowledgeView = ({ audienceData }: { audienceData: AudienceData }) => {
  const [activeTab, setActiveTab] = useState('crm');
  return (
    <div className="flex h-full bg-eureka-dark">
      <div className="w-64 border-r border-eureka-border bg-[#0F1623]/50 p-4 space-y-1">
         {[
           {id: 'brand', label: 'Brand Assets', icon: BookOpen},
           {id: 'crm', label: 'CRM Tags', icon: Database},
           {id: 'wecom', label: 'WeCom Tags', icon: MessageSquare}
         ].map(tab => (
           <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full text-left px-4 py-3 rounded-lg text-xs font-bold flex items-center gap-3 transition-all ${activeTab === tab.id ? 'bg-eureka-primary text-white' : 'text-slate-400 hover:bg-white/5'}`}>
             <tab.icon size={16} /> {tab.label}
           </button>
         ))}
      </div>
      <div className="flex-1 p-8 overflow-y-auto">
         <h2 className="text-2xl font-light text-white mb-6 capitalize">{activeTab} Management</h2>
         {activeTab === 'brand' ? (
           <div className="grid grid-cols-2 gap-4 max-w-4xl">
             {['Brand Guidelines 2025.pdf', 'Product Tone.docx'].map(f => (
               <div key={f} className="flex items-center gap-4 p-4 rounded-lg bg-eureka-panel border border-eureka-border hover:border-eureka-primary/50 cursor-pointer group">
                 <div className="p-3 bg-indigo-500/10 rounded-lg text-indigo-400"><FileText size={20}/></div>
                 <div><p className="text-sm font-medium text-slate-200 group-hover:text-white">{f}</p><p className="text-[10px] text-slate-500">Updated today</p></div>
               </div>
             ))}
           </div>
         ) : (
           <div className="space-y-6 max-w-4xl">
             {audienceData[activeTab as 'crm'|'wecom'].map(cat => (
               <div key={cat.id} className="bg-eureka-panel border border-eureka-border rounded-lg p-5">
                 <div className="flex justify-between mb-4">
                   <h4 className="text-sm font-bold text-white">{cat.name}</h4>
                   <span className="text-[10px] text-slate-500 bg-white/5 px-2 py-0.5 rounded">{cat.tags.length} active</span>
                 </div>
                 <div className="flex flex-wrap gap-2">
                   {cat.tags.map(tag => <Badge key={tag} color="primary">{tag}</Badge>)}
                   <Badge color="outline"><Plus size={10} className="mr-1"/> Add</Badge>
                 </div>
               </div>
             ))}
           </div>
         )}
      </div>
    </div>
  );
};
