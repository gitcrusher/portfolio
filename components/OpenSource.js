"use client";
import React from 'react';
import { motion } from 'framer-motion';

// CRITICAL: Ensure 'export default' is exactly like this
export default function OpenSource() {
  const contributions = [
    {
      project: "GoFr",
      role: "Core Contributor",
      description: "Improved documentation for log levels to enhance developer experience and debugging clarity.",
      link: "https://github.com/gofr-dev/gofr",
      tags: ["Golang", "Documentation", "OpenSource"]
    }
  ];

  return (
    <section id="opensource" className="relative w-full bg-[#FAF7F2] py-32 px-10 md:px-24 border-t border-[#A68A64]/10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20">
          <span className="text-[#A68A64] font-mono text-[10px] tracking-[0.5em] uppercase block mb-2">/ Community_Protocols</span>
          <h2 className="text-[#4A4A4A] text-5xl md:text-7xl font-serif italic tracking-tighter lowercase leading-none">open_source_</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {contributions.map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="group relative p-8 bg-white/40 backdrop-blur-sm border border-[#A68A64]/20 rounded-[40px] shadow-[0_20px_40px_rgba(166,138,100,0.05)] transition-all"
            >
              <h3 className="text-[#4A4A4A] text-3xl font-serif italic mb-4">{item.project}</h3>
              <p className="text-[#4A4A4A]/70 font-mono text-sm mb-6">{item.description}</p>
              {/* Rest of the UI... */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}