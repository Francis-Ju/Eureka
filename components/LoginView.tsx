import React, { useState } from 'react';
import { Hexagon, ArrowRight } from 'lucide-react';
import { BRANDS } from '../constants';
import { User } from '../types';

export const LoginView = ({ onLogin }: { onLogin: (user: User) => void }) => {
  const [username, setUsername] = useState('Admin');
  const [selectedBrand, setSelectedBrand] = useState(BRANDS[0]);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      onLogin({
        username,
        brand: selectedBrand,
        role: 'Marketing Manager',
        avatar: username.slice(0, 2).toUpperCase()
      });
      setLoading(false);
    }, 800);
  };

  return (
    <div className="flex h-screen w-screen bg-[#0B0F19] items-center justify-center relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-glow pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md p-8 glass-panel rounded-2xl border border-white/10 shadow-2xl animate-in fade-in zoom-in-95 duration-500">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-tech-gradient rounded-xl flex items-center justify-center text-white shadow-lg mb-4">
            <span className="text-3xl font-bold">E</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-widest">L'ORÉAL <span className="font-light text-indigo-300">EUREKA</span></h1>
          <p className="text-xs text-slate-400 mt-2 uppercase tracking-widest">GenAI Marketing Platform</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#0F1623] border border-eureka-border rounded-lg py-3 px-4 text-sm text-white focus:border-eureka-primary focus:ring-1 focus:ring-eureka-primary outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Select Brand Tenant</label>
            <div className="relative">
              <select 
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-[#0F1623] border border-eureka-border rounded-lg py-3 px-4 text-sm text-white appearance-none focus:border-eureka-primary focus:ring-1 focus:ring-eureka-primary outline-none transition-all cursor-pointer"
              >
                {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              <div className="absolute right-4 top-3.5 text-slate-500 pointer-events-none">▼</div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-tech-gradient hover:bg-tech-gradient-hover text-white font-bold rounded-lg shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {loading ? 'Authenticating...' : 'Enter Platform'}
            {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-8 text-center text-[10px] text-slate-600">
          &copy; 2024 L'Oréal S.A. Internal Use Only.
        </div>
      </div>
    </div>
  );
};