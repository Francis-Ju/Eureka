
import React from 'react';
import { X, ChevronDown, Check, Code } from 'lucide-react';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'primary'|'active'|'outline'|'success';
  onRemove?: () => void;
  onClick?: () => void;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, color = "primary", onRemove, onClick, className = "" }) => {
  const styles = {
    primary: "bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500",
    active: "bg-indigo-900/60 text-indigo-200 border-indigo-500/50 shadow-[0_0_8px_rgba(99,102,241,0.2)]",
    outline: "bg-transparent text-slate-400 border-dashed border-slate-600 hover:border-slate-400 hover:text-slate-200",
    success: "bg-emerald-900/40 text-emerald-300 border-emerald-500/30"
  };
  
  return (
    <span 
      onClick={onClick} 
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all border cursor-pointer select-none ${styles[color]} ${className}`}
    >
      {children}
      {onRemove && (
        <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="ml-1 opacity-60 hover:opacity-100 hover:text-white">
          <X size={12} />
        </button>
      )}
    </span>
  );
};

export const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
  <div className="flex items-center gap-2 text-eureka-primary border-b border-eureka-border pb-2 mb-4 mt-6 first:mt-0">
    <Icon size={16} className="text-eureka-accent" /> 
    <span className="uppercase tracking-widest text-xs font-bold text-white/90">{title}</span>
  </div>
);

export const InputLabel = ({ label, subLabel, className = "" }: { label: string, subLabel?: string, className?: string }) => (
  <label className={`block text-[11px] font-bold uppercase tracking-wider text-indigo-100/70 mb-2 flex justify-between items-center ${className}`}>
    <span>{label}</span>
    {subLabel && <span className="text-[9px] bg-white/5 text-slate-400 px-1.5 py-0.5 rounded border border-white/5">{subLabel}</span>}
  </label>
);

export const TechSelect = ({ value, onChange, options, className = "" }: { value: string, onChange: (v: string) => void, options: string[], className?: string }) => (
  <div className={`relative ${className}`}>
    <select 
      className="w-full text-xs bg-[#0F1623] border border-eureka-border text-slate-200 rounded-md py-2.5 px-3 appearance-none outline-none focus:border-eureka-primary focus:ring-1 focus:ring-eureka-primary transition-all cursor-pointer"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
    <ChevronDown size={14} className="absolute right-3 top-3 text-slate-500 pointer-events-none" />
  </div>
);

export const TechInput = ({ value, onChange, placeholder, onEnter, icon: Icon, className = "" }: { value: string, onChange: (v: string) => void, placeholder?: string, onEnter?: () => void, icon?: any, className?: string }) => (
  <div className={`relative ${className}`}>
    <input 
      className="w-full bg-[#0B0F19] border border-eureka-border rounded-md py-2.5 px-3 text-xs text-white placeholder:text-slate-600 outline-none focus:border-eureka-primary focus:ring-1 focus:ring-eureka-primary transition-all"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      onKeyDown={e => e.key === 'Enter' && onEnter && onEnter()}
    />
    {Icon && <Icon size={14} className="absolute right-3 top-3 text-slate-500" />}
  </div>
);

export const RadioCard = ({ selected, onClick, icon: Icon, label, color = "indigo" }: { selected: boolean, onClick: () => void, icon?: any, label: string, color?: "indigo"|"pink" }) => {
  const activeClass = color === "pink" 
    ? "bg-pink-900/20 border-pink-500 text-pink-200 shadow-[0_0_10px_rgba(236,72,153,0.15)]"
    : "bg-indigo-900/20 border-eureka-primary text-indigo-200 shadow-[0_0_10px_rgba(99,102,241,0.15)]";
    
  return (
    <button
      onClick={onClick}
      className={`flex-1 p-2.5 rounded-lg border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
        selected ? activeClass : 'bg-eureka-panel border-eureka-border text-slate-400 hover:border-slate-500 hover:bg-white/5'
      }`}
    >
      {Icon && <Icon size={14} />} {label}
    </button>
  );
};

export const TechSwitch = ({ checked, onChange, label, subLabel }: { checked: boolean, onChange: (v: boolean) => void, label: string, subLabel?: string }) => (
  <div 
    onClick={() => onChange(!checked)}
    className={`flex items-start gap-3 p-2 rounded-lg cursor-pointer border transition-all hover:bg-white/5 ${checked ? 'border-eureka-primary/30 bg-eureka-primary/5' : 'border-transparent'}`}
  >
    <div className={`mt-0.5 w-8 h-4 rounded-full relative transition-colors ${checked ? 'bg-eureka-primary' : 'bg-slate-700'}`}>
      <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-transform ${checked ? 'left-4.5 translate-x-4' : 'left-0.5'}`}></div>
    </div>
    <div className="flex-1">
      <div className={`text-[11px] font-medium leading-tight ${checked ? 'text-white' : 'text-slate-400'}`}>{label}</div>
      {subLabel && <div className="text-[9px] text-slate-500 mt-0.5">{subLabel}</div>}
    </div>
  </div>
);

export const CodeViewer = ({ isOpen, onClose, data }: { isOpen: boolean, onClose: () => void, data: any }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#0F1623] border border-eureka-border rounded-xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        <div className="h-12 px-5 border-b border-eureka-border flex items-center justify-between bg-eureka-panel/50">
          <div className="flex items-center gap-2 text-white font-medium text-sm font-mono">
            <Code size={16} className="text-eureka-accent" /> API Payload Debugger
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={18} /></button>
        </div>
        <div className="flex-1 overflow-auto p-0">
          <pre className="p-4 text-[11px] font-mono text-indigo-200 bg-[#0B0F19] leading-relaxed">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
        <div className="p-4 border-t border-eureka-border bg-eureka-panel/30 flex justify-end">
           <button onClick={onClose} className="px-4 py-1.5 rounded bg-slate-700 text-white text-xs font-bold hover:bg-slate-600">Close</button>
        </div>
      </div>
    </div>
  );
};
