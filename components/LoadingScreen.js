"use client";
import { useState, useEffect } from 'react';

const defaultLogs = [
  "INITIALIZING KERNEL v0.8.2...",
  "SCANNING BIOMETRIC DATA...",
  "AGENT IDENTIFIED: ED_H",
  "CONNECTING TO NASA_SPACE_APPS_PORTAL...",
  "OVERRIDING SYSTEM PROTOCOLS...",
  "DECODING VISUAL INTERFACE..."
];

export default function LoadingScreen({ onFinished }) {
  const [currentLog, setCurrentLog] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Fix Hydration Error: Wait for client-side mount before showing time
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
      style={{ backgroundColor: '#0f172a' }} 
    >
      <div className="absolute inset-0 bg-cyan-500/5 radial-gradient" />

      <div className="w-full max-w-5xl z-10">
        <div className="space-y-4">
          {defaultLogs.slice(0, currentLog + 1).map((log, i) => (
            <p key={i} className="text-xl md:text-4xl font-bold tracking-tighter uppercase">
              <span className="text-slate-700 mr-4 opacity-40 text-sm md:text-xl font-normal">
                {/* Agar mounted hai toh time dikhao, warna empty string taaki mismatch na ho */}
                [{mounted ? new Date().toLocaleTimeString() : "00:00:00"}]
              </span>
              <span className={i === currentLog ? "text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" : "text-slate-600 opacity-60"}>
                {log}
              </span>
            </p>
          ))}
        </div>

        <div className="mt-16 w-full h-[2px] bg-slate-900 overflow-hidden relative rounded-full">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-loading-bar shadow-[0_0_20px_rgba(34,211,238,0.8)]"></div>
        </div>
      </div>
    </div>
  );
}