"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const achievements = [
  {
    id: "01",
    title: "Global Nominee",
    org: "NASA SPACE APPS '25",
    detail: "Top 0.5% Global Rank",
    desc: "Independent project 'Bloom Watch' recognized as a Universal Event Nominee. Analyzed satellite telemetry for plant phenology.",
    accent: "#A68A64"
  },
  {
    id: "02",
    title: "LPU Felicitated",
    org: "UNIVERSITY TROPHY",
    detail: "Academic Excellence",
    desc: "Awarded the university's highest recognition trophy for international representation and technical contribution.",
    accent: "#4A4A4A"
  },
  {
    id: "03",
    title: "Lead Mentor",
    org: "FRONTEND DEV '24",
    detail: "50+ Students Guided",
    desc: "Directed a comprehensive web development program. Focused on semantic HTML, CSS architecture, and JS logic.",
    accent: "#A68A64"
  }
];

export default function AchievementsSection() {
  const targetRef = useRef(null);
  
  // Horizontal Scroll Logic
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const springX = useSpring(x, { stiffness: 100, damping: 30 });

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#FAF7F2]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Static Background Title */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
          <h1 className="text-[30vw] font-serif italic text-[#4A4A4A] leading-none">Accolades</h1>
        </div>

        <motion.div style={{ x: springX }} className="flex gap-20 px-24">
          {/* Section Intro Block */}
          <div className="flex flex-col justify-center min-w-[400px]">
            <span className="text-[#A68A64] font-mono text-[10px] tracking-[1em] uppercase mb-4">Milestones</span>
            <h2 className="text-[#4A4A4A] text-8xl font-serif italic tracking-tighter mb-4">accolades_</h2>
            <p className="text-[#A68A64] font-mono text-[10px] tracking-widest">[ SCROLL_TO_EXPLORE → ]</p>
          </div>

          {/* Achievement Cards */}
          {achievements.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              className="relative min-w-[500px] h-[500px] flex flex-col justify-center p-12 group"
            >
              {/* Background ID Number with Parallax Vibe */}
              <span className="absolute top-0 right-0 text-[18rem] font-serif italic text-[#A68A64]/5 group-hover:text-[#A68A64]/10 transition-all duration-700">
                {item.id}
              </span>

              <div className="relative z-10 border-l-2 border-[#A68A64]/20 pl-10 group-hover:border-[#A68A64] transition-all duration-500">
                <span className="text-[#A68A64] font-mono text-[11px] tracking-[0.4em] mb-2 block uppercase">
                  {item.org}
                </span>
                <h3 className="text-[#4A4A4A] text-6xl md:text-7xl font-serif italic tracking-tighter leading-none mb-6">
                  {item.title.toLowerCase()}
                </h3>
                
                <div className="overflow-hidden">
                  <motion.p 
                    className="text-[#4A4A4A]/60 font-mono text-xs leading-relaxed max-w-sm"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {item.desc}
                  </motion.p>
                </div>

                <div className="mt-10 flex items-center gap-4">
                   <div className="px-4 py-1 bg-[#A68A64] text-[#FAF7F2] font-mono text-[9px] tracking-widest uppercase">
                     {item.detail}
                   </div>
                </div>
              </div>

              {/* Decorative Animated Line */}
              <motion.div 
                className="absolute bottom-10 left-12 h-[1px] bg-[#A68A64]"
                initial={{ width: 0 }}
                whileInView={{ width: "80%" }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
    </section>
  );
}