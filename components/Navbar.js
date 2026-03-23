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

  const navLinks = [
    { name: "About", href: "#dossier" },     
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Research", href: "#research" },
    { name: "Achievement", href: "#achievements" },
    { name: "Education", href: "#education" }, // NAYA LINK ADDED
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
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'py-4 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#A68A64]/10 shadow-sm' : 'py-8 bg-transparent'}`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex justify-between items-center gap-4">
        
        {/* LOGO */}
        <motion.a 
          href="/" 
          onClick={(e) => scrollToSection(e, '#dossier')}
          className="text-[#4A4A4A] text-2xl font-serif italic font-black tracking-tighter cursor-pointer flex items-center gap-2 mr-4 shrink-0"
          whileHover={{ scale: 1.02 }}
        >
          <span className="w-2.5 h-2.5 bg-[#A68A64] rounded-full animate-pulse" />
          AAYUSH<span className="text-[#A68A64]">SONI</span>
        </motion.a>

        {/* DESKTOP LINKS - Responsive gap adjust kiya hai links badhne ki wajah se */}
        <div className="hidden lg:flex items-center gap-x-4 xl:gap-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-[#4A4A4A] font-serif italic font-bold text-[11px] xl:text-[12px] uppercase tracking-[0.12em] hover:text-[#A68A64] transition-all duration-300 relative group cursor-pointer whitespace-nowrap"
            >
              {link.name}
              <span className="absolute -bottom-1.5 left-0 w-0 h-[1.5px] bg-[#A68A64] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* CV BUTTON */}
        <div className="flex items-center gap-6 ml-auto shrink-0">
          <div className="hidden sm:block">
             <a 
               href="/my-cv.pdf" 
               download="Aayush_Soni_CV.pdf"
               className="px-6 py-2 border-2 border-[#A68A64] rounded-full text-[#A68A64] font-serif italic font-black text-[11px] uppercase tracking-widest hover:bg-[#A68A64] hover:text-[#FAF7F2] transition-all duration-500 inline-block text-center cursor-pointer shadow-sm"
             >
               CV
             </a>
          </div>

          {/* HAMBURGER FOR MOBILE */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-[#4A4A4A] p-2">
            <div className="space-y-1.5">
              <span className={`block w-6 h-[1.5px] bg-current transition-all duration-500 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-[1.5px] bg-current transition-all duration-500 ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-4 h-[1.5px] bg-current ml-auto transition-all duration-500 ${isOpen ? '-rotate-45 -translate-y-2 w-6' : ''}`} />
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
            className="absolute top-full left-0 w-full bg-[#FAF7F2] border-b border-[#A68A64]/10 overflow-hidden lg:hidden shadow-2xl"
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
                  className="text-[#4A4A4A] font-serif italic font-bold text-xl uppercase tracking-[0.2em] hover:text-[#A68A64] transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <a 
                href="/my-cv.pdf" 
                className="mt-4 w-full py-5 border-2 border-[#A68A64] text-[#A68A64] font-serif italic font-black text-[14px] uppercase tracking-widest text-center rounded-xl"
              >
                DOWNLOAD CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}