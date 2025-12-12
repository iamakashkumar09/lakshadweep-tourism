"use client";
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAppContext } from '@/context/AppContext';

export default function LoginModal() {
  const { isLoginOpen, setIsLoginOpen, login, lang } = useAppContext();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  if (!isLoginOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      login({ name: name || 'Explorer', email, role: 'user' });
      setIsLoginOpen(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsLoginOpen(false)}></div>
      <div className="bg-white w-full max-w-md relative z-10 rounded-3xl shadow-2xl animate-[fadeIn_0.3s_ease-out] flex flex-col max-h-[90vh]">
        <div className="p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900">{isSignUp ? 'Join the Adventure' : 'Welcome Back'}</h3>
            <button onClick={() => setIsLoginOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
              <X size={20} className="text-slate-400" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
                <input type="text" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 outline-none" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            )}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
              <input type="email" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 outline-none" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <Button type="submit" variant="primary" className="w-full !py-3 text-lg mt-4">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Button>
          </form>
          
          <div className="mt-8 text-center text-sm text-slate-500">
             <button onClick={() => setIsSignUp(!isSignUp)} className="text-cyan-600 font-bold hover:underline">
               {isSignUp ? 'Switch to Sign In' : 'Create an Account'}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}