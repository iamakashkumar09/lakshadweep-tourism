"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, MapPin, Plane, Ship, Anchor, Info } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useAppContext } from '@/context/AppContext';
import { TRANSLATIONS, ISLANDS_DATA, PACKAGES_DATA } from '@/data/content';

export default function Home() {
  const { lang, setSelectedDestination, setIsBookingOpen } = useAppContext();
  const [showAllIslands, setShowAllIslands] = useState(false);
  
  const t = (section, key) => TRANSLATIONS[lang][section][key];

  // Logic to determine how many islands to show
  const visibleIslands = showAllIslands ? ISLANDS_DATA : ISLANDS_DATA.slice(0, 3);

  const handlePackageClick = (pkg) => {
    setSelectedDestination({ 
      name: lang === 'hi' ? pkg.title_hi : pkg.title, 
      price: pkg.price, 
      image: "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1000" 
    });
    setIsBookingOpen(true);
  };

  // --- COMPONENT: Cinematic Title (Water Wave Color + Physical Wave Motion) ---
  const CinematicTitle = ({ text }) => {
    const words = text.split(' ');
    return (
      <h1 className="text-5xl md:text-8xl font-extrabold mb-8 leading-tight tracking-tight uppercase flex flex-wrap justify-center gap-x-4 gap-y-2">
        {words.map((word, index) => (
          <span key={index} className="relative">
            {/* 1. Outer Span: Handles the physical up/down wave motion */}
            <span 
                className="inline-block animate-wave"
                style={{ animationDelay: `${index * 0.2}s` }}
            >
                {/* 2. Inner Span: Handles the entrance and water color flow */}
                <span 
                    className="inline-block animate-cinematic text-water-wave"
                    style={{ animationDelay: `${index * 150}ms` }}
                >
                    {word}
                </span>
            </span>
          </span>
        ))}
      </h1>
    );
  };

  // --- COMPONENT: Typewriter Text (Typing + Shimmer Color + Blinking Cursor) ---
  const TypewriterText = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [started, setStarted] = useState(false);

    // Delay start by 1.5s to let the main title finish revealing
    useEffect(() => {
        const startTimeout = setTimeout(() => {
            setStarted(true);
        }, 1500); 
        return () => clearTimeout(startTimeout);
    }, []);

    // Typing Effect Logic
    useEffect(() => {
        if (!started) return;
        
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                setDisplayedText((prev) => text.substring(0, prev.length + 1));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 80); // Speed: 30ms per character

        return () => clearInterval(typingInterval);
    }, [text, started]);

    return (
      <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed h-24 md:h-auto flex items-center justify-center">
        {/* Text with Shimmer Gradient */}
        <span className="text-shimmer">
            {displayedText}
        </span>
        
        {/* Blinking Cursor */}
        <span className="animate-blink ml-1 text-cyan-400 text-3xl font-light">|</span>
      </p>
    );
  };

  return (
    <main className="bg-white overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-slate-900">
        <div className="absolute inset-0 z-0">
             <video 
                className="w-full h-full object-cover opacity-90"
                autoPlay 
                loop 
                muted 
                playsInline
                poster="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=3200&auto=format&fit=crop"
             >
                {/* NOTE: Replace this with <source src="/hero.mp4" ... /> 
                   if you downloaded the video to your public folder.
                */}
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
             </video>
             {/* Gradient Overlay for contrast */}
             <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60"></div>
        </div>
        
        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto mt-10">
             {/* Tagline */}
             <span className="inline-block text-cyan-400 font-bold tracking-[0.2em] uppercase text-sm mb-4 animate-cinematic">
                #VisitLakshadweep
             </span>

             {/* 1. Cinematic Title (Wave) */}
             <CinematicTitle text={t('hero', 'title')} />

             {/* 2. Subtitle (Typewriter) */}
             <TypewriterText text={t('hero', 'subtitle')} />
             
             {/* Buttons (Delayed Entrance) */}
             <div className="flex flex-col sm:flex-row gap-5 justify-center animate-cinematic delay-700 opacity-0 fill-mode-forwards">
                <Button variant="accent" onClick={() => document.getElementById('plan').scrollIntoView({ behavior: 'smooth' })}>
                    {t('hero', 'cta_plan')} <ArrowRight size={20} />
                </Button>
                <Button variant="outline" className="border-2 backdrop-blur-md bg-white/5 hover:bg-white/20 border-white/30" onClick={() => document.getElementById('permits').scrollIntoView({ behavior: 'smooth' })}>
                    {t('hero', 'cta_permits')}
                </Button>
             </div>
        </div>
      </div>

      {/* Packages Section */}
      <section id="plan" className="py-20 md:py-32 px-6 bg-white">
         <div className="max-w-7xl mx-auto">
             <SectionHeading subtitle={t('sections', 'plan_subtitle')} title={t('sections', 'plan_title')} description={t('sections', 'plan_desc')} />
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {PACKAGES_DATA.map((plan, idx) => (
                    <div key={idx} onClick={() => handlePackageClick(plan)} className="group rounded-[2rem] border border-slate-100 shadow-xl cursor-pointer hover:-translate-y-2 transition-all duration-300">
                        <div className="h-64 overflow-hidden rounded-t-[2rem]">
                             <img src={`https://images.unsplash.com/photo-${['1544550581-5f7ceaf7f992','1596895111956-bf1cf0599ce5','1573843981267-be1999ff37cd'][idx]}?auto=format&fit=crop&w=1000`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="p-8">
                             <h4 className="text-2xl font-bold mb-3">{lang === 'hi' ? plan.title_hi : plan.title}</h4>
                             <p className="text-slate-500 text-sm mb-6">{lang === 'hi' ? plan.desc_hi : plan.desc}</p>
                             <div className="font-extrabold text-xl text-slate-900">₹{plan.price.toLocaleString()}</div>
                        </div>
                    </div>
                ))}
             </div>
         </div>
      </section>

      {/* Islands Section */}
      <section id="islands" className="py-20 md:py-32 px-6 bg-slate-50">
         <div className="max-w-7xl mx-auto">
            <SectionHeading subtitle={t('sections', 'islands_subtitle')} title={t('sections', 'islands_title')} description={t('sections', 'islands_desc')} />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {visibleIslands.map((island) => (
                    <Link href={`/island/${island.id}`} key={island.id} className="group relative h-[500px] rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                        <img src={island.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-90"></div>
                        
                        <div className="absolute bottom-0 p-10 w-full">
                            <span className="bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase mb-4 inline-block">{island.tag}</span>
                            <h3 className="text-4xl font-bold text-white mb-2">{lang === 'hi' ? island.name_hi : island.name}</h3>
                            
                            <div className="flex items-center gap-2 text-cyan-300 font-bold translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                                Explore Island <ArrowRight size={20} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {!showAllIslands && (
                <div className="text-center">
                    <button 
                        onClick={() => setShowAllIslands(true)}
                        className="px-8 py-4 bg-white border border-slate-200 rounded-full font-bold text-slate-600 hover:bg-cyan-50 hover:text-cyan-600 hover:border-cyan-200 transition-all shadow-sm"
                    >
                        View All Islands ({ISLANDS_DATA.length - 3} more)
                    </button>
                </div>
            )}
         </div>
      </section>

      {/* Permits Section */}
      <section id="permits" className="py-20 md:py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            
            <div className="lg:w-1/3 lg:sticky lg:top-32">
                <SectionHeading 
                    subtitle={t('sections', 'permits_subtitle')} 
                    title={t('sections', 'permits_title')} 
                    description={t('sections', 'permits_desc')} 
                />
                <div className="p-8 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-[2rem] border border-cyan-100 relative overflow-hidden">
                    <div className="relative z-10">
                        <h4 className="font-bold text-xl text-cyan-900 mb-4 flex items-center gap-3">
                            <Info size={24} className="text-cyan-600" /> Official Protocol
                        </h4>
                        <p className="text-cyan-800/80 mb-6 leading-relaxed">
                            The administration requires all visitors to obtain a permit before arrival. We assist with paperwork, but final approval lies with the Lakshadweep Administration.
                        </p>
                        <button className="inline-flex items-center gap-2 font-bold text-cyan-700 hover:gap-3 transition-all">Read Guidelines <ArrowRight size={18} /></button>
                    </div>
                </div>
            </div>

            <div className="lg:w-2/3 grid grid-cols-1 gap-6 md:gap-8 w-full">
                {[
                    { step: "01", title: "Check Eligibility", text: "Ensure you have valid ID proofs (Aadhar/Passport). Foreign nationals require special clearance." },
                    { step: "02", title: "Book Accommodation", text: "Permits are only issued against confirmed resort or hotel bookings. Secure your stay first." },
                    { step: "03", title: "Apply Online", text: "Submit your documents via the ePermit portal. Processing typically takes 24-48 hours." },
                    { step: "04", title: "Verification", text: "Police verification is mandatory and may take 15-20 days for certain categories." }
                ].map((item) => (
                    <div key={item.step} className="flex flex-col sm:flex-row gap-6 sm:gap-8 bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                        <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center text-2xl font-bold shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                            {item.step}
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors">{item.title}</h4>
                            <p className="text-slate-500 leading-relaxed text-sm md:text-base">{item.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Travel Info Section */}
      <section id="travel" className="py-20 md:py-32 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-cyan-500/20 rounded-full blur-[120px] -mr-32 -mt-32 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-blue-600/20 rounded-full blur-[100px] -ml-32 -mb-32 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
            <SectionHeading 
                dark
                subtitle={t('sections', 'travel_subtitle')} 
                title={t('sections', 'travel_title')} 
                description={t('sections', 'travel_desc')} 
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { icon: Plane, title: "By Air", text: "75 min flight from Kochi (COK) to Agatti (AGX). ATR-72 aircrafts operate daily." },
                    { icon: Ship, title: "By Sea", text: "14-18 hour voyage from Kochi/Mangalore via MV Kavaratti & others." },
                    { icon: Anchor, title: "Inter-Island", text: "High-speed HSC vessels and chopper services available for transfers." }
                ].map((item, idx) => (
                    <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-[2.5rem] hover:bg-white/10 transition-all duration-300 group">
                        <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-8 text-white shadow-lg shadow-cyan-900/50 group-hover:scale-110 transition-transform">
                            <item.icon size={32} />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                        <p className="text-slate-400 leading-relaxed text-sm md:text-base">{item.text}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}