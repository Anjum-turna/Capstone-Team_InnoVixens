import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState('en');
  const [showAlert, setShowAlert] = useState(true);

  // --- TRANSLATION DICTIONARY ---
  const t = {
    en: {
      title: "Pharma Analytics",
      nav_dash: "Dashboard",
      nav_reports: "Data Reports",
      welcome: "Business Intelligence",
      subtitle: "Anonymized medicine trends & regional data analysis.",
      langBtn: "বাংলা",
      logout: "Logout",
      // Alerts & Upgrade
      alert_title: "System Update:",
      alert_msg: "Scheduled maintenance tonight at 12:00 AM.",
      upgrade_title: "Enterprise Plan",
      upgrade_desc: "Unlock nationwide data access.",
      upgrade_btn: "Contact Sales",
      // Stats
      top_med: "Top Medicine",
      top_med_val: "Napa Extra",
      total_reports: "Reports Analyzed",
      active_region: "Top Region",
      active_region_val: "Dhaka North",
      // Actions
      filter: "Filter: Last 30 Days",
      export_csv: "Export CSV",
      export_pdf: "Export PDF",
      // Charts
      chart_trend: "Medicine Demand Trends",
      chart_category: "Report Categories"
    },
    bn: {
      title: "ফার্মা অ্যানালিটিক্স",
      nav_dash: "ড্যাশবোর্ড",
      nav_reports: "ডেটা রিপোর্ট",
      welcome: "বিজনেস ইন্টেলিজেন্স",
      subtitle: "বেনামী ওষুধের ট্রেন্ড এবং আঞ্চলিক ডেটা বিশ্লেষণ।",
      langBtn: "English",
      logout: "লগ আউট",
      // Alerts & Upgrade
      alert_title: "সিস্টেম আপডেট:",
      alert_msg: "আজ রাত ১২টায় মেইনটেনেন্স এর কাজ চলবে।",
      upgrade_title: "এন্টারপ্রাইজ প্ল্যান",
      upgrade_desc: "সারাদেশের ডেটা অ্যাক্সেস করুন।",
      upgrade_btn: "যোগাযোগ করুন",
      // Stats
      top_med: "শীর্ষ ওষুধ",
      top_med_val: "নাপা এক্সট্রা",
      total_reports: "মোট রিপোর্ট",
      active_region: "শীর্ষ এলাকা",
      active_region_val: "ঢাকা উত্তর",
      // Actions
      filter: "ফিল্টার: গত ৩০ দিন",
      export_csv: "CSV ডাউনলোড",
      export_pdf: "PDF ডাউনলোড",
      // Charts
      chart_trend: "ওষুধের চাহিদার ট্রেন্ড",
      chart_category: "রিপোর্ট ক্যাটাগরি"
    }
  };

  const c = t[lang];

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans text-slate-900">
      
      {/* === SIDEBAR === */}
      <aside className="w-64 bg-slate-900 text-white hidden lg:flex flex-col fixed h-full z-10">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <span className="text-2xl mr-2">📊</span>
          <span className="font-bold text-lg">{c.title}</span>
        </div>
        
        {/* Navigation */}
        <nav className="p-4 space-y-2 flex-1">
          <button className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium bg-blue-600 text-white shadow-lg shadow-blue-900/50">
            {c.nav_dash}
          </button>
          <button className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition">
            {c.nav_reports}
          </button>
        </nav>

        {/* Upgrade Section (Restored) */}
        <div className="p-4">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-4 text-white shadow-lg">
             <h4 className="font-bold text-sm mb-1">🚀 {c.upgrade_title}</h4>
             <p className="text-xs opacity-80 mb-3">{c.upgrade_desc}</p>
             <button className="w-full py-1.5 bg-white text-indigo-700 text-xs font-bold rounded hover:bg-opacity-90 transition">
               {c.upgrade_btn}
             </button>
          </div>
        </div>

        {/* Data Privacy Note */}
        <div className="p-4 pt-0">
          <div className="text-xs text-slate-500 bg-slate-800 p-3 rounded border border-slate-700 flex items-start gap-2">
            <span>🔒</span>
            <span>Data is strictly anonymized for privacy compliance.</span>
          </div>
        </div>
      </aside>

      {/* === MAIN CONTENT === */}
      <main className="flex-1 lg:ml-64 p-8">
        
        {/* Header */}
        <header className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{c.welcome}</h1>
            <p className="text-slate-500 mt-1">{c.subtitle}</p>
          </div>
          <div className="flex gap-3">
             <button onClick={() => setLang(lang === 'en' ? 'bn' : 'en')} className="px-4 py-2 text-xs font-bold border border-slate-300 rounded hover:bg-slate-200 transition">{c.langBtn}</button>
             <button onClick={() => navigate('/')} className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded hover:bg-slate-700 transition">{c.logout}</button>
          </div>
        </header>

        {/* Alert Section (Restored) */}
        {showAlert && (
          <div className="mb-8 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r shadow-sm flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <span className="text-blue-500 text-xl">ℹ️</span>
              <div>
                <span className="font-bold text-blue-800 text-sm mr-2">{c.alert_title}</span>
                <span className="text-blue-700 text-sm">{c.alert_msg}</span>
              </div>
            </div>
            <button onClick={() => setShowAlert(false)} className="text-blue-400 hover:text-blue-600 text-sm font-bold">✕</button>
          </div>
        )}

        {/* Action Toolbar */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button className="px-4 py-2 bg-white border rounded shadow-sm text-sm font-medium hover:bg-gray-50 flex items-center gap-2 text-slate-600">
            📅 {c.filter}
          </button>
          <div className="flex-1"></div>
          <button className="px-4 py-2 bg-green-600 text-white rounded shadow-sm text-sm font-bold hover:bg-green-700 flex items-center gap-2 transition">
            📄 {c.export_csv}
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded shadow-sm text-sm font-bold hover:bg-red-700 flex items-center gap-2 transition">
            📕 {c.export_pdf}
          </button>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{c.top_med}</h3>
            <p className="text-2xl font-bold text-blue-600 mt-1">{c.top_med_val}</p>
            <span className="text-xs text-green-500 font-bold bg-green-50 px-2 py-0.5 rounded-full mt-2 inline-block">▲ 12% increase</span>
          </div>
          <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{c.total_reports}</h3>
            <p className="text-2xl font-bold text-teal-600 mt-1">15,402</p>
            <span className="text-xs text-slate-400 mt-2 inline-block">This month</span>
          </div>
          <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{c.active_region}</h3>
            <p className="text-2xl font-bold text-purple-600 mt-1">{c.active_region_val}</p>
          </div>
        </div>

        {/* Charts Representation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Chart 1: Trends */}
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="font-bold mb-6 text-slate-800">{c.chart_trend}</h3>
            <div className="h-64 flex items-end justify-between gap-2 px-4 border-b border-dashed border-slate-200 pb-2">
              {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                <div key={i} className="w-full bg-blue-100 rounded-t hover:bg-blue-600 transition-colors relative group cursor-pointer">
                  <div style={{ height: `${h}%` }} className="absolute bottom-0 w-full bg-blue-500 rounded-t group-hover:bg-blue-700 transition-all"></div>
                  {/* Tooltip */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition">
                    {h}k
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate-400 font-medium">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>

          {/* Chart 2: Categories */}
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="font-bold mb-6 text-slate-800">{c.chart_category}</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2"><span className="text-slate-600">Diabetes</span><span className="font-bold text-slate-900">45%</span></div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 w-[45%] shadow-sm"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2"><span className="text-slate-600">Cardiology</span><span className="font-bold text-slate-900">30%</span></div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[30%] shadow-sm"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2"><span className="text-slate-600">General</span><span className="font-bold text-slate-900">25%</span></div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 w-[25%] shadow-sm"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;