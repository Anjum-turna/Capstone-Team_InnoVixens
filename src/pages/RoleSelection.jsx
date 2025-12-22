import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShieldCheck, Loader2, ArrowLeft, Globe, Moon, Sun } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const RoleSelection = () => {
  const navigate = useNavigate();
  const { setRole, theme, toggleTheme, language, toggleLanguage } = useAppContext();
  
  const [loadingRole, setLoadingRole] = useState(null); // 'patient' or 'admin'

  // Translation Helper for this page
  const content = {
    title: { en: "Who are you?", bn: "আপনি কে?" },
    subtitle: { en: "Choose your portal to continue.", bn: "এগিয়ে যেতে আপনার পোর্টাল নির্বাচন করুন।" },
    patient: { en: "Patient", bn: "রোগী" },
    patientDesc: { en: "Access personal health records & AI assistant.", bn: "ব্যক্তিগত স্বাস্থ্য রেকর্ড এবং এআই সহকারী।" },
    admin: { en: "Admin", bn: "অ্যাডমিন" },
    adminDesc: { en: "Manage dashboard, analytics & reports.", bn: "ড্যাশবোর্ড, অ্যানালিটিক্স এবং রিপোর্ট ম্যানেজ করুন।" },
    back: { en: "Back", bn: "ফিরে যান" }
  };

  const t = (key) => content[key][language];

  const handleRoleSelection = (selectedRole) => {
    setLoadingRole(selectedRole); // Start loading animation
    setRole(selectedRole); // Save to Global Context

    // Simulate network delay (1.5 seconds) for effect
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col p-6 transition-colors duration-300 bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] dark:from-slate-900 dark:to-slate-800">
      
      {/* --- Top Navigation --- */}
      <div className="w-full flex justify-between items-center mb-10">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          {t('back')}
        </button>

        <div className="flex gap-4">
          <button onClick={toggleLanguage} className="p-2 bg-white/70 dark:bg-slate-700/70 rounded-full shadow-sm text-slate-700 dark:text-slate-200">
            <Globe size={20} />
          </button>
          <button onClick={toggleTheme} className="p-2 bg-white/70 dark:bg-slate-700/70 rounded-full shadow-sm text-slate-700 dark:text-slate-200">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="flex-1 flex flex-col items-center justify-center animate-fade-in">
        
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            {t('title')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            {t('subtitle')}
          </p>
        </div>

        {/* --- Cards Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          
          {/* Patient Card */}
          <button
            onClick={() => handleRoleSelection('patient')}
            disabled={loadingRole !== null}
            className={`group relative flex flex-col items-center p-8 rounded-3xl border-2 transition-all duration-300
              ${loadingRole === 'patient' ? 'scale-95 ring-4 ring-emerald-200' : 'hover:scale-105 hover:shadow-xl'}
              bg-emerald-50/80 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-500
            `}
          >
            {loadingRole === 'patient' ? (
              <Loader2 size={48} className="animate-spin text-emerald-600 dark:text-emerald-400" />
            ) : (
              <>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-full shadow-md mb-4 group-hover:rotate-6 transition-transform">
                  <User size={40} className="text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{t('patient')}</h3>
                <p className="text-sm text-center text-slate-600 dark:text-slate-400">{t('patientDesc')}</p>
              </>
            )}
          </button>

          {/* Admin Card */}
          <button
            onClick={() => handleRoleSelection('admin')}
            disabled={loadingRole !== null}
            className={`group relative flex flex-col items-center p-8 rounded-3xl border-2 transition-all duration-300
              ${loadingRole === 'admin' ? 'scale-95 ring-4 ring-indigo-200' : 'hover:scale-105 hover:shadow-xl'}
              bg-indigo-50/80 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800 hover:border-indigo-400 dark:hover:border-indigo-500
            `}
          >
            {loadingRole === 'admin' ? (
              <Loader2 size={48} className="animate-spin text-indigo-600 dark:text-indigo-400" />
            ) : (
              <>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-full shadow-md mb-4 group-hover:rotate-6 transition-transform">
                  <ShieldCheck size={40} className="text-indigo-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{t('admin')}</h3>
                <p className="text-sm text-center text-slate-600 dark:text-slate-400">{t('adminDesc')}</p>
              </>
            )}
          </button>

        </div>
      </div>
    </div>
  );
};

export default RoleSelection;