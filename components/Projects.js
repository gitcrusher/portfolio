"use client";
import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import { useScroll, useSpring, useTransform } from 'framer-motion';

const ThreeScene = dynamic(() => import('./ThreeScene').then((mod) => mod.default), { 
  ssr: false,
  loading: () => <div className="h-screen w-full flex items-center justify-center bg-[#FAF7F2] font-mono text-[#A68A64]">STABILIZING_VAULT...</div>
});

export default function Projects() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  const cardProgress = useTransform(scrollYProgress, [0, 0.9], [0, 1]);
  const smoothProgress = useSpring(cardProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <section ref={containerRef} className="relative h-[500vh] bg-[#FAF7F2] w-full block">
      
      {/* Locked screen */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center bg-[#FAF7F2]">
        
        {/* 3. HEADER OVERLAY FIX: pointer-events-none makes Interactions pass through */}
        <div className="absolute top-24 left-10 md:left-24 z-50 pointer-events-none w-auto h-auto">
          
          <h2 className="text-[#4A4A4A] text-5xl md:text-7xl font-serif italic tracking-tighter leading-none">
            Projects
          </h2>
        </div>

        {/* 3D Scene - Cards below the header */}
        <div className="w-full h-full relative z-10">
          <ThreeScene progress={smoothProgress} />
        </div>

      </div>
    </section>
  );
}