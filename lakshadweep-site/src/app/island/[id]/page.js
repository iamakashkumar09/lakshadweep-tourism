"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Star, Camera, Fish, Play, X, ChevronLeft, ChevronRight } from 'lucide-react'; // Added Chevrons
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { useAppContext } from '@/context/AppContext';
import { ISLANDS_DATA } from '@/data/content';

export default function IslandDetail() {
  const params = useParams();
  const router = useRouter();
  const { lang, setSelectedDestination, setIsBookingOpen } = useAppContext();
  
  // State for Media Viewers
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null); // Tracks which image is open

  const island = ISLANDS_DATA.find(i => i.id.toString() === params.id);

  // Close gallery on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setIsVideoPlaying(false);
            setSelectedImageIndex(null);
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!island) return <div className="pt-32 text-center">Island not found</div>;

  const handleBook = () => {
    setSelectedDestination(island);
    setIsBookingOpen(true);
  };

  const galleryImages = [
    island.image,
    "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1514282401047-d77a7149faf9?auto=format&fit=crop&q=80&w=1200"
  ];

  // Gallery Navigation Handlers
  const handleNextImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] w-full group overflow-hidden">
        <img src={island.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
        
        <button onClick={() => router.back()} className="absolute top-24 left-6 p-3 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20 hover:bg-white/30 transition-all z-20 group">
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </button>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
            <div className="max-w-7xl mx-auto animate-[slideUp_0.6s_ease-out]">
                <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/80 backdrop-blur-sm text-xs font-bold uppercase tracking-wider">{island.tag}</span>
                    <div className="flex items-center gap-1 text-yellow-400 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
                        <Star className="fill-current w-3 h-3" />
                        <span className="font-bold text-xs">{island.rating}</span>
                    </div>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 tracking-tight leading-tight">{lang === 'hi' ? island.name_hi : island.name}</h1>
                <p className="text-lg md:text-xl text-slate-200 max-w-2xl font-medium leading-relaxed line-clamp-2 md:line-clamp-none">{lang === 'hi' ? island.desc_hi : island.desc}</p>
            </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        
        {/* Left Column (Details) */}
        <div className="lg:col-span-2 space-y-12">
            
            {/* About */}
            <section>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">About {island.name}</h3>
                <p className="text-slate-600 text-lg leading-relaxed">{island.long_desc}</p>
            </section>
            
            {/* Highlights Grid */}
            <section>
                <h3 className="text-2xl font-bold mb-6 text-slate-900">Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {island.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all group">
                            <div className="w-12 h-12 shrink-0 rounded-full bg-white text-cyan-600 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                <Star size={20} />
                            </div>
                            <span className="font-bold text-slate-700">{h}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Photos & Video Section */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold text-slate-900">Experience</h3>
                    <span onClick={() => setSelectedImageIndex(0)} className="text-sm font-bold text-cyan-600 cursor-pointer hover:underline">View All</span>
                </div>

                {/* Video Card */}
                <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden shadow-xl mb-8 group cursor-pointer bg-slate-100" onClick={() => setIsVideoPlaying(true)}>
                    {!isVideoPlaying ? (
                        <>
                            <img src={island.image} alt="Video Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                                    <Play size={32} className="text-white fill-current ml-1" />
                                </div>
                            </div>
                            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white">
                                <span className="bg-red-600 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">Video</span>
                                <h4 className="font-bold text-lg md:text-xl">Cinematic Tour</h4>
                            </div>
                        </>
                    ) : (
                        <div className="w-full h-full bg-black relative">
                             <iframe 
                                width="100%" 
                                height="100%" 
                                src="https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1&mute=1" 
                                title="Island Video" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                                className="w-full h-full"
                             ></iframe>
                             <button 
                                onClick={(e) => { e.stopPropagation(); setIsVideoPlaying(false); }}
                                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 z-10"
                             >
                                <X size={20} />
                             </button>
                        </div>
                    )}
                </div>

                {/* Photo Grid (Clickable) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[100px] md:auto-rows-[140px]">
                    {galleryImages.slice(0, 4).map((img, idx) => (
                        <div 
                            key={idx} 
                            onClick={() => setSelectedImageIndex(idx)}
                            className={`relative rounded-2xl overflow-hidden cursor-pointer group ${idx === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}`}
                        >
                            <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                            {idx === 0 && (
                                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full">
                                    <span className="text-white text-xs font-bold tracking-wider uppercase">Featured</span>
                                </div>
                            )}
                            {idx === 3 && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">View All</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
                <div className="p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-xl bg-white">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-slate-500 font-bold uppercase text-xs tracking-wider">Starting From</span>
                        <span className="text-2xl md:text-3xl font-extrabold text-slate-900">₹{island.price.toLocaleString()}</span>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-xl">
                            <Camera size={18} className="text-cyan-500 shrink-0" />
                            <span>Scenic Photography</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-xl">
                            <Fish size={18} className="text-cyan-500 shrink-0" />
                            <span>Marine Life Tour</span>
                        </div>
                    </div>

                    <Button onClick={handleBook} className="w-full !py-4 text-lg mb-4 shadow-cyan-500/25">
                        {lang === 'hi' ? 'अभी बुक करें' : 'Book Now'}
                    </Button>
                    <p className="text-center text-xs text-slate-400 font-medium">Free cancellation up to 24h before.</p>
                </div>

                <div className="p-6 rounded-[2rem] bg-slate-900 text-white text-center">
                    <h4 className="font-bold mb-2">Need Help?</h4>
                    <p className="text-sm text-slate-400 mb-4">Our travel experts are here for you.</p>
                    <button className="text-sm font-bold text-cyan-400 hover:text-white transition-colors">Contact Support</button>
                </div>
            </div>
        </div>
      </div>

      {/* --- IMAGE LIGHTBOX MODAL --- */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-xl flex items-center justify-center animate-[fadeIn_0.2s_ease-out]">
            {/* Close Button */}
            <button 
                onClick={() => setSelectedImageIndex(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-50"
            >
                <X size={28} />
            </button>

            {/* Prev Button */}
            <button 
                onClick={handlePrevImage}
                className="absolute left-4 md:left-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all z-40 hidden md:flex"
            >
                <ChevronLeft size={32} />
            </button>

            {/* Image */}
            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12" onClick={() => setSelectedImageIndex(null)}>
                <img 
                    src={galleryImages[selectedImageIndex]} 
                    alt="Gallery Fullscreen" 
                    className="max-h-[85vh] max-w-[95vw] md:max-w-[85vw] object-contain rounded-lg shadow-2xl animate-[scaleIn_0.3s_cubic-bezier(0.16,1,0.3,1)]"
                    onClick={(e) => e.stopPropagation()} // Prevent clicking image from closing
                />
                
                {/* Counter */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-bold tracking-widest border border-white/10">
                    {selectedImageIndex + 1} / {galleryImages.length}
                </div>
            </div>

            {/* Next Button */}
            <button 
                onClick={handleNextImage}
                className="absolute right-4 md:right-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all z-40 hidden md:flex"
            >
                <ChevronRight size={32} />
            </button>
        </div>
      )}
    </div>
  );
}