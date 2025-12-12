import React from 'react';

export const SectionHeading = ({ subtitle, title, description, dark = false }) => (
  <div className="mb-12">
    <span className={`font-bold tracking-wider uppercase text-xs mb-3 block flex items-center gap-2 ${dark ? 'text-cyan-400' : 'text-cyan-600'}`}>
      <span className="w-8 h-0.5 bg-current rounded-full"></span>
      {subtitle}
    </span>
    <h2 className={`text-3xl md:text-5xl font-extrabold mb-4 tracking-tight ${dark ? 'text-white' : 'text-slate-900'}`}>
      {title}
    </h2>
    <p className={`text-lg max-w-2xl leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-500'}`}>
      {description}
    </p>
  </div>
);