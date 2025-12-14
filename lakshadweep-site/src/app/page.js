"use client";
import Link from 'next/link';
import { ArrowRight, ChevronDown, MapPin, Plane, Ship, Anchor, Info } from 'lucide-react'; // Added missing icons
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useAppContext } from '@/context/AppContext';
import { TRANSLATIONS, ISLANDS_DATA, PACKAGES_DATA } from '@/data/content';

export default function Home() {
  const { lang, setSelectedDestination, setIsBookingOpen } = useAppContext();
  const t = (section, key) => TRANSLATIONS[lang][section][key];

  const handlePackageClick = (pkg) => {
    setSelectedDestination({ 
      name: lang === 'hi' ? pkg.title_hi : pkg.title, 
      price: pkg.price, 
      image: "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1000" 
    });
    setIsBookingOpen(true);
  };

  return (
    <main className="bg-white">
      <Navbar />
      
      {/* Hero */}
      <div className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-slate-900">
        <div className="absolute inset-0 z-0">
             <img src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=3200&auto=format&fit=crop" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/50"></div>
        </div>
        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto mt-20 animate-[fadeInUp_0.8s_ease-out]">
             <h1 className="text-5xl md:text-8xl font-extrabold text-white mb-8">{t('hero', 'title')}</h1>
             <p className="text-xl text-white/90 max-w-2xl mx-auto mb-12">{t('hero', 'subtitle')}</p>
             <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Button variant="accent" onClick={() => document.getElementById('plan').scrollIntoView({ behavior: 'smooth' })}>
                    {t('hero', 'cta_plan')} <ArrowRight size={20} />
                </Button>
                <Button variant="outline" className="border-2" onClick={() => document.getElementById('permits').scrollIntoView({ behavior: 'smooth' })}>
                    {t('hero', 'cta_permits')}
                </Button>
             </div>
        </div>
      </div>

      {/* Packages (Plan) */}
      <section id="plan" className="py-32 px-6 bg-white">
         <div className="max-w-7xl mx-auto">
             <SectionHeading subtitle={t('sections', 'plan_subtitle')} title={t('sections', 'plan_title')} description={t('sections', 'plan_desc')} />
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {PACKAGES_DATA.map((plan, idx) => (
                    <div key={idx} onClick={() => handlePackageClick(plan)} className="group rounded-[2rem] border border-slate-100 shadow-xl cursor-pointer hover:-translate-y-2 transition-all">
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

      {/* Islands Grid */}
      <section id="islands" className="py-32 px-6 bg-slate-50">
         <div className="max-w-7xl mx-auto">
            <SectionHeading subtitle={t('sections', 'islands_subtitle')} title={t('sections', 'islands_title')} description={t('sections', 'islands_desc')} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {ISLANDS_DATA.map((island) => (
                    <Link href={`/island/${island.id}`} key={island.id} className="group relative h-[500px] rounded-[2.5rem] overflow-hidden">
                        <img src={island.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
                        <div className="absolute bottom-0 p-10">
                            <span className="bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase mb-3 inline-block">{island.tag}</span>
                            <h3 className="text-4xl font-bold text-white mb-2">{lang === 'hi' ? island.name_hi : island.name}</h3>
                            <div className="flex items-center gap-2 text-cyan-300 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                Explore <ArrowRight size={20} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
         </div>
      </section>

      {/* --- ADDED: Permit Info Section --- */}
      <section id="permits" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-start">
            <div className="lg:w-1/3 sticky top-32">
                <SectionHeading 
                    subtitle={t('sections', 'permits_subtitle')} 
                    title={t('sections', 'permits_title')} 
                    description={t('sections', 'permits_desc')} 
                />
                <div className="p-8 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-[2rem] border border-cyan-100">
                    <h4 className="font-bold text-xl text-cyan-900 mb-4 flex items-center gap-3">
                        <Info size={24} className="text-cyan-600" /> Official Protocol
                    </h4>
                    <p className="text-cyan-800/80 mb-6 leading-relaxed">
                        The administration requires all visitors to obtain a permit before arrival. We assist with paperwork, but final approval lies with the Lakshadweep Administration.
                    </p>
                    <button className="inline-flex items-center gap-2 font-bold text-cyan-700 hover:gap-3 transition-all">Read Guidelines <ArrowRight size={18} /></button>
                </div>
            </div>

            <div className="lg:w-2/3 grid grid-cols-1 gap-8">
                {[
                    { step: "01", title: "Check Eligibility", text: "Ensure you have valid ID proofs (Aadhar/Passport). Foreign nationals require special clearance." },
                    { step: "02", title: "Book Accommodation", text: "Permits are only issued against confirmed resort or hotel bookings. Secure your stay first." },
                    { step: "03", title: "Apply Online", text: "Submit your documents via the ePermit portal. Processing typically takes 24-48 hours." },
                    { step: "04", title: "Verification", text: "Police verification is mandatory and may take 15-20 days for certain categories." }
                ].map((item) => (
                    <div key={item.step} className="flex gap-8 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                        <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center text-2xl font-bold shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                            {item.step}
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors">{item.title}</h4>
                            <p className="text-slate-500 leading-relaxed">{item.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- ADDED: Travel Info Section --- */}
      <section id="travel" className="py-32 px-6 bg-slate-900 text-white relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/20 rounded-full blur-[120px] -mr-32 -mt-32 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] -ml-32 -mb-32 pointer-events-none"></div>
        
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
                    <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all duration-300 group">
                        <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-8 text-white shadow-lg shadow-cyan-900/50 group-hover:scale-110 transition-transform">
                            <item.icon size={32} />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                        <p className="text-slate-400 leading-relaxed">{item.text}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}