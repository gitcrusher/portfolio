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
import ResearchSection from '@/components/ResearchSection'; 
import Ach from '@/components/AchievementsSection'; 
import EducationSection from '@/components/EducationSection';
import Contact from '@/components/contact'; // <-- NAYA IMPORT YAHAN HAI

export default function Home() {
  const [stage, setStage] = useState('loading'); 

  return (
    <main className="relative bg-[#FAF7F2] min-h-screen overflow-clip">
      
      {stage === 'loading' && (
        <LoadingScreen onFinished={() => setStage('reveal')} />
      )}
      
      {stage === 'reveal' && (
        <KernelReveal 
          imageUrl="/me.png" 
          onUnlocked={() => setStage('profile')} 
        />
      )}

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

          <section id="projects">
            <Projects />
          </section>

          <section id="research">
            <ResearchSection />
          </section>

          <section id="achievements">
            <Ach />
          </section>

          <section id="education">
            <EducationSection />
          </section>

          {/* CONTACT SECTION REPLACED HERE */}
          <div id="contact">
            <Contact />
          </div>
          
        </div>
      )}
    </main>
  );
}