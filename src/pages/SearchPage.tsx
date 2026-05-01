import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MOCK_WORKERS, CATEGORIES } from '../services/mockData';
import { Search as SearchIcon, Filter, ArrowLeft, Star, MapPin, Verified, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [showFilters, setShowFilters] = useState(false);

  const filteredWorkers = useMemo(() => {
    return MOCK_WORKERS.filter(worker => {
      const matchesQuery = worker.name.toLowerCase().includes(query.toLowerCase()) || 
                           worker.category.toLowerCase().includes(query.toLowerCase()) ||
                           worker.skills.some(s => s.toLowerCase().includes(query.toLowerCase()));
      const matchesCategory = selectedCategory ? worker.category === selectedCategory : true;
      return matchesQuery && matchesCategory;
    });
  }, [query, selectedCategory]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Search Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100 p-4 pt-10 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full active:bg-gray-100">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for 'electrician', 'stitching'..."
              className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button 
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full bg-gray-200"
              >
                <X className="w-3 h-3 text-gray-500" />
              </button>
            )}
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`p-3 rounded-2xl border ${showFilters ? 'bg-orange-600 border-orange-600 text-white' : 'border-gray-100 text-gray-700'} active:scale-95 transition-all`}
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setSelectedCategory('')}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${!selectedCategory ? 'bg-orange-600 text-white' : 'bg-gray-50 text-gray-500 border border-gray-100'}`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${selectedCategory === cat.name ? 'bg-orange-600 text-white' : 'bg-gray-50 text-gray-500 border border-gray-100'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 p-4 flex flex-col gap-4">
        <p className="text-[10px] uppercase tracking-widest font-black text-gray-400">
          {filteredWorkers.length} results found
        </p>

        {filteredWorkers.length > 0 ? (
          <div className="flex flex-col gap-4">
            {filteredWorkers.map((worker) => (
              <motion.div
                key={worker.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => navigate(`/worker/${worker.id}`)}
                className="flex gap-4 p-4 rounded-3xl border border-gray-100 hover:border-orange-100 bg-white"
              >
                <img
                  src={worker.avatarUrl}
                  alt={worker.name}
                  className="w-20 h-20 rounded-2xl object-cover shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <h4 className="font-bold text-gray-900">{worker.name}</h4>
                      {worker.isVerified && <Verified className="w-3.5 h-3.5 text-blue-500" />}
                    </div>
                    <p className="text-xs text-orange-600 font-bold">{worker.category}</p>
                    <p className="text-[10px] text-gray-400 mt-1 line-clamp-1">{worker.bio}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5 text-orange-600">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-xs font-black">{worker.rating}</span>
                      </div>
                      <span className="text-[10px] text-gray-300">|</span>
                      <div className="flex items-center gap-1 text-gray-500">
                        <MapPin className="w-3 h-3" />
                        <span className="text-[10px] font-medium">{worker.location}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-black text-gray-900 bg-gray-50 px-2 py-1 rounded-lg">
                      {worker.priceRange.split('-')[0]}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center py-12 gap-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
              <SearchIcon className="w-8 h-8 text-gray-200" />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-gray-900">No workers found</h4>
              <p className="text-xs text-gray-500 max-w-[200px] mt-1">
                Try adjusting your filters or search keywords.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Filter Overlay */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
              className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 h-[60vh] bg-white rounded-t-[40px] z-[60] p-8 flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black">Filters</h3>
                <button onClick={() => setShowFilters(false)} className="p-2 bg-gray-100 rounded-full">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="flex flex-col gap-4">
                <h4 className="text-sm font-bold text-gray-900">Price Range</h4>
                <div className="flex gap-2">
                  {['Budget', 'Mid-range', 'Premium'].map((range) => (
                    <button key={range} className="flex-1 py-3 border border-gray-100 rounded-2xl text-xs font-bold active:bg-orange-50 active:border-orange-200 active:text-orange-600 transition-all">
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h4 className="text-sm font-bold text-gray-900">Rating</h4>
                <div className="flex gap-2">
                   {[4, 3, 2].map((minRating) => (
                    <button key={minRating} className="flex-1 py-3 border border-gray-100 rounded-2xl text-xs font-bold flex items-center justify-center gap-1 active:bg-orange-50 active:border-orange-200 active:text-orange-600">
                      {minRating}+ <Star className="w-3 h-3 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-auto flex gap-4">
                <button 
                  onClick={() => setShowFilters(false)}
                  className="flex-1 py-4 text-gray-500 font-bold text-sm"
                >
                  Reset
                </button>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="flex-[2] bg-orange-600 text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-orange-200"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
