import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ChevronRight, Upload, Info, HeartHandshake } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CATEGORIES } from '../services/mockData';

type Step = 'welcome' | 'category' | 'details' | 'verification' | 'success';

export default function ListWorkPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('welcome');
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (step === 'welcome') setStep('category');
    else if (step === 'category') setStep('details');
    else if (step === 'details') setStep('verification');
    else if (step === 'verification') {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep('success');
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-white">
      <AnimatePresence mode="wait">
        {step === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="flex-1 p-8 flex flex-col gap-8 items-center text-center justify-center"
          >
            <div className="w-24 h-24 bg-orange-100 rounded-[40px] flex items-center justify-center">
              <HeartHandshake className="w-12 h-12 text-orange-600" />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-black text-gray-900 leading-tight">Put your skills <br /> to work locally.</h2>
              <p className="text-gray-500 text-sm max-w-[250px] mx-auto">
                Join 500+ professionals in your town growing their business with Mane-Kelsa.
              </p>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <FeatureItem title="Reach locally" desc="Connect with residents in your direct neighborhood." />
              <FeatureItem title="Zero Commission" desc="Keep 100% of what you earn. No hidden fees." />
              <FeatureItem title="Build Trust" desc="Get a verified badge and collect real customer reviews." />
            </div>
            <button
              onClick={handleNext}
              className="mt-8 w-full bg-orange-600 text-white py-5 rounded-[24px] font-black text-lg shadow-2xl shadow-orange-200 active:scale-95 transition-transform"
            >
              Get Started
            </button>
          </motion.div>
        )}

        {step === 'category' && (
          <motion.div
            key="category"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex-1 p-6 flex flex-col gap-6"
          >
            <Header title="What do you do?" subtitle="Select your primary skill category" onBack={() => setStep('welcome')} />
            <div className="grid grid-cols-2 gap-4">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={handleNext}
                  className="flex flex-col gap-4 p-5 bg-white border border-gray-100 rounded-[32px] text-left hover:border-orange-200 hover:bg-orange-50 transition-all active:scale-95"
                >
                  <div className="w-10 h-10 bg-gray-50 rounded-2xl flex items-center justify-center text-orange-600">
                    <CheckCircle2 className="w-6 h-6 opacity-10" />
                  </div>
                  <span className="font-black text-sm text-gray-900 uppercase tracking-tight">{cat.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'details' && (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex-1 p-6 flex flex-col gap-6"
          >
            <Header title="Tell us about you" subtitle="Help neighbors find and trust you" onBack={() => setStep('category')} />
            <div className="flex flex-col gap-5">
              <Input label="Full Name" placeholder="e.g. Anand Gowda" />
              <Input label="Experience" placeholder="How many years?" type="number" />
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">Bio / Expertise</label>
                <textarea
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm min-h-[120px] focus:ring-2 focus:ring-orange-500/20 outline-none"
                  placeholder="Tell people what you are great at..."
                />
              </div>
              <Input label="Location" placeholder="Malleswaram, Area Name..." />
            </div>
            <button
              onClick={handleNext}
              className="mt-auto w-full bg-orange-600 text-white py-5 rounded-[24px] font-black text-sm active:scale-95 transition-transform"
            >
              Continue
            </button>
          </motion.div>
        )}

        {step === 'verification' && (
          <motion.div
            key="verification"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex-1 p-6 flex flex-col gap-6"
          >
            <Header title="Identity Check" subtitle="ID verification helps build community trust" onBack={() => setStep('details')} />
            <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 flex gap-4">
              <Info className="w-6 h-6 text-blue-500 shrink-0" />
              <p className="text-xs text-blue-800 leading-relaxed">
                Your ID will only be used for verification purposes and will never be shown to customers.
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              <button className="w-full aspect-video border-2 border-dashed border-gray-200 rounded-[32px] flex flex-col items-center justify-center gap-3 active:bg-gray-50 transition-colors">
                <Upload className="w-8 h-8 text-gray-300" />
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Upload Aadhaar / Voter ID</span>
              </button>
              <button className="w-full aspect-video border-2 border-dashed border-gray-200 rounded-[32px] flex flex-col items-center justify-center gap-3 active:bg-gray-50 transition-colors">
                <Upload className="w-8 h-8 text-gray-300" />
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Upload Profile Photo</span>
              </button>
            </div>

            <button
              onClick={handleNext}
              disabled={loading}
              className="mt-auto w-full bg-orange-600 text-white py-5 rounded-[24px] font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Submit Application'
              )}
            </button>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 p-8 flex flex-col items-center justify-center text-center gap-8"
          >
            <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <CheckCircle2 className="w-16 h-16 text-green-600" />
              </motion.div>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-black text-gray-900">Application Sent!</h2>
              <p className="text-gray-500 text-sm max-w-[250px] mx-auto">
                We're reviewing your profile. You'll get a notification once your listing goes live.
              </p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="mt-8 w-full bg-gray-900 text-white py-5 rounded-[24px] font-black text-sm active:scale-95 transition-transform"
            >
              Back to Home
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FeatureItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex items-start gap-4 text-left">
      <div className="mt-1 w-2 h-2 rounded-full bg-orange-600" />
      <div className="flex flex-col">
        <span className="font-black text-sm text-gray-900">{title}</span>
        <span className="text-xs text-gray-500">{desc}</span>
      </div>
    </div>
  );
}

function Header({ title, subtitle, onBack }: { title: string; subtitle: string; onBack: () => void }) {
  return (
    <div className="flex flex-col gap-4">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-widest">
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-black text-gray-900 leading-tight">{title}</h2>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}

function Input({ label, placeholder, type = 'text' }: { label: string; placeholder: string; type?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-gray-50 border-none rounded-2xl p-5 text-sm focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
      />
    </div>
  );
}
