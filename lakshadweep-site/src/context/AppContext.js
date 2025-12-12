"use client";
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  const [user, setUser] = useState(null); // { name, email, role }
  const [bookings, setBookings] = useState([]);
  
  // Modal States
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);
  
  const addBooking = (booking) => {
    setBookings([booking, ...bookings]);
  };

  const updateBookingStatus = (id, status) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
  };

  return (
    <AppContext.Provider value={{
      lang, setLang,
      user, login, logout,
      bookings, addBooking, updateBookingStatus,
      isLoginOpen, setIsLoginOpen,
      isBookingOpen, setIsBookingOpen,
      isSearchOpen, setIsSearchOpen,
      selectedDestination, setSelectedDestination
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);