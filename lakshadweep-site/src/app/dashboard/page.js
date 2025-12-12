"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import { useAppContext } from '@/context/AppContext';
import { Calendar, CheckCircle } from 'lucide-react';

export default function Dashboard() {
  const { user, bookings } = useAppContext();
  const router = useRouter();

  if (!user) {
    // Redirect logic could go here, for now we just show a message
    return <div className="p-20 text-center">Please log in to view dashboard.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-6xl mx-auto pt-32 pb-20 px-6">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Welcome, {user.name}</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 h-fit">
                <div className="text-sm font-bold uppercase text-slate-500 mb-2">Total Spent</div>
                <div className="text-4xl font-extrabold">₹{bookings.reduce((acc, curr) => acc + curr.price, 0).toLocaleString()}</div>
            </div>

            <div className="md:col-span-2 space-y-4">
                <h3 className="text-xl font-bold">Your Bookings</h3>
                {bookings.length === 0 ? <p className="text-slate-500">No trips booked yet.</p> : 
                    bookings.map(b => (
                        <div key={b.id} className="bg-white p-6 rounded-3xl border border-slate-100 flex gap-6 items-center">
                            <img src={b.image} className="w-24 h-24 rounded-2xl object-cover bg-slate-200" />
                            <div>
                                <h4 className="font-bold text-lg">{b.destination}</h4>
                                <div className="text-slate-500 text-sm flex gap-4 mt-1">
                                    <span className="flex items-center gap-1"><Calendar size={14}/> {b.date}</span>
                                    <span className={`font-bold ${b.status === 'Confirmed' ? 'text-green-600' : 'text-orange-500'}`}>{b.status}</span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
      </div>
    </div>
  );
}