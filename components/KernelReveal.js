"use client";
import React, { useRef, useEffect, useState } from 'react';

export default function KernelReveal({ imageUrl, onUnlocked }) {
  const canvasRef = useRef(null);
  const scratchCount = useRef(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const colors = {
    bg: "#FAF7F2",
    accent: "#E5D3B3",
    highlight: "#A68A64",
    text: "#4A4A4A"
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const initCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = colors.bg; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = colors.accent; 
      ctx.font = "14px monospace";
      ctx.textAlign = "center";
      
      for (let i = 0; i < canvas.width; i += 30) {
        for (let j = 0; j < canvas.height; j += 30) {
          ctx.fillText(Math.random() > 0.5 ? "1" : "0", i, j);
        }
      }
    };

    const scratch = (x, y) => {
      if (scratchCount.current > 180) return; 
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 70, 0, Math.PI * 2); // Radius thoda chota kiya mobile ke liye
      ctx.fill();
      scratchCount.current += 1;
      
      if (scratchCount.current > 180) {
        setIsUnlocked(true);
        setTimeout(() => {
          if (onUnlocked) onUnlocked(); 
        }, 1500); 
      }
    };

    // Desktop Mouse Support
    const handleMouseMove = (e) => scratch(e.clientX, e.clientY);

    // Mobile Touch Support
    const handleTouchMove = (e) => {
      // Prevent scrolling while scratching
      if (e.cancelable) e.preventDefault();
      const touch = e.touches[0];
      scratch(touch.clientX, touch.clientY);
    };

    initCanvas();
    window.addEventListener('resize', initCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    // Added passive: false to allow e.preventDefault()
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('resize', initCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [onUnlocked, colors.bg, colors.accent]); 

  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden bg-[#FAF7F2] touch-none">
      
      {/* Scratch Overlay */}
      <canvas 
        ref={canvasRef} 
        style={{ touchAction: 'none' }} // Crucial for mobile
        className={`absolute inset-0 z-20 cursor-crosshair transition-opacity duration-[2000ms] ease-in-out ${isUnlocked ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      />

      {/* Card Content */}
      <div className={`relative z-50 transition-all duration-[1500ms] ease-out transform 
        ${isUnlocked ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-12'}`}>
        
        <div className="relative p-[1.5px] bg-[#E5D3B3] rounded-3xl shadow-[0_30px_60px_rgba(166,138,100,0.12)]">
          <div className="bg-white rounded-[23px] overflow-hidden border border-[#A68A64]/10 w-[280px] md:w-[360px]">
            <div className="relative h-[400px] md:h-[480px]">
              <img 
                src={imageUrl} 
                className="h-full w-full object-cover contrast-110" 
                alt="Profile" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-95" />
              <div className="absolute bottom-8 left-8 text-left">
                <h2 className="text-[#4A4A4A] text-2xl md:text-3xl font-black tracking-tighter uppercase italic leading-none">
                  AAYUSH SONI
                </h2>
                <div className="h-[1px] w-8 bg-[#A68A64] my-3" />
                <p className="text-[#A68A64] text-[9px] md:text-[10px] font-mono tracking-widest uppercase">
                  NASA SPACE APP Honoree
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isUnlocked && (
        <div className="absolute top-16 z-40 flex flex-col items-center animate-pulse">
          <div className="font-serif text-xs md:text-base tracking-[0.4em] text-[#4A4A4A] opacity-50 uppercase text-center px-4">
            [ {window.innerWidth < 768 ? 'Touch to reveal' : 'Reveal Identity'} ]
          </div>
        </div>
      )}
    </div>
  );
}