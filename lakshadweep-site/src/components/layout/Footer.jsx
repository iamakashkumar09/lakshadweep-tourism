import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
      <footer className="bg-slate-950 text-white pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20 border-b border-white/10 pb-16">
            <div className="col-span-1 md:col-span-1">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center font-bold text-lg">LQ</div>
                    <span className="text-2xl font-bold tracking-tight">Lakshadweep</span>
                </div>
                <p className="text-slate-400 leading-relaxed">The official guide for tourism in Lakshadweep.</p>
            </div>
            <div>
                <h4 className="font-bold mb-8 uppercase text-xs tracking-widest text-cyan-500">Explore</h4>
                <ul className="space-y-4 text-slate-400">
                    <li><a href="#" className="hover:text-white">Our Islands</a></li>
                    <li><a href="#" className="hover:text-white">Things to Do</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-8 uppercase text-xs tracking-widest text-cyan-500">Plan</h4>
                <ul className="space-y-4 text-slate-400">
                    <li><a href="#" className="hover:text-white">Getting Here</a></li>
                    <li><a href="#" className="hover:text-white">Permits</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-8 uppercase text-xs tracking-widest text-cyan-500">Follow Us</h4>
                <div className="flex gap-4">
                    <Facebook size={24} className="hover:text-cyan-500 cursor-pointer" />
                    <Instagram size={24} className="hover:text-pink-500 cursor-pointer" />
                    <Twitter size={24} className="hover:text-blue-400 cursor-pointer" />
                </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto text-center text-xs text-slate-500 uppercase font-bold">
            © 2025 Visit Lakshadweep
        </div>
      </footer>
  );
}