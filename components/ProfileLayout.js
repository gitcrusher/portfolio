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

  // No-jerk transition offset
  const animationEndThreshold = 800;
  const offsetAfterAnimation = totalScroll > animationEndThreshold ? (totalScroll - animationEndThreshold) : 0;

  const skillCategories = [
    { title: "Intelligence", list: ["Python", "ML", "Data Science", "XGBoost"] },
    { title: "Architecture", list: ["Next.js", "React", "Tailwind", "LaTeX"] },
    { title: "Environment", list: ["Git", "Open Source", "Linux", "DSA"] }
  ];

  return (
    <div className="relative w-full bg-[#050810]">
      <Navbar />

      <style jsx global>{`
        ::-webkit-scrollbar { display: none !important; }
        body { scrollbar-width: none !important; background: #050810; margin: 0; overflow-x: hidden; }
      `}</style>

      {/* TRACK 1: IDENTITY REVEAL */}
      <div className="relative w-full h-[180vh]">
        <div 
          style={{ top: `-${offsetAfterAnimation}px` }}
          className="fixed inset-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none z-50"
        >
          <div style={{ transform: `scale(${rectScale})`, opacity: rectOpacity }} className="absolute w-[90%] h-[80%] bg-[#0a1428]/40 border border-white/5 rounded-[60px] z-10" />

          <div style={{ opacity: bioOpacity, transform: `translateX(${bioX}px)`, zIndex: 30 }} className="absolute left-[10%] md:left-[12%] max-w-md text-left">
            <div className="space-y-4">
              <span className="text-cyan-500 font-mono text-[10px] tracking-[0.5em] uppercase block">/ Dossier_Identity</span>
              <h1 className="text-white text-5xl md:text-7xl font-black italic uppercase leading-[0.8] tracking-tighter">SYSTEM <br /> ARCHITECT</h1>
              <p className="text-slate-400 font-mono text-sm border-l-2 border-cyan-500/30 pl-5 leading-relaxed">
                Pursuing CS at <span className="text-white font-bold italic">LPU</span>. <br />
                NASA Space Apps <span className="text-cyan-400 font-bold italic">Global Nominee</span>.
              </p>
            </div>
          </div>

          <div style={{ transform: `translateX(${cardX}vw)`, zIndex: 40 }} className="pointer-events-auto transition-transform duration-75 ease-out">
            <div className="relative p-1 bg-gradient-to-b from-cyan-400/50 to-blue-900/50 rounded-[40px] shadow-[0_0_80px_rgba(34,211,238,0.15)]">
              <div className="bg-[#050810] rounded-[38px] overflow-hidden w-[300px] md:w-[360px]">
                <div className="relative h-[480px] md:h-[520px]">
                   <img src={imageUrl} className="h-full w-full object-cover contrast-110" alt="Agent" />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-transparent to-transparent opacity-90" />
                   <div className="absolute bottom-8 left-8">
                      <h2 className="text-white text-3xl font-black tracking-tighter uppercase italic leading-none">AGENT_ED_H</h2>
                      <p className="text-cyan-400 text-[10px] font-mono tracking-widest uppercase mt-2">Verified Operator</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TRACK 2: SKILLS (STACK) */}
      <section id="skills" className="relative w-full bg-[#050810] py-20 px-10 md:px-24 z-[60]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <span className="text-cyan-500 font-mono text-[10px] tracking-[0.5em] uppercase block mb-2">/ Skill_Metrics</span>
            <h2 className="text-white text-5xl md:text-7xl font-black italic uppercase tracking-tighter">CORE_STACK_</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skillCategories.map((cat, i) => (
              <div key={i} className="p-8 bg-[#0a1428]/30 border border-white/5 rounded-[40px] hover:border-cyan-500/30 transition-all duration-500 group">
                <p className="text-slate-500 font-mono text-[9px] uppercase tracking-widest mb-6 border-b border-white/5 pb-2">{cat.title}</p>
                <div className="flex flex-wrap gap-2">
                  {cat.list.map(skill => (
                    <span key={skill} className="px-4 py-1.5 bg-white/5 border border-white/5 text-white/70 font-mono text-[10px] rounded-full group-hover:text-cyan-400 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRACK 3: PROJECTS (Missions) */}
      <section id="projects" className="relative w-full bg-[#050810] py-20 px-10 md:px-24 z-[60] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-white text-5xl md:text-7xl font-black italic uppercase mb-16 tracking-tighter">ACTIVE_MISSIONS_</h2>
          <div className="grid md:grid-cols-2 gap-10">
             <div className="group p-10 bg-[#0a1428]/40 border border-white/5 rounded-[50px] hover:bg-cyan-500/5 transition-all duration-500">
                <p className="text-cyan-500 font-mono text-[10px] mb-2 tracking-[0.4em]">MISSION_CALYX</p>
                <h3 className="text-white text-3xl font-black italic mb-4 uppercase leading-none">Bloom Watch</h3>
                <p className="text-slate-400 font-mono text-sm leading-relaxed mb-6">NASA Global Nominee project. Real-time botantical monitoring system.</p>
                <div className="w-10 h-[1px] bg-cyan-500/50 group-hover:w-full transition-all duration-700" />
             </div>
          </div>
        </div>
      </section>

      {/* Initial Hint */}
      <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 text-white font-mono text-[10px] font-bold tracking-[0.6em] transition-opacity duration-500 z-[70] ${scrollProgress > 0.05 ? 'opacity-0' : 'opacity-100 animate-pulse'}`}>
         [ SCROLL_TO_SYNC ]
      </div>
    </div>
  );
}