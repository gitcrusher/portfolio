"use client";
import React, { useRef, useEffect, useState } from 'react';

export default function KernelReveal({ imageUrl, onUnlocked }) {
  const canvasRef = useRef(null);
  const scratchCount = useRef(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Modern Sand Palette Constants
  const colors = {
    bg: "#FAF7F2",       // Alabaster
    accent: "#E5D3B3",   // Champagne
    highlight: "#A68A64",// Dusty Gold
    text: "#4A4A4A"      // Charcoal
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const initCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Background: Alabaster
      ctx.fillStyle = colors.bg; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Professional Matrix: Champagne 1s and 0s
      ctx.fillStyle = colors.accent; 
      ctx.font = "14px monospace";
      ctx.textAlign = "center";
      
      // Spacing slightly increased for a cleaner, "airy" professional look
      for (let i = 0; i < canvas.width; i += 30) {
        for (let j = 0; j < canvas.height; j += 30) {
          ctx.fillText(Math.random() > 0.5 ? "1" : "0", i, j);
        }
      }
    };

    const handleMouseMove = (e) => {
      if (scratchCount.current > 160) return; 

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      // Slightly larger brush for a smoother "sweep" feel
      ctx.arc(e.clientX, e.clientY, 90, 0, Math.PI * 2);
      ctx.fill();

      scratchCount.current += 1;
      
      if (scratchCount.current > 160) {
        setIsUnlocked(true);
        setTimeout(() => {
          if (onUnlocked) onUnlocked(); 
        }, 2000); 
      }
    };

    initCanvas();
    window.addEventListener('resize', initCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', initCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [onUnlocked, colors.bg, colors.accent]); 

  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden bg-[#FAF7F2]">
      
      {/* Reveal Overlay with 1s and 0s */}
      <canvas 
        ref={canvasRef} 
        className={`absolute inset-0 z-20 cursor-crosshair transition-opacity duration-[2000ms] ease-in-out ${isUnlocked ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      />

      {/* Modern Sand Card */}
      <div className={`relative z-50 transition-all duration-[1500ms] ease-out transform 
        ${isUnlocked ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-12'}`}>
        
        {/* Soft Golden Border and Shadow */}
        <div className="relative p-[1.5px] bg-[#E5D3B3] rounded-3xl shadow-[0_30px_60px_rgba(166,138,100,0.12)]">
          <div className="bg-white rounded-[23px] overflow-hidden border border-[#A68A64]/10 w-[320px] md:w-[360px]">
            <div className="relative h-[480px]">
               <img src={imageUrl} className="h-full w-full object-cover" alt="Profile" />
               
               {/* Fade to white gradient for the text area */}
               <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-95" />
               
               <div className="absolute bottom-8 left-8 text-left">
                  <h2 className="text-[#4A4A4A] text-2xl font-serif tracking-tight lowercase italic">Agent_Ed_H</h2>
                  <div className="h-[1px] w-8 bg-[#A68A64] my-3" />
                  <p className="text-[#A68A64] text-[10px] font-mono tracking-[0.3em] uppercase">NASA Global Nominee</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {!isUnlocked && (
        <div className="absolute top-16 z-40 flex flex-col items-center">
          <div className="font-serif text-sm md:text-base tracking-[0.4em] text-[#4A4A4A] opacity-50 uppercase text-center px-4">
            [ Reveal Identity ]
          </div>
        </div>
      )}
    </div>
  );
}