import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, Lock, ShieldCheck, CalendarOff } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const PaymentModal = ({ onClose, onUpgrade }) => {
  const { language } = useAppContext();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handlePayment = () => {
    if (!selectedMethod) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onUpgrade(); 
    }, 2000);
  };

  const content = {
    title: { en: "Upgrade to Premium", bn: "প্রিমিয়ামে আপগ্রেড করুন" },
    subtitle: { en: "Unlock unlimited scans & detailed reports.", bn: "আনলিমিটেড স্ক্যান এবং বিস্তারিত রিপোর্ট আনলক করুন।" },
    offer: { en: "First Time Offer: 20% OFF!", bn: "প্রথমবার অফার: ২০% ছাড়!" },
    price: { en: "৳400", bn: "৳৪০০" },
    oldPrice: { en: "৳500", bn: "৳ ৫০০" },
    period: { en: "/month", bn: "/মাস" },
    cancel: { en: "No commitment. Cancel Anytime.", bn: "কোনো বাধ্যবাধকতা নেই। যখন খুশি ক্যান্সেল করুন।" },
    methodTitle: { en: "Select Payment Method", bn: "পেমেন্ট মেথড নির্বাচন করুন" },
    payBtn: { en: "Pay Now", bn: "পেমেন্ট করুন" },
    secure: { en: "100% Secure Payment", bn: "১০০% নিরাপদ পেমেন্ট" }
  };

  const t = (key) => content[key][language];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden relative border border-white/20">
        
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-slate-200 transition-colors z-10">
          <X size={20} className="text-slate-600 dark:text-slate-300" />
        </button>

        {/* Header */}
        <div className="bg-[#A8E6CF] dark:bg-emerald-900 p-8 text-center relative overflow-hidden">
          <div className="absolute top-[-20px] left-[-20px] w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-emerald-100 mb-2 relative z-10">{t('title')}</h2>
          
          {/* Cancel Anytime Badge */}
          <div className="flex items-center justify-center gap-1 text-xs font-bold text-emerald-800 dark:text-emerald-200 bg-white/30 dark:bg-black/20 py-1 px-3 rounded-full mx-auto w-fit relative z-10">
            <CalendarOff size={12} />
            {t('cancel')}
          </div>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Price */}
          <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-700/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-600">
            <div>
              <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                {t('offer')}
              </span>
              <div className="flex items-baseline mt-1 gap-2">
                 <span className="text-slate-400 text-sm line-through">{t('oldPrice')}</span>
                 <span className="text-2xl font-bold text-slate-800 dark:text-white">{t('price')}</span>
                 <span className="text-xs text-slate-500">{t('period')}</span>
              </div>
            </div>
            <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
              <ShieldCheck size={20} />
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3 ml-1">
              {t('methodTitle')}
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setSelectedMethod('bkash')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all relative overflow-hidden
                  ${selectedMethod === 'bkash' ? 'border-[#E2136E] bg-[#E2136E]/5 ring-1 ring-[#E2136E]' : 'border-slate-200 dark:border-slate-700 hover:border-[#E2136E]'}
                `}
              >
                {selectedMethod === 'bkash' && <div className="absolute top-2 right-2 text-[#E2136E]"><CheckCircle size={16} /></div>}
                <div className="font-bold text-[#E2136E] text-lg italic">bKash</div>
              </button>

              <button 
                onClick={() => setSelectedMethod('nagad')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all relative overflow-hidden
                  ${selectedMethod === 'nagad' ? 'border-[#F7941D] bg-[#F7941D]/5 ring-1 ring-[#F7941D]' : 'border-slate-200 dark:border-slate-700 hover:border-[#F7941D]'}
                `}
              >
                {selectedMethod === 'nagad' && <div className="absolute top-2 right-2 text-[#F7941D]"><CheckCircle size={16} /></div>}
                <div className="font-bold text-[#F7941D] text-lg">Nagad</div>
              </button>

              <button 
                onClick={() => setSelectedMethod('card')}
                className={`col-span-2 flex items-center justify-between p-4 rounded-xl border-2 transition-all
                  ${selectedMethod === 'card' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 ring-1 ring-indigo-500' : 'border-slate-200 dark:border-slate-700 hover:border-indigo-400'}
                `}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="text-indigo-600 dark:text-indigo-400" />
                  <div className="text-left">
                    <div className="text-sm font-bold text-slate-700 dark:text-slate-200">Debit / Credit Card</div>
                  </div>
                </div>
                {selectedMethod === 'card' && <CheckCircle size={20} className="text-indigo-500" />}
              </button>
            </div>
          </div>
          
          <button 
            onClick={handlePayment}
            disabled={!selectedMethod || processing}
            className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-all flex justify-center items-center gap-2
              ${!selectedMethod ? 'bg-slate-300 cursor-not-allowed' : 'bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 active:scale-95'}
            `}
          >
            {processing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                Processing...
              </>
            ) : (
              <>
                <Lock size={16} /> {t('payBtn')}
              </>
            )}
          </button>

          <div className="text-center">
            <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1 uppercase tracking-wider">
              <Lock size={10} /> {t('secure')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;