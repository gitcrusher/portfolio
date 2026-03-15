"use client";
import React from 'react';

export default function Projects() {
  const missions = [
    {
      id: "MISSION_CALYX",
      title: "Bloom Watch",
      description: "NASA Global Nominee project. Real-time botanical monitoring system with advanced visual decoding.",
      tech: "ML / Python"
    },
    {
      id: "MISSION_CROP_PREDICT",
      title: "Calyx Yield",
      description: "Machine learning integration for rainfall and crop production analysis across Indian datasets.",
      tech: "Data Science / Pandas"
    }
  ];

  return (
    <section id="projects" className="relative w-full bg-[#FAF7F2] py-20 px-10 md:px-24 z-[60] border-t border-[#E5D3B3]/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-[#4A4A4A] text-5xl md:text-7xl font-serif italic mb-16 tracking-tighter">ACTIVE_MISSIONS_</h2>
        
        <div className="grid md:grid-cols-2 gap-10">
          {missions.map((mission, i) => (
            <div 
              key={i} 
              className="group p-10 bg-white border border-[#E5D3B3]/40 rounded-[50px] shadow-sm hover:shadow-xl hover:shadow-[#A68A64]/5 transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-2">
                <p className="text-[#A68A64] font-mono text-[10px] tracking-[0.4em] uppercase">
                  {mission.id}
                </p>
                <span className="text-[#4A4A4A]/30 font-mono text-[9px] uppercase tracking-widest">
                  {mission.tech}
                </span>
              </div>
              
              <h3 className="text-[#4A4A4A] text-3xl font-serif italic mb-4 lowercase">
                {mission.title}
              </h3>
              
              <p className="text-[#4A4A4A]/60 font-mono text-sm leading-relaxed mb-8">
                {mission.description}
              </p>
              
              {/* Animated Progress Line */}
              <div className="relative w-full h-[1px] bg-[#E5D3B3]/30 overflow-hidden">
                <div className="absolute inset-0 bg-[#A68A64]/50 w-10 group-hover:w-full transition-all duration-700 ease-in-out" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}