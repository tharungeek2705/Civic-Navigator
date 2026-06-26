"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CivicVaultPage() {
  const [profileName, setProfileName] = useState("Citizen");

  useEffect(() => {
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

  return (
    <main className="min-h-screen w-full bg-[#0a0f1d] text-slate-100 p-4 sm:p-6 md:p-8 antialiased flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-8">
        
        {/* Top Header Block */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/40 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-md">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 shadow-[0_0_20px_rgba(79,70,229,0.3)]">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>
            <div>
              <div className="flex items-center gap-2 text-indigo-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                <span className="text-xs font-bold uppercase tracking-wider">Secured Metadata Hub</span>
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight">Civic Vault</h1>
              <p className="text-slate-400 text-xs mt-0.5">
                Manage your verified credential tokens for portal auto-filling.
              </p>
            </div>
          </div>
          <Link 
            href="/dashboard"
            className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-300 hover:bg-slate-850 transition shadow-md cursor-pointer"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Info Banner */}
        <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/10 flex items-center gap-3">
          <span className="text-indigo-400 font-bold text-sm shrink-0">ℹ</span>
          <p className="text-slate-300 text-xs leading-relaxed">
            Logged in as <span className="font-semibold text-white">{profileName}</span>. Civic Vault simulates e-KYC integration with official APIs (UIDAI, TN e-Sevai, etc.) to tokenize citizen attributes.
          </p>
        </div>

        {/* Vault Document Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          
          {/* Document 1: Aadhaar (Verified) */}
          <div className="bg-slate-900/30 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between space-y-4 hover:border-slate-700 transition">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Identity Details</span>
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Verified ✅
                </span>
              </div>
              <h3 className="font-extrabold text-base text-white">National Aadhaar Card</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Primary biometric profile tokenized via OTP e-KYC verification.
              </p>
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-850 font-mono text-[10px] text-slate-500 space-y-1">
                <div>ISSUER: UIDAI (Govt of India)</div>
                <div>TOKEN: token_uidai_84921984210</div>
                <div>STATUS: SECURE GATEWAY ACTIVE</div>
              </div>
            </div>
            <button className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-850 text-slate-300 hover:text-white transition font-semibold text-xs cursor-pointer">
              View Verified Fields
            </button>
          </div>

          {/* Document 2: Income Certificate (Needs Update) */}
          <div className="bg-slate-900/30 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between space-y-4 hover:border-slate-700 transition">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Income Verification</span>
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Needs Update ⚠️
                </span>
              </div>
              <h3 className="font-extrabold text-base text-white">Annual Income Certificate</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Certificate issued within 12 months is needed to match low-income schemes.
              </p>
              <div className="bg-amber-950/10 border border-amber-500/10 p-3.5 rounded-xl text-[11px] text-amber-400/90 leading-normal">
                Notice: The current certificate has passed its validity window. Upload a recent issue to retain matching eligibility.
              </div>
            </div>
            <button 
              onClick={() => alert("Simulating document file upload and OCR extraction...")}
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 transition text-white font-bold text-xs cursor-pointer shadow-md shadow-amber-600/10"
            >
              Upload New Certificate
            </button>
          </div>

          {/* Document 3: Community Certificate (Verified) */}
          <div className="bg-slate-900/30 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between space-y-4 hover:border-slate-700 transition">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Caste Affiliation</span>
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Verified ✅
                </span>
              </div>
              <h3 className="font-extrabold text-base text-white">Community Certificate</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Caste categorizations matched with State Welfare databases.
              </p>
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-850 font-mono text-[10px] text-slate-500 space-y-1">
                <div>ISSUER: Revenue Department, TN</div>
                <div>TOKEN: token_caste_tn_2910482103</div>
                <div>STATUS: SECURE GATEWAY ACTIVE</div>
              </div>
            </div>
            <button className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-850 text-slate-300 hover:text-white transition font-semibold text-xs cursor-pointer">
              View Verified Fields
            </button>
          </div>

          {/* Document 4: Ration Card (Missing) */}
          <div className="bg-slate-900/30 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between space-y-4 hover:border-slate-700 transition">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Family Index</span>
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-red-500/10 text-red-400 border border-red-500/20">
                  Missing ❌
                </span>
              </div>
              <h3 className="font-extrabold text-base text-white">Ration Card (Smart Card)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connecting this document establishes verified household dependency status.
              </p>
              <div className="bg-red-950/10 border border-red-500/10 p-3.5 rounded-xl text-[11px] text-red-400/90 leading-normal">
                Connecting your Smart Card allows automatic scanning of family members for household welfare benefit programs.
              </div>
            </div>
            <button 
              onClick={() => alert("Simulating mobile OTP linking for Smart Ration Card...")}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition text-white font-bold text-xs cursor-pointer shadow-md shadow-indigo-600/10"
            >
              Connect via Mobile OTP
            </button>
          </div>

        </div>

        {/* Explainers for Judges - SECURE DIGITAL LOCKER CONCEPT */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
            💡 Hackathon Showcase: Vault Architecture & Security
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <strong>Civic Vault securely holds your verified API tokens.</strong> Future applications will draw from these verified data points to bypass repetitive manual data entry.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 text-xs text-slate-400 pt-2 leading-relaxed">
            <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-850">
              <h4 className="font-bold text-white text-xs mb-1">Decoupled Architecture</h4>
              Citizens do not upload raw, unencrypted PDF documents to our servers. Only verified cryptographic tokens from databases are queried, protecting user records from data leaks.
            </div>
            <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-850">
              <h4 className="font-bold text-white text-xs mb-1">State Auto-Fill Standards</h4>
              When the citizen clicks "Apply on Official Portal", these verified parameters are structured into standard e-KYC packets, enabling one-click profile completion on participating government gateways.
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
