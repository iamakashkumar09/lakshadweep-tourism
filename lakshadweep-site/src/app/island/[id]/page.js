"use client";
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Star, Camera, Fish } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { useAppContext } from '@/context/AppContext';
import { ISLANDS_DATA } from '@/data/content';

export default function IslandDetail() {
  const params = useParams();
  const router = useRouter();
  const { lang, setSelectedDestination, setIsBookingOpen } = useAppContext();
  
  // Find specific island based on URL ID
  const island = ISLANDS_DATA.find(i => i.id.toString() === params.id);

  if (!island) return <div className="pt-32 text-center">Island not found</div>;

  const handleBook = () => {
    setSelectedDestination(island);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero */}
      <div className="relative h-[70vh] w-full">
        <img src={island.image} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent"></div>
        
        <button onClick={() => router.back()} className="absolute top-24 left-6 p-3 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20 hover:bg-white/30 transition-all z-20">
            <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
            <div className="max-w-7xl mx-auto">
                <span className="px-3 py-1 rounded-full bg-cyan-500/80 backdrop-blur-sm text-xs font-bold uppercase tracking-wider mb-4 inline-block">{island.tag}</span>
                <h1 className="text-5xl md:text-7xl font-extrabold mb-4">{lang === 'hi' ? island.name_hi : island.name}</h1>
                <p className="text-xl text-slate-200 max-w-2xl">{lang === 'hi' ? island.desc_hi : island.desc}</p>
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
            <section>
                <h3 className="text-2xl font-bold mb-4">About {island.name}</h3>
                <p className="text-slate-600 text-lg leading-relaxed">{island.long_desc}</p>
            </section>
            
            <section>
                <h3 className="text-2xl font-bold mb-6">Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {island.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
                            <div className="w-10 h-10 rounded-full bg-white text-cyan-600 flex items-center justify-center shadow-sm">
                                <Star size={18} />
                            </div>
                            <span className="font-bold text-slate-700">{h}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
            <div className="sticky top-28 p-8 rounded-[2rem] border border-slate-200 shadow-xl bg-white">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-slate-500 font-bold uppercase text-xs">Starting From</span>
                    <span className="text-3xl font-extrabold text-slate-900">₹{island.price.toLocaleString()}</span>
                </div>
                <Button onClick={handleBook} className="w-full !py-4 text-lg mb-4">
                    {lang === 'hi' ? 'अभी बुक करें' : 'Book Now'}
                </Button>
                <p className="text-center text-xs text-slate-400">Reserve now, pay later options available.</p>
            </div>
        </div>
      </div>
    </div>
  );
}