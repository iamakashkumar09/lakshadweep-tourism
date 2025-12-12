"use client";
import Link from 'next/link';
import { ArrowRight, ChevronDown, MapPin } from 'lucide-react';
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
        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto mt-20">
             <h1 className="text-5xl md:text-8xl font-extrabold text-white mb-8">{t('hero', 'title')}</h1>
             <p className="text-xl text-white/90 max-w-2xl mx-auto mb-12">{t('hero', 'subtitle')}</p>
             <div className="flex gap-4 justify-center">
                <Button variant="accent" onClick={() => document.getElementById('plan').scrollIntoView({ behavior: 'smooth' })}>
                    {t('hero', 'cta_plan')} <ArrowRight size={20} />
                </Button>
             </div>
        </div>
      </div>

      {/* Packages */}
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

      <Footer />
    </main>
  );
}