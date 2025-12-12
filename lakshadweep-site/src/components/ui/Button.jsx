import React from 'react';

export const Button = ({ children, variant = 'primary', className = '', onClick, type='button' }) => {
  const baseStyle = "px-6 py-3 rounded-full font-bold transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2 text-sm";
  const variants = {
    primary: "bg-cyan-500 hover:bg-cyan-400 text-white shadow-lg shadow-cyan-500/30 backdrop-blur-sm",
    secondary: "bg-white text-slate-900 hover:bg-slate-50 border border-slate-200 shadow-sm",
    outline: "bg-white/10 border border-white/30 text-white hover:bg-white/20 backdrop-blur-md",
    accent: "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20"
  };

  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};