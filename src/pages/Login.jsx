import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, Lock, ArrowRight, User, ShieldCheck, 
  Globe, Moon, Sun, ArrowLeft, CheckCircle2 
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Login = () => {
  const navigate = useNavigate();
  const { role, theme, toggleTheme, language, toggleLanguage } = useAppContext();
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if no role is selected (e.g., if user refreshes page)
  useEffect(() => {
    if (!role) {
      navigate('/select-role');
    }
  }, [role, navigate]);

  // --- Dynamic Content based on Role ---
  const isPatient = role === 'patient';
  
  const colors = {
    bg: isPatient ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-indigo-50 dark:bg-indigo-900/20',
    primary: isPatient ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-indigo-500 hover:bg-indigo-600',
    text: isPatient ? 'text-emerald-600 dark:text-emerald-400' : 'text-indigo-600 dark:text-indigo-400',
    border: isPatient ? 'focus:ring-emerald-500' : 'focus:ring-indigo-500'
  };

  const content = {
    welcome: { 
      en: isLogin ? "Welcome Back" : "Create Account", 
      bn: isLogin ? "স্বাগতম" : "অ্যাকাউন্ট তৈরি করুন" 
    },
    subtitle: {
      en: isPatient ? "Login to access your health records." : "Login to access admin dashboard.",
      bn: isPatient ? "আপনার স্বাস্থ্য রেকর্ড দেখতে লগইন করুন।" : "অ্যাডমিন ড্যাশবোর্ড দেখতে লগইন করুন।"
    },
    email: { en: "Email Address", bn: "ইমেইল ঠিকানা" },
    pass: { en: "Password", bn: "পাসওয়ার্ড" },
    btn: { 
      en: isLoading ? "Processing..." : (isLogin ? "Sign In" : "Sign Up"), 
      bn: isLoading ? "প্রসেসিং..." : (isLogin ? "লগইন করুন" : "সাইন আপ") 
    },
    toggle: {
      en: isLogin ? "New here? Create account" : "Already have an account? Login",
      bn: isLogin ? "নতুন? অ্যাকাউন্ট তৈরি করুন" : "অ্যাকাউন্ট আছে? লগইন করুন"
    },
    trial: {
      en: "Trial Credentials (Click to fill)",
      bn: "ট্রায়াল ক্রেডেনশিয়াল (পূরণ করতে ক্লিক করুন)"
    }
  };

  const t = (key) => content[key][language];

  // --- Handlers ---
  const fillTrialData = () => {
    setEmail(isPatient ? 'patient@hellomed.com' : 'admin@hellomed.com');
    setPassword('123456');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API Call
    setTimeout(() => {
      setIsLoading(false);
      
      // Role অনুযায়ী আলাদা পেজে রিডাইরেক্ট
      if (role === 'patient') {
        navigate('/user-dashboard');
      } else {
        navigate('/admin-dashboard');
      }
      
    }, 1500);
  };

  if (!role) return null; // Prevent flash before redirect

  return (
    <div className="min-h-screen flex bg-white dark:bg-slate-900 transition-colors duration-300">
      
      {/* --- LEFT PANEL (Art & Branding) --- */}
      <div className={`hidden lg:flex w-1/2 flex-col justify-center items-center p-12 relative overflow-hidden ${colors.bg}`}>
        {/* Abstract Shapes */}
        <div className={`absolute top-0 left-0 w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob ${isPatient ? 'bg-emerald-300' : 'bg-indigo-300'}`}></div>
        <div className={`absolute bottom-0 right-0 w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 ${isPatient ? 'bg-teal-300' : 'bg-purple-300'}`}></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xl mb-8 animate-float">
            {isPatient ? (
              <User size={64} className="text-emerald-500" />
            ) : (
              <ShieldCheck size={64} className="text-indigo-500" />
            )}
          </div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            HelloMed <span className={isPatient ? 'text-emerald-500' : 'text-indigo-500'}>{role === 'patient' ? 'Patient' : 'Admin'}</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-sm">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* --- RIGHT PANEL (Form) --- */}
      <div className="w-full lg:w-1/2 flex flex-col p-6 lg:p-12 relative">
        
        {/* Top Controls */}
        <div className="absolute top-6 right-6 flex gap-4">
          <button onClick={toggleLanguage} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors dark:text-slate-200">
            <Globe size={20} />
          </button>
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors dark:text-slate-200">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>

        <button 
          onClick={() => navigate('/select-role')}
          className="absolute top-6 left-6 lg:hidden p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors dark:text-slate-200"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full animate-fade-in-up">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{t('welcome')}</h1>
            <p className="text-slate-500 dark:text-slate-400">{t('subtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('email')}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-slate-400" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 transition-all ${colors.border}`}
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('pass')}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-slate-400" size={20} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 transition-all ${colors.border}`}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-xl text-white font-semibold shadow-lg shadow-opacity-20 transition-all transform active:scale-95 flex justify-center items-center gap-2 ${colors.primary}`}
            >
              {t('btn')}
              {!isLoading && <ArrowRight size={20} />}
            </button>
          </form>

          {/* Trial Credentials Box */}
          <div 
            onClick={fillTrialData}
            className="mt-6 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors text-center"
          >
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center justify-center gap-2">
              <CheckCircle2 size={14} className={colors.text} />
              {t('trial')}
            </p>
          </div>

          {/* Toggle Login/Signup */}
          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className={`text-sm font-semibold hover:underline ${colors.text}`}
            >
              {t('toggle')}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;