"use client";
import React from 'react';
import { motion } from 'framer-motion';

const contactLinks = [
  {
    id: "01",
    name: "GitHub",
    label: "Open Source & Projects",
    url: "https://github.com/aayush-soni",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    )
  },
  {
    id: "02",
    name: "LinkedIn",
    label: "Professional Network",
    url: "https://linkedin.com/in/aayush-soni",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    )
  },
  {
    id: "03",
    name: "Scholar",
    label: "Research Publications",
    
    url: "https://scholar.google.com/citations?user=4gPNJsMAAAAJ&hl=en&authuser=1", 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
        <path d="M6 12v5c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-5"></path>
      </svg>
    )
  },
  {
    id: "04",
    name: "LeetCode",
    label: "Algorithmic Problem Solving",
    url: "https://leetcode.com/u/knightsmokers/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    )
  },
  {
    id: "05",
    name: "Gmail",
    label: "Direct Communication",
    url: "mailto:your.email@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
    )
  }
];
export default function Contact() {
  return (
    <section className="relative w-full min-h-screen bg-[#FAF7F2] py-32 px-10 md:px-24 flex flex-col justify-center overflow-hidden">
      
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] select-none">
        <h1 className="text-[25vw] font-serif italic font-black">Connect</h1>
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col lg:flex-row gap-20">
        
        {/* Left Side: Heading Area */}
        <div className="flex flex-col justify-start lg:w-1/3">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-[3px] bg-[#A68A64]"></div>
            <span className="text-[#A68A64] font-mono text-[12px] font-black uppercase tracking-[0.6em]">
              COMM_LINK
            </span>
          </div>
          
          <h2 className="text-[#4A4A4A] text-6xl md:text-8xl font-serif italic tracking-tighter leading-none mb-8">
            let's <br /> connect_
          </h2>
          
          <p className="text-[#555] font-sans text-lg md:text-xl leading-relaxed font-medium mb-10 tracking-tight">
            Whether it's discussing a complex algorithmic problem, collaborating on an open-source project, or exploring new opportunities, my inbox is always open.
          </p>
        </div>

        {/* Right Side: Interactive Links List */}
        <div className="flex flex-col lg:w-2/3 w-full border-t border-[#A68A64]/20">
          {contactLinks.map((contact, index) => (
            <motion.a
              href={contact.url}
              target="_blank"
              rel="noopener noreferrer"
              key={contact.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="group flex items-center justify-between py-10 border-b border-[#A68A64]/20 hover:border-[#A68A64] transition-colors duration-500 cursor-pointer"
            >
              
              {/* Left Part of Row: ID + Icon + Name */}
              <div className="flex items-center gap-8 md:gap-12">
                <span className="text-[#A68A64]/40 font-mono text-sm font-black tracking-widest group-hover:text-[#A68A64] transition-colors duration-500">
                  {contact.id}
                </span>
                
                <div className="text-[#4A4A4A] group-hover:text-[#A68A64] transform group-hover:-translate-y-1 transition-all duration-500">
                  {contact.icon}
                </div>
                
                <div className="flex flex-col">
                  <h3 className="text-[#333] text-4xl md:text-5xl font-serif italic tracking-tighter group-hover:translate-x-4 transition-transform duration-500">
                    {contact.name}
                  </h3>
                  <span className="text-[#A68A64] font-mono text-[10px] uppercase tracking-[0.3em] mt-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-500">
                    {contact.label}
                  </span>
                </div>
              </div>

              {/* Right Part of Row: Arrow */}
              <div className="w-12 h-12 rounded-full border border-[#A68A64]/20 flex items-center justify-center text-[#A68A64] group-hover:bg-[#A68A64] group-hover:text-white transition-all duration-500 overflow-hidden relative">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                  <line x1="5" y1="19" x2="19" y2="5"></line>
                  <polyline points="10 5 19 5 19 14"></polyline>
                </svg>
              </div>

            </motion.a>
          ))}
        </div>

      </div>

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
    </section>
  );
}