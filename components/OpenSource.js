"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OpenSource() {
  const [hoveredProject, setHoveredProject] = useState(null);

  const headingText = "open_source_"; 

  const contributions = [
    {
      id: "GOFR", 
      role: "CORE CONTRIBUTOR",
      image: "/oss1.png", 
      description: "Improved documentation for log levels to enhance developer experience and debugging clarity.",
      tags: ["Golang", "Docs"]
    },
    {
      id: "GOFR WEBSITE", 
      role: "CONTRIBUTOR",
      image: "/oss2.png",
      description: "Working on website enhancements and issue resolution for better user accessibility.",
      tags: ["Website", "OpenSource"]
    }
  ];

  return (
    <section id="opensource" className="relative w-full bg-[#FAF7F2] pt-10 pb-20 px-10 md:px-24 overflow-visible min-h-screen">
      
      {/* --- OVERLAY TEXT: FIXED CENTERED --- */}
      <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {hoveredProject && (
            <motion.h2
              key={hoveredProject}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="text-[#A68A64] text-7xl md:text-[12vw] font-serif font-black tracking-tighter leading-none uppercase italic drop-shadow-[0_10px_40px_rgba(166,138,100,0.4)] text-center px-4"
            >
              {hoveredProject}
            </motion.h2>
          )}
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- DYNAMIC HEADER --- */}
        <div className="mb-12">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#A68A64] font-mono text-[10px] tracking-[0.5em] uppercase block mb-4"
          >
            / Community_Protocols
          </motion.span>
          
          <div className="flex flex-wrap">
            {headingText.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: false, amount: 0.1 }} 
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.05,
                  ease: [0.215, 0.61, 0.355, 1] 
                }}
                className="text-[#4A4A4A] text-6xl md:text-8xl font-serif italic tracking-tighter inline-block origin-bottom leading-none"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* --- CARDS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {contributions.map((item, i) => (
            <div 
              key={item.id}
              onMouseEnter={() => setHoveredProject(item.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group relative h-[60vh] bg-[#EDE0D4] border border-[#A68A64]/10 rounded-[45px] overflow-hidden transition-all duration-500 shadow-sm"
            >
              <div className="absolute inset-0 z-0">
                <motion.img 
                  src={item.image}
                  alt={item.id}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500" />
              </div>

              <div className="relative z-10 p-12 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#A68A64]" />
                    <span className="text-white font-mono text-[10px] uppercase tracking-[0.2em]">{item.role}</span>
                  </div>
                  
                  {/* --- ARROW ICON REFINED --- */}
                  <div className="w-12 h-12 rounded-full border border-[#A68A64]/40 flex items-center justify-center bg-white/10 backdrop-blur-md group-hover:bg-[#A68A64] transition-all duration-500">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <path 
                        d="M1 14L14 1M14 1H1M14 1V14" 
                        stroke="#A68A64" // Default icon color (Gold)
                        className="group-hover:stroke-white transition-colors duration-500" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                <div className="max-w-md text-white">
                  <p className="text-white/80 font-mono text-sm leading-relaxed mb-8 max-w-[280px]">
                    {item.description}
                  </p>
                  <div className="flex gap-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-4 py-1.5 border border-white/20 rounded-full text-white font-mono text-[9px] uppercase tracking-tighter bg-white/10 backdrop-blur-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}