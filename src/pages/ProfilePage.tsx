import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, LogOut, Heart, Clock, Shield, HelpCircle, ChevronRight, User, Star, MapPin, LogIn } from 'lucide-react';
import { motion } from 'motion/react';
import { useFirebase } from '../lib/FirebaseProvider';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, profile, loading, signIn, signOut } = useFirebase();

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-12">
        <div className="w-8 h-8 border-4 border-orange-600/20 border-t-orange-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 text-center gap-6">
        <div className="w-24 h-24 bg-orange-100 rounded-[40px] flex items-center justify-center">
            <User className="w-10 h-10 text-orange-600" />
        </div>
        <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-black text-gray-900">Join Mane-Kelsa</h2>
            <p className="text-sm text-gray-500 max-w-[250px]">
                Sign in to save workers, manage bookings, and list your own services.
            </p>
        </div>
        <button 
            onClick={signIn}
            className="w-full bg-orange-600 text-white py-5 rounded-[24px] font-black text-sm flex items-center justify-center gap-3 shadow-xl shadow-orange-100 active:scale-95 transition-transform"
        >
            <LogIn className="w-5 h-5" />
            Continue with Google
        </button>
      </div>
    );
  }

  const initials = profile?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';

  return (
    <div className="flex flex-col min-h-screen bg-white pb-24">
      {/* Profile Header */}
      <div className="p-8 pb-12 flex flex-col items-center gap-4 bg-gradient-to-b from-orange-50 to-white">
        <div className="relative">
          {user.photoURL ? (
            <img src={user.photoURL} className="w-24 h-24 rounded-[40px] object-cover border-4 border-white shadow-lg" alt="Profile" referrerPolicy="no-referrer" />
          ) : (
            <div className="w-24 h-24 rounded-[40px] bg-orange-600 flex items-center justify-center text-white text-3xl font-black">
              {initials}
            </div>
          )}
          <button className="absolute bottom-0 right-0 p-2 bg-white rounded-2xl shadow-lg border border-gray-100">
            <Settings className="w-4 h-4 text-gray-700" />
          </button>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-black text-gray-900">{profile?.name || 'User'}</h2>
          <p className="text-sm font-medium text-gray-500">{profile?.phoneNumber || user.email}</p>
        </div>
        
        {/* Profile Badges */}
        <div className="flex gap-3 mt-2">
          <div className="px-3 py-1 bg-white border border-gray-100 rounded-full flex items-center gap-1.5 shadow-sm">
            <Shield className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-[10px] font-black text-gray-700 uppercase">Verified Member</span>
          </div>
        </div>
      </div>

      {/* Profile Sections */}
      <div className="px-6 flex flex-col gap-8">
        {/* Activity Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-3xl p-6 flex flex-col items-center justify-center gap-1 border border-gray-100">
            <span className="text-2xl font-black text-gray-900">0</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Jobs Done</span>
          </div>
          <div className="bg-gray-50 rounded-3xl p-6 flex flex-col items-center justify-center gap-1 border border-gray-100">
            <span className="text-2xl font-black text-gray-900">0</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Saved</span>
          </div>
        </div>

        {/* List Menu */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Activity</h3>
          <div className="flex flex-col gap-2">
            <MenuItem icon={<Clock className="w-5 h-5 text-blue-500" />} label="Recent Bookings" subtitle="Check ongoing and past work" />
            <MenuItem icon={<Heart className="w-5 h-5 text-red-500" />} label="My Favorites" subtitle="Workers you've saved" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Account Control</h3>
          <div className="flex flex-col gap-2">
            <MenuItem icon={<HelpCircle className="w-5 h-5 text-gray-500" />} label="Help Center" subtitle="Contact support or FAQs" />
            <MenuItem 
              icon={<LogOut className="w-5 h-5 text-red-500" />} 
              label="Sign Out" 
              subtitle="Safely exit your account" 
              onClick={signOut}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuItem({ icon, label, subtitle, onClick }: { icon: React.ReactNode; label: string; subtitle: string; onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-3xl active:bg-gray-50 transition-colors group"
    >
      <div className="w-12 h-12 bg-white shadow-sm border border-gray-50 rounded-2xl flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1 flex flex-col items-start">
        <span className="text-sm font-black text-gray-900">{label}</span>
        <span className="text-[10px] text-gray-400 font-medium">{subtitle}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-300 group-active:translate-x-1 transition-transform" />
    </button>
  );
}
