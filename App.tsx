import React, { useState } from 'react';
import { Globe, Settings, LogOut } from 'lucide-react';
import { Language, ModuleType, AudienceData, User } from './types';
import { INITIAL_AUDIENCE_DATA } from './constants';
import { Sidebar } from './components/Sidebar';
import { LoginView } from './components/LoginView';
import { GenerationView } from './components/GenerationView';
import { KnowledgeView } from './components/KnowledgeView';
import { AnalysisView } from './components/AnalysisView';
import { DiagnosisView } from './components/DiagnosisView';
import { ManagementView } from './components/ManagementView';

const App = () => {
  // Auth State
  const [user, setUser] = useState<User | null>(null);

  // App State
  const [lang, setLang] = useState<Language>('zh');
  const [module, setModule] = useState<ModuleType>('generation');
  const [audienceData, setAudienceData] = useState<AudienceData>(INITIAL_AUDIENCE_DATA);
  const [mimicry, setMimicry] = useState("");

  if (!user) {
    return <LoginView onLogin={setUser} />;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-eureka-dark text-slate-200">
      <Sidebar lang={lang} activeModule={module} onNavigate={setModule} user={user} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-eureka-dark border-b border-eureka-border flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white tracking-wide">{user.brand}</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">{user.role}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={() => setLang(l => l === 'zh' ? 'en' : 'zh')} className="flex items-center gap-2 text-xs font-bold uppercase text-slate-500 hover:text-white px-3 py-1.5 rounded-full border border-transparent hover:border-white/10 transition-colors">
               <Globe size={14} /> {lang === 'zh' ? 'EN' : '中文'}
             </button>
             <div className="w-px h-4 bg-slate-700 mx-2"></div>
             <button onClick={() => setUser(null)} className="text-slate-500 hover:text-red-400 transition-colors" title="Logout">
               <LogOut size={16} />
             </button>
          </div>
        </header>
        <main className="flex-1 overflow-hidden relative">
          {module === 'generation' && <GenerationView lang={lang} audienceData={audienceData} prefilledMimicry={mimicry} setPrefilledMimicry={setMimicry} currentUser={user} />}
          {module === 'knowledge' && <KnowledgeView audienceData={audienceData} setAudienceData={setAudienceData} />}
          {module === 'analysis' && <AnalysisView onUseTrend={(t) => { setMimicry(t); setModule('generation'); }} />}
          {module === 'diagnosis' && <DiagnosisView />}
          {module === 'management' && <ManagementView tenant={user.brand} />}
        </main>
      </div>
    </div>
  );
};

export default App;