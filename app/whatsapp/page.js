"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function WhatsAppDemoPage() {
  const [profileName, setProfileName] = useState("Citizen");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(15);
  const [isTyping, setIsTyping] = useState(false);
  const [showBotResponse, setShowBotResponse] = useState(false);

  useEffect(() => {
    // Read profile name safely
    try {
      const stored = localStorage.getItem("userProfile");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.name) {
          setProfileName(parsed.name);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Simulating the user playing the voice note and receiving the bot's response
  const triggerDemoSequence = () => {
    setIsPlayingAudio(true);
    let progressInterval = setInterval(() => {
      setAudioProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsPlayingAudio(false);
          triggerBotTyping();
          return 100;
        }
        return prev + 15;
      });
    }, 300);
  };

  const triggerBotTyping = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setShowBotResponse(true);
    }, 2000);
  };

  return (
    <main className="min-h-screen w-full bg-[#0a0f1d] text-slate-100 p-4 sm:p-6 md:p-8 antialiased flex flex-col items-center">
      <div className="w-full max-w-5xl space-y-8 flex flex-col">
        
        {/* Top Header Block */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/40 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-indigo-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              <span className="text-xs font-bold uppercase tracking-wider">Vernacular Accessibility Mockup</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Natural Language Discovery
            </h1>
            <p className="text-slate-400 text-sm">
              Demonstrate how citizens interact in their local dialects via audio messaging.
            </p>
          </div>
          <Link 
            href="/dashboard"
            className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-300 hover:bg-slate-800 transition shadow-md"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Dynamic Split Layout */}
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          
          {/* Left Column: Narrative Explanation */}
          <div className="lg:col-span-5 bg-slate-900/40 border border-slate-800 p-6 rounded-3xl space-y-6">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
              Judge Narrative Guide
            </h2>
            
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>
                A core barrier to welfare scheme discovery is digital literacy and complex form interfaces. Civic Navigator bypasses this by embedding an intelligent voice-assistant directly inside instant messaging platforms.
              </p>
              
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-indigo-950/20 border border-indigo-500/10 flex gap-3">
                  <span className="text-indigo-400 text-base">🎙️</span>
                  <div>
                    <h4 className="font-bold text-white text-xs">Audio Processing</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Citizens speak in their mother tongue (Tamil, Hindi, etc.) without navigating menus.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-950/15 border border-emerald-500/10 flex gap-3">
                  <span className="text-emerald-400 text-base">🤖</span>
                  <div>
                    <h4 className="font-bold text-white text-xs">Translation & Semantic Mapping</h4>
                    <p className="text-xs text-slate-400 mt-0.5">NLP models translate speech to English text, parsing age, gender, and income constraints.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-950/15 border border-amber-500/10 flex gap-3">
                  <span className="text-amber-400 text-base">⚡</span>
                  <div>
                    <h4 className="font-bold text-white text-xs">Dynamic Mini Cards</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Eligible matches are returned instantly as highly visual, readable cards inside the chat.</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <button
                  onClick={triggerDemoSequence}
                  className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 transition text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-indigo-600/10 cursor-pointer"
                >
                  ▶ Simulate Audio Journey
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: High Fidelity WhatsApp Phone Mockup */}
          <div className="lg:col-span-7 flex justify-center">
            
            {/* Phone Shell frame */}
            <div className="relative w-full max-w-[360px] h-[640px] rounded-[48px] border-[12px] border-slate-950 bg-slate-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
              
              {/* Phone Camera Notch & Status Bar */}
              <div className="absolute top-0 inset-x-0 h-7 bg-black text-[10px] font-bold text-slate-400 px-6 flex items-center justify-between z-30 select-none pointer-events-none">
                <span>9:41 AM</span>
                <span className="w-16 h-4 bg-black rounded-b-xl absolute left-1/2 -translate-x-1/2 top-0"></span>
                <span className="flex items-center gap-1">
                  <span>5G</span>
                  <span className="w-4 h-2 border border-slate-400 rounded-sm inline-block relative after:content-[''] after:absolute after:-right-1 after:top-0.5 after:w-0.5 after:h-1 after:bg-slate-400"></span>
                </span>
              </div>

              {/* WhatsApp Header */}
              <div className="bg-[#005c4b] text-white pt-9 pb-3 px-4 flex items-center justify-between shadow-md z-20">
                <div className="flex items-center gap-2">
                  {/* Arrow left */}
                  <span className="text-sm font-semibold opacity-80 select-none pointer-events-none">←</span>
                  {/* Avatar bubble */}
                  <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-white shadow-inner text-sm">
                    CN
                  </div>
                  <div>
                    <h3 className="text-sm font-bold leading-tight">Civic Navigator Bot</h3>
                    <p className="text-[10px] text-emerald-300 font-medium">online</p>
                  </div>
                </div>
                
                {/* Simulated Header Icons */}
                <div className="flex gap-4 text-sm opacity-80">
                  <span>🎥</span>
                  <span>📞</span>
                  <span>⋮</span>
                </div>
              </div>

              {/* WhatsApp Chat Area (Classic beige textured background) */}
              <div className="flex-1 bg-[#efeae2] p-3 overflow-y-auto space-y-4 relative flex flex-col justify-end">
                
                {/* Audio Wave User Message */}
                <div className="flex justify-end w-full">
                  <div className="bg-[#d9fdd3] text-slate-900 rounded-2xl rounded-tr-none px-3.5 py-3 shadow-[0_1px_1.5px_rgba(0,0,0,0.15)] max-w-[85%] space-y-2">
                    
                    {/* Audio Player interface */}
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={triggerDemoSequence}
                        className="w-9 h-9 rounded-full bg-emerald-500 hover:bg-emerald-600 transition flex items-center justify-center text-white text-sm shrink-0 cursor-pointer shadow-sm"
                      >
                        {isPlayingAudio ? "⏸" : "▶"}
                      </button>
                      
                      {/* Fake timeline */}
                      <div className="w-36 flex flex-col justify-center">
                        <div className="h-1 bg-slate-300 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full" style={{ width: `${audioProgress}%` }}></div>
                        </div>
                        <div className="flex justify-between items-center text-[9px] text-slate-500 mt-1">
                          <span>0:14</span>
                          <span>🎙️ Voice Note</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* NLP English Translation Transcript */}
                <div className="flex justify-end w-full">
                  <div className="bg-[#d9fdd3]/90 text-slate-800 rounded-2xl rounded-tr-none px-3 py-2.5 shadow-[0_1px_1.5px_rgba(0,0,0,0.12)] max-w-[85%] text-[11px] leading-normal border-l-4 border-emerald-500">
                    <div className="font-bold text-[9px] text-emerald-700 uppercase tracking-wider mb-1">
                      🔤 Translated Transcript (Tamil)
                    </div>
                    "நான் ஒரு தமிழ்நாட்டு மாணவி. எனது குடும்ப ஆண்டு வருமானம் ஒரு லட்சத்திற்கு கீழ் உள்ளது. கல்வி உதவித்தொகை ஏதாவது உள்ளதா?"
                    <div className="border-t border-slate-300/40 my-1.5"></div>
                    <span className="italic text-slate-600">
                      "I am a female student from Tamil Nadu. Family income is under ₹1L. Are there any educational assistance schemes?"
                    </span>
                  </div>
                </div>

                {/* Simulated typing loading bubble */}
                {isTyping && (
                  <div className="flex justify-start w-full">
                    <div className="bg-white text-slate-900 rounded-2xl rounded-tl-none px-4 py-3 shadow-[0_1px_1.5px_rgba(0,0,0,0.15)] text-xs text-slate-500 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                )}

                {/* Bot Response Bubble */}
                {showBotResponse && (
                  <div className="flex justify-start w-full transition-all duration-500">
                    <div className="bg-white text-slate-900 rounded-2xl rounded-tl-none px-3.5 py-3 shadow-[0_1px_1.5px_rgba(0,0,0,0.15)] max-w-[88%] space-y-3">
                      <p className="text-xs leading-relaxed">
                        Hello {profileName}! We analyzed your audio query. You qualify for the following program:
                      </p>

                      {/* Mini Scheme Card inside Bot message bubble */}
                      <div className="border border-slate-200 rounded-2xl bg-slate-50 overflow-hidden shadow-inner">
                        <div className="p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-bold text-slate-400 bg-slate-200/60 px-2 py-0.5 rounded">
                              Govt of Tamil Nadu
                            </span>
                            <span className="text-[9px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
                              100% Eligible
                            </span>
                          </div>

                          <h4 className="text-xs font-bold text-slate-900 leading-tight">
                            Pudhumai Penn Scheme
                          </h4>
                          
                          <p className="text-[10px] text-slate-500">
                            Monthly educational assistance for female undergraduates.
                          </p>

                          <div className="text-[10px] font-semibold text-indigo-600 bg-indigo-50/50 p-1.5 rounded-lg border border-indigo-100/50">
                            Benefit: ₹1,000 / month
                          </div>
                        </div>

                        {/* Interactive button inside card */}
                        <div className="border-t border-slate-200">
                          <button 
                            onClick={() => alert("Simulating application file submission via WhatsApp APIs...")}
                            className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 transition text-[10px] font-bold uppercase tracking-wider text-white text-center cursor-pointer"
                          >
                            Apply via WhatsApp
                          </button>
                        </div>
                      </div>

                      <p className="text-[9px] text-slate-400 text-right">9:42 AM</p>
                    </div>
                  </div>
                )}

              </div>

              {/* Fake WhatsApp Message input bar */}
              <div className="bg-[#f0f2f5] p-2 flex items-center gap-2 border-t border-slate-200 z-20">
                <div className="bg-white flex-1 rounded-full px-4 py-2 flex items-center justify-between text-xs text-slate-400 select-none shadow-sm">
                  <span>Type a message...</span>
                  <span>📎 📷</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#00a884] flex items-center justify-center text-white text-sm select-none shadow-sm">
                  🎙️
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
