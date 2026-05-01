import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_WORKERS } from '../services/mockData';
import { ArrowLeft, Star, MapPin, Verified, Phone, MessageSquare, Share2, Award, Calendar, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function WorkerDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const worker = MOCK_WORKERS.find(w => w.id === id);

  if (!worker) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center gap-4">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
            <ArrowLeft className="w-8 h-8 text-gray-300" />
        </div>
        <h2 className="text-xl font-bold">Worker not found</h2>
        <button 
          onClick={() => navigate('/')}
          className="bg-orange-600 text-white px-6 py-2 rounded-xl font-bold text-sm"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header Image & Actions */}
      <div className="relative h-64 w-full">
        <img
          src={worker.avatarUrl}
          className="w-full h-full object-cover"
          alt={worker.name}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <button onClick={() => navigate(-1)} className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-white">{worker.name}</h2>
            {worker.isVerified && <Verified className="w-5 h-5 text-blue-400 fill-blue-400/20" />}
          </div>
          <div className="flex items-center gap-3 text-white/80">
            <span className="text-sm font-bold">{worker.category}</span>
            <span className="text-xs opacity-50">|</span>
            <div className="flex items-center gap-1">
               <Star className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
               <span className="text-xs font-black">{worker.rating} (48 reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="px-6 py-8 flex flex-col gap-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 border-b border-gray-100 pb-8">
          <StatBox icon={<Award className="w-5 h-5 text-orange-600" />} label="Experience" value={`${worker.experienceYears} Years`} />
          <StatBox icon={<MapPin className="w-5 h-5 text-orange-600" />} label="Location" value={worker.location} />
          <StatBox icon={<Calendar className="w-5 h-5 text-orange-600" />} label="Response" value="< 1 hr" />
        </div>

        {/* Bio */}
        <section className="flex flex-col gap-3">
          <h3 className="text-lg font-black text-gray-900 italic underline decoration-orange-300 underline-offset-4 decoration-4">About {worker.name.split(' ')[0]}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {worker.bio}
          </p>
        </section>

        {/* Skills/Services */}
        <section className="flex flex-col gap-4">
          <h3 className="text-lg font-black text-gray-900">Services Provided</h3>
          <div className="flex flex-wrap gap-2">
            {worker.skills.map(skill => (
              <div key={skill} className="flex items-center gap-1.5 bg-orange-50 text-orange-800 px-4 py-2 rounded-xl text-xs font-bold border border-orange-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-600" />
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Info */}
        <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 flex items-center justify-between">
           <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest leading-none">Starting from</span>
              <span className="text-xl font-black text-gray-900">{worker.priceRange.split('-')[0]}</span>
           </div>
           <p className="text-[10px] text-gray-400 italic font-medium max-w-[120px] text-right">Final price may vary based on specific task requirements.</p>
        </div>

        {/* Reviews Preview (Mock) */}
        <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-gray-900">Recent Reviews</h3>
              <button className="text-xs font-bold text-orange-600">View All</button>
            </div>
            <div className="bg-white border border-gray-100 rounded-3xl p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">MK</div>
                    <span className="text-xs font-bold">Mahesh K.</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-orange-400">
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 italic">"Excellent work. Arrived on time and was very professional. Highly recommend for any complex electrical work."</p>
            </div>
        </section>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-gray-100 flex gap-3 z-50">
        <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-900 py-4 rounded-2xl font-black text-sm active:scale-95 transition-transform">
          <MessageSquare className="w-5 h-5" />
          Chat
        </button>
        <button className="flex-[2] flex items-center justify-center gap-2 bg-orange-600 text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-orange-200 active:scale-95 transition-transform">
          <Phone className="w-5 h-5" />
          Call Now
        </button>
      </div>
    </div>
  );
}

function StatBox({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-1">
      <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center">
        {icon}
      </div>
      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{label}</span>
      <span className="text-xs font-black text-gray-900">{value}</span>
    </div>
  );
}
