"use client";
import { useState, useEffect } from 'react';

const defaultLogs = [
  "INITIALIZING KERNEL v0.8.2...",
  "SCANNING BIOMETRIC DATA...",
  "AGENT IDENTIFIED: Aayush_Soni",
  "CONNECTING TO DATA_PORTAL...",
  "OVERRIDING SYSTEM PROTOCOLS...",
  "DECODING VISUAL INTERFACE...",
  "LOADING ASSETS..."
];

export default function LoadingScreen({ onFinished }) {
  const [currentLog, setCurrentLog] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Fix Hydration Error
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (currentLog < defaultLogs.length) {
      const timeout = setTimeout(() => setCurrentLog(prev => prev + 1), 400);
      return () => clearTimeout(timeout);
    } else {
      const finalTimeout = setTimeout(onFinished, 1200);
      return () => clearTimeout(finalTimeout);
    }
  }, [currentLog, onFinished]);

  return (
    <div 
      className="fixed inset-0 z-[100] flex flex-col justify-center items-center font-mono p-4"
      style={{ backgroundColor: '#FAF7F2' }} // Theme: Alabaster
    >
      {/* Subtle Texture Overlay */}
      <div className="absolute inset-0 bg-[#E5D3B3]/10" />

      <div className="w-full max-w-5xl z-10">
        <div className="space-y-4">
          {defaultLogs.slice(0, currentLog + 1).map((log, i) => (
            <p key={i} className="text-xl md:text-4xl font-bold tracking-tighter uppercase">
              <span className="text-[#A68A64] mr-4 opacity-40 text-sm md:text-xl font-normal">
                [{mounted ? new Date().toLocaleTimeString() : "00:00:00"}]
              </span>
              <span className={i === currentLog 
                ? "text-[#A68A64] drop-shadow-[0_0_10px_rgba(166,138,100,0.3)]" // Theme: Dusty Gold
                : "text-[#4A4A4A] opacity-30" // Theme: Charcoal
              }>
                {log}
              </span>
            </p>
          ))}
        </div>

        {/* Updated Progress Bar to match Modern Sand */}
        <div className="mt-16 w-full h-[1px] bg-[#E5D3B3] overflow-hidden relative rounded-full">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#A68A64] to-transparent animate-loading-bar shadow-[0_0_15px_rgba(166,138,100,0.4)]"></div>
        </div>
      </div>
    </div>
  );
}