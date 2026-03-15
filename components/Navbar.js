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
    // Floating Pill Layout with Alabaster/Sand Theme
    <div className="fixed top-6 left-0 w-full flex justify-center z-[100] px-4 pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-between w-full max-w-5xl px-8 py-4 bg-[#FAF7F2]/60 backdrop-blur-xl border border-[#E5D3B3]/30 rounded-full shadow-[0_15px_40px_rgba(166,138,100,0.12)] transition-all duration-500 ease-in-out">
        
        {/* Logo Section - Serif for Professionalism */}
        <Link href="/">
          <div className="text-[#4A4A4A] font-serif font-bold tracking-tighter text-lg cursor-pointer italic group">
            AGENT<span className="text-[#A68A64] group-hover:text-[#4A4A4A] transition-colors duration-300">_ED_H</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-10 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.path}
              className="text-[#4A4A4A]/50 hover:text-[#A68A64] font-mono text-[9px] tracking-[0.4em] uppercase transition-all duration-300 relative group"
            >
              {link.name}_
              {/* Soft Underline in Dusty Gold */}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#A68A64]/50 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Action Button: Download CV */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.open('/resume.pdf', '_blank')}
            className="px-5 py-2 rounded-full border border-[#A68A64]/20 text-[#A68A64] font-mono text-[9px] tracking-widest uppercase hover:bg-[#A68A64]/5 hover:border-[#A68A64]/50 hover:shadow-[0_0_15px_rgba(166,138,100,0.1)] transition-all duration-300"
          >
            CV_
          </button>
          
          {/* Mobile Menu Placeholder (Dusty Gold Indicator) */}
          <div className="md:hidden w-8 h-8 flex items-center justify-center rounded-full bg-[#E5D3B3]/20 border border-[#E5D3B3]/40">
            <div className="w-4 h-[1px] bg-[#A68A64]"></div>
          </div>
        </div>
      </nav>
    </div>
  );
}