import React from 'react';
import { Activity, Clock, Calendar, ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const DashboardHome = ({ onNavigate }) => {
  const { language } = useAppContext();

  // Mock Data for "Recent History"
  const history = [
    { id: 1, type: 'Medicine', name: 'Napa Extra', date: 'Today, 10:30 AM', status: 'Safe' },
    { id: 2, type: 'Report', name: 'Blood Test (CBC)', date: 'Yesterday', status: 'Attention' },
    { id: 3, type: 'Medicine', name: 'Sergel 20', date: '12 Dec', status: 'Safe' },
  ];

  const t = (en, bn) => language === 'en' ? en : bn;

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* 1. Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-white/10 skew-x-12 translate-x-10"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">{t('Good Morning, Patient!', 'শুভ সকাল, পেশেন্ট!')}</h2>
          <p className="opacity-90">{t('Your health is looking great today.', 'আপনার স্বাস্থ্য আজ ভালো মনে হচ্ছে।')}</p>
          <button 
            onClick={() => onNavigate('ocr')}
            className="mt-6 bg-white text-emerald-600 px-6 py-2 rounded-full font-bold shadow-md hover:scale-105 transition-transform"
          >
            {t('+ New Scan', '+ নতুন স্ক্যান')}
          </button>
        </div>
      </div>

      {/* 2. Quick Stats Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold">{t('Total Scans', 'মোট স্ক্যান')}</p>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">12</h3>
          </div>
        </div>
        
        {/* Card 2 */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
          <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-xl">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold">{t('Last Checkup', 'শেষ চেকআপ')}</p>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">2 Days ago</h3>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-xl">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold">{t('Next Visit', 'পরবর্তী ভিজিট')}</p>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Sunday</h3>
          </div>
        </div>
      </div>

      {/* 3. Recent Activity List */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">{t('Recent Activity', 'সাম্প্রতিক অ্যাক্টিভিটি')}</h3>
          <button className="text-sm text-emerald-600 font-semibold hover:underline">{t('View All', 'সব দেখুন')}</button>
        </div>

        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-600 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                  ${item.type === 'Medicine' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}
                `}>
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">{item.name}</h4>
                  <p className="text-xs text-slate-500">{item.date} • {item.type}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold
                  ${item.status === 'Safe' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}
                `}>
                  {item.status}
                </span>
                <ChevronRight size={18} className="text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default DashboardHome;