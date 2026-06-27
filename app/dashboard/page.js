"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  
  const [profile, setProfile] = useState(null);
  const [schemes, setSchemes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openAccordion, setOpenAccordion] = useState(null);

  // Mock deadline data
  const deadlines = [
    {
      id: 1,
      title: "Pudhumai Penn Scheme",
      type: "Application Closure",
      date: "July 1, 2026",
      urgent: true,
      action: "Requires College Fee Receipt",
    },
    {
      id: 2,
      title: "PM Kisan Samman Nidhi",
      type: "Aadhaar Re-linking",
      date: "July 4, 2026",
      urgent: true,
      action: "Link via DigiLocker",
    },
    {
      id: 3,
      title: "Naan Mudhalvan Certifications",
      type: "Registration Deadline",
      date: "July 15, 2026",
      urgent: false,
      action: "Upload Semester Marksheet",
    },
    {
      id: 4,
      title: "CM Health Insurance (TN)",
      type: "Renewal Window",
      date: "August 30, 2026",
      urgent: false,
      action: "Submit Income Certificate",
    },
  ];

  // Accordion data for the AI Policy Explainer
  const policyFAQs = [
    {
      question: "How is the Eligibility Match Score calculated?",
      answer: "Civic Navigator's engine evaluates your demographic parameters (age, state of residence, gender, income, community) against active government policy models. Match scores above 40% are displayed, highlighting which criteria you passed and where mismatch occurs.",
    },
    {
      question: "What does 'Action Required' signify?",
      answer: "This warning indicates that while your profile matches the eligibility parameters of a scheme, you are missing critical verified documents in your vault. Linking these missing certificates immediately clears the warning for portal submission.",
    },
    {
      question: "Does the Zero-Retention architecture store my documents?",
      answer: "No. Civic Navigator runs a completely stateless verification pipeline. All identity documents and tokens fetched via DigiLocker are processed in volatile memory (session space) and are never written to permanent disk storage or databases.",
    },
  ];

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

  const toggleAccordion = (idx) => {
    setOpenAccordion(openAccordion === idx ? null : idx);
  };

  // ── SKELETON LOADER ──
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#070c1b] p-6 space-y-6 animate-pulse">
        <div className="h-32 w-full max-w-4xl mx-auto rounded-2xl bg-slate-800/50" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-64 rounded-2xl bg-slate-800/30" />
            ))}
          </div>
          <div className="lg:col-span-4 h-96 rounded-2xl bg-slate-800/30" />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#070c1b] pb-20 text-slate-100">
      
      {/* ── TOP ACTION BAR ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 rounded-3xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-md p-6 sm:p-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-emerald-400">{profile?.name || "Citizen"}</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Discover welfare schemes in {profile?.state || "Tamil Nadu"} matched against your demographic parameters.
            </p>
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

      {/* ── MAIN CONTENT GRID ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Area: Schemes & Accordion (Left 8 Columns) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Schemes Header */}
            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Your Matched Benefits ({schemes.length})
              </h2>
            </div>

            {/* Scheme Cards */}
            {schemes.length === 0 ? (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-10 text-center text-slate-400">
                No schemes matched the provided criteria. Try updating your profile parameters.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {schemes.map((scheme, i) => {
                  const matchedFields = scheme.matchedCriteria || [];
                  const missingFields = scheme.missingDocuments || [];
                  const hasMissing = missingFields.length > 0;

                  return (
                    <div key={i} className="flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-900/30 p-6 space-y-5 hover:border-slate-700 transition relative overflow-hidden group">
                      
                      {/* Top accent line */}
                      <span className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 to-emerald-500 opacity-50" />

                      <div className="space-y-4">
                        {/* Header: Score & Agency */}
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 truncate max-w-[70%]">
                            {scheme.department}
                          </span>
                          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[9px] font-bold text-emerald-400 shrink-0">
                            {scheme.matchPercentage}% MATCH
                          </span>
                        </div>

                        {/* Title & Benefit */}
                        <div>
                          <h3 className="text-lg font-extrabold text-white leading-snug group-hover:text-indigo-400 transition-colors">
                            {scheme.title}
                          </h3>
                          <div className="mt-2 text-xl font-black text-emerald-400 tracking-tight">
                            {scheme.benefit}
                          </div>
                        </div>

                        {/* Criteria Tags */}
                        {matchedFields.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {matchedFields.map(m => (
                              <span key={m} className="rounded-md bg-slate-800/60 px-2 py-1 text-[10px] font-medium text-slate-300">
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

            {/* AI Policy Explainer Accordion */}
            <div className="space-y-4 pt-10 border-t border-slate-900">
              <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                🤖 AI Policy Explainer
              </h2>
              <div className="rounded-3xl border border-slate-800 bg-slate-900/10 p-2 space-y-2">
                {policyFAQs.map((faq, idx) => {
                  const isOpen = openAccordion === idx;
                  return (
                    <div key={idx} className="rounded-2xl overflow-hidden transition-all">
                      <button
                        onClick={() => toggleAccordion(idx)}
                        className="w-full flex items-center justify-between p-5 text-left bg-slate-900/30 hover:bg-slate-900/60 transition cursor-pointer"
                      >
                        <span className="text-sm font-bold text-slate-200">{faq.question}</span>
                        <span className="text-indigo-400 text-lg transition-transform" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                          ▼
                        </span>
                      </button>
                      
                      <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-40 border-t border-slate-800/50 bg-slate-900/10' : 'max-h-0'}`}>
                        <p className="p-5 text-xs text-slate-400 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Sidebar Area: Welfare Deadline Tracker (Right 4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Tracker Header */}
            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                ⏳ Deadline Tracker
              </h2>
            </div>

            {/* Glassmorphism Sidebar Widget */}
            <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-md p-6 shadow-2xl space-y-5">
              <p className="text-xs text-slate-400 leading-relaxed">
                Critical deadlines tracked relative to matching schemes in your demographic profiles.
              </p>

              <div className="space-y-4">
                {deadlines.map((dl) => (
                  <div key={dl.id} className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/80 space-y-2 group hover:border-slate-700 transition">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs font-extrabold text-slate-200 group-hover:text-indigo-400 transition-colors">
                        {dl.title}
                      </h4>
                      {dl.urgent && (
                        <span className="text-[9px] font-bold bg-amber-500/10 border border-amber-500/25 px-2 py-0.5 rounded text-amber-400 shrink-0 uppercase tracking-widest animate-pulse">
                          Urgent
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">{dl.type}</span>
                      <span className={`font-bold ${dl.urgent ? "animate-pulse text-amber-400 font-extrabold" : "text-slate-400"}`}>
                        {dl.date}
                      </span>
                    </div>

                    <div className="text-[10px] text-slate-500 italic pt-1 border-t border-slate-900">
                      💡 {dl.action}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}
