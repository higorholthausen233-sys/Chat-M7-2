import React, { useState } from 'react';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import { UserProfile, M7Plan } from './types';
import { generateM7Plan } from './services/geminiService';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [plan, setPlan] = useState<M7Plan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOnboardingComplete = async (profile: UserProfile) => {
    setUserProfile(profile);
    setLoading(true);
    setError(null);
    try {
      const generatedPlan = await generateM7Plan(profile);
      setPlan(generatedPlan);
    } catch (err) {
      setError("Falha ao conectar com o servidor central M7. Verifique sua chave de API ou tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUserProfile(null);
    setPlan(null);
    setError(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 rounded-full animate-pulse"></div>
          <Loader2 size={64} className="text-indigo-500 animate-spin relative z-10" />
        </div>
        <h2 className="mt-8 text-2xl font-light text-white tracking-widest uppercase">Analisando Biometria</h2>
        <p className="mt-2 text-zinc-500 text-sm">Acessando banco de dados dermatológicos e fisiológicos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-indigo-500 selection:text-white">
      {!userProfile ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Onboarding onComplete={handleOnboardingComplete} />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
            <div className="bg-red-900/20 border border-red-800 p-8 rounded-2xl max-w-md">
                <h2 className="text-xl font-bold text-red-500 mb-2">Erro de Processamento</h2>
                <p className="text-zinc-400 mb-6">{error}</p>
                <button 
                    onClick={handleReset}
                    className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-white transition-colors"
                >
                    Reiniciar Sistema
                </button>
            </div>
        </div>
      ) : plan ? (
        <Dashboard plan={plan} userName={userProfile.name} onReset={handleReset} />
      ) : null}
    </div>
  );
};

export default App;