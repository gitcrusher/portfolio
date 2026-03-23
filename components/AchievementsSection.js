"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const achievements = [
  {
    id: "01",
    title: "Honourable Mention & Global Nominee",
    org: "NASA SPACE APPS CHALLENGE",
    detail: "Project Calyx",
    desc: "Secured an Honourable Mention and Global Nominee status at the NASA International Space Apps Challenge for our independent project 'Calyx', analyzing satellite telemetry for plant phenology.",
    accent: "#A68A64",
    link: "https://www.spaceappschallenge.org/2025/find-a-team/kaalnetra/", 
    image: "/nasaglobalnominee.png" 
  },
  {
    id: "02",
    title: "Leetcode | Since Jul'24",
    org: "LEETCODE",
    detail: "DSA Proficiency",
    desc: "Consistently solving complex algorithmic challenges and data structure problems, have solved 140+ problems. Demonstrating strong problem-solving skills and a deep understanding of core computer science concepts.",
    accent: "#A68A64",
    link: "https://leetcode.com/u/knightsmokers/", 
    image: "/leetcode.jpg" 
  },
  {
    id: "03",
    title: "University Felicitation",
    org: "LOVELY PROFESSIONAL UNIVERSITY",
    detail: "NASA Achievement",
    desc: "Officially recognized and facilitated by LPU for our NASA Space Apps achievement. It’s one thing to compete on a global stage, but another to have your university community celebrate that success with you.",
    accent: "#4A4A4A",
    link: "https://www.linkedin.com/posts/aayushsoni0_nasa-bloomwatch-achievers-activity-7437656117112979456-etj6?utm_source=share&utm_medium=member_desktop&rcm=ACoAAER0sFwBUgEYkVjBOjr9a4zyZhbJW6PiX1o",
    image: "/lpunasa.png" 
  },
  {
    id: "04",
    title: "Research Excellence",
    org: "LPU SCHOOL OF CSE",
    detail: "Patents & Papers",
    desc: "Received a token of appreciation for my work as a Research Fellow. Successfully navigated the complexities of filing patents and publishing research papers alongside my mentors.",
    accent: "#A68A64",
    link: "https://lnkd.in/gmSc9QsU",
    image: "/researcher.png" 
  },
  {
    id: "05",
    title: "Public Speaker",
    org: "LPU CPE",
    detail: "Public Speaking",
    desc: "Wrapped up the term with 5 recognitions, including 3x Public Speaking Awards. Proving that being a developer doesn't mean staying behind a screen—it's about finding your voice.",
    accent: "#A68A64",
    link: "https://www.linkedin.com/posts/aayushsoni0_opensource-datascience-publicspeaking-activity-7439830441978916864-D6YZ?utm_source=share&utm_medium=member_desktop&rcm=ACoAAER0sFwBUgEYkVjBOjr9a4zyZhbJW6PiX1o",
    image: "/trophy.png" 
  }
];

export default function AchievementsSection() {
  const targetRef = useRef(null);
  
  // Horizontal Scroll Logic
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Increased to -95% because cards are now wider
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-95%"]);
  const springX = useSpring(x, { stiffness: 100, damping: 30 });

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#FAF7F2]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Scrolling Container */}
        <motion.div style={{ x: springX }} className="flex items-center gap-16 px-24">
          
          {/* Section Intro Block */}
          <div className="flex flex-col justify-center min-w-[350px] mr-10 z-10">
            <span className="text-[#A68A64] font-mono text-[10px] tracking-[1em] uppercase mb-4">Milestones</span>
            <h2 className="text-[#4A4A4A] text-7xl md:text-8xl font-serif italic tracking-tighter mb-6">Achievements</h2>
            <div className="w-20 h-[2px] bg-[#A68A64] mb-6"></div>
            <p className="text-[#A68A64] font-mono text-[10px] font-black tracking-[0.3em] uppercase">[ Scroll To Explore → ]</p>
          </div>

          {/* Expandable Clickable Hover Cards - INCREASED BASE SIZE */}
          {achievements.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              onClick={() => window.open(item.link, "_blank")}
              // INCREASED: min-w-[440px], max-w-[440px], h-[480px], hover:h-[640px]
              className="group cursor-pointer relative min-w-[440px] max-w-[440px] h-[480px] hover:h-[640px] bg-white rounded-[2rem] p-7 shadow-[0_15px_40px_-15px_rgba(166,138,100,0.1)] border border-[#A68A64]/10 flex flex-col overflow-hidden hover:shadow-[0_40px_80px_-20px_rgba(166,138,100,0.25)] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            >
              
              {/* Image Container - INCREASED HEIGHT to 250px */}
              <div className="relative w-full h-[250px] shrink-0 rounded-[1.5rem] overflow-hidden mb-6">
                <div className="absolute inset-0 bg-[#A68A64]/10 mix-blend-multiply z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-500" />
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
                <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 shadow-sm flex items-center gap-2">
                  <span className="text-[#A68A64] font-mono text-[10px] font-black tracking-widest">{item.id}</span>
                </div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col flex-1">
                {/* Organization */}
                <span className="text-[#A68A64] font-mono text-[9px] tracking-[0.3em] mb-3 block uppercase font-bold">
                  {item.org}
                </span>
                
                {/* Title */}
                <h3 className="text-[#333] text-3xl md:text-[2.2rem] font-serif italic tracking-tighter leading-[1.15] group-hover:text-[#A68A64] transition-colors duration-500">
                  {item.title}
                </h3>
                
                {/* HIDDEN DESCRIPTION: Revealed on hover */}
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] opacity-0 group-hover:opacity-100 mt-0 group-hover:mt-6">
                  <div className="overflow-hidden">
                    <div className="text-[#555] font-sans text-[15px] leading-relaxed line-clamp-4">
                      {item.desc}
                    </div>
                  </div>
                </div>

                {/* Bottom Badge & Hover Arrow */}
                <div className="mt-auto pt-6 flex items-center justify-between">
                   <div className="px-5 py-2 bg-[#FAF7F2] border border-[#A68A64]/20 rounded-xl text-[#A68A64] font-mono text-[9px] font-bold tracking-widest uppercase">
                     {item.detail}
                   </div>
                   
                   {/* Visual cue that card is a link */}
                   <div className="w-8 h-8 rounded-full border border-[#A68A64]/30 flex items-center justify-center text-[#A68A64] opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                     </svg>
                   </div>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
    </section>
  );
}