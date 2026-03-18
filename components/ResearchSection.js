"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

const researchData = [
  { 
    id: "01", 
    title: "Bloom Watch", 
    tag: "NASA_ARCHIVE", 
    year: "2025",
    publication: "NASA Space Apps Challenge (Global Nominee)",
    citation: "Soni, A. (2025). Predictive Modeling of Plant Phenology and Pest Occurrences via Satellite Imagery.",
    summary: "Independent research utilizing NASA's archival data to forecast plant life cycles. Therefore, it bridges the gap between satellite telemetry and agricultural protection; moreover, it provides a scalable framework for biodiversity monitoring.",
    link: "https://github.com/your-username/bloom-watch"
  },
  { 
    id: "02", 
    title: "Crop Yield", 
    tag: "AGRI_ML_MODEL", 
    year: "2026",
    publication: "Agricultural Data Science Repository",
    citation: "Soni, A. (2026). Precision Forecasting in Indian Agriculture using XGBoost and Lasso Regression.",
    summary: "A deep-dive into regional crop patterns using advanced ML. Consequently, it optimizes harvest predictions for Indian farmers; furthermore, the model accounts for soil and weather variance to ensure high-precision yield analysis.",
    link: "https://github.com/your-username/crop-yield"
  }
];

export default function ResearchSection() {
  const [stage, setStage] = useState('landing');
  const [hovered, setHovered] = useState(null);
  const containerRef = React.useRef(null);

  // --- RESET LOGIC ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.15 || latest > 0.85) { 
      if (stage !== 'landing') {
        setStage('landing');
        setHovered(null);
      }
    }
  });

  return (
    <motion.section 
      ref={containerRef}
      className="relative w-full h-screen bg-[#FAF7F2] overflow-hidden flex items-center justify-center"
    >
      
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{ backgroundImage: `radial-gradient(#A68A64 0.5px, transparent 0.5px)`, backgroundSize: '40px 40px' }} />
      </div>

      <AnimatePresence mode="wait">
        {stage === 'landing' ? (
          <motion.div 
            key="landing"
            onClick={() => setStage('vault')}
            exit={{ scale: 5, opacity: 0, filter: "blur(40px)" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="z-50 text-center cursor-pointer"
          >
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="w-24 h-24 border border-[#A68A64] rounded-full mx-auto mb-8 flex items-center justify-center"
            >
              <div className="w-2 h-2 bg-[#A68A64] rounded-full animate-ping" />
            </motion.div>
            <h2 className="text-[#4A4A4A] text-7xl font-serif italic tracking-tighter uppercase leading-none">
              research_
            </h2>
            <p className="text-[#A68A64] font-mono text-[9px] mt-4 tracking-[0.4em] uppercase opacity-60">Initiate_Neural_Scan</p>
          </motion.div>
        ) : (
          <motion.div 
            key="vault"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-16 p-10 z-10"
          >
            {researchData.map((item, i) => (
              <motion.div
                key={item.id}
                drag
                dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => window.open(item.link, "_blank")} 
                className="relative w-full md:w-[500px] aspect-square flex items-center justify-center cursor-pointer group"
              >
                {/* The "Cell" Animation */}
                <motion.div 
                  animate={{ 
                    scale: hovered === item.id ? 1.25 : 1,
                    rotate: hovered === item.id ? 90 : 0,
                    borderColor: hovered === item.id ? "#A68A64" : "rgba(166, 138, 100, 0.2)"
                  }}
                  className="absolute inset-0 border rounded-full flex items-center justify-center transition-colors duration-500"
                >
                  <div className="w-[95%] h-[95%] border border-[#A68A64]/10 rounded-full border-dashed animate-[spin_20s_linear_infinite]" />
                </motion.div>

                {/* Content inside the Cell */}
                <div className="text-center z-20 p-6 select-none">
                  <span className="text-[#A68A64] font-mono text-[9px] tracking-widest block mb-2 opacity-50">PUBLISHED_{item.year}</span>
                  <h3 className="text-[#4A4A4A] text-4xl md:text-5xl font-serif italic mb-4 group-hover:text-[#A68A64] transition-colors leading-none">
                    {item.title.toLowerCase()}
                  </h3>
                  
                  <AnimatePresence>
                    {hovered === item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="space-y-4"
                      >
                        <p className="text-[#A68A64] font-mono text-[8px] uppercase tracking-widest border-y border-[#A68A64]/20 py-1">
                          {item.publication}
                        </p>
                        <p className="text-[#4A4A4A]/40 font-mono text-[9px] italic leading-tight px-4">
                          "{item.citation}"
                        </p>
                        <p className="text-[#4A4A4A]/70 font-mono text-[10px] leading-relaxed max-w-[280px] mx-auto">
                          {item.summary}
                        </p>
                        <span className="text-[#A68A64] font-mono text-[9px] mt-4 block tracking-[0.3em] animate-pulse underline underline-offset-4">
                          [ ACCESS_FULL_PAPER ]
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Floating "Data Bits" */}
                {[...Array(5)].map((_, j) => (
                  <motion.div
                    key={j}
                    animate={{ 
                      x: [0, Math.random() * 60 - 30, 0],
                      y: [0, Math.random() * 60 - 30, 0]
                    }}
                    transition={{ repeat: Infinity, duration: 3 + j, ease: "easeInOut" }}
                    className="absolute w-1 h-1 bg-[#A68A64] rounded-full opacity-30"
                    style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
                  />
                ))}
              </motion.div>
            ))}

            <button 
              onClick={() => setStage('landing')}
              className="absolute top-12 left-1/2 -translate-x-1/2 text-[#A68A64] font-mono text-[10px] tracking-[0.5em] opacity-40 hover:opacity-100 transition-opacity z-[100]"
            >
              [ TERMINATE_SCAN ]
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
    </motion.section>
  );
}