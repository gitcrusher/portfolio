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
  const bioOpacity = scrollProgress > 0.4 ? Math.min((scrollProgress - 0.4) * 2, 1) : 0;
  const bioX = scrollProgress > 0.4 ? 0 : -25;

  // --- Transition Fix Logic ---
  const animationEndThreshold = 800;
  // Jab animation khatam ho jaye, content ko scroll ke saath upar bhejo
  const offsetAfterAnimation = totalScroll > animationEndThreshold ? (totalScroll - animationEndThreshold) : 0;
  
  // Track 1 ko fade out karna jab Track 2 upar aaye (Optional but looks cleaner)
  const track1FadeOut = totalScroll > 1000 ? Math.max(1 - (totalScroll - 1000) / 400, 0) : 1;

  const skillCategories = [
    { title: "Intelligence", list: ["Python", "ML", "Data Science", "XGBoost"] },
    { title: "Architecture", list: ["Next.js", "React", "Tailwind", "LaTeX"] },
    { title: "Environment", list: ["Git", "Open Source", "Linux", "DSA"] }
  ];

  return (
    <div className="relative w-full bg-[#FAF7F2]">
      <Navbar />

      <style jsx global>{`
        ::-webkit-scrollbar { display: none !important; }
        body { 
          scrollbar-width: none !important; 
          background: #FAF7F2; 
          margin: 0; 
          overflow-x: hidden; 
        }
      `}</style>

      {/* TRACK 1: IDENTITY REVEAL (Fixed height to prevent jump) */}
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
            className="absolute w-[90%] h-[80%] bg-[#E5D3B3]/25 border border-[#A68A64]/10 rounded-[60px]" 
          />

          {/* Bio Section */}
          <div 
            style={{ opacity: bioOpacity, transform: `translateX(${bioX}px)` }} 
            className="absolute left-[10%] md:left-[12%] max-w-md text-left"
          >
            <div className="space-y-4">
              <span className="text-[#A68A64] font-mono text-[10px] tracking-[0.5em] uppercase block">/ Dossier_Identity</span>
              <h1 className="text-[#4A4A4A] text-5xl md:text-7xl font-serif italic leading-[0.9] tracking-tighter">SYSTEM <br /> ARCHITECT</h1>
              <p className="text-[#4A4A4A] font-mono text-sm border-l-2 border-[#A68A64]/40 pl-5">
                Pursuing CS at <span className="text-[#4A4A4A] font-bold italic">LPU</span>. <br />
                NASA Space Apps <span className="text-[#A68A64] font-bold italic">Global Nominee</span>.
              </p>
            </div>
          </div>

          {/* Card Section */}
          <div style={{ transform: `translateX(${cardX}vw)` }} className="pointer-events-auto">
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

      {/* TRACK 2: SKILLS (STACK) - Clear separation */}
      <section id="skills" className="relative w-full bg-[#FAF7F2] pt-32 pb-20 px-10 md:px-24 z-[60] shadow-[0_-50px_100px_rgba(250,247,242,1)]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <span className="text-[#A68A64] font-mono text-[10px] tracking-[0.5em] uppercase block mb-2">/ Skill_Metrics</span>
            <h2 className="text-[#4A4A4A] text-5xl md:text-7xl font-serif italic tracking-tighter">CORE_STACK_</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skillCategories.map((cat, i) => (
              <div key={i} className="p-8 bg-white border border-[#E5D3B3]/40 rounded-[40px] shadow-sm">
                <p className="text-[#A68A64] font-mono text-[9px] uppercase tracking-widest mb-6 border-b border-[#E5D3B3]/30 pb-2">{cat.title}</p>
                <div className="flex flex-wrap gap-2">
                  {cat.list.map(skill => (
                    <span key={skill} className="px-4 py-1.5 bg-[#FAF7F2] border border-[#E5D3B3]/50 text-[#4A4A4A]/70 font-mono text-[10px] rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRACK 3: PROJECTS */}
      <section id="projects" className="relative w-full bg-[#FAF7F2] py-20 px-10 md:px-24 z-[60] border-t border-[#E5D3B3]/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[#4A4A4A] text-5xl md:text-7xl font-serif italic mb-16 tracking-tighter">ACTIVE_MISSIONS_</h2>
          <div className="grid md:grid-cols-2 gap-10">
             <div className="group p-10 bg-white border border-[#E5D3B3]/40 rounded-[50px] shadow-sm">
                <p className="text-[#A68A64] font-mono text-[10px] mb-2 tracking-[0.4em]">MISSION_CALYX</p>
                <h3 className="text-[#4A4A4A] text-3xl font-serif italic mb-4">Bloom Watch</h3>
                <p className="text-[#4A4A4A]/60 font-mono text-sm leading-relaxed mb-6">NASA Global Nominee project. Real-time botanical monitoring system.</p>
                <div className="w-10 h-[1px] bg-[#A68A64]/50 group-hover:w-full transition-all duration-700" />
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}