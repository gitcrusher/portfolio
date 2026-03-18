"use client";
import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, Environment } from '@react-three/drei';

const projectData = [
  { 
    id: "01", 
    title: "CALYX", 
    url: "https://plant-phenology-state-detector.vercel.app/", 
    github: "https://github.com/aayush-soni/plant-phenology",
    about: "AI-powered plant phenology detector to analyze growth stages based on environmental data. Features real-time state detection." 
  },
  { 
    id: "02", 
    title: "WordWise", 
    url: "https://www.canva.com/design/DAGs8NJTAzo/b2ruL7mqO_9cRjtwRHlZvg/view?embed", 
    github: "https://github.com/aayush-soni/wordwise",
    about: "An interactive tool for improving vocabulary and language skills through gamified learning and adaptive difficulty." 
  },
  { 
    id: "03", 
    title: "Rayban", 
    url: "https://aayushsoni05.netlify.app/", 
    github: "https://github.com/aayush-soni/rayban-remix",
    about: "A sleek, responsive remix of a high-end e-commerce experience. Optimized for performance with smooth minimalist UI." 
  },
  // 1. NAYA CARD DATA ADD KIYA (Video support ke saath)
  { 
    id: "04", 
    title: "Eye Cursor", 
    videoUrl: "/project-video.mp4", // BHAI YAHAN APNE VIDEO KA NAAM DAAL DENA JO PUBLIC FOLDER MEIN HAI
    github: "https://github.com/gitcrusher/eye-controlled-mouse", 
    about: "NASA Space Apps Challenge Global Nominee. Machine learning model predicting plant phenology and pest occurrences." 
  }
];

function ProjectSlab({ project, index, progress }) {
  const ref = useRef();
  
  useFrame(() => {
    if (!ref.current || !progress) return;
    const p = typeof progress.get === 'function' ? progress.get() : 0;
    
    const gap = 11; 
    const offset = 0;
    const totalMove = (projectData.length - 1) * gap;

    const xPos = (index * gap + offset) - (p * totalMove);
    const zPos = -Math.abs(xPos) * 1.5;

    ref.current.position.x = xPos;
    ref.current.position.z = zPos;
    ref.current.rotation.y = xPos * -0.02; 
    
    ref.current.visible = Math.abs(xPos) < 25;
  });

  return (
    <group ref={ref}>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <mesh>
          <boxGeometry args={[7.8, 3.6, 0.05]} />
          <meshPhysicalMaterial transmission={1} thickness={0.1} roughness={0.05} color="#ffffff" transparent opacity={0.8} />
        </mesh>
        
        <Html transform occlude="blending" distanceFactor={3.2} position={[0, 0, 0.06]} className="pointer-events-auto">
          <div style={{ 
            width: '1350px', 
            height: '620px', 
            backgroundColor: '#FFFFFF', 
            borderRadius: '32px', 
            overflow: 'hidden', 
            display: 'flex', 
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(166, 138, 100, 0.15)' 
          }}>
            
            {/* LEFT SIDE: Ab Iframe aur Video dono ko handle karega */}
            <div style={{ width: '70%', height: '100%', position: 'relative', borderRight: '1px solid rgba(166, 138, 100, 0.2)', overflow: 'hidden' }}>
              
              {/* 2. LOGIC: Agar videoUrl hai toh Video tag chalao, warna Iframe */}
              {project.videoUrl ? (
                <video 
                  src={project.videoUrl} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', // Video screen ko perfectly fill karega
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }} 
                />
              ) : (
                <iframe 
                  src={project.url} 
                  style={{ 
                    width: '200%', 
                    height: '200%', 
                    transform: 'scale(0.5)', 
                    transformOrigin: 'top left',
                    border: 'none',
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }} 
                  title={project.title} 
                  loading="lazy" 
                />
              )}
              
              <a href={project.github} target="_blank" rel="noopener noreferrer" 
                style={{ position: 'absolute', top: '24px', left: '24px', zIndex: 100, display: 'block', pointerEvents: 'auto' }}
                className="group flex items-center justify-center text-[#FAF7F2] bg-[#A68A64] hover:bg-[#4A4A4A] transition-all duration-300 p-3 rounded-full shadow-lg border-2 border-[#FAF7F2]/50 hover:border-[#A68A64]/30 hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:rotate-12">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.5-1.4 6.5-7a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5.6 3.36 6.65 6.5 7a4.8 4.8 0 0 0-1 3.03V22"></path>
                  <path d="M9 20c-5 1.5-5-2.5-7-3"></path>
                </svg>
              </a>
            </div>

            {/* RIGHT SIDE (TEXT) */}
            <div style={{ width: '30%', height: '100%', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px', position: 'relative' }}>
              
              <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-[2px] bg-[#A68A64]/60"></div>
                  <span className="text-[#A68A64] font-mono text-[10px] uppercase tracking-[0.4em]">Vault / {project.id}</span>
              </div>
              
              <h2 className="text-[#4A4A4A] text-5xl font-serif italic tracking-tighter lowercase leading-none mb-5">
                {project.title}_
              </h2>
              
              <p className="text-[#4A4A4A]/70 font-mono text-base leading-relaxed tracking-wide">
                {project.about}
              </p>

              <div className="absolute bottom-8 left-[40px] flex gap-2 pointer-events-none">
                <div className="px-3 py-1.5 border border-[#A68A64]/30 rounded-full text-[#A68A64] font-mono text-[10px] tracking-widest uppercase bg-white/50">Verified</div>
                <div className="px-3 py-1.5 border border-[#4A4A4A]/20 rounded-full text-[#4A4A4A]/60 font-mono text-[10px] tracking-widest uppercase bg-white/50">Deployed</div>
              </div>

            </div>
          </div>
        </Html>
      </Float>
    </group>
  );
}

export default function ThreeScene({ progress }) {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 35 }} gl={{ antialias: false, alpha: true }} dpr={[1, 1.5]} className="w-full h-full block">
      <Suspense fallback={null}>
        <ambientLight intensity={1.5} />
        <Environment preset="studio" />
        <group position={[0, -0.4, 0]}>
          {projectData.map((project, index) => (
             <ProjectSlab key={project.id} project={project} index={index} progress={progress} />
          ))}
        </group>
      </Suspense>
    </Canvas>
  );
}