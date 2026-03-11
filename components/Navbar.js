"use client";
import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  const navLinks = [
    { name: 'Dossier', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Stack', path: '/skills' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    // Floating Pill Layout with Soft Margins & Backdrop Blur
    <div className="fixed top-6 left-0 w-full flex justify-center z-[100] px-4 pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-between w-full max-w-5xl px-8 py-4 bg-[#050810]/40 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-500 ease-in-out">
        
        {/* Logo Section */}
        <Link href="/">
          <div className="text-white font-mono font-bold tracking-tighter text-lg cursor-pointer italic group">
            AGENT<span className="text-cyan-500 group-hover:text-white transition-colors duration-300">_ED_H</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-10 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.path}
              className="text-white/40 hover:text-cyan-400 font-mono text-[9px] tracking-[0.4em] uppercase transition-all duration-300 relative group"
            >
              {link.name}_
              {/* Soft Underline Animation */}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-cyan-500/50 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Action Button: Download CV */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.open('/resume.pdf', '_blank')}
            className="px-5 py-2 rounded-full border border-cyan-500/20 text-cyan-400 font-mono text-[9px] tracking-widest uppercase hover:bg-cyan-500/10 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300"
          >
            CV_
          </button>
          
          {/* Mobile Menu Placeholder (Soft Indicator) */}
          <div className="md:hidden w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10">
            <div className="w-4 h-[1px] bg-cyan-500 shadow-[0_0_5px_cyan]"></div>
          </div>
        </div>
      </nav>
    </div>
  );
}