"use client";
import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  const navLinks = [
    { name: 'Dossier', path: '/' },
    { name: 'Projects', path: '/#projects' }, // Home page ke section par scroll karega
    { name: 'Stack', path: '/skills' },       // Tere app/skills folder par le jayega
    { name: 'Contact', path: '/#contact' },   // Home page footer par
  ];

  return (
    <div className="fixed top-0 left-0 w-full flex justify-center z-[100] pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-between w-full max-w-full px-10 py-6 
        /* Rectangular Invisible Glass Look */
        backdrop-blur-md 
        border-b border-[#A68A64]/10 
        rounded-none 
        transition-all duration-500 ease-in-out">
        
        {/* Logo Section */}
        <Link href="/">
          <div className="text-[#4A4A4A] font-serif font-bold tracking-tighter text-lg cursor-pointer italic group">
            AGENT<span className="text-[#A68A64] group-hover:text-[#4A4A4A] transition-colors duration-300">_ED_H</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-12 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.path}
              className="text-[#4A4A4A]/60 hover:text-[#A68A64] font-mono text-[10px] tracking-[0.4em] uppercase transition-all duration-300 relative group"
            >
              {link.name}_
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#A68A64]/50 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => window.open('/resume.pdf', '_blank')}
            className="px-6 py-2 border border-[#A68A64]/30 text-[#A68A64] font-mono text-[9px] tracking-widest uppercase hover:bg-[#A68A64]/10 transition-all duration-300 rounded-sm"
          >
            CV_
          </button>
          
          {/* Mobile Menu Icon */}
          <div className="md:hidden flex flex-col gap-1.5 cursor-pointer">
            <div className="w-5 h-[1px] bg-[#A68A64]"></div>
            <div className="w-3 h-[1px] bg-[#A68A64]"></div>
          </div>
        </div>
      </nav>
    </div>
  );
}