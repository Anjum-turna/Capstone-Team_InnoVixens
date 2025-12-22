import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // State
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [role, setRole] = useState(null);

  // Theme Logic
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  const toggleLanguage = () => setLanguage((prev) => (prev === 'en' ? 'bn' : 'en'));

  // Simple Translation Helper
  const t = (key) => {
    const translations = {
      tagline: { en: "Smart AI-powered medical assistance, simplified.", bn: "স্মার্ট এআই-চালিত চিকিৎসা সহায়তা, সহজ করা হয়েছে।" },
      getStarted: { en: "Get Started", bn: "শুরু করুন" },
      disclaimer: { en: "⚠️ HelloMed is not a doctor. This app provides informational support only.", bn: "⚠️ হ্যালোমেড ডাক্তার নয়। এই অ্যাপটি শুধুমাত্র তথ্যগত সহায়তা প্রদান করে।" },
      footer: { en: "© 2025 HelloMed", bn: "© ২০২৫ হ্যালোমেড" }
    };
    return translations[key]?.[language] || key;
  };

  return (
    <AppContext.Provider value={{ theme, toggleTheme, language, toggleLanguage, role, setRole, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);