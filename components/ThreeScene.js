"use client";
import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, Environment } from '@react-three/drei';

const projectData = [
  { 
    year: "Nov 25",
    id: "01", 
    title: "CALYX", 
    url: "https://plant-phenology-state-detector.vercel.app/", 
    github: "https://github.com/aayush-soni/plant-phenology",
    about: "NASA International Space Apps Challenge Honorable Mentions And Global Nominee. Engineered a predictive model analyzing 1300+ plant & 400+ pest datasets to forecast global phenology with 80% accuracy with 10  years old data to analyze the climate changes.", 
    tag: ["AI/ML","PYTHON", "NODEJS", "DOCKER"]
  },
  { 
    year: "Aug 25",
    id: "02", 
    title: "WORDWISE", 
    url: "https://www.canva.com/design/DAGs8NJTAzo/b2ruL7mqO_9cRjtwRHlZvg/view?embed", 
    github: "https://github.com/aayush-soni/wordwise",
    about: "Developed a Flutter app (Word Dictionary With the video support) with a Trie data structure-based auto-complete engine and dynamic Firebase backend with 200K+ words.",
    tag: ["FLUTTER","DSA","FIREBASE"]
  },
  { 
    year : "Jun 24",
    id: "03", 
    title: "EYE CURSOR", 
    videoUrl: "/project-video.mp4", 
    github: "https://github.com/gitcrusher/eye-controlled-mouse", 
    about: "Hands-free mouse control system using OpenCV. Implemented gaze-detection algorithms in Python to track and analyze eye movements.", 
    tag: ["AI/ML","PYTHON", "OPENCV"]
  },
  { 
    year: "Apr 24",
    id: "04", 
    title: "RAYBAN", 
    url: "https://aayushsoni05.netlify.app/", 
    github: "https://github.com/aayush-soni/rayban-remix",
    about: "A sleek, responsive remix of a high-end e-commerce experience. Optimized for performance with smooth minimalist UI.", 
    tag: ["HTML","TAILWIND","SHERYJS"]
  }
];

function ProjectSlab({ project, index, progress }) {
  const ref = useRef();
  const videoRef = useRef(null); 
  
  useFrame(() => {
    if (!ref.current || !progress) return;
    const p = typeof progress.get === 'function' ? progress.get() : 0;
    
    const gap = 11; 
    const totalMove = (projectData.length - 1) * gap;
    const xPos = (index * gap) - (p * totalMove);
    const zPos = -Math.abs(xPos) * 1.5;

    ref.current.position.x = xPos;
    ref.current.position.z = zPos;
    ref.current.rotation.y = xPos * -0.02; 
    ref.current.visible = Math.abs(xPos) < 25;

    if (videoRef.current) {
      if (Math.abs(xPos) < 8) {
        if (videoRef.current.paused) videoRef.current.play().catch(() => {});
      } else {
        if (!videoRef.current.paused) videoRef.current.pause();
      }
    }
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
            width: '1350px', height: '620px', backgroundColor: '#FFFFFF', borderRadius: '40px', 
            overflow: 'hidden', display: 'flex', boxShadow: '0 40px 100px -20px rgba(0,0,0,0.2)' 
          }}>
            
            {/* Left Side: Media */}
            <div style={{ width: '65%', height: '100%', position: 'relative', borderRight: '1px solid rgba(166, 138, 100, 0.1)', overflow: 'hidden' }}>
              {project.videoUrl ? (
                <video ref={videoRef} src={project.videoUrl} loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <iframe src={project.url} style={{ width: '200%', height: '200%', transform: 'scale(0.5)', transformOrigin: 'top left', border: 'none' }} title={project.title} />
              )}
            </div>

            {/* Right Side: Information */}
            <div style={{ width: '35%', height: '100%', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px', position: 'relative' }}>
              
              {/* GitHub Button */}
              <a href={project.github} target="_blank" rel="noopener noreferrer" 
                style={{ position: 'absolute', top: '45px', right: '45px', zIndex: 100 }}
                className="group flex items-center justify-center text-white bg-[#A68A64] hover:bg-[#333] transition-all duration-500 p-4 rounded-full shadow-xl hover:scale-110"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.5-1.4 6.5-7a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5.6 3.36 6.65 6.5 7a4.8 4.8 0 0 0-1 3.03V22"></path>
                  <path d="M9 20c-5 1.5-5-2.5-7-3"></path>
                </svg>
              </a>

              {/* Year Label: Extra Bold */}
              <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-[3px] bg-[#A68A64]"></div>
                  <span className="text-[#A68A64] font-mono text-[14px] font-black uppercase tracking-[0.6em]">{project.year}</span>
              </div>
              
              {/* Title: Huge & Elegant */}
              <h2 className="text-[#222] text-7xl font-serif italic tracking-tighter leading-none mb-8 uppercase">
                {project.title}
              </h2>
              
              {/* Description: Readable Medium Text */}
              <p className="text-[#555] font-sans text-xl leading-relaxed mb-12 font-medium tracking-tight">
                {project.about}
              </p>

              {/* Tags: Professional Grid */}
              <div className="flex flex-wrap gap-3 mb-16">
                {project.tag && project.tag.map((t, i) => (
                  <span key={i} className="px-5 py-2 bg-[#FAF9F6] border border-[#E8E4DF] rounded-xl text-[#8C7355] font-mono text-[11px] font-bold uppercase tracking-widest shadow-sm">
                    {t}
                  </span>
                ))}
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
    <Canvas camera={{ position: [0, 0, 10], fov: 35 }} gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
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