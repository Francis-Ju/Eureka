import React, { useState, useEffect } from 'react';
import { Users, X, Database, MessageSquare, Check } from 'lucide-react';
import { AudienceData } from '../types';

export const AudienceSelectionModal = ({ 
  isOpen, onClose, audienceData, selectedTags, onConfirm 
}: { 
  isOpen: boolean, onClose: () => void, audienceData: AudienceData, selectedTags: string[], onConfirm: (tags: string[]) => void
}) => {
  const [tempSelected, setTempSelected] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) setTempSelected([...selectedTags]);
  }, [isOpen, selectedTags]);

  const toggleTag = (tag: string) => {
    setTempSelected(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-3xl bg-[#0F1623] border border-eureka-border rounded-xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="h-12 px-5 border-b border-eureka-border flex items-center justify-between bg-eureka-panel/50">
          <div className="flex items-center gap-2 text-white font-medium text-sm">
            <Users size={16} className="text-eureka-primary" /> <span>选择人群标签 (Select Tags)</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={18} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          {[
            { title: "CRM 标签 (CRM Tags)", icon: Database, data: audienceData.crm, color: "text-indigo-400", border: "border-indigo-500" },
            { title: "企微标签 (WeCom Tags)", icon: MessageSquare, data: audienceData.wecom, color: "text-emerald-400", border: "border-emerald-500" }
          ].map((section, idx) => (
            <div key={idx}>
              <h3 className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white mb-4 pb-2 border-b border-white/5`}>
                <section.icon size={14} className={section.color} /> {section.title}
              </h3>
              <div className="space-y-4">
                {section.data.map(cat => (
                  <div key={cat.id}>
                    <p className="text-[10px] uppercase text-slate-500 mb-2">{cat.name}</p>
                    <div className="flex flex-wrap gap-2">
                      {cat.tags.map(tag => {
                        const isSelected = tempSelected.includes(tag);
                        return (
                          <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`px-3 py-1.5 rounded-md text-[11px] transition-all border ${
                              isSelected 
                                ? `bg-white/10 ${section.border} text-white shadow-md` 
                                : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10 hover:text-slate-200'
                            }`}
                          >
                             {isSelected && <Check size={10} className="inline mr-1.5 -ml-0.5" />}
                             {tag}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="h-14 px-5 border-t border-eureka-border bg-eureka-panel/30 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-400">已选择: <span className="text-white font-bold">{tempSelected.length}</span></span>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-4 py-1.5 rounded text-xs font-bold text-slate-400 hover:text-white transition-colors">取消</button>
            <button 
              onClick={() => { onConfirm(tempSelected); onClose(); }}
              className="px-6 py-1.5 rounded bg-tech-gradient text-white text-xs font-bold hover:brightness-110 shadow-lg shadow-indigo-500/20"
            >
              确认选择 (Confirm)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};