"use client";
import React from 'react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-10 py-8 flex justify-between items-center pointer-events-auto">
      {/* Logo */}
      <div className="text-white font-mono font-bold tracking-tighter text-xl cursor-pointer italic">
        AGENT<span className="text-cyan-500">_ED_H</span>
      </div>

      {/* Nav Options */}
      <div className="hidden md:flex gap-10 items-center">
        {['Dossier', 'Projects', 'Stack', 'Contact'].map((item) => (
          <button 
            key={item}
            className="text-white/50 hover:text-cyan-400 font-mono text-[10px] tracking-[0.4em] uppercase transition-all duration-300"
          >
            {item}_
          </button>
        ))}
        <button className="px-5 py-2 border border-cyan-500/30 text-cyan-400 font-mono text-[10px] tracking-widest uppercase hover:bg-cyan-500 hover:text-white transition-all">
          Download_CV
        </button>
      </div>
    </nav>
  );
}