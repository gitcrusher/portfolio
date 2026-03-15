"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Experience() {
  const [isHovered, setIsHovered] = useState(false);
  const headingText = "Experience";

  const clickLink = "https://drive.google.com/file/d/1CvWPwXC2z8yNQHwXLeh1Y4WjyoTbyXd4/view?usp=sharing"; 
  const displayPhoto = "/exp1.jpg"; 

  // Animation variants for child elements
  const fadeInVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section id="experience" className="relative w-full bg-[#FAF7F2] py-20 px-10 md:px-24 overflow-visible min-h-screen flex flex-col justify-center">
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* --- HEADER --- */}
        <div className="mb-16">
          <div className="flex flex-wrap">
            {headingText.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 40, rotateX: -90 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.8, delay: index * 0.05, ease: [0.215, 0.61, 0.355, 1] }}
                className="text-[#4A4A4A] text-6xl md:text-8xl font-serif italic tracking-tighter inline-block origin-bottom leading-none"
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* --- MAIN LAYOUT --- */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 relative">
            
            {/* --- SINGLE SATELLITE CARD --- */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  key="satellite-card"
                  initial={{ opacity: 0, x: 100, y: 0, rotate: 10, scale: 0.8 }}
                  animate={{ opacity: 1, x: 480, y: -180, rotate: -5, scale: 1 }}
                  exit={{ opacity: 0, x: 100, y: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 90, damping: 15 }}
                  className="absolute hidden lg:block w-[450px] h-[280px] z-[60] rounded-[40px] overflow-hidden border-[6px] border-white shadow-[0_25px_50px_-12px_rgba(166,138,100,0.3)] pointer-events-none"
                >
                  <img src={displayPhoto} className="w-full h-full object-cover" alt="Mentorship Highlight" />
                  <div className="absolute top-6 right-8 bg-[#A68A64] px-4 py-1.5 rounded-full shadow-lg">
                    <span className="text-white font-mono text-[9px] uppercase tracking-widest">Evidence_Log_01</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* --- THE MAIN CARD WITH CHILD ANIMATIONS --- */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                visible: { transition: { staggerChildren: 0.15 } } // Har element ke beech 0.15s gap
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => window.open(clickLink, '_blank')} 
              className="relative p-12 bg-white border border-[#A68A64]/10 rounded-[50px] shadow-sm transition-all duration-500 hover:shadow-2xl cursor-pointer z-[20] overflow-hidden" 
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E5D3B3]/10 rounded-bl-full -z-10" />
              
              <div className="relative z-10">
                {/* 1. Date & Badge */}
                <motion.div variants={fadeInVariant} className="flex items-center gap-4 mb-8">
                  <span className="px-4 py-1.5 bg-[#A68A64] text-white font-mono text-[10px] rounded-full tracking-widest uppercase">Education_Mentor</span>
                  <span className="text-[#A68A64] font-mono text-[10px] tracking-widest uppercase">JUN'2024 - JUL'2024</span>
                </motion.div>
                
                {/* 2. Heading Text */}
                <motion.h3 variants={fadeInVariant} className="text-[#4A4A4A] text-4xl md:text-6xl font-serif italic mb-6 leading-tight">
                  Empowering the next generation of <span className="text-[#A68A64]">builders.</span>
                </motion.h3>
                
                {/* 3. Description Text */}
                <motion.p variants={fadeInVariant} className="text-[#4A4A4A]/70 font-mono text-sm md:text-base leading-relaxed mb-10 max-w-xl">
                  Mentored school students in HTML, CSS, and JS, turning abstract code into tangible digital experiences for young minds.
                </motion.p>
                
                {/* 4. Skill Tags */}
                <motion.div variants={fadeInVariant} className="flex flex-wrap gap-3">
                  {["Syntax Basics", "CSS Art", "Logic Building"].map((tag) => (
                    <span key={tag} className="px-4 py-2 border border-[#A68A64]/20 rounded-full text-[#A68A64] font-mono text-[10px] uppercase bg-[#FAF7F2]/50">{tag}</span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Impact Stats with Staggered Fade */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } }
            }}
            className="lg:col-span-4 space-y-12 pl-10 border-l border-[#A68A64]/10"
          >
            {[
              { val: "150+", label: "Students_Guided" },
              { val: "10+", label: "Projects_Created" },
              { val: "∞", label: "Inspiration_Loop" }
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeInVariant}>
                <h4 className="text-[#A68A64] text-5xl font-serif italic leading-none">{stat.val}</h4>
                <p className="text-[#4A4A4A]/50 font-mono text-[10px] uppercase tracking-[0.3em] mt-3">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}