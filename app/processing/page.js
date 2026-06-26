"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const steps = [
  { text: "Extracting Credentials...", detail: "OCR document parsing & identity scanning active" },
  { text: "Querying Vector DB...", detail: "Searching 1,000+ national and state welfare indices" },
  { text: "Running Eligibility Engine...", detail: "Cross-matching demographics and income thresholds" },
  { text: "Synthesizing Personalized Dashboard...", detail: "Structuring explainable AI insights and documentation" },
];

export default function ProcessingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Advance steps every 1.5 seconds (total 4 steps * 1.5s = 6.0s)
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1500);

    // Route to dashboard after exactly 6 seconds
    const redirectTimer = setTimeout(() => {
      router.push("/dashboard");
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <main className="min-h-screen w-full bg-[#030712] text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 antialiased relative overflow-hidden">
      {/* Background Animated Gradient Mesh */}
      <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none animate-pulse duration-5000"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none animate-pulse duration-7000"></div>

      <div className="w-full max-w-xl text-center space-y-10 z-10">
        
        {/* Animated Custom Ring Loader */}
        <div className="relative flex items-center justify-center mx-auto">
          {/* Inner ring */}
          <div className="w-32 h-32 rounded-full border-4 border-slate-900"></div>
          
          {/* Glowing Outer Spinning Ring */}
          <div className="absolute w-32 h-32 rounded-full border-t-4 border-l-4 border-indigo-500 border-r-4 border-r-transparent border-b-4 border-b-transparent animate-spin duration-1000 shadow-[0_0_30px_rgba(99,102,241,0.2)]"></div>
          
          {/* Secondary Fast Spinner */}
          <div className="absolute w-24 h-24 rounded-full border-b-2 border-r-2 border-emerald-400 border-t-2 border-t-transparent border-l-2 border-l-transparent animate-spin [animation-direction:reverse] duration-1500 opacity-60"></div>
          
          {/* Pulse Core Icon */}
          <div className="absolute flex items-center justify-center">
            <span className="flex h-5 w-5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.8)]"></span>
            </span>
          </div>
        </div>

        {/* Dynamic Text Information */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Step {currentStep + 1} of 4
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              AI Matcher Running
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white h-10">
            {steps[currentStep].text}
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto min-h-[40px] leading-relaxed">
            {steps[currentStep].detail}
          </p>
        </div>

        {/* Visual Progress Sequence Blocks */}
        <div className="space-y-3 text-left bg-slate-900/40 border border-slate-800/60 p-5 rounded-2xl backdrop-blur">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStep;
            const isActive = idx === currentStep;
            return (
              <div 
                key={idx} 
                className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? "bg-indigo-950/30 border border-indigo-500/30 text-white shadow-[0_0_15px_rgba(99,102,241,0.05)]" 
                    : isCompleted
                      ? "border border-emerald-500/10 text-slate-300 opacity-70"
                      : "border border-transparent text-slate-600 opacity-40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold ${
                    isCompleted 
                      ? "bg-emerald-500/10 text-emerald-400" 
                      : isActive 
                        ? "bg-indigo-600 text-white shadow-sm" 
                        : "bg-slate-950 text-slate-700"
                  }`}>
                    {isCompleted ? "✓" : idx + 1}
                  </span>
                  <span className="text-sm font-semibold">{step.text}</span>
                </div>
                
                {/* Status Indicator */}
                {isCompleted && (
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-400/5 px-2.5 py-0.5 rounded-full border border-emerald-500/10">
                    Done
                  </span>
                )}
                {isActive && (
                  <span className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Global Bottom Progress Line */}
        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-emerald-400 transition-all duration-1500 ease-out" 
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>

      </div>
    </main>
  );
}
