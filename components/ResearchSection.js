"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const researchData = [
  { 
    id: "01", 
    tag: "IEEE XPLORE",
    tags: ["AI/ML", "DEEP LEARNING", "SECURITY"],
    title: "AI in Digital Watermarking", 
    fullTitle: "A Review of AI in Digital Watermarking",
    year: "Apr 25",
    venue: "AUTOCOM International Conference",
    summary: "Analyzed deep learning-based models for data integrity and security in digital watermarking. Published in IEEE Xplore, focusing on adversarial attack resilience.",
    link: "https://ieeexplore.ieee.org/abstract/document/10956941",
    ref: "REF_ID: IEEE/AUTO/2025/SONI"
  },
  { 
    id: "02", 
    tag: "IPR INDIA",
    tags: ["PYTHON", "PREDICTIVE MODEL", "PATENT"],
    title: "ML - Prosthesis arm Patent", 
    fullTitle: "A METHOD FOR INTELLIGENT HAND REHABILITATION USING A WEARABLE DEVICE",
    year: "Since Nov 24",
    venue: "Intellectual Property India",
    summary: "A ML-based Prothesis arm (Patent) under process",
    link: "https://ipindia.gov.in/writereaddata/Portal/IPOJournal/1_436_1/part1.pdf",
    ref: "PAT_NO: 2026/VOGAP/IN"
  }
];

export default function ResearchFan() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const headingText = "Research";

  return (
    <section className="relative w-full min-h-screen bg-[#FAF7F2] py-32 px-10 md:px-24 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] select-none">
        <h1 className="text-[25vw] font-serif italic font-black">Papers</h1>
      </div>

      <div className="relative w-full max-w-7xl flex flex-col lg:flex-row items-center gap-16 lg:gap-24 z-10">
        
        {/* LEFT: THE INTERACTIVE STACK */}
        <div className="relative w-[280px] h-[400px] md:w-[380px] md:h-[520px] shrink-0">
          {researchData.map((paper, index) => {
            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;

            return (
              <motion.div
                key={paper.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => window.open(paper.link, "_blank")}
                animate={{
                  x: isHovered ? (index === 0 ? -30 : 30) : 0, 
                  y: isHovered ? -20 : (index * 12),
                  rotate: isHovered ? (index === 0 ? -8 : 8) : (index * 3),
                  zIndex: isHovered ? 50 : (10 - index),
                  filter: isAnyHovered && !isHovered ? "blur(4px) grayscale(90%)" : "blur(0px) grayscale(0%)"
                }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className="absolute inset-0 bg-white border border-[#A68A64]/30 rounded-2xl shadow-[0_30px_60px_-15px_rgba(166,138,100,0.15)] p-8 md:p-10 cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                {/* 1. Paper Fiber Texture */}
                <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
                
                {/* 2. Top Metadata */}
                <div className="relative">
                  <div className="flex justify-between items-start mb-8 md:mb-10">
                    <div className="flex flex-col">
                      <span className="text-[#A68A64] font-mono text-[9px] md:text-[10px] font-black tracking-[0.2em] uppercase">{paper.tag}</span>
                      <span className="text-[#333]/30 font-mono text-[7px] md:text-[8px] tracking-widest">{paper.ref}</span>
                    </div>
                    <span className="text-[#333]/30 font-mono text-[10px] md:text-xs font-bold border-b border-[#333]/10 pb-1">{paper.year}</span>
                  </div>

                  <h3 className="text-[#333] text-3xl md:text-4xl font-serif italic leading-[1.1] mb-6 pr-8">
                    {paper.title}
                  </h3>

                  {/* 3. "Abstract" Mimic Lines */}
                  <div className="space-y-2 mt-4 opacity-20">
                    <div className="h-[1px] w-full bg-[#333]" />
                    <div className="h-[1px] w-[90%] bg-[#333]" />
                    <div className="h-[1px] w-[95%] bg-[#333]" />
                    <div className="h-[1px] w-[60%] bg-[#333]" />
                  </div>
                </div>

                {/* 4. Bottom Footer Section */}
                <div className="relative border-t border-[#A68A64]/20 pt-6 flex justify-between items-end">
                  <div className="space-y-4">
                    <div>
                      <p className="text-[#A68A64] font-mono text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] mb-1">Affiliation</p>
                      <p className="text-[#555] font-serif italic text-base md:text-lg leading-tight max-w-[150px] md:max-w-[180px]">{paper.venue}</p>
                    </div>
                    
                    {/* 5. Official Digital Seal */}
                    <div className="w-10 h-10 md:w-12 md:h-12 border border-[#A68A64]/30 rounded-full flex items-center justify-center relative">
                      <div className="absolute inset-1 border border-dashed border-[#A68A64]/40 rounded-full animate-[spin_15s_linear_infinite]" />
                      <span className="text-[#A68A64] font-mono text-[5px] md:text-[6px] font-bold text-center leading-none">A.S.<br/>OFFICIAL</span>
                    </div>
                  </div>

                  {/* 6. Document QR Placeholder Graphic */}
                  <div className="w-10 h-10 border border-[#333]/10 p-1 flex flex-wrap gap-[2px]">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className={`w-1.5 h-1.5 md:w-2 md:h-2 ${Math.random() > 0.5 ? 'bg-[#A68A64]/20' : 'bg-transparent'}`} />
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* RIGHT: DYNAMIC INFO PANEL */}
        <div className="flex-1 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={hoveredIndex ?? "idle"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="max-w-2xl"
            >
              {hoveredIndex !== null ? (
                <>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-[3px] bg-[#A68A64]"></div>
                    <span className="text-[#A68A64] font-mono text-[12px] md:text-[14px] font-black uppercase tracking-[0.6em]">
                      {researchData[hoveredIndex].year} 
                    </span>
                  </div>
                  
                  <h2 className="text-[#222] text-5xl md:text-7xl font-serif italic tracking-tighter leading-none mb-8 uppercase">
                    {researchData[hoveredIndex].fullTitle}
                  </h2>
                  
                  <p className="text-[#555] font-sans text-lg md:text-xl leading-relaxed mb-10 font-medium tracking-tight">
                    {researchData[hoveredIndex].summary}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-12">
                    {researchData[hoveredIndex].tags && researchData[hoveredIndex].tags.map((t, i) => (
                      <span key={i} className="px-5 py-2 bg-[#FAF9F6] border border-[#E8E4DF] rounded-xl text-[#8C7355] font-mono text-[11px] font-bold uppercase tracking-widest shadow-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => window.open(researchData[hoveredIndex].link, "_blank")}
                    className="group flex items-center justify-center md:justify-start gap-4 text-white bg-[#A68A64] hover:bg-[#222] transition-all duration-500 px-8 py-4 rounded-full shadow-xl hover:scale-105 font-mono text-xs font-black tracking-widest uppercase w-fit"
                  >
                    click the card to Acess the Paper
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </button>
                </>
              ) : (
                <div className="py-10">
                  
                  
                  {/* ON-SCROLL TRIGGERED HEADING ANIMATION */}
                  <div className="flex flex-wrap mb-8" style={{ perspective: "1000px" }}>
                    {headingText.split("").map((char, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 40, rotateX: -90 }}
                        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                        viewport={{ once: false, amount: 0.1 }}
                        transition={{ 
                          duration: 0.8, 
                          delay: index * 0.05, 
                          ease: [0.215, 0.61, 0.355, 1] 
                        }}
                        className="text-[#222] text-6xl md:text-8xl font-serif italic tracking-tighter uppercase inline-block origin-bottom leading-none"
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </div>

                  <p className="text-[#555] font-sans text-xl tracking-tight leading-relaxed font-medium">
                    Hover over the document cores <br/> to initiate scan and reveal data.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}