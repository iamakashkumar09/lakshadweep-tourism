"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, MapPin, Compass, ChevronRight, TrendingUp } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { ISLANDS_DATA, PACKAGES_DATA, TRANSLATIONS } from '@/data/content';
import { useRouter } from 'next/navigation';

export default function SearchModal() {
  // 1. All Hooks must run unconditionally at the top
  const { isSearchOpen, setIsSearchOpen, lang, setSelectedDestination, setIsBookingOpen } = useAppContext();
  const [query, setQuery] = useState('');
  const router = useRouter();

  // Reset query when modal closes/opens (Optional, but good UX)
  useEffect(() => {
     if (!isSearchOpen) setQuery('');
  }, [isSearchOpen]);

  // Hook: useMemo (Now it runs every time, which is safe)
  const results = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    
    const islands = ISLANDS_DATA.filter(i => 
      i.name.toLowerCase().includes(q) || i.name_hi.includes(q)
    ).map(i => ({ type: 'Destination', title: lang === 'hi' ? i.name_hi : i.name, id: i.id, data: i, link: `/island/${i.id}`, isIsland: true }));

    const packages = PACKAGES_DATA.filter(p => 
        p.title.toLowerCase().includes(q) || p.title_hi.includes(q)
    ).map(p => ({ type: 'Package', title: lang === 'hi' ? p.title_hi : p.title, id: p.id, data: p, link: '#plan' }));

    return [...islands, ...packages];
  }, [query, lang]);

  const handleNavigate = (result) => {
    setIsSearchOpen(false);
    if (result.isIsland) {
        router.push(result.link);
    } else {
        router.push('/#plan');
        setTimeout(() => {
            setSelectedDestination(result.data);
            setIsBookingOpen(true);
        }, 500);
    }
  };

  // 2. NOW we can check if we should return null
  if (!isSearchOpen) return null;

  // 3. Render Content
  return (
    <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-24 px-4">
       <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" onClick={() => setIsSearchOpen(false)}></div>
       
       <div className="w-full max-w-2xl relative z-10 animate-[fadeInDown_0.2s_ease-out] flex flex-col max-h-[80vh]">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200">
              <div className="p-4 flex items-center gap-4 border-b border-slate-100 shrink-0">
                  <Search className="text-cyan-500 w-5 h-5 ml-2" />
                  <input 
                    autoFocus
                    type="text" 
                    placeholder={TRANSLATIONS[lang].search.placeholder}
                    className="flex-1 text-lg font-medium outline-none bg-transparent text-slate-900 placeholder:text-slate-400 h-12"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <button onClick={() => setIsSearchOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                      <X className="text-slate-400 w-6 h-6" />
                  </button>
              </div>
              
              <div className="overflow-y-auto p-2 max-h-[60vh] bg-slate-50/50">
                {query && results.length === 0 && (
                    <div className="py-12 text-center text-slate-500">
                        <p>{TRANSLATIONS[lang].search.no_results}</p>
                    </div>
                )}
                
                {results.length > 0 && (
                    <div className="p-2 grid gap-1">
                        <div className="text-xs font-bold text-cyan-600 uppercase mb-2 pl-3 tracking-wider">{TRANSLATIONS[lang].search.results_for} "{query}"</div>
                        {results.map((result, idx) => (
                            <div key={idx} onClick={() => handleNavigate(result)} className="flex items-center gap-4 p-3 hover:bg-white hover:shadow-sm rounded-2xl cursor-pointer group transition-all border border-transparent hover:border-slate-100">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white border border-slate-200 text-slate-500 group-hover:text-cyan-600 transition-colors`}>
                                    {result.type === 'Destination' && <MapPin size={18} />}
                                    {result.type === 'Package' && <Compass size={18} />}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-900">{result.title}</h4>
                                    <span className="text-xs text-slate-500 font-medium">{result.type}</span>
                                </div>
                                <ChevronRight className="text-slate-300 group-hover:text-cyan-500 w-5 h-5" />
                            </div>
                        ))}
                    </div>
                )}

                {!query && (
                    <div className="p-6">
                        <div className="flex items-center gap-2 mb-4 text-slate-500">
                            <TrendingUp size={16} />
                            <h5 className="text-xs font-bold uppercase tracking-wider">{TRANSLATIONS[lang].search.quick_links}</h5>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {['Agatti', 'Scuba', 'Resorts', 'Ferry', 'Permits'].map(tag => (
                                <button key={tag} onClick={() => setQuery(tag)} className="px-4 py-2 bg-white hover:bg-cyan-50 border border-slate-200 hover:border-cyan-200 text-slate-600 hover:text-cyan-700 rounded-full text-sm font-medium transition-all shadow-sm">
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
              </div>
          </div>
       </div>
    </div>
  );
}