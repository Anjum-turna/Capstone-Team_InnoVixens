import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartPulse, Moon, Sun, Globe } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Home = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme, language, toggleLanguage, t } = useAppContext();

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-6 transition-colors duration-300 bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] dark:from-slate-900 dark:to-slate-800">
      
      {/* Top Bar */}
      <div className="w-full flex justify-end gap-4">
        <button onClick={toggleLanguage} className="flex items-center gap-2 px-4 py-2 bg-white/70 dark:bg-slate-700/70 rounded-full shadow-sm text-sm font-medium text-slate-700 dark:text-slate-200">
          <Globe size={16} /> {language === 'en' ? 'EN' : 'বাংলা'}
        </button>
        <button onClick={toggleTheme} className="p-2 bg-white/70 dark:bg-slate-700/70 rounded-full shadow-sm text-slate-700 dark:text-slate-200">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center text-center space-y-8">
        <div className="relative bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-500">
          <HeartPulse size={64} className="text-emerald-500 dark:text-emerald-400" />
        </div>

        <div className="space-y-4 max-w-lg">
          <h1 className="text-5xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
            Hello<span className="text-emerald-600 dark:text-emerald-400">Med</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
            {t('tagline')}
          </p>
        </div>

        <button 
          onClick={() => navigate('/select-role')}
          className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-semibold rounded-2xl shadow-lg transition-all transform hover:-translate-y-1 active:scale-95"
        >
          {t('getStarted')}
        </button>
      </div>

      {/* Footer */}
      <div className="text-center space-y-2 opacity-80">
        <p className="text-xs text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-900/50 px-4 py-2 rounded-lg">
          {t('disclaimer')}
        </p>
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-500">
          {t('footer')}
        </p>
      </div>
    </div>
  );
};

export default Home;