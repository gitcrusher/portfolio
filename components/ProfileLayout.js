"use client";
import React, { useEffect, useState } from 'react';

export default function ProfileLayout({ imageUrl }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / 1000, 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation Values
  const rectScale = 0.6 + (scrollProgress * 0.4);
  const rectOpacity = Math.min(scrollProgress * 2, 1);
  const rectBlur = scrollProgress > 0.8 ? (scrollProgress - 0.8) * 15 : 0;
  
  // FIXED SIZE: Scale 1 rakha hai taaki chota na ho
  const cardX = scrollProgress * 25; 
  const cardScale = 1; 

  const bioOpacity = scrollProgress > 0.6 ? (scrollProgress - 0.6) * 2.5 : 0;
  const bioX = scrollProgress > 0.6 ? 0 : -20;

  return (
    <div 
      className="relative h-[250vh] bg-[#050810] w-full overflow-x-hidden"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <style jsx global>{`
        ::-webkit-scrollbar { display: none !important; }
        body { scrollbar-width: none !important; overflow-x: hidden !important; }
      `}</style>
      
      <div className="fixed inset-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none">
        
        {/* BACKGROUND RECTANGLE */}
        <div 
          style={{ transform: `scale(${rectScale})`, opacity: rectOpacity, filter: `blur(${rectBlur}px)` }}
          className="absolute w-[90%] h-[80%] bg-[#0a1428]/80 border border-cyan-500/20 rounded-[40px] shadow-[inset_0_0_80px_rgba(34,211,238,0.05)] z-10"
        />

        {/* BIO CONTENT (Reveals on Left) */}
        <div 
          style={{ opacity: bioOpacity, transform: `translateX(${bioX}px)`, zIndex: 30 }}
          className="absolute left-[10%] md:left-[12%] max-w-md text-left"
        >
          <div className="space-y-4 md:space-y-6">
            <span className="text-cyan-500 font-mono text-[10px] tracking-[0.5em] uppercase block">/ Dossier_Identity</span>
            <h1 className="text-white text-5xl md:text-7xl font-black italic uppercase leading-[0.8] tracking-tighter">
              SYSTEM <br /> ARCHITECT
            </h1>
            <p className="text-slate-400 font-mono text-xs md:text-sm leading-relaxed border-l-2 border-cyan-500/30 pl-5">
              Currently pursuing Computer Science at <span className="text-white">LPU</span>. 
              NASA Space Apps <span className="text-cyan-400">Global Nominee</span>. 
              Building the future of predictive ecosystems.
            </p>
          </div>
        </div>

        {/* THE CARD: FIXED SIZE SYNCED WITH KERNEL */}
        <div 
          style={{ transform: `translateX(${cardX}vw) scale(${cardScale})`, zIndex: 50 }}
          className="transition-transform duration-75 ease-out pointer-events-auto"
        >
          {/* Outer Border Glow: Sync with Kernel's rounded-3xl */}
          <div className="relative p-1 bg-gradient-to-b from-cyan-400 to-blue-900 rounded-3xl shadow-[0_0_80px_rgba(34,211,238,0.3)]">
            
            {/* Inner Card: Sync with Kernel's rounded-[22px] & md:w-360 */}
            <div className="bg-[#0f172a] rounded-[22px] overflow-hidden border border-white/5 w-[320px] md:w-[360px]">
              <div className="relative h-[480px]">
                 <img src={imageUrl} className="h-full w-full object-cover contrast-110" alt="Agent" />
                 
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-85" />
                 
                 {/* Text Style Sync: bottom-6 */}
                 <div className="absolute bottom-6 left-6 text-left">
                    <h2 className="text-white text-3xl font-black tracking-tighter uppercase italic leading-none drop-shadow-xl">
                       AGENT_ED_H
                    </h2>
                    <p className="text-cyan-400 text-[10px] font-mono tracking-widest uppercase mt-1">
                       NASA GLOBAL NOMINEE
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hint */}
      <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 text-white font-mono text-[10px] font-bold tracking-[0.6em] transition-opacity duration-500 z-[60] ${scrollProgress > 0.05 ? 'opacity-0' : 'opacity-100 animate-pulse'}`}>
         [ SCROLL_TO_INITIALIZE_DATA ]
      </div>
    </div>
  );
}