"use client";
import React, { useState } from 'react';
import { X, Info } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAppContext } from '@/context/AppContext';

export default function BookingModal() {
  const { isBookingOpen, setIsBookingOpen, selectedDestination, addBooking, user, lang } = useAppContext();
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('');

  if (!isBookingOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const destName = selectedDestination?.name || selectedDestination?.title || 'Custom Trip';
    addBooking({
      id: Math.random().toString(36).substr(2, 9),
      destination: destName,
      image: selectedDestination?.image || 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b',
      date,
      guests,
      price: (selectedDestination?.price || 15000) * guests,
      status: 'Pending',
      bookedOn: new Date().toLocaleDateString()
    });
    setIsBookingOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsBookingOpen(false)}></div>
      <div className="bg-white w-full max-w-lg relative z-10 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        <div className="h-48 w-full relative group shrink-0">
            <img src={selectedDestination?.image || "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b"} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                <h3 className="text-white text-3xl font-bold">{selectedDestination?.name || selectedDestination?.title || 'Plan Trip'}</h3>
            </div>
            <button onClick={() => setIsBookingOpen(false)} className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-full text-white">
              <X size={20} />
            </button>
        </div>
        
        <div className="overflow-y-auto bg-white p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
            {!user && (
                <div className="bg-blue-50 text-blue-800 p-4 rounded-2xl text-sm flex items-start gap-3 border border-blue-100">
                    <Info size={16} className="shrink-0 mt-0.5" />
                    Login to save this trip to your dashboard.
                </div>
            )}
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Date</label>
                    <input type="date" required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50" onChange={(e) => setDate(e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Guests</label>
                    <div className="flex items-center gap-3">
                        <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} className="w-10 h-10 rounded-xl bg-slate-100 font-bold">-</button>
                        <span className="font-bold text-xl w-8 text-center">{guests}</span>
                        <button type="button" onClick={() => setGuests(guests + 1)} className="w-10 h-10 rounded-xl bg-slate-100 font-bold">+</button>
                    </div>
                </div>
            </div>
            <Button type="submit" variant="accent" className="w-full !py-3 text-lg">Confirm Booking</Button>
            </form>
        </div>
      </div>
    </div>
  );
}