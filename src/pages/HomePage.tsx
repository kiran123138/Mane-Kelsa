import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CATEGORIES, MOCK_WORKERS } from '../services/mockData';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { Star, MapPin, ChevronRight, Verified, RefreshCw } from 'lucide-react';
import { getWorkers } from '../services/workerService';
import { Worker as WorkerType } from '../types';

export default function HomePage() {
  const navigate = useNavigate();
  const [workers, setWorkers] = useState<WorkerType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getWorkers();
        if (data.length > 0) {
          setWorkers(data);
        } else {
          setWorkers(MOCK_WORKERS);
        }
      } catch (err) {
        setWorkers(MOCK_WORKERS);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="flex flex-col gap-8 py-6 px-4">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-orange-50 rounded-3xl p-6 relative overflow-hidden flex flex-col gap-2"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Icons.Wrench className="w-32 h-32 rotate-12" />
        </div>
        <h2 className="text-2xl font-black text-orange-950 leading-tight">
          Find reliable help <br /> in your neighborhood.
        </h2>
        <p className="text-orange-800/80 text-sm max-w-[200px]">
          Connecting small towns with big talent. From leaky taps to custom dresses.
        </p>
        <button
          onClick={() => navigate('/search')}
          className="mt-4 bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-orange-200 active:scale-95 transition-transform w-fit"
        >
          Browse Services
        </button>
      </motion.div>

      {/* Categories Grid */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-lg text-gray-900">Categories</h3>
          <button onClick={() => navigate('/search')} className="text-orange-600 text-xs font-bold uppercase tracking-widest">
            See All
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {CATEGORIES.slice(0, 8).map((cat, idx) => {
            const IconComponent = (Icons as any)[cat.iconName] || Icons.HelpCircle;
            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => navigate(`/search?category=${cat.name}`)}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-14 h-14 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center justify-center group-active:scale-90 transition-transform">
                  <IconComponent className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-[10px] font-bold text-center text-gray-700 uppercase tracking-tighter">
                  {cat.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Featured Workers */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-lg text-gray-900">Recommended for You</h3>
          {loading && <RefreshCw className="w-4 h-4 text-orange-600 animate-spin" />}
        </div>
        <div className="flex flex-col gap-3">
          {workers.map((worker) => (
            <motion.div
              id={`worker-${worker.id}`}
              key={worker.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/worker/${worker.id}`)}
              className="bg-white border border-gray-100 rounded-3xl p-4 flex gap-4 cursor-pointer hover:shadow-md transition-shadow"
            >
              <img
                src={worker.avatarUrl}
                alt={worker.name}
                className="w-16 h-16 rounded-2xl object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 flex flex-col justify-between py-0.5">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-base text-gray-900">{worker.name}</h4>
                    {worker.isVerified && <Verified className="w-4 h-4 text-blue-500" />}
                  </div>
                  <p className="text-xs text-gray-500 font-medium">{worker.category} • {worker.experienceYears} yrs exp</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-orange-600">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs font-black">{worker.rating || 'New'}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <MapPin className="w-3 h-3" />
                      <span className="text-[10px] font-medium">{worker.location}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Mane-Kelsa */}
      <section className="bg-gray-900 rounded-3xl p-6 text-white flex flex-col gap-4 mt-4">
        <h3 className="text-lg font-black italic">Small towns, Big talent.</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          Mane-Kelsa is built for communities like yours. It's a bridge between those who need work done and those who excel at it locally.
        </p>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="flex flex-col gap-1">
            <span className="text-orange-500 font-black">Local</span>
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Verified Neighbors</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-orange-500 font-black">Direct</span>
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">No Middlemen</span>
          </div>
        </div>
      </section>
    </div>
  );
}
