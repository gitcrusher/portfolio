"use client";
import React from 'react';
import { motion } from 'framer-motion';

const educationData = [
  {
    id: "01",
    institution: "Lovely Professional University",
    degree: "B.Tech in Computer Science (AI & ML)",
    duration: "2023 — 2027",
    status: "In Progress",
    gpa: "Current Pursuit",
    location: "Punjab, India",
    details: [
      "Specializing in Artificial Intelligence and Machine Learning.",
      "Core focus on Data Structures, Algorithms, and Neural Networks.",
      "Active member of technical communities and research groups."
    ]
  },
  {
    id: "02",
    institution: "Higher Secondary Education",
    degree: "Science Stream (PCM)",
    duration: "2021 — 2023",
    status: "Completed",
    gpa: "High Merit",
    location: "India",
    details: [
      "Focused on Advanced Mathematics and Physics.",
      "Developed foundational logic and analytical problem-solving skills."
    ]
  }
];

export default function EducationSection() {
  return (
    <section id="education" className="relative w-full min-h-screen bg-[#FAF7F2] py-24 px-10 md:px-24 flex flex-col justify-center">
      
      {/* Background Decorative Element */}
      <div className="absolute top-20 left-10 opacity-[0.02] pointer-events-none select-none hidden md:block">
        <h1 className="text-[20vw] font-serif italic text-[#4A4A4A] leading-none">Scholar</h1>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="mb-20"
        >
          <span className="text-[#A68A64] font-mono text-[10px] tracking-[0.6em] uppercase block mb-4">Section_07 // Academic_History</span>
          <h2 className="text-[#4A4A4A] text-6xl md:text-8xl font-serif italic tracking-tighter">education_</h2>
        </motion.div>

        <div className="space-y-12">
          {educationData.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="relative grid grid-cols-1 md:grid-cols-12 gap-6 p-8 border border-[#A68A64]/10 bg-white/20 backdrop-blur-sm group hover:border-[#A68A64]/40 transition-all duration-500"
            >
              {/* Left Side: Timeline & ID */}
              <div className="md:col-span-3 border-r border-[#A68A64]/10 pr-6">
                <span className="text-[#A68A64] font-mono text-[10px] tracking-widest block mb-2">[{edu.id}] // {edu.duration}</span>
                <p className="text-[#4A4A4A] font-mono text-[11px] uppercase tracking-wider font-bold italic">
                  {edu.status}
                </p>
                <div className="mt-8 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#A68A64] animate-pulse" />
                    <span className="text-[#4A4A4A]/50 font-mono text-[9px] uppercase tracking-widest">{edu.location}</span>
                </div>
              </div>

              {/* Right Side: Info */}
              <div className="md:col-span-9 md:pl-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-[#4A4A4A] text-3xl md:text-4xl font-serif italic mb-2 group-hover:text-[#A68A64] transition-colors">
                    {edu.institution}
                  </h3>
                  <p className="text-[#A68A64] font-mono text-[11px] uppercase tracking-[0.2em] mb-6">
                    {edu.degree}
                  </p>
                  
                  <ul className="space-y-3">
                    {edu.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-[#A68A64] mt-1.5 opacity-50">•</span>
                        <p className="text-[#4A4A4A]/70 font-mono text-xs leading-relaxed italic">{detail}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-[#A68A64]/5 flex justify-between items-center">
                   <span className="text-[#A68A64] font-mono text-[10px] tracking-widest uppercase">Result: {edu.gpa}</span>
                   <div className="h-[1px] w-20 bg-[#A68A64]/20 group-hover:w-40 transition-all duration-700" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Line Overlay */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#A68A64]/5 pointer-events-none hidden md:block" />
    </section>
  );
}