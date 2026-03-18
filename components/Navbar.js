"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // YAHAN NAYA LINK ADD KIYA HAI: "Projects_"
  const navLinks = [
    { name: "Dossier_", href: "#dossier" },     
    { name: "Stack_", href: "#skills" },
    { name: "OSS_", href: "#opensource" },
    { name: "Experience_", href: "#experience" },
    { name: "Projects_", href: "#projects" }, // <-- Ye raha tumhara Projects link
    { name: "Contact_", href: "#contact" },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      // Offset handle karne ke liye scroll logic
      const offset = 80; // Navbar ki height ke hisab se padding
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'py-4 bg-[#FAF7F2]/80 backdrop-blur-md border-b border-[#A68A64]/10' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-10 md:px-24 flex justify-between items-center">
        
        {/* Logo */}
        <motion.a 
          href="#" 
          onClick={(e) => scrollToSection(e, '#dossier')}
          className="text-[#4A4A4A] text-xl font-serif italic font-black tracking-tighter cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          AAYUSH<span className="text-[#A68A64]">SONI</span>
        </motion.a>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-[#4A4A4A] font-mono text-[10px] uppercase tracking-[0.3em] hover:text-[#A68A64] transition-colors relative group cursor-pointer"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#A68A64] transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-[#4A4A4A]">
          <div className="space-y-1">
            <span className={`block w-6 h-0.5 bg-current transition-all ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </div>
        </button>

        {/* CV Button */}
        <div className="hidden md:block">
           <button className="px-6 py-2 border border-[#A68A64]/30 rounded-full text-[#A68A64] font-mono text-[9px] uppercase tracking-widest hover:bg-[#A68A64] hover:text-white transition-all">
             CV_
           </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[#FAF7F2] border-b border-[#A68A64]/10 p-10 flex flex-col gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-[#4A4A4A] font-mono text-sm uppercase tracking-widest"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}