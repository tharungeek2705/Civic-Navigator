"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProcessingPage() {
  const router = useRouter();
  const [phase, setPhase] = useState(0);

  const trackingPhases = [
    "Establishing Secure Connection...",
    "Extracting E-KYC Credentials...",
    "Querying Vector DB...",
    "Running AI Eligibility Engine...",
    "Synthesizing Benefit Matrix..."
  ];

  useEffect(() => {
    // Cycle through phases every 800ms
    const interval = setInterval(() => {
      setPhase((prev) => {
        if (prev >= trackingPhases.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    // Route to dashboard after completing all phases + a small buffer
    const timeout = setTimeout(() => {
      router.push("/dashboard");
    }, trackingPhases.length * 800 + 500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router, trackingPhases.length]);

  return (
    <main className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      
      {/* Decorative Cyberpunk Background Elements */}
      <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      <div className="absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
      
      {/* The Radar / Core Animation */}
      <div className="relative w-64 h-64 flex items-center justify-center mb-12">
        {/* Outer Ring 3 (Ping) */}
        <div className="absolute inset-0 rounded-full border border-indigo-500/10 animate-ping" style={{ animationDuration: '3s' }} />
        
        {/* Outer Ring 2 (Slow Spin) */}
        <div className="absolute inset-4 rounded-full border border-t-indigo-500/50 border-r-emerald-500/20 border-b-indigo-500/10 border-l-transparent animate-spin" style={{ animationDuration: '4s' }} />
        
        {/* Inner Ring (Fast Spin Reverse) */}
        <div className="absolute inset-10 rounded-full border-2 border-t-emerald-400 border-r-transparent border-b-indigo-400 border-l-transparent animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
        
        {/* Core Glowing Orb */}
        <div className="relative w-24 h-24 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shadow-[0_0_50px_rgba(79,70,229,0.5)] z-10">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-emerald-500 opacity-80 blur-[2px] animate-pulse flex items-center justify-center">
            <span className="text-white font-black text-xs tracking-widest uppercase">AI Core</span>
          </div>
        </div>
      </div>

      {/* Sequential Text Tracker */}
      <div className="w-full max-w-md bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        <h2 className="text-center font-bold text-slate-200 mb-6 tracking-widest uppercase text-xs">
          System Processing Pipeline
        </h2>
        
        <div className="space-y-4">
          {trackingPhases.map((text, idx) => (
            <div key={idx} className="flex items-center gap-3">
              {/* Status Indicator */}
              <div className="relative flex items-center justify-center w-5 h-5">
                {phase > idx ? (
                  <span className="text-emerald-400 text-sm">✓</span>
                ) : phase === idx ? (
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping absolute" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                )}
              </div>
              
              {/* Status Text */}
              <span className={`text-sm font-mono tracking-tight transition-colors duration-300 ${
                phase > idx ? "text-emerald-400/80" : phase === idx ? "text-indigo-300" : "text-slate-600"
              }`}>
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
      
    </main>
  );
}
