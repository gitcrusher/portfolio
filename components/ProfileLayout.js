"use client";
import React, { useEffect, useState } from 'react';

export default function ProfileLayout({ imageUrl }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [totalScroll, setTotalScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setTotalScroll(scrollY);
      const animationDistance = 1000; 
      const progress = Math.min(scrollY / animationDistance, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const rectScale = 0.6 + (scrollProgress * 0.4);
  const rectOpacity = Math.min(scrollProgress * 2, 1);
  const cardX = scrollProgress * 25; 
  
  const bioOpacity = scrollProgress > 0.4 ? Math.min((scrollProgress - 0.4) * 2, 1) : 0;
  const bioX = scrollProgress > 0.4 ? 0 : -25;

  const scrollLockThreshold = 1200; 
  const offsetAfterAnimation = totalScroll > scrollLockThreshold ? (totalScroll - scrollLockThreshold) : 0;
  const track1FadeOut = totalScroll > 1400 ? Math.max(1 - (totalScroll - 1400) / 400, 0) : 1;

  return (
    <div className="relative w-full bg-[#FAF7F2]">
      <style jsx global>{`
        ::-webkit-scrollbar { display: none !important; }
        body { 
          scrollbar-width: none !important; 
          background: #FAF7F2; 
          margin: 0; 
          overflow-x: hidden; 
        }
      `}</style>

      <div className="relative w-full h-[250vh] z-50">
        <div 
          style={{ 
            transform: `translateY(-${offsetAfterAnimation}px)`,
            opacity: track1FadeOut 
          }}
          className="fixed inset-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none"
        >
          {/* --- RECTANGLE BACKGROUND: LIGHTER & SUBTLE --- */}
          <div 
            style={{ 
                transform: `scale(${rectScale})`, 
                opacity: rectOpacity 
            }} 
            className="absolute w-[90%] h-[80%] bg-[#EDE0D4] rounded-[60px] z-10 shadow-[0_15px_45px_rgba(166,138,100,0.1)]" 
            /* #EDE0D4 is a light, creamy sand color - perfect for subtle contrast */
          />

          <div 
            style={{ opacity: bioOpacity, transform: `translateX(${bioX}px)`, zIndex: 30 }} 
            className="absolute left-[10%] md:left-[15%] max-w-md text-left transition-all duration-300 ease-out"
          >
            <div className="space-y-4">
              <span className="text-[#A68A64] font-mono text-[10px] tracking-[0.5em] uppercase block">/ Dossier_Identity</span>
              <h1 className="text-[#4A4A4A] text-5xl md:text-7xl font-serif italic leading-[0.9] tracking-tighter">SYSTEM <br /> ARCHITECT</h1>
              <p className="text-[#4A4A4A] font-mono text-sm border-l-2 border-[#A68A64]/40 pl-5 leading-relaxed">
                Pursuing CS at <span className="text-[#4A4A4A] font-bold italic">LPU</span>. <br />
                NASA Space Apps <span className="text-[#A68A64] font-bold italic">Global Nominee</span>.
              </p>
            </div>
          </div>

          <div style={{ transform: `translateX(${cardX}vw)`, zIndex: 40 }} className="pointer-events-auto transition-transform duration-75 ease-out">
            <div className="relative p-1 bg-gradient-to-b from-[#E5D3B3] to-[#A68A64]/30 rounded-[40px] shadow-[0_40px_80px_rgba(166,138,100,0.12)]">
              <div className="bg-white rounded-[38px] overflow-hidden w-[280px] md:w-[340px]">
                <div className="relative h-[450px] md:h-[500px]">
                   <img src={imageUrl} className="h-full w-full object-cover contrast-110" alt="Profile" />
                   <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-90" />
                   <div className="absolute bottom-8 left-8">
                      <h2 className="text-[#4A4A4A] text-3xl font-black tracking-tighter uppercase italic leading-none">AGENT_ED_H</h2>
                      <p className="text-[#A68A64] text-[10px] font-mono tracking-widest uppercase mt-2">NASA Global Nominee</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 text-[#4A4A4A] font-mono text-[10px] font-bold tracking-[0.6em] transition-opacity duration-500 z-[70] ${scrollProgress > 0.05 ? 'opacity-0' : 'opacity-100 animate-pulse'}`}>
          [ SCROLL_TO_SYNC ]
      </div>
    </div>
  );
}