"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  
  const [profile, setProfile] = useState(null);
  const [schemes, setSchemes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const storedProfileStr = localStorage.getItem("userProfile");
        if (!storedProfileStr) {
          router.push("/");
          return;
        }

        const parsedProfile = JSON.parse(storedProfileStr);
        setProfile(parsedProfile);

        // Fetch mock schemes matching this profile
        const res = await fetch("/api/schemes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsedProfile),
        });

        if (res.ok) {
          const data = await res.json();
          setSchemes(data.schemes || []);
        }
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [router]);

  // ── SKELETON LOADER ──
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#070c1b] p-6 space-y-6 animate-pulse">
        <div className="h-32 w-full max-w-4xl mx-auto rounded-2xl bg-slate-800/50" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-64 rounded-2xl bg-slate-800/30" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#070c1b] pb-20">
      
      {/* ── TOP ACTION BAR ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Action Buttons & Profile Meta */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
          <div>
            <h1 className="text-2xl font-extrabold text-white">Your Eligible Schemes</h1>
            <p className="text-sm text-slate-400 mt-1">Based on {profile?.state} and provided socio-economic parameters.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/whatsapp"
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-slate-300 hover:bg-slate-750 hover:text-white transition shadow-md"
            >
              🎙️ Voice Note Demo
            </Link>
            
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                `*❖ CIVIC NAVIGATOR — Welfare Eligibility Report*\n` +
                `__________________________________\n\n` +
                `*❖ Citizen:* ${profile?.name || "Citizen"}\n` +
                `*❖ State:* ${profile?.state || "N/A"} | *Sector:* ${profile?.locationType || "N/A"}\n` +
                `*❖ Occupation:* ${profile?.occupation || "N/A"} | *Age:* ${profile?.age || "N/A"} yrs\n` +
                `__________________________________\n\n` +
                schemes.map((s, idx) => 
                  `${idx + 1}. *${s.title}*\n` +
                  `   ❖ ${s.department}\n` +
                  `   ❖ *Benefit:* ${s.benefit}\n` +
                  `   ❖ *Match Score:* ${s.matchPercentage}%\n` +
                  `   ❖ ${s.officialLink || "https://www.myscheme.gov.in"}`
                ).join("\n\n")
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-md transition"
            >
              💬 Send Report to WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ── SCHEME GRID ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {schemes.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-10 text-center text-slate-400">
            No schemes matched the provided criteria. Ensure your profile fields are fully completed.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schemes.map((scheme, i) => {
              const matchedFields = scheme.matchedCriteria || [];
              const missingFields = scheme.missingDocuments || [];
              const hasMissing = missingFields.length > 0;

              return (
                <div key={i} className="flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-900/30 p-6 space-y-5 hover:border-slate-700 transition">
                  
                  <div className="space-y-4">
                    {/* Header: Eligibility Score & Dept */}
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 max-w-[70%] leading-tight">
                        {scheme.department}
                      </span>
                      <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[9px] font-bold text-emerald-400">
                        {scheme.matchPercentage}% MATCH
                      </span>
                    </div>

                    {/* Title & Benefit */}
                    <div>
                      <h3 className="text-lg font-extrabold text-white leading-tight">
                        {scheme.title}
                      </h3>
                      <div className="mt-2 text-xl font-black tracking-tight text-emerald-400">
                        {scheme.benefit}
                      </div>
                    </div>

                    {/* Criteria Tags */}
                    {matchedFields.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {matchedFields.map(m => (
                          <span key={m} className="rounded-md bg-slate-800/50 px-2 py-1 text-[10px] font-medium text-slate-300">
                            ✓ {m}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Missing Documents Warning */}
                    {hasMissing && (
                      <div className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-3">
                        <div className="text-[10px] font-black uppercase text-amber-400 flex items-center gap-1.5 mb-1">
                          ⚠️ Action Required
                        </div>
                        <p className="text-xs text-amber-400/80">
                          Upload: {missingFields.join(", ")}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Scheme Action Zone */}
                  <div className="flex gap-2 mt-4">
                    <a
                      href={scheme.officialLink || "https://www.myscheme.gov.in"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-500 py-3 text-xs font-black uppercase tracking-widest text-white shadow-md transition text-center"
                    >
                      Apply on Official Portal ↗
                    </a>
                    
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                        `*❖ CIVIC NAVIGATOR — Scheme Eligibility*\n` +
                        `__________________________________\n\n` +
                        `*❖ Scheme:* ${scheme.title}\n` +
                        `*❖ Department:* ${scheme.department}\n` +
                        `*❖ Benefit:* ${scheme.benefit}\n` +
                        `*❖ Match Score:* ${scheme.matchPercentage}%\n` +
                        `*❖ Link:* ${scheme.officialLink || "https://www.myscheme.gov.in"}\n` +
                        `__________________________________\n\n` +
                        `Find your custom welfare eligibility report on Civic Navigator!`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 hover:bg-emerald-500 border border-emerald-500/20 text-white shadow-md transition shrink-0 text-sm"
                      title="Share to WhatsApp"
                    >
                      💬
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
