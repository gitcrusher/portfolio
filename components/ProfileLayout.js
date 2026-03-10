"use client";
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

export default function ProfileLayout({ imageUrl }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [totalScroll, setTotalScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setTotalScroll(scrollY);
      
      // Animation range: 800px
      const animationDistance = 800;
      const progress = Math.min(scrollY / animationDistance, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation values
  const rectScale = 0.6 + (scrollProgress * 0.4);
  const rectOpacity = Math.min(scrollProgress * 2, 1);
  const cardX = scrollProgress * 25; 
  const bioOpacity = scrollProgress > 0.7 ? (scrollProgress - 0.7) * 3.3 : 0;
  const bioX = scrollProgress > 0.7 ? 0 : -30;

  // JERK FIX: Jab animation khatam ho jaye, toh page ko scroll ke sath upar khiskayenge
  const animationEndThreshold = 800;
  const offsetAfterAnimation = totalScroll > animationEndThreshold ? (totalScroll - animationEndThreshold) : 0;

  return (
    <div className="relative w-full bg-[#050810]">
      <Navbar />

      <style jsx global>{`
        ::-webkit-scrollbar { display: none !important; }
        body { scrollbar-width: none !important; background: #050810; margin: 0; overflow-x: hidden; }
      `}</style>

      {/* TRACK: Iski height bas itni rakho jitni animation + next section ke liye chahiye */}
      <div className="relative w-full h-[200vh]">
        
        {/* THE LOCKER: Hamesha FIXED rahega, jerk ka sawal hi paida nahi hota */}
        <div 
          style={{ 
            top: `-${offsetAfterAnimation}px`, // Animation khatam hone par ye upar slide hoga
          }}
          className="fixed inset-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none z-50"
        >
          {/* Rectangle */}
          <div 
            style={{ transform: `scale(${rectScale})`, opacity: rectOpacity }}
            className="absolute w-[90%] h-[80%] bg-[#0a1428]/60 border border-cyan-500/20 rounded-[40px] z-10"
          />

          {/* Bio */}
          <div 
            style={{ opacity: bioOpacity, transform: `translateX(${bioX}px)`, zIndex: 30 }}
            className="absolute left-[10%] md:left-[12%] max-w-md text-left"
          >
            <div className="space-y-4">
              <span className="text-cyan-500 font-mono text-[10px] tracking-[0.5em] uppercase block">/ Dossier_Identity</span>
              <h1 className="text-white text-5xl md:text-7xl font-black italic uppercase leading-[0.8] tracking-tighter">
                SYSTEM <br /> ARCHITECT
              </h1>
              <p className="text-slate-400 font-mono text-sm border-l-2 border-cyan-500/30 pl-5">
                Pursuing CS at <span className="text-white">LPU</span>. <br />
                NASA Space Apps <span className="text-cyan-400 font-bold italic">Global Nominee</span>.
              </p>
            </div>
          </div>

          {/* Card */}
          <div 
            style={{ transform: `translateX(${cardX}vw)`, zIndex: 40 }}
            className="pointer-events-auto transition-transform duration-75 ease-out"
          >
            <div className="relative p-1 bg-gradient-to-b from-cyan-400 to-blue-900 rounded-3xl shadow-[0_0_80px_rgba(34,211,238,0.3)]">
              <div className="bg-[#0f172a] rounded-[22px] overflow-hidden w-[320px] md:w-[360px]">
                <div className="relative h-[480px] md:h-[500px]">
                   <img src={imageUrl} className="h-full w-full object-cover contrast-110" alt="Agent" />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-90" />
                   <div className="absolute bottom-8 left-8 text-left">
                      <h2 className="text-white text-3xl font-black tracking-tighter uppercase italic leading-none">AGENT_ED_H</h2>
                      <p className="text-cyan-400 text-[10px] font-mono tracking-widest uppercase mt-2">NASA GLOBAL NOMINEE</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: PROJECTS (Naturally placed behind the fixed layer) */}
      <section id="projects" className="relative w-full bg-[#050810] py-40 px-10 md:px-24 z-[60] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-white text-5xl font-black italic uppercase mb-16 tracking-tighter">
            ACTIVE_MISSIONS_
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
             <div className="group p-10 bg-[#0a1428]/40 border border-white/5 rounded-[40px] hover:border-cyan-500/40 transition-all duration-500">
                <p className="text-cyan-500 font-mono text-[10px] mb-2 tracking-[0.4em]">NASA_SPACE_APPS</p>
                <h3 className="text-white text-3xl font-black italic mb-4 uppercase">Bloom Watch (Calyx)</h3>
                <p className="text-slate-400 font-mono text-sm leading-relaxed">Real-time agricultural monitoring ecosystem. Global Nominee recognition for innovative satellite data use.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Hint */}
      <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 text-white font-mono text-[10px] font-bold tracking-[0.6em] transition-opacity duration-500 z-[70] ${scrollProgress > 0.05 ? 'opacity-0' : 'opacity-100 animate-pulse'}`}>
         [ SCROLL_TO_SYNC ]
      </div>
    </div>
  );
}