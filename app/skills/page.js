"use client";
import React from 'react';
import Navbar from '@/components/Navbar';

export default function SkillsPage() {
  const skillCategories = [
    {
      title: "Core_Intelligence",
      skills: ["Python", "Machine Learning", "Deep Learning", "Data Science"]
    },
    {
      title: "Data_Architecture",
      skills: ["Pandas", "NumPy", "Scikit-Learn", "XGBoost", "SQL"]
    },
    {
      title: "System_Interface",
      skills: ["Next.js", "React", "Tailwind CSS", "LaTeX"]
    },
    {
      title: "Mission_Tools",
      skills: ["Git", "Open Source", "Competitive Programming", "DSA"]
    }
  ];

  return (
    <main className="min-h-screen bg-[#050810] selection:bg-cyan-500/30">
      <Navbar />
      
      <section className="pt-32 pb-20 px-10 md:px-24 max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 mb-20">
          <span className="text-cyan-500 font-mono text-xs tracking-[0.5em] uppercase">/ Neural_Capability_Map</span>
          <h1 className="text-white text-6xl md:text-8xl font-black italic uppercase tracking-tighter">
            TECH<br />STACK_
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="p-8 bg-[#0a1428]/30 border border-white/5 rounded-[30px] hover:border-cyan-500/20 transition-all group">
              <h3 className="text-cyan-500 font-mono text-[10px] tracking-[0.4em] uppercase mb-6 border-b border-white/5 pb-4">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {cat.skills.map(skill => (
                  <span key={skill} className="px-5 py-2 bg-white/5 border border-white/10 text-white font-mono text-xs rounded-full group-hover:border-cyan-500/30 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}