import React, { useState } from 'react';
import { UserProfile, SkinType, Gender } from '../types';
import { ChevronRight, Check } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const steps = [
  { id: 'basics', title: 'Identificação' },
  { id: 'skin', title: 'Análise Dermatológica' },
  { id: 'goals', title: 'Objetivos Estéticos' },
];

const skinConcernsList = [
  "Acne", "Cravos", "Rugas/Linhas Finas", "Manchas Escuras", "Vermelhidão", "Poros Dilatados", "Olheiras", "Ressecamento", "Oleosidade Excessiva"
];

const aestheticGoalsList = [
  "Definir Mandíbula", "Reduzir Inchaço Facial", "Melhorar Postura", "Ganhar Massa Muscular", "Perder Gordura", "Aumentar Definição Abdominal", "Glow Natural"
];

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    concerns: [],
    goals: [],
    preferences: ''
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      if (formData.name && formData.age && formData.skinType) {
        onComplete(formData as UserProfile);
      }
    }
  };

  const toggleSelection = (list: string[], item: string, field: 'concerns' | 'goals') => {
    const current = list || [];
    const updated = current.includes(item)
      ? current.filter(i => i !== item)
      : [...current, item];
    setFormData({ ...formData, [field]: updated });
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0: return !!formData.name && !!formData.age && !!formData.gender;
      case 1: return !!formData.skinType && (formData.concerns?.length || 0) > 0;
      case 2: return (formData.goals?.length || 0) > 0;
      default: return false;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tighter text-white mb-2">Protocolo Inicial <span className="text-indigo-500">M7</span></h1>
        <div className="flex space-x-2 mt-4">
          {steps.map((step, idx) => (
            <div key={step.id} className={`h-1 flex-1 rounded-full transition-all duration-500 ${idx <= currentStep ? 'bg-indigo-500' : 'bg-zinc-800'}`} />
          ))}
        </div>
        <p className="text-zinc-400 mt-2 text-sm uppercase tracking-widest">{steps[currentStep].title}</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl min-h-[400px]">
        {currentStep === 0 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="block text-zinc-400 text-sm mb-2">Nome de Codinome</label>
              <input
                type="text"
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-white focus:border-indigo-500 focus:outline-none transition-colors"
                placeholder="Como devemos te chamar?"
                value={formData.name || ''}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-400 text-sm mb-2">Idade</label>
                <input
                  type="number"
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-white focus:border-indigo-500 focus:outline-none"
                  value={formData.age || ''}
                  onChange={e => setFormData({ ...formData, age: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-2">Gênero</label>
                <select
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-white focus:border-indigo-500 focus:outline-none"
                  value={formData.gender || ''}
                  onChange={e => setFormData({ ...formData, gender: e.target.value as Gender })}
                >
                  <option value="">Selecione</option>
                  {Object.values(Gender).map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="block text-zinc-400 text-sm mb-4">Tipo de Pele</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.values(SkinType).map(type => (
                  <button
                    key={type}
                    onClick={() => setFormData({ ...formData, skinType: type })}
                    className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                      formData.skinType === type 
                        ? 'bg-indigo-900/30 border-indigo-500 text-indigo-300' 
                        : 'bg-zinc-950 border-zinc-700 text-zinc-400 hover:border-zinc-500'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-4">Preocupações Atuais</label>
              <div className="grid grid-cols-2 gap-2">
                {skinConcernsList.map(concern => (
                  <button
                    key={concern}
                    onClick={() => toggleSelection(formData.concerns || [], concern, 'concerns')}
                    className={`p-2 rounded-lg border text-sm text-left px-4 flex justify-between items-center transition-all ${
                      formData.concerns?.includes(concern)
                        ? 'bg-indigo-900/30 border-indigo-500 text-indigo-300' 
                        : 'bg-zinc-950 border-zinc-700 text-zinc-400 hover:border-zinc-500'
                    }`}
                  >
                    {concern}
                    {formData.concerns?.includes(concern) && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
             <div>
              <label className="block text-zinc-400 text-sm mb-4">Objetivos Estéticos & Físicos</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {aestheticGoalsList.map(goal => (
                  <button
                    key={goal}
                    onClick={() => toggleSelection(formData.goals || [], goal, 'goals')}
                    className={`p-3 rounded-lg border text-sm text-left px-4 flex justify-between items-center transition-all ${
                      formData.goals?.includes(goal)
                        ? 'bg-indigo-900/30 border-indigo-500 text-indigo-300' 
                        : 'bg-zinc-950 border-zinc-700 text-zinc-400 hover:border-zinc-500'
                    }`}
                  >
                    {goal}
                    {formData.goals?.includes(goal) && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-2">Preferências Adicionais</label>
              <textarea
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-white focus:border-indigo-500 focus:outline-none resize-none h-24"
                placeholder="Ex: Prefiro produtos veganos, tenho alergia a ácido salicílico, orçamento limitado..."
                value={formData.preferences}
                onChange={e => setFormData({ ...formData, preferences: e.target.value })}
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleNext}
          disabled={!isStepValid()}
          className={`flex items-center space-x-2 px-8 py-3 rounded-full font-semibold transition-all ${
            isStepValid() 
              ? 'bg-white text-black hover:bg-zinc-200' 
              : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
          }`}
        >
          <span>{currentStep === steps.length - 1 ? 'Gerar Protocolo M7' : 'Próximo'}</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};