"use client";
import React, { useRef, useEffect, useState } from 'react';

export default function KernelReveal({ imageUrl, onUnlocked }) {
  const canvasRef = useRef(null);
  const scratchCount = useRef(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const initCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Exact Sync Background with Profile
      ctx.fillStyle = "#050810"; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Subtle Matrix Code
      ctx.fillStyle = "#111827"; 
      ctx.font = "16px monospace";
      for (let i = 0; i < canvas.width; i += 25) {
        for (let j = 0; j < canvas.height; j += 25) {
          ctx.fillText(Math.random() > 0.5 ? "1" : "0", i, j);
        }
      }
    };

    const handleMouseMove = (e) => {
      if (scratchCount.current > 160) return; 

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(e.clientX, e.clientY, 85, 0, Math.PI * 2);
      ctx.fill();

      scratchCount.current += 1;
      
      if (scratchCount.current > 160) {
        setIsUnlocked(true);
        // Cinematic Delay: Card settle hone ka waqt
        setTimeout(() => {
          if (onUnlocked) onUnlocked(); 
        }, 2500); 
      }
    };

    initCanvas();
    window.addEventListener('resize', initCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', initCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [onUnlocked]); 

  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden bg-[#050810]">
      
      {/* Smooth 2s Fade for Canvas */}
      <canvas 
        ref={canvasRef} 
        className={`absolute inset-0 z-20 cursor-crosshair transition-opacity duration-[2000ms] ease-in-out ${isUnlocked ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      />

      {/* Smooth 1.5s Entrance for Card */}
      <div className={`relative z-50 transition-all duration-[1500ms] ease-out transform 
        ${isUnlocked ? 'scale-100 opacity-100 rotate-0 translate-y-0' : 'scale-75 opacity-0 rotate-3 translate-y-20'}`}>
        
        <div className="relative p-1 bg-gradient-to-b from-cyan-400 to-blue-900 rounded-3xl shadow-[0_0_80px_rgba(34,211,238,0.4)]">
          <div className="bg-[#0f172a] rounded-[22px] overflow-hidden border border-white/10 w-[320px] md:w-[360px]">
            <div className="relative h-[480px]">
               <img src={imageUrl} className="h-full w-full object-cover contrast-110" alt="Agent" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-85" />
               <div className="absolute bottom-6 left-6 text-left">
                  <h2 className="text-white text-3xl font-black tracking-tighter uppercase italic drop-shadow-xl leading-none">Agent_Ed_H</h2>
                  <p className="text-cyan-400 text-[10px] font-mono tracking-widest uppercase mt-1">NASA Global Nominee</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {!isUnlocked && (
        <div className="absolute top-12 z-40 flex flex-col items-center">
          <div className="font-mono text-xl md:text-3xl font-black tracking-[0.5em] text-cyan-400 animate-pulse drop-shadow-[0_0_15px_rgba(34,211,238,0.9)] uppercase text-center px-4">
            [ HOVER_TO_VERIFY_IDENTITY ]
          </div>
        </div>
      )}
    </div>
  );
}