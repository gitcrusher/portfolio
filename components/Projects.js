"use client";
import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import { useScroll, useSpring, useTransform, motion } from 'framer-motion';

const ThreeScene = dynamic(() => import('./ThreeScene').then((mod) => mod.default), { 
  ssr: false,
  loading: () => <div className="h-screen w-full flex items-center justify-center bg-[#FAF7F2] font-mono text-[#A68A64]">STABILIZING_VAULT...</div>
});

export default function Projects() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  const cardProgress = useTransform(scrollYProgress, [0, 0.9], [0, 1]);
  const smoothProgress = useSpring(cardProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const headingText = "Projects";

  return (
    <section ref={containerRef} className="relative h-[500vh] bg-[#FAF7F2] w-full block">
      
      {/* Locked screen */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col bg-[#FAF7F2]">
        
        {/* Header: Top padding thodi kam ki hai taaki perfect frame bane */}
        <div className="w-full px-10 md:px-24 pt-12 md:pt-16 flex-none z-50 pointer-events-none">
          
          <div className="flex flex-wrap">
            {headingText.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 40, rotateX: -90 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.8, delay: index * 0.05, ease: [0.215, 0.61, 0.355, 1] }}
                className="text-[#4A4A4A] text-5xl md:text-7xl font-serif italic tracking-tighter inline-block origin-bottom leading-none"
              >
                {char}
              </motion.span>
            ))}
          </div>

        </div>

        {/* 3D Scene: Yahan '-mt-6 md:-mt-12' lagaya hai jisse gap khatam ho jayega */}
        <div className="w-full flex-1 relative z-10 -mt-6 md:-mt-12 pb-8">
          <ThreeScene progress={smoothProgress} />
        </div>

      </div>
    </section>
  );
}