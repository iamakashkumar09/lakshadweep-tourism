"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Globe, User, Menu, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAppContext } from '@/context/AppContext';
import { TRANSLATIONS } from '@/data/content';

export default function Navbar() {
  const { lang, setLang, user, logout, setIsLoginOpen, setIsBookingOpen, setIsSearchOpen } = useAppContext();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const isTransparent = pathname === '/' && !scrolled && !mobileMenuOpen;
  const t = (key) => TRANSLATIONS[lang].nav[key];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        !isTransparent ? 'bg-white/90 backdrop-blur-md shadow-sm py-3 border-b border-slate-100' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer z-50 group">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm transition-all shadow-lg ${!isTransparent ? 'bg-cyan-600 text-white' : 'glass-panel text-white bg-white/10 backdrop-blur-md border border-white/20'}`}>
            LQ
          </div>
          <div className={`text-xl font-bold tracking-tight ${!isTransparent ? 'text-slate-900' : 'text-white drop-shadow-md'}`}>
            Lakshadweep
          </div>
        </Link>

        {/* Desktop Menu - Spacing adjusted to prevent overlap */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-6">
            <div className={`flex items-center gap-1 rounded-full p-1 border ${!isTransparent ? 'bg-slate-100 border-slate-200' : 'bg-white/10 backdrop-blur-md border-white/10'}`}>
                {['plan', 'islands', 'travel'].map((item) => (
                    <Link key={item} href={`/#${item}`} className={`text-sm font-bold px-4 py-2 rounded-full transition-all ${!isTransparent ? 'text-slate-600 hover:bg-white hover:text-slate-900' : 'text-white hover:bg-white/20'}`}>
                    {t(item)}
                    </Link>
                ))}
            </div>

            {/* Search Pill */}
            <button 
                onClick={() => setIsSearchOpen(true)}
                className={`group flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-all border ${
                    !isTransparent
                    ? 'bg-slate-100 border-transparent text-slate-500 hover:bg-slate-200' 
                    : 'glass-panel text-white hover:bg-white/20 border-white/20'
                }`}
            >
                <Search size={16} /> 
                <span className="hidden xl:inline">{TRANSLATIONS[lang].search.placeholder}</span>
            </button>

            {/* Language Switcher */}
            <button onClick={() => setLang(lang === 'en' ? 'hi' : 'en')} className={`font-bold text-sm w-10 h-10 flex items-center justify-center rounded-full transition-all ${!isTransparent ? 'text-slate-600 hover:bg-slate-100' : 'text-white hover:bg-white/20'}`}>
                {lang === 'en' ? 'HI' : 'EN'}
            </button>

            {/* User Section */}
            {!user ? (
                <button onClick={() => setIsLoginOpen(true)} className={`font-bold text-sm ${!isTransparent ? 'text-slate-900' : 'text-white'}`}>
                    {t('login')}
                </button>
            ) : (
                <div className="flex items-center gap-2">
                   {/* Avatar links to Dashboard */}
                   <Link href="/dashboard" className="w-9 h-9 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold shadow-md cursor-pointer hover:scale-105 transition-transform">
                      {user.name[0]}
                   </Link>
                   
                   {/* Logout Button */}
                   <button 
                      onClick={logout} 
                      className={`p-2 rounded-full transition-colors ${!isTransparent ? 'text-slate-400 hover:text-red-500 hover:bg-red-50' : 'text-white/70 hover:text-red-200 hover:bg-white/10'}`}
                      title="Log Out"
                   >
                      <LogOut size={18} />
                   </button>
                </div>
            )}
            
            <Button onClick={() => setIsBookingOpen(true)} variant={!isTransparent ? 'primary' : 'outline'} className="!py-2.5 !px-6">
                {t('book')}
            </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 lg:hidden z-50">
             <button onClick={() => setIsSearchOpen(true)} className={`p-2 rounded-full ${!isTransparent ? 'text-slate-900 bg-slate-100' : 'text-white bg-white/10'}`}>
                <Search size={20} />
             </button>

             <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`p-2 rounded-full ${!isTransparent ? 'text-slate-900 bg-slate-100' : 'text-white bg-white/10'}`}>
             {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 p-6 flex flex-col gap-4 animate-[slideDown_0.2s_ease-out]">
            {['plan', 'islands', 'travel'].map((item) => (
                <Link key={item} href={`/#${item}`} onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-slate-800 py-2 border-b border-slate-50">
                   {t(item)}
                </Link>
            ))}
            {user ? (
               <>
                 <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-cyan-600 py-2 flex items-center gap-2">
                    <User size={20} /> {t('dashboard')}
                 </Link>
                 <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-left text-lg font-bold text-red-500 py-2 flex items-center gap-2">
                    <LogOut size={20} /> Log Out
                 </button>
               </>
            ) : (
                 <button onClick={() => { setIsLoginOpen(true); setMobileMenuOpen(false); }} className="text-left text-lg font-bold text-slate-800 py-2">
                    {t('login')}
                 </button>
            )}
            <Button onClick={() => { setIsBookingOpen(true); setMobileMenuOpen(false); }} className="w-full mt-2">
                {t('book')}
            </Button>
        </div>
      )}
    </nav>
  );
}