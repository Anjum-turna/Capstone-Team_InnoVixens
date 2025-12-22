import React, { useState } from 'react';
import { Upload, ScanLine, AlertCircle, CheckCircle, Info, X, ShieldAlert } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const OCR = ({ setActiveTab, usageCount, incrementUsage, showPaywall }) => {
  const { language } = useAppContext();
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = (e) => {
    // 1. Check Usage Limit
    if (usageCount >= 5) {
      showPaywall();
      return;
    }

    const file = e.target.files[0];
    if (file) {
      incrementUsage(); // Increment the counter
      setAnalyzing(true);
      setResult(null);

      // Simulate Analysis
      setTimeout(() => {
        setAnalyzing(false);
        setResult({
          name: "Napa Extra (Paracetamol 500mg)",
          usage: { en: "Pain & fever reducer.", bn: "ব্যথা ও জ্বর কমানোর ঔষধ।" },
          warning: { en: "Max 4000mg/day.", bn: "দিনে ৪০০০ মিলিগ্রামের বেশি নয়।" }
        });
      }, 2000);
    }
  };

  const content = {
    title: { en: "Medicine Scanner", bn: "ঔষধ স্ক্যানার" },
    subtitle: { en: "Upload prescription or medicine strip.", bn: "প্রেসক্রিপশন বা ঔষধের পাতার ছবি দিন।" },
    safetyTitle: { en: "Consult a Doctor", bn: "ডাক্তারের পরামর্শ নিন" },
    safetyText: { 
      en: "AI suggestions can be risky for sensitive issues. Please verify with a doctor.", 
      bn: "সংবেদনশীল বিষয়ে এআই-এর পরামর্শ ঝুঁকিপূর্ণ হতে পারে। দয়া করে ডাক্তারের সাথে যাচাই করুন।" 
    },
    chatbotHelp: { en: "Confused? Ask AI Chatbot.", bn: "কনফিউশন আছে? এআই চ্যাটবটকে প্রশ্ন করুন।" }
  };

  const t = (key) => content[key][language];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-10">
      
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center gap-3">
          <ScanLine size={32} className="text-emerald-500" />
          {t('title')}
        </h2>
        <p className="text-slate-500 dark:text-slate-400">{t('subtitle')}</p>
      </div>

      {!result && (
        <div className="relative group">
          <input type="file" accept="image/*" onChange={handleUpload} disabled={analyzing} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
          <div className={`border-3 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center transition-all duration-300 ${analyzing ? 'border-emerald-400 bg-emerald-50/50' : 'border-slate-300 hover:border-emerald-400 hover:bg-slate-50'}`}>
            {analyzing ? (
              <div className="text-emerald-600 font-semibold animate-pulse">Scanning Medicine...</div>
            ) : (
              <div className="text-center">
                <Upload size={40} className="mx-auto text-emerald-500 mb-2" />
                <p className="text-slate-600">{t('title')}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {result && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700">
          <div className="bg-emerald-500 p-6 flex justify-between items-center text-white">
            <h3 className="text-2xl font-bold">{result.name}</h3>
            <button onClick={() => setResult(null)} className="p-2 bg-white/20 rounded-full"><X size={20} /></button>
          </div>

          <div className="p-8 space-y-6">
            
            {/* ⚠️ RED SAFETY WARNING ⚠️ */}
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-lg flex gap-4">
              <ShieldAlert className="text-red-600" size={24} />
              <div>
                <h4 className="font-bold text-red-700 dark:text-red-400">{t('safetyTitle')}</h4>
                <p className="text-sm text-red-600 dark:text-red-300">{t('safetyText')}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50 dark:bg-slate-700 rounded-2xl">
                <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">Usage</h4>
                <p className="text-slate-700 dark:text-slate-300">{language === 'en' ? result.usage.en : result.usage.bn}</p>
              </div>
              <div className="p-4 bg-amber-50 dark:bg-slate-700 rounded-2xl">
                <h4 className="font-bold text-amber-700 dark:text-amber-300 mb-2">Warning</h4>
                <p className="text-slate-700 dark:text-slate-300">{language === 'en' ? result.warning.en : result.warning.bn}</p>
              </div>
            </div>

            {/* Chatbot Suggestion Footer */}
            <div className="flex items-center justify-center p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-full mt-4 cursor-pointer hover:bg-indigo-100 transition-colors" onClick={() => setActiveTab('chatbot')}>
              <Info size={16} className="text-indigo-500 mr-2" />
              <p className="text-sm font-medium text-indigo-600 dark:text-indigo-300">{t('chatbotHelp')}</p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default OCR;