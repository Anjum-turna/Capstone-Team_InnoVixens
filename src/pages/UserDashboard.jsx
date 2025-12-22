import React, { useState, useEffect } from 'react'; // <--- ১. useEffect এখানে ইমপোর্ট করা হয়েছে
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, MessageSquare, ScanLine,
  Settings, LogOut, Menu, X, Crown
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import OCR from './OCR';
import LabReport from './LabReport';
import PaymentModal from '../components/PaymentModal';
import PremiumPromo from '../components/PremiumPromo'; // <--- ২. PremiumPromo ইমপোর্ট

const UserDashboard = () => {
  const navigate = useNavigate();
  const { setRole, theme, toggleTheme, language, toggleLanguage } = useAppContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('ocr');
  
  // --- BUSINESS LOGIC STATE ---
  const [usageCount, setUsageCount] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false); 
  const [showPromo, setShowPromo] = useState(false); // <--- ৩. প্রমো স্টেট

  // --- ৪. এই সেই useEffect কোডটি ---
  useEffect(() => {
    // ইউজার যদি প্রিমিয়াম না হয়, তবে ৩ সেকেন্ড পর অফার দেখাবে
    if (!isPremium) {
      const timer = setTimeout(() => {
        setShowPromo(true);
      }, 3000); // ৩০০০ মিলিসেকেন্ড = ৩ সেকেন্ড
      return () => clearTimeout(timer);
    }
  }, [isPremium]);
  // ----------------------------------

  const incrementUsage = () => {
    if (!isPremium) {
      setUsageCount(prev => prev + 1);
    }
  };

  const handleUpgrade = () => {
    setIsPremium(true);
    setShowPaywall(false);
    setShowPromo(false); 
    alert("Congratulations! You are now a VIP member.");
  };

  const handleLogout = () => {
    setRole(null);
    navigate('/');
  };

  // --- Pastel Green Theme Logic ---
  const pastelTheme = {
    sidebar: 'bg-[#A8E6CF] dark:bg-emerald-900',
    sidebarText: 'text-slate-800 dark:text-emerald-100',
    activeItem: 'bg-white text-emerald-700 shadow-md',
    hoverItem: 'hover:bg-[#88D8B0] dark:hover:bg-emerald-800'
  };

  const menuItems = [
    { id: 'ocr', name: { en: 'Medicine Scanner', bn: 'ঔষধ স্ক্যানার' }, icon: ScanLine },
    { id: 'lab', name: { en: 'Lab Reports', bn: 'ল্যাব রিপোর্ট' }, icon: FileText },
    { id: 'chatbot', name: { en: 'AI Chatbot', bn: 'এআই চ্যাটবট' }, icon: MessageSquare },
    { id: 'settings', name: { en: 'Settings', bn: 'সেটিংস' }, icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'ocr':
        return <OCR setActiveTab={setActiveTab} usageCount={usageCount} incrementUsage={incrementUsage} showPaywall={() => setShowPaywall(true)} />;
      case 'lab':
        return <LabReport setActiveTab={setActiveTab} usageCount={usageCount} incrementUsage={incrementUsage} showPaywall={() => setShowPaywall(true)} />;
      case 'chatbot':
        return <div className="text-center p-10 text-slate-400">Chatbot Component (Coming Soon)</div>;
      default:
        return <div className="text-center p-10 text-slate-400">Content Coming Soon</div>;
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F0FDF4] dark:bg-slate-900 transition-colors duration-300 relative">
      
      {/* --- ৫. এখানে মডালটি রেন্ডার হচ্ছে --- */}
      {showPromo && !showPaywall && !isPremium && (
        <PremiumPromo 
          onClose={() => setShowPromo(false)} 
          onGoToPayment={() => {
            setShowPromo(false); 
            setShowPaywall(true); 
          }} 
        />
      )}

      {/* --- পেমেন্ট মডাল --- */}
      {showPaywall && (
        <PaymentModal onClose={() => setShowPaywall(false)} onUpgrade={handleUpgrade} />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 shadow-xl
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${pastelTheme.sidebar}
      `}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-black/5 dark:border-white/10">
          <h2 className={`text-xl font-bold tracking-wide ${pastelTheme.sidebarText}`}>HelloMed</h2>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 rounded hover:bg-black/10"><X size={20} /></button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium
                ${activeTab === item.id ? pastelTheme.activeItem : `${pastelTheme.sidebarText} ${pastelTheme.hoverItem}`}
              `}
            >
              <item.icon size={20} />
              <span>{language === 'en' ? item.name.en : item.name.bn}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-black/5 dark:border-white/10 space-y-2">
           <div className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-between ${isPremium ? 'bg-amber-100 text-amber-700' : 'bg-slate-100/50 text-slate-600'}`}>
              <span>{isPremium ? 'VIP MEMBER' : `FREE PLAN (${5 - usageCount} left)`}</span>
              {isPremium && <Crown size={14} className="fill-amber-500 text-amber-600" />}
           </div>

           <button onClick={toggleLanguage} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${pastelTheme.hoverItem} transition-all ${pastelTheme.sidebarText}`}>
             <span className="font-bold border border-current rounded px-1 text-xs">{language === 'en' ? 'EN' : 'BN'}</span>
             <span>Language</span>
           </button>
           <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all text-red-600 dark:text-red-400">
             <LogOut size={20} />
             <span>Logout</span>
           </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col h-screen">
        <header className="h-16 bg-white/80 dark:bg-slate-800 backdrop-blur-md shadow-sm flex items-center justify-between px-4 lg:px-8 z-40 sticky top-0">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 dark:text-slate-200"><Menu size={24} /></button>
          
          <div className="hidden md:block">
            <h1 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
              {language === 'en' ? 'Welcome back,' : 'স্বাগতম,'} <span className="text-emerald-600 dark:text-emerald-400">Patient</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {!isPremium && (
              <button onClick={() => setShowPaywall(true)} className="hidden sm:flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-sm font-bold rounded-full shadow-md hover:scale-105 transition-transform">
                <Crown size={16} /> Upgrade
              </button>
            )}
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">P</div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;