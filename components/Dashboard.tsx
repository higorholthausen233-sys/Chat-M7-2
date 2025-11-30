import React, { useState } from 'react';
import { M7Plan } from '../types';
import { Moon, Sun, Dumbbell, Sparkles, Droplet, User, RefreshCcw } from 'lucide-react';

interface DashboardProps {
  plan: M7Plan;
  userName: string;
  onReset: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ plan, userName, onReset }) => {
  const [activeTab, setActiveTab] = useState<'skincare' | 'structure' | 'physique'>('skincare');

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter text-white">M7 <span className="text-indigo-500">SYSTEM</span></h1>
          <p className="text-zinc-400 mt-1">Protocolo gerado para Agente {userName}</p>
        </div>
        <button onClick={onReset} className="mt-4 md:mt-0 flex items-center text-sm text-zinc-500 hover:text-white transition-colors">
          <RefreshCcw size={14} className="mr-2" /> Reiniciar Protocolo
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <nav className="lg:col-span-1 flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
          <button
            onClick={() => setActiveTab('skincare')}
            className={`flex items-center p-4 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'skincare' ? 'bg-indigo-900/20 text-indigo-300 border border-indigo-500/30' : 'text-zinc-400 hover:bg-zinc-900'
            }`}
          >
            <Droplet size={20} className="mr-3" />
            Protocolo Dérmico
          </button>
          <button
            onClick={() => setActiveTab('structure')}
            className={`flex items-center p-4 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'structure' ? 'bg-indigo-900/20 text-indigo-300 border border-indigo-500/30' : 'text-zinc-400 hover:bg-zinc-900'
            }`}
          >
            <Sparkles size={20} className="mr-3" />
            Arquitetura Facial
          </button>
          <button
            onClick={() => setActiveTab('physique')}
            className={`flex items-center p-4 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'physique' ? 'bg-indigo-900/20 text-indigo-300 border border-indigo-500/30' : 'text-zinc-400 hover:bg-zinc-900'
            }`}
          >
            <Dumbbell size={20} className="mr-3" />
            Estratégia Física
          </button>
        </nav>

        {/* Content Area */}
        <main className="lg:col-span-3 space-y-8">
          
          {/* SKINCARE TAB */}
          {activeTab === 'skincare' && (
            <div className="space-y-8 animate-slide-up">
              
              {/* Routine Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                  <div className="flex items-center mb-6 text-yellow-400">
                    <Sun size={24} className="mr-2" />
                    <h3 className="text-xl font-bold">Matinal</h3>
                  </div>
                  <ul className="space-y-6">
                    {plan.skincareRoutine.morning.map((step, idx) => (
                      <li key={idx} className="relative pl-6 border-l-2 border-zinc-800">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-zinc-900 border-2 border-zinc-700"></div>
                        <h4 className="font-semibold text-white">{step.stepName}</h4>
                        <p className="text-sm text-zinc-400 mt-1">{step.description}</p>
                        <p className="text-xs text-indigo-400 mt-2 font-mono">Usar: {step.products.join(', ')}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                  <div className="flex items-center mb-6 text-blue-400">
                    <Moon size={24} className="mr-2" />
                    <h3 className="text-xl font-bold">Noturno</h3>
                  </div>
                  <ul className="space-y-6">
                    {plan.skincareRoutine.evening.map((step, idx) => (
                      <li key={idx} className="relative pl-6 border-l-2 border-zinc-800">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-zinc-900 border-2 border-zinc-700"></div>
                        <h4 className="font-semibold text-white">{step.stepName}</h4>
                        <p className="text-sm text-zinc-400 mt-1">{step.description}</p>
                        <p className="text-xs text-indigo-400 mt-2 font-mono">Usar: {step.products.join(', ')}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Products Section */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Arsenal Recomendado</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {plan.recommendedProducts.map((prod, idx) => (
                    <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-indigo-500/50 transition-colors group">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{prod.type}</span>
                        <div className="h-2 w-2 rounded-full bg-indigo-500 group-hover:animate-pulse"></div>
                      </div>
                      <h4 className="font-bold text-lg text-white mb-1">{prod.name}</h4>
                      <p className="text-sm text-zinc-500 mb-3">{prod.brand}</p>
                      <p className="text-sm text-zinc-300 mb-4 line-clamp-3">{prod.reason}</p>
                      <div className="flex flex-wrap gap-1">
                        {prod.keyIngredients.map((ing, i) => (
                          <span key={i} className="px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-400">{ing}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STRUCTURE TAB */}
          {activeTab === 'structure' && (
            <div className="space-y-6 animate-slide-up">
              <div className="bg-gradient-to-r from-indigo-900/40 to-zinc-900 border border-indigo-500/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Análise Estrutural</h3>
                <p className="text-lg text-zinc-300 leading-relaxed">{plan.facialArchitecture.analysis}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plan.facialArchitecture.exercises.map((ex, idx) => (
                  <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{ex.name}</h4>
                      <p className="text-zinc-400">{ex.description}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center text-sm text-indigo-300">
                      <RefreshCcw size={16} className="mr-2" />
                      Frequência: {ex.frequency}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PHYSIQUE TAB */}
          {activeTab === 'physique' && (
            <div className="space-y-6 animate-slide-up">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Blueprint Físico</h3>
                <p className="text-zinc-300 mb-6">{plan.physiqueStrategy.analysis}</p>
              </div>

              <div className="space-y-4">
                 {plan.physiqueStrategy.tips.map((tip, idx) => (
                   <div key={idx} className="bg-zinc-950 border border-zinc-800 p-5 rounded-xl flex items-start">
                      <div className={`mt-1 h-8 w-8 rounded-full flex items-center justify-center mr-4 shrink-0 
                        ${tip.category === 'Treino' ? 'bg-red-900/20 text-red-500' : 
                          tip.category === 'Nutrição' ? 'bg-green-900/20 text-green-500' : 'bg-blue-900/20 text-blue-500'}`}>
                          {tip.category === 'Treino' && <Dumbbell size={16} />}
                          {tip.category === 'Nutrição' && <Droplet size={16} />}
                          {tip.category === 'Lifestyle' && <User size={16} />}
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1 block" 
                           style={{color: tip.category === 'Treino' ? '#ef4444' : tip.category === 'Nutrição' ? '#22c55e' : '#3b82f6'}}>
                          {tip.category}
                        </span>
                        <p className="text-white">{tip.advice}</p>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};