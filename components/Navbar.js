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

  // UPDATED NAV LINKS: Added Research and Achievements
  const navLinks = [
    { name: "About", href: "#dossier" },     
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Research", href: "#research" },
    { name: "Achievement", href: "#achievements" }, // NAYA LINK FOR ACHIEVEMENTS
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80; 
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
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'py-4 bg-[#FAF7F2]/80 backdrop-blur-md border-b border-[#A68A64]/10 shadow-sm' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* LOGO */}
        <motion.a 
          href="#" 
          onClick={(e) => scrollToSection(e, '#dossier')}
          className="text-[#4A4A4A] text-xl font-serif italic font-black tracking-tighter cursor-pointer flex items-center gap-1"
          whileHover={{ scale: 1.02 }}
        >
          <span className="w-2 h-2 bg-[#A68A64] rounded-full animate-pulse" />
          AAYUSH<span className="text-[#A68A64]">SONI</span>
        </motion.a>

        {/* DESKTOP LINKS */}
        <div className="hidden lg:flex gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-[#4A4A4A] font-mono text-[9px] uppercase tracking-[0.3em] hover:text-[#A68A64] transition-colors relative group cursor-pointer"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#A68A64] transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* CV BUTTON & HAMBURGER */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:block">
             <button className="px-5 py-2 border border-[#A68A64]/40 rounded-full text-[#A68A64] font-mono text-[9px] uppercase tracking-widest hover:bg-[#A68A64] hover:text-[#FAF7F2] transition-all duration-500">
               CV
             </button>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-[#4A4A4A] p-2">
            <div className="space-y-1.5">
              <span className={`block w-6 h-[1px] bg-current transition-all duration-500 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-[1px] bg-current transition-all duration-500 ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-4 h-[1px] bg-current ml-auto transition-all duration-500 ${isOpen ? '-rotate-45 -translate-y-2 w-6' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-[#FAF7F2] border-b border-[#A68A64]/10 overflow-hidden lg:hidden"
          >
            <div className="p-10 flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-[#4A4A4A] font-mono text-xs uppercase tracking-[0.4em] hover:text-[#A68A64]"
                >
                  {link.name}
                </motion.a>
              ))}
              <button className="mt-4 w-full py-4 border border-[#A68A64]/20 text-[#A68A64] font-mono text-[10px] uppercase tracking-widest">
                DOWNLOAD CV
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}