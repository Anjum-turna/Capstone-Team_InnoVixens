import React, { useState, useRef } from 'react';
import { CameraIcon, FolderOpenIcon, GlobeAltIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import jsPDF from 'jspdf';

const UploadScreen = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [ocrResult, setOcrResult] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [language, setLanguage] = useState('English');

  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setOcrResult([]);
    }
  };

  const triggerUpload = (ref) => {
    ref.current.click();
  };

  const simulateOcrProcess = () => {
    if (!selectedFile) return;
    setIsProcessing(true);

    setTimeout(() => {
      const dummyMedicines = [
        {
          name: language === 'English' ? 'Paracetamol 500mg' : 'প্যারাসিটামল ৫০০মিলিগ্রাম',
          dosage: language === 'English' ? 'Take 1 tablet every 6 hours' : 'প্রতি ৬ ঘণ্টায় ১টি ট্যাবলেট খান',
          ingredients: 'Paracetamol (Acetaminophen)',
          company: language === 'English' ? 'Common brands: Napa (Beximco), Ace (Square)' : 'সাধারণ ব্র্যান্ড: নাপা (বেক্সিমকো), এস (স্কয়ার)',
          sideEffects: language === 'English' 
            ? 'Rare: Rash, nausea, liver issues (with overdose)' 
            : 'বিরল: র‍্যাশ, বমি ভাব, লিভার সমস্যা (অতিরিক্ত ডোজে)',
          alternatives: language === 'English' 
            ? 'Ace 500mg, Finix, Xpa - all generics of Paracetamol (cheaper options)' 
            : 'এস ৫০০মিলিগ্রাম, ফিনিক্স, এক্সপা - সবই প্যারাসিটামলের জেনেরিক (সস্তা বিকল্প)',
        },
        {
          name: language === 'English' ? 'Amoxicillin 250mg' : 'অ্যামক্সিসিলিন ২৫০মিলিগ্রাম',
          dosage: language === 'English' ? 'Take 2 capsules daily' : 'দিনে ২টি ক্যাপসুল খান',
          ingredients: 'Amoxicillin Trihydrate',
          company: language === 'English' ? 'Common brands: Moxacil (Square)' : 'সাধারণ ব্র্যান্ড: মক্সাসিল (স্কয়ার)',
          sideEffects: language === 'English' 
            ? 'Diarrhea, nausea, rash; allergic reactions in penicillin-sensitive' 
            : 'ডায়রিয়া, বমি ভাব, র‍্যাশ; পেনিসিলিন অ্যালার্জি থাকলে গুরুতর প্রতিক্রিয়া',
          alternatives: language === 'English' 
            ? 'Amoxil, generic Amoxicillin capsules (cheaper generics available)' 
            : 'অ্যামক্সিল, জেনেরিক অ্যামক্সিসিলিন ক্যাপসুল (সস্তা জেনেরিক পাওয়া যায়)',
        },
        {
          name: language === 'English' ? 'Ibuprofen 400mg' : 'আইবুপ্রোফেন ৪০০মিলিগ্রাম',
          dosage: language === 'English' ? 'As needed for pain' : 'ব্যথার জন্য প্রয়োজন অনুযায়ী',
          ingredients: 'Ibuprofen',
          company: language === 'English' ? 'Common brands: Intaflam (Incepta)' : 'সাধারণ ব্র্যান্ড: ইন্টাফ্ল্যাম (ইনসেপ্টা)',
          sideEffects: language === 'English' 
            ? 'Stomach upset, heartburn, ulcers (long-term); dizziness' 
            : 'পাকস্থলী অস্বস্তি, হার্টবার্ন, আলসার (দীর্ঘমেয়াদী); মাথা ঘোরা',
          alternatives: language === 'English' 
            ? 'Neoprofen, generic Ibuprofen tablets (widely available cheaper options)' 
            : 'নিওপ্রোফেন, জেনেরিক আইবুপ্রোফেন ট্যাবলেট (সস্তা বিকল্প ব্যাপকভাবে পাওয়া যায়)',
        },
      ];
      setOcrResult(dummyMedicines);
      setIsProcessing(false);
    }, 2500);
  };

  const downloadPdf = () => {
    if (ocrResult.length === 0) return;
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(language === 'English' ? 'HelloMed - Extracted Medicines' : 'হ্যালোমেড - এক্সট্রাক্ট করা ওষুধসমূহ', 10, 10);
    doc.setFontSize(12);
    let y = 30;
    ocrResult.forEach((med, index) => {
      doc.text(`${index + 1}. ${med.name} - ${med.dosage}`, 10, y);
      y += 8;
      doc.text(`   Ingredients: ${med.ingredients}`, 10, y);
      y += 8;
      doc.text(`   Company/Brands: ${med.company}`, 10, y);
      y += 8;
      doc.text(`   Side Effects: ${med.sideEffects}`, 10, y);
      y += 8;
      doc.text(`   Alternatives: ${med.alternatives}`, 10, y);
      y += 15;
    });
    doc.save('helloMed_prescription_details.pdf');
  };

  const title = language === 'English' ? 'Upload Prescription' : 'প্রেসক্রিপশন আপলোড করুন';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50 flex items-start justify-center p-6 pt-10">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Side: Upload + Preview */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-800">{title}</h2>
            <div className="relative">
              <GlobeAltIcon className="h-6 w-6 absolute left-3 top-3 text-gray-600 pointer-events-none" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="pl-10 pr-10 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition cursor-pointer"
              >
                <option value="English">English</option>
                <option value="Bangla">বাংলা</option>
              </select>
            </div>
          </div>

          {/* Upload Options */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <button onClick={() => triggerUpload(imageInputRef)} className="flex flex-col items-center justify-center p-8 bg-gradient-to-b from-blue-50 to-blue-100 rounded-2xl hover:from-blue-100 hover:to-blue-200 transition shadow-lg">
              <CameraIcon className="h-16 w-16 text-blue-600 mb-4" />
              <span className="text-lg font-semibold text-gray-800">
                {language === 'English' ? 'Take Photo / Gallery' : 'ছবি তুলুন / গ্যালারি'}
              </span>
              <input type="file" accept="image/*" capture="environment" ref={imageInputRef} onChange={handleFileChange} className="hidden" />
            </button>

            <button onClick={() => triggerUpload(fileInputRef)} className="flex flex-col items-center justify-center p-8 bg-gradient-to-b from-green-50 to-green-100 rounded-2xl hover:from-green-100 hover:to-green-200 transition shadow-lg">
              <FolderOpenIcon className="h-16 w-16 text-green-600 mb-4" />
              <span className="text-lg font-semibold text-gray-800">
                {language === 'English' ? 'Browse File' : 'ফাইল ব্রাউজ'}
              </span>
              <input type="file" accept="image/*,application/pdf" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            </button>
          </div>

          {/* Preview */}
          {previewUrl && (
            <div className="mb-8">
              <p className="text-xl font-semibold text-gray-700 mb-4">
                {language === 'English' ? 'Prescription Preview' : 'প্রেসক্রিপশন প্রিভিউ'}
              </p>
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img src={previewUrl} alt="Prescription preview" className="w-full h-auto max-h-96 object-contain" />
              </div>
            </div>
          )}

          {/* Process Button */}
          <button
            onClick={simulateOcrProcess}
            disabled={!selectedFile || isProcessing}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-2xl font-bold py-5 rounded-2xl hover:from-blue-700 hover:to-cyan-700 disabled:opacity-60 transition shadow-xl"
          >
            {isProcessing ? (language === 'English' ? 'Processing...' : 'প্রসেসিং...') : (language === 'English' ? 'Process OCR' : 'ওসিআর প্রসেস করুন')}
          </button>

          <p className="text-center text-sm text-gray-600 mt-6 flex items-center justify-center gap-2">
            <InformationCircleIcon className="h-5 w-5" />
            {language === 'English'
              ? 'Scans handwritten medicines • AI-generated • Always verify with a doctor'
              : 'হাতে লেখা ওষুধ স্ক্যান করে • এআই-জেনারেটেড • সবসময় ডাক্তারের সাথে যাচাই করুন'}
          </p>
        </div>

        {/* Right Side: Results (Only visible after processing) */}
        {ocrResult.length > 0 && (
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-gray-100 overflow-y-auto max-h-screen">
            <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              {language === 'English' ? 'Extracted Medicines & Details' : 'এক্সট্রাক্ট করা ওষুধ ও বিস্তারিত তথ্য'}
            </h3>

            <div className="space-y-8">
              {ocrResult.map((med, index) => (
                <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-3xl shadow-lg border border-gray-200">
                  <h4 className="text-2xl font-bold text-blue-700 mb-4">{med.name}</h4>
                  <p className="text-lg text-gray-700 mb-3"><strong>{language === 'English' ? 'Dosage:' : 'ডোজ:'}</strong> {med.dosage}</p>
                  <p className="text-lg text-gray-700 mb-3"><strong>{language === 'English' ? 'Active Ingredients:' : 'মূল উপাদান:'}</strong> {med.ingredients}</p>
                  <p className="text-lg text-gray-700 mb-3"><strong>{language === 'English' ? 'Common Brands in BD:' : 'বাংলাদেশে সাধারণ ব্র্যান্ড:'}</strong> {med.company}</p>
                  <p className="text-lg text-red-600 mb-3"><strong>{language === 'English' ? 'Side Effects:' : 'পার্শ্বপ্রতিক্রিয়া:'}</strong> {med.sideEffects}</p>
                  <p className="text-lg text-green-700"><strong>{language === 'English' ? 'Cheaper Alternatives:' : 'সস্তা বিকল্প:'}</strong> {med.alternatives}</p>
                </div>
              ))}
            </div>

            <button
              onClick={downloadPdf}
              className="w-full mt-10 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-2xl font-bold py-5 rounded-2xl hover:from-green-700 hover:to-emerald-700 transition shadow-xl"
            >
              {language === 'English' ? 'Download Full Details as PDF' : 'বিস্তারিত পিডিএফ ডাউনলোড করুন'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadScreen;