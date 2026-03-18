"use client";
import { useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import KernelReveal from '@/components/KernelReveal';
import ProfileLayout from '@/components/ProfileLayout';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Navbar from '@/components/Navbar';
import OpenSource from '@/components/OpenSource';
import Experience from '@/components/Experience'; 

export default function Home() {
  const [stage, setStage] = useState('loading'); 

  return (
    // YAHAN FIX KIYA HAI: overflow-x-hidden ki jagah overflow-clip lagaya hai
    <main className="relative bg-[#FAF7F2] min-h-screen overflow-clip">
      
      {/* 1. LOADING STAGE */}
      {stage === 'loading' && (
        <LoadingScreen onFinished={() => setStage('reveal')} />
      )}
      
      {/* 2. REVEAL STAGE */}
      {stage === 'reveal' && (
        <KernelReveal 
          imageUrl="/me.png" 
          onUnlocked={() => setStage('profile')} 
        />
      )}

      {/* 3. FINAL PROFILE STAGE */}
      {stage === 'profile' && (
        <div className="animate-in fade-in duration-1000">
          <Navbar />
          
          <section id="dossier">
            <ProfileLayout imageUrl="/me.png" />
          </section>

          <section id="skills">
            <Skills />
          </section>

          <section id="opensource">
            <OpenSource />
          </section>

          <section id="experience">
            <Experience />
          </section>

          {/* Ab ye section properly FREEZE hoga screen par */}
          <section id="projects">
            <Projects />
          </section>

          <section id="contact" className="min-h-[60vh] flex flex-col items-center justify-center border-t border-[#A68A64]/10">
            <span className="text-[#A68A64] font-mono text-[10px] tracking-[0.5em] uppercase mb-4">/ Final_Transmission</span>
            <h2 className="text-[#4A4A4A] text-5xl font-serif italic tracking-tighter lowercase">contact_</h2>
            <p className="text-[#4A4A4A]/60 font-mono text-xs mt-6 uppercase tracking-widest">[ Secure Connection Pending ]</p>
          </section>
        </div>
      )}
    </main>
  );
}