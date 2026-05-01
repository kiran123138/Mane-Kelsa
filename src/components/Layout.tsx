import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, PlusCircle, User, Menu } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFCFB] text-[#1D1D1B] font-sans antialiased">
      {/* Top App Bar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">MK</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-orange-950">Mane-Kelsa</h1>
        </div>
        <button id="menu-btn" className="p-2 transition-colors active:bg-gray-100 rounded-full">
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-lg mx-auto pb-24">
        {children}
      </main>

      {/* Bottom Navigation (Android Style) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 px-2 py-1 pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
        <div className="max-w-lg mx-auto flex items-center justify-around">
          <NavItem to="/" icon={<Home className="w-6 h-6" />} label="Home" />
          <NavItem to="/search" icon={<Search className="w-6 h-6" />} label="Search" />
          <NavItem to="/list-work" icon={<PlusCircle className="w-6 h-6 text-orange-600" />} label="List Self" />
          <NavItem to="/profile" icon={<User className="w-6 h-6" />} label="Profile" />
        </div>
      </nav>
    </div>
  );
}

function NavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200",
          isActive ? "text-orange-600" : "text-gray-500 hover:text-gray-900"
        )
      }
    >
      <div className="relative">
        {icon}
      </div>
      <span className="text-[10px] font-medium tracking-wide uppercase">{label}</span>
    </NavLink>
  );
}
