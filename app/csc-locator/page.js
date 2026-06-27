"use client";

import { useState } from "react";
import Link from "next/link";

export default function CSCLocatorPage() {
  const [isLocating, setIsLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState("idle"); // idle | success | failed
  const [coordinates, setCoordinates] = useState(null);

  const handleLocate = () => {
    if (!navigator.geolocation) {
      setLocationStatus("failed");
      return;
    }

    setIsLocating(true);
    setLocationStatus("idle");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        setLocationStatus("success");
        setCoordinates({
          lat: position.coords.latitude.toFixed(4),
          lng: position.coords.longitude.toFixed(4),
        });
      },
      (error) => {
        console.warn("Geolocation Error:", error.message);
        setIsLocating(false);
        setLocationStatus("failed");
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 0,
      }
    );
  };

  return (
    <main className="min-h-screen bg-slate-950 pb-20 relative overflow-hidden">
      
      {/* Background Decorative Gradient */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] rounded-full bg-indigo-900/10 blur-[150px] pointer-events-none" />

      {/* Header */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-10 relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-[0_0_20px_rgba(79,70,229,0.3)]">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-50 tracking-tight">CSC & e-Sevai Locator</h1>
              <p className="mt-0.5 text-xs text-slate-400 font-medium uppercase tracking-widest">Find Nearby Assistance Centers</p>
            </div>
          </div>
          <Link href="/dashboard"
            className="rounded-xl border border-slate-700 bg-slate-800/80 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:bg-slate-700 hover:text-white transition-all shadow-md backdrop-blur-md">
            ← Dashboard
          </Link>
        </div>
      </div>

      {/* Core UI Card */}
      <div className="mx-auto max-w-md px-4 sm:px-6 pt-12 relative z-10">
        <div className="rounded-3xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-center relative overflow-hidden">
          
          {/* Glass glare effect */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-400/20 to-transparent" />

          {/* Icon Array */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border border-indigo-500/20 animate-ping" />
            <div className="absolute inset-2 rounded-full border border-indigo-400/30 border-t-indigo-500 animate-spin" style={{ animationDuration: '3s' }} />
            <div className="absolute inset-4 rounded-full bg-slate-800 flex items-center justify-center border border-slate-600 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]">
              <span className="text-3xl">📍</span>
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-100 mb-3">Locate Nearest Center</h2>
          <p className="text-sm text-slate-400 mb-8 max-w-xs mx-auto leading-relaxed">
            Allow location access to instantly find the closest Common Service Centers (CSC) and e-Sevai portals.
          </p>

          {/* Primary Action Button */}
          {locationStatus === "idle" && (
            <button
              onClick={handleLocate}
              disabled={isLocating}
              className="w-full flex items-center justify-center gap-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-6 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-[0_4px_20px_rgba(79,70,229,0.3)] hover:shadow-[0_4px_25px_rgba(79,70,229,0.5)] transition-all disabled:opacity-70 disabled:animate-pulse"
            >
              {isLocating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Acquiring Signal...
                </>
              ) : (
                "Scan My Location"
              )}
            </button>
          )}

          {/* Success State */}
          {locationStatus === "success" && coordinates && (
            <div className="space-y-4 animate-fadeIn">
              <div className="rounded-xl bg-emerald-900/20 border border-emerald-500/30 p-4">
                <span className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-400 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Signal Locked
                </span>
                <div className="font-mono text-slate-300 text-sm">
                  LAT: {coordinates.lat} <br />
                  LNG: {coordinates.lng}
                </div>
              </div>
              <a
                href={`https://www.google.com/maps/search/e-sevai+center+near+me/@${coordinates.lat},${coordinates.lng},14z`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-6 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-[0_4px_20px_rgba(16,185,129,0.3)] transition-all"
              >
                View on Google Maps
              </a>
            </div>
          )}

          {/* Bulletproof Fallback State */}
          {locationStatus === "failed" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="rounded-xl bg-amber-900/20 border border-amber-500/30 p-4">
                <span className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-amber-400 mb-1">
                  ⚠️ Signal Lost / Denied
                </span>
                <p className="text-xs text-slate-400">
                  Hardware geolocation failed. Falling back to global maps routing.
                </p>
              </div>
              <a
                href="https://www.google.com/maps/search/e-sevai+center+near+me/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 px-6 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-md transition-all"
              >
                Open in Google Maps
              </a>
              <button onClick={() => setLocationStatus("idle")} className="text-xs text-slate-500 hover:text-slate-300 underline mt-2 block w-full text-center">
                Try again
              </button>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
