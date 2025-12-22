import React from 'react';
import { X, Check, Crown, Zap, FileText, CalendarOff } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const PremiumPromo = ({ onClose, onGoToPayment }) => {
  const { language } = useAppContext();

  const content = {
    title: { en: "Unlock VIP Access", bn: "VIP অ্যাক্সেস আনলক করুন" },
    subtitle: { en: "Unlimited Scans. Cancel Anytime.", bn: "আনলিমিটেড স্ক্যান। যখন খুশি ক্যান্সেল করুন।" },
    benefitsTitle: { en: "Why Upgrade?", bn: "কেন আপগ্রেড করবেন?" },
    btnYes: { en: "Upgrade Now - 20% OFF", bn: "এখনই আপগ্রেড করুন - ২০% ছাড়" },
    btnNo: { en: "Maybe Later", bn: "পরে দেখব" }
  };

  const benefits = [
    { 
      icon: Zap, 
      text: { en: "Unlimited Medicine Scans", bn: "আনলিমিটেড মেডিসিন স্ক্যান" },
      color: "text-amber-500"
    },
    { 
      icon: FileText, 
      text: { en: "Deep Lab Report Analysis", bn: "গভীর ল্যাব রিপোর্ট বিশ্লেষণ" },
      color: "text-blue-500"
    },
    { 
      icon: CalendarOff, 
      text: { en: "Cancel Anytime", bn: "যেকোনো সময় ক্যান্সেল করুন" }, // <--- New Benefit
      color: "text-emerald-500"
    },
    { 
      icon: Crown, 
      text: { en: "Ad-Free Experience", bn: "বিজ্ঞাপন মুক্ত অভিজ্ঞতা" },
      color: "text-purple-500"
    }
  ];

  const t = (key) => content[key][language];

  return (
    <div className="fixed inset-0 z-[55] flex items-center justify-center bg-black/40 backdrop-blur-[2px] animate-fade-in p-4">
      <div className="relative w-full max-w-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/20 dark:border-slate-700 shadow-2xl rounded-3xl overflow-hidden transform transition-all scale-100 hover:scale-[1.01]">
        
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-400 rounded-full blur-[80px] opacity-30"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-amber-400 rounded-full blur-[80px] opacity-30"></div>

        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/5 dark:bg-white/10 rounded-full hover:bg-black/10 transition-colors z-20">
          <X size={20} className="text-slate-500 dark:text-slate-300" />
        </button>

        <div className="relative z-10 p-8">
          
          <div className="text-center mb-8">
            <div className="inline-flex p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-500 mb-4 shadow-sm ring-4 ring-amber-50 dark:ring-amber-900/10">
              <Crown size={32} strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-2 tracking-tight">
              {t('title')}
            </h2>
            <p className="text-slate-500 dark:text-slate-300 font-medium">
              {t('subtitle')}
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center mb-4">{t('benefitsTitle')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                  <item.icon size={20} className={item.color} />
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                     {language === 'en' ? item.text.en : item.text.bn}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <button 
              onClick={() => { onClose(); onGoToPayment(); }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 dark:from-emerald-600 dark:to-teal-600 text-white font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
            >
              <Crown size={18} className="group-hover:text-amber-400 transition-colors" />
              {t('btnYes')}
            </button>
            
            <button 
              onClick={onClose}
              className="w-full py-3 rounded-xl text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm"
            >
              {t('btnNo')}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PremiumPromo;