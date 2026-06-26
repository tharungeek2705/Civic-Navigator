"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [profile, setProfile] = useState({
    name: "Citizen",
    age: 25,
    gender: "Female",
    state: "Tamil Nadu",
    income: 80000,
    occupation: "Student",
    maritalStatus: "Single",
    locationType: "Urban",
    category: "General",
    differentlyAbled: false,
    religion: "Hindu",
    community: "General",
    aadhaarVerified: false,
  });

  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch matched schemes from API
  const fetchSchemes = async (userProfile) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/schemes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userProfile),
      });

      if (!res.ok) {
        throw new Error("Unable to reach the welfare database gateway.");
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setSchemes(data.schemes || []);
    } catch (err) {
      setError(err.message || "Failed to establish database synchronization.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 1. Safe localStorage reading with try/catch and fallback
    let loadedProfile = null;
    try {
      const stored = localStorage.getItem("userProfile");
      if (stored) {
        loadedProfile = JSON.parse(stored);
      }
    } catch (e) {
      console.error("Failed to parse userProfile from localStorage", e);
    }

    // Fallback to default generic profile if null/empty
    const activeProfile = loadedProfile || {
      name: "Citizen",
      age: 25,
      gender: "Female",
      state: "Tamil Nadu",
      income: 80000,
      occupation: "Student",
      maritalStatus: "Single",
      locationType: "Urban",
      category: "General",
      differentlyAbled: false,
      religion: "Hindu",
      community: "General",
      aadhaarVerified: true, // Mock default verification
    };

    setProfile(activeProfile);
    fetchSchemes(activeProfile);
  }, []);

  return (
    <main className="min-h-screen w-full bg-[#0a0f1d] text-slate-100 p-4 sm:p-6 md:p-8 antialiased">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Navigation & Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-slate-900/40 border border-slate-800/80 p-6 sm:p-8 rounded-3xl backdrop-blur-md">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                AI Eligibilities Live
              </span>
              
              {/* Aadhaar e-KYC Verified Badge */}
              {profile.aadhaarVerified && (
                <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  ✅ Aadhaar e-KYC Verified
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-indigo-400">{profile.name}</span>
            </h1>
            <p className="text-slate-400 text-sm">
              Discover public service benefits matched against your verified demographics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Link to the new Civic Vault page */}
            <Link 
              href="/vault"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-indigo-600/20"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
              </svg>
              Civic Vault
            </Link>
            
            <Link 
              href="/whatsapp"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-800 bg-slate-900/30 text-xs font-bold uppercase tracking-wider text-slate-300 hover:bg-slate-800 transition"
            >
              Voice Note Demo
            </Link>
            
            <Link 
              href="/"
              className="px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900/30 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-300 hover:bg-slate-800 transition"
            >
              Edit Form
            </Link>
          </div>
        </div>

        {/* Dynamic Skeleton Loader */}
        {loading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[340px] rounded-3xl bg-slate-900/50 border border-slate-800/60 p-6 flex flex-col justify-between animate-pulse">
                <div className="space-y-4">
                  <div className="h-4 bg-slate-850 rounded w-1/3"></div>
                  <div className="h-6 bg-slate-850 rounded w-3/4"></div>
                  <div className="h-20 bg-slate-900/80 rounded w-full"></div>
                </div>
                <div className="h-10 bg-slate-850 rounded w-full"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error panel */}
        {error && (
          <div className="p-8 border border-red-500/20 bg-red-950/20 rounded-3xl text-center space-y-4 max-w-xl mx-auto">
            <div className="text-red-400 inline-flex items-center justify-center p-3 rounded-full bg-red-500/10">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold">Search Gateway Interrupted</h3>
            <p className="text-sm text-slate-400">{error}</p>
            <button 
              onClick={() => fetchSchemes(profile)}
              className="px-6 py-2.5 rounded-xl bg-slate-850 hover:bg-slate-800 text-sm font-semibold transition cursor-pointer"
            >
              Re-Sync Core Data
            </button>
          </div>
        )}

        {/* Results Matrix */}
        {!loading && !error && (
          <>
            {schemes.length === 0 ? (
              <div className="p-12 text-center border border-slate-800 bg-slate-900/20 rounded-3xl max-w-xl mx-auto space-y-4">
                <p className="text-slate-400">
                  No matching programs found above the 40% eligibility floor. Modify your socioeconomic profile parameters to broaden the search.
                </p>
                <Link href="/" className="inline-block px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm">
                  Modify Profile Inputs
                </Link>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {schemes.map((scheme) => {
                  const isPerfectMatch = scheme.matchPercentage === 100;
                  return (
                    <article 
                      key={scheme.id}
                      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/30 p-6 shadow-xl transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/50 hover:scale-[1.01]"
                    >
                      {/* Top Accent Stripe indicating Match Grade */}
                      <span className={`absolute inset-x-0 top-0 h-1.5 ${
                        isPerfectMatch 
                          ? "bg-emerald-500 shadow-[0_2.5px_10px_rgba(16,185,129,0.35)]" 
                          : "bg-indigo-500"
                      }`}></span>

                      <div className="space-y-4">
                        {/* Match Percent Badge & Agency info */}
                        <div className="flex items-start justify-between gap-3">
                          <span className="text-[10px] font-bold text-slate-400 bg-slate-950/80 border border-slate-855 px-2.5 py-1 rounded-lg truncate max-w-[70%]">
                            {scheme.department}
                          </span>
                          
                          <div className={`flex items-center justify-center font-extrabold text-sm px-2.5 py-1 rounded-lg border ${
                            isPerfectMatch 
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                              : "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                          }`}>
                            {scheme.matchPercentage}% Match
                          </div>
                        </div>

                        {/* Title */}
                        <div>
                          <h3 className="font-extrabold text-lg text-white leading-snug group-hover:text-indigo-300 transition duration-200">
                            {scheme.title}
                          </h3>
                        </div>

                        {/* Benefit Tag */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950 text-xs font-semibold text-slate-300 border border-slate-850">
                          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400"></span>
                          Benefit: <span className="text-white font-bold">{scheme.benefit}</span>
                        </div>

                        {/* Explainable AI Reasoning Box */}
                        <div className="bg-slate-950/60 border border-slate-850 p-4 rounded-2xl space-y-3">
                          <h4 className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 border-b border-slate-900 pb-1.5">
                            AI Eligibility Analysis
                          </h4>
                          
                          <ul className="space-y-2 text-xs">
                            {/* Passed parameters */}
                            {scheme.matchedCriteria.map((crit, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-slate-300">
                                <span className="text-emerald-400 font-bold">✓</span>
                                <span>{crit}</span>
                              </li>
                            ))}
                            
                            {/* Failed criteria (Missing items) */}
                            {scheme.missingDocuments.map((miss, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-red-400 bg-red-500/5 p-1 rounded-md">
                                <span className="text-red-500 font-bold">✗</span>
                                <span className="font-medium">{miss}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Action Submission Zone */}
                      <div className="mt-6 pt-4 border-t border-slate-850">
                        <a
                          href={scheme.officialLink || "https://www.myscheme.gov.in"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold uppercase tracking-wider text-white transition shadow-md ${
                            isPerfectMatch 
                              ? "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/10" 
                              : "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/10"
                          }`}
                        >
                          Apply on Official Portal ↗
                        </a>
                      </div>

                    </article>
                  );
                })}
              </div>
            )}
          </>
        )}

      </div>
    </main>
  );
}
