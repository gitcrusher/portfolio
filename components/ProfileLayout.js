"use client";
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

export default function ProfileLayout({ imageUrl }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const animationDistance = 1000;
      const progress = Math.min(window.scrollY / animationDistance, 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const rectScale = 0.6 + (scrollProgress * 0.4);
  const rectOpacity = Math.min(scrollProgress * 2, 1);
  const cardX = scrollProgress * 28; 
  const bioOpacity = scrollProgress > 0.7 ? (scrollProgress - 0.7) * 3.3 : 0;
  const bioX = scrollProgress > 0.7 ? 0 : -30;

  const isFinished = scrollProgress >= 1;

  return (
    <div className="relative w-full bg-[#050810]">
      <Navbar />

      <style jsx global>{`
        ::-webkit-scrollbar { display: none !important; }
        body { scrollbar-width: none !important; background: #050810; margin: 0; overflow-x: hidden; }
        html { scroll-behavior: auto !important; background: #050810; }
      `}</style>

      {/* TRACK: Isme -mb-1 (Negative Margin) add kiya hai line hatane ke liye */}
      <div className="relative h-[250vh] w-full -mb-1">
        
        <div 
          className={`${isFinished ? 'absolute bottom-0' : 'fixed inset-0'} h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none`}
        >
          {/* Rectangle */}
          <div 
            style={{ transform: `scale(${rectScale})`, opacity: rectOpacity }}
            className="absolute w-[90%] h-[80%] bg-[#0a1428]/60 border border-cyan-500/20 rounded-[40px] z-10"
          />

          {/* Bio Text */}
          <div 
            style={{ opacity: bioOpacity, transform: `translateX(${bioX}px)`, zIndex: 30 }}
            className="absolute left-[10%] md:left-[12%] max-w-md text-left"
          >
            <div className="space-y-6">
              <span className="text-cyan-500 font-mono text-[10px] tracking-[0.5em] uppercase block">/ Dossier_Identity</span>
              <h1 className="text-white text-5xl md:text-7xl font-black italic uppercase leading-[0.8] tracking-tighter">
                SYSTEM <br /> ARCHITECT
              </h1>
              <p className="text-slate-400 font-mono text-sm border-l-2 border-cyan-500/30 pl-5">
                Pursuing CS at <span className="text-white">LPU</span>. <br />
                NASA Space Apps <span className="text-cyan-400">Global Nominee</span>.
              </p>
            </div>
          </div>

          {/* Agent Card */}
          <div style={{ transform: `translateX(${cardX}vw)`, zIndex: 40 }} className="pointer-events-auto transition-transform duration-75 ease-out">
            <div className="relative p-[1px] bg-gradient-to-b from-cyan-400 to-blue-900 rounded-3xl shadow-[0_0_100px_rgba(34,211,238,0.2)]">
              <div className="bg-[#050810] rounded-[23px] overflow-hidden w-[300px] md:w-[360px]">
                <div className="relative h-[480px] md:h-[500px]">
                   <img src={imageUrl} className="h-full w-full object-cover" alt="Agent" />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-transparent to-transparent opacity-90" />
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

      {/* SECTION 2: PROJECTS (Overlap through Negative Margin) */}
      {/* border-t-0 karke border-white/10 ko box-shadow ya inner padding se replace kiya hai */}
      <section 
        id="projects" 
        className="relative min-h-screen w-full bg-[#050810] py-32 px-10 md:px-24 z-[60]"
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Divider Line (Optional - if you want it clean, keep it light) */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent mb-20" />
          
          <h2 className="text-white text-5xl font-black italic uppercase mb-16 tracking-tighter">
            ACTIVE_MISSIONS_
          </h2>
          
          <div className="grid md:grid-cols-2 gap-10">
             <div className="group p-10 bg-slate-900/20 border border-white/5 rounded-[40px] hover:border-cyan-500/30 transition-all">
                <p className="text-cyan-500 font-mono text-[10px] mb-2 tracking-[0.4em]">MISSION_01</p>
                <h3 className="text-white text-3xl font-black italic mb-4">BLOOM_WATCH</h3>
                <p className="text-slate-400 font-mono text-sm leading-relaxed">NASA Global Nominee project focusing on real-time plant health monitoring.</p>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}