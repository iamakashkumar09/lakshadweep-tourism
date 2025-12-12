"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Globe, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAppContext } from '@/context/AppContext';
import { TRANSLATIONS } from '@/data/content';

export default function Navbar() {
  const { lang, setLang, user, setIsLoginOpen, setIsBookingOpen, setIsSearchOpen } = useAppContext();
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

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
            <div className={`flex items-center gap-2 rounded-full p-1 border ${!isTransparent ? 'bg-slate-100 border-slate-200' : 'bg-white/10 backdrop-blur-md border-white/10'}`}>
                {['plan', 'islands', 'travel'].map((item) => (
                    <Link key={item} href={`/#${item}`} className={`text-sm font-bold px-4 py-2 rounded-full transition-all ${!isTransparent ? 'text-slate-600 hover:bg-white hover:text-slate-900' : 'text-white hover:bg-white/20'}`}>
                    {t(item)}
                    </Link>
                ))}
                {user && (
                    <Link href="/dashboard" className={`text-sm font-bold px-4 py-2 rounded-full transition-all ${!isTransparent ? 'text-slate-600 hover:bg-white' : 'text-white hover:bg-white/20'}`}>
                        {t('dashboard')}
                    </Link>
                )}
            </div>

            <button onClick={() => setLang(lang === 'en' ? 'hi' : 'en')} className={`font-bold text-sm w-10 h-10 flex items-center justify-center rounded-full transition-all ${!isTransparent ? 'text-slate-600 hover:bg-slate-100' : 'text-white hover:bg-white/20'}`}>
                {lang === 'en' ? 'HI' : 'EN'}
            </button>

            {!user ? (
                <button onClick={() => setIsLoginOpen(true)} className={`font-bold text-sm ${!isTransparent ? 'text-slate-900' : 'text-white'}`}>
                    {t('login')}
                </button>
            ) : (
                <div className="w-9 h-9 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold">{user.name[0]}</div>
            )}
            
            <Button onClick={() => setIsBookingOpen(true)} variant={!isTransparent ? 'primary' : 'outline'} className="!py-2.5 !px-6">
                {t('book')}
            </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 lg:hidden z-50">
             <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`p-2 rounded-full ${!isTransparent ? 'text-slate-900 bg-slate-100' : 'text-white bg-white/10'}`}>
             {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
        </div>
      </div>
    </nav>
  );
}