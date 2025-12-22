import React, { useState } from 'react';
import { Upload, FileText, AlertTriangle, CheckCircle, Info, X, ShieldAlert } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const LabReport = ({ setActiveTab, usageCount, incrementUsage, showPaywall }) => {
  const { language } = useAppContext();
  const [image, setImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = (e) => {
    // 1. Check Limits First
    if (usageCount >= 5) {
      showPaywall();
      return;
    }

    const file = e.target.files[0];
    if (file) {
      incrementUsage(); // Count this scan
      setImage(URL.createObjectURL(file));
      setAnalyzing(true);
      setResult(null);

      // Simulate Analysis
      setTimeout(() => {
        setAnalyzing(false);
        setResult({
          title: "Complete Blood Count (CBC)",
          findings: {
            en: "Hemoglobin is slightly low (11.5 g/dL). White Blood Cells are normal.",
            bn: "হিমোগ্লোবিন কিছুটা কম (১১.৫ g/dL)। শ্বেত রক্তকণিকা স্বাভাবিক আছে।"
          },
          suggestion: {
            en: "Eat iron-rich foods like spinach, dates, and red meat.",
            bn: "আয়রন সমৃদ্ধ খাবার যেমন পালং শাক, খেজুর এবং লাল মাংস খান।"
          },
          doctor: {
            en: "General Physician / Hematologist",
            bn: "জেনারেল ফিজিশিয়ান / হেমাটোলজিস্ট"
          }
        });
      }, 3000);
    }
  };

  const content = {
    title: { en: "Lab Report Analyzer", bn: "ল্যাব রিপোর্ট বিশ্লেষক" },
    subtitle: { en: "Upload blood tests, X-rays, or other medical reports.", bn: "রক্ত পরীক্ষা, এক্স-রে বা অন্যান্য মেডিকেল রিপোর্ট আপলোড করুন।" },
    warningTitle: { en: "Important Safety Warning", bn: "গুরুত্বপূর্ণ সতর্কবার্তা" },
    warningText: { 
      en: "This is an AI-generated summary. It may contain errors. Always consult a real doctor before taking action.", 
      bn: "এটি একটি এআই-জেনারেটেড সারাংশ। এতে ভুল থাকতে পারে। কোনো ব্যবস্থা নেওয়ার আগে অবশ্যই একজন ডাক্তারের পরামর্শ নিন।"
    }
  };

  const t = (key) => content[key][language];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-10">
      
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center gap-3">
          <FileText size={32} className="text-blue-500" />
          {t('title')}
        </h2>
        <p className="text-slate-500 dark:text-slate-400">{t('subtitle')}</p>
      </div>

      {!result && (
        <div className="relative group">
          <input type="file" accept="image/*" onChange={handleUpload} disabled={analyzing} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
          <div className={`border-3 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center transition-all duration-300 ${analyzing ? 'border-blue-400 bg-blue-50/50' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'}`}>
            {analyzing ? (
              <div className="text-blue-600 font-semibold animate-pulse">Analyzing Report...</div>
            ) : (
              <div className="text-center">
                <Upload size={40} className="mx-auto text-blue-500 mb-2" />
                <p className="text-slate-600">Upload Report Image</p>
              </div>
            )}
          </div>
        </div>
      )}

      {result && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700">
          <div className="bg-blue-500 p-6 flex justify-between items-center text-white">
            <h3 className="text-2xl font-bold">{result.title}</h3>
            <button onClick={() => {setImage(null); setResult(null);}} className="p-2 bg-white/20 rounded-full"><X size={20} /></button>
          </div>

          <div className="p-8 space-y-6">
            
            {/* ⚠️ CRITICAL RED WARNING ⚠️ */}
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-lg flex gap-4 items-start">
              <ShieldAlert className="text-red-600 shrink-0" size={24} />
              <div>
                <h4 className="font-bold text-red-700 dark:text-red-400">{t('warningTitle')}</h4>
                <p className="text-sm text-red-600 dark:text-red-300 mt-1">{t('warningText')}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <h4 className="font-bold text-slate-700 dark:text-slate-200 mb-2">Findings:</h4>
                <p className="text-slate-600 dark:text-slate-300">{language === 'en' ? result.findings.en : result.findings.bn}</p>
              </div>
              
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl border border-emerald-100 dark:border-emerald-800">
                <h4 className="font-bold text-emerald-700 dark:text-emerald-400 mb-2">Suggestion:</h4>
                <p className="text-emerald-800 dark:text-emerald-300">{language === 'en' ? result.suggestion.en : result.suggestion.bn}</p>
              </div>

              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium p-2">
                <CheckCircle size={18} />
                Recommended Doctor: {language === 'en' ? result.doctor.en : result.doctor.bn}
              </div>
            </div>

            {/* Cross Sell Chatbot */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
              <p className="text-sm text-slate-500">Need clarification?</p>
              <button onClick={() => setActiveTab('chatbot')} className="text-sm text-blue-600 font-semibold hover:underline">
                Ask AI Chatbot &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabReport;