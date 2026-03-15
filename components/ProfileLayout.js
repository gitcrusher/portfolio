"use client";
import React, { useEffect, useState } from 'react';

export default function ProfileLayout({ imageUrl }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [totalScroll, setTotalScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setTotalScroll(scrollY);
      const animationDistance = 800;
      const progress = Math.min(scrollY / animationDistance, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Animation State Logic ---
  const rectScale = 0.6 + (scrollProgress * 0.4);
  const rectOpacity = Math.min(scrollProgress * 2, 1);
  const cardX = scrollProgress * 25; 
  
  const bioOpacity = scrollProgress > 0.4 ? Math.min((scrollProgress - 0.4) * 2, 1) : 0;
  const bioX = scrollProgress > 0.4 ? 0 : -25;

  // --- Transition Fix Logic ---
  const animationEndThreshold = 800;
  const offsetAfterAnimation = totalScroll > animationEndThreshold ? (totalScroll - animationEndThreshold) : 0;
  const track1FadeOut = totalScroll > 1000 ? Math.max(1 - (totalScroll - 1000) / 400, 0) : 1;

  return (
    <div className="relative w-full bg-[#FAF7F2]">
      {/* Scrollbar Hide Styles */}
      <style jsx global>{`
        ::-webkit-scrollbar { display: none !important; }
        body { 
          scrollbar-width: none !important; 
          background: #FAF7F2; 
          margin: 0; 
          overflow-x: hidden; 
        }
      `}</style>

      {/* TRACK 1: IDENTITY REVEAL (Fixed Position) */}
      <div className="relative w-full h-[180vh] z-50">
        <div 
          style={{ 
            transform: `translateY(-${offsetAfterAnimation}px)`,
            opacity: track1FadeOut 
          }}
          className="fixed inset-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none"
        >
          {/* Background Rectangle */}
          <div 
            style={{ transform: `scale(${rectScale})`, opacity: rectOpacity }} 
            className="absolute w-[90%] h-[80%] bg-[#E5D3B3]/25 border border-[#A68A64]/10 rounded-[60px] z-10" 
          />

          {/* Bio Section */}
          <div 
            style={{ opacity: bioOpacity, transform: `translateX(${bioX}px)`, zIndex: 30 }} 
            className="absolute left-[10%] md:left-[12%] max-w-md text-left transition-all duration-300 ease-out"
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

          {/* Card Section */}
          <div style={{ transform: `translateX(${cardX}vw)`, zIndex: 40 }} className="pointer-events-auto transition-transform duration-75 ease-out">
            <div className="relative p-1 bg-gradient-to-b from-[#E5D3B3] to-[#A68A64]/50 rounded-[40px] shadow-[0_40px_80px_rgba(166,138,100,0.2)]">
              <div className="bg-white rounded-[38px] overflow-hidden w-[300px] md:w-[360px]">
                <div className="relative h-[480px] md:h-[520px]">
                   <img src={imageUrl} className="h-full w-full object-cover contrast-110" alt="Profile" />
                   <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-95" />
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

      {/* Initial Hint */}
      <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 text-[#4A4A4A] font-mono text-[10px] font-bold tracking-[0.6em] transition-opacity duration-500 z-[70] ${scrollProgress > 0.05 ? 'opacity-0' : 'opacity-100 animate-pulse'}`}>
          [ SCROLL_TO_SYNC ]
      </div>
    </div>
  );
}