"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import GoogleTranslate from "./GoogleTranslate";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hidden on onboarding and processing routes
  if (pathname === "/" || pathname === "/processing") return null;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* ── LEFT: Logo ── */}
          <div className="flex shrink-0 items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.3)]">
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <span className="text-lg font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400 hidden sm:block">
              Civic Navigator
            </span>
          </div>

          {/* ── MIDDLE: Desktop Links ── */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <Link href="/dashboard"
                className={`text-sm font-bold transition ${
                  pathname === "/dashboard" ? "text-white" : "text-slate-400 hover:text-slate-200"
                }`}>
                Dashboard
              </Link>
              <Link href="/vault"
                className={`text-sm font-bold transition ${
                  pathname === "/vault" ? "text-emerald-400" : "text-slate-400 hover:text-emerald-300"
                }`}>
                Civic Vault
              </Link>
              <Link href="/csc-locator"
                className={`text-sm font-bold transition ${
                  pathname === "/csc-locator" ? "text-indigo-400" : "text-slate-400 hover:text-indigo-300"
                }`}>
                CSC Locator
              </Link>
            </div>
          </div>

          {/* ── RIGHT: Utilities (Profile) ── */}
          <div className="flex items-center gap-4">
            <GoogleTranslate />
            
            <Link href="/profile"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden ml-2 rounded-md p-2 text-slate-400 hover:bg-slate-800 hover:text-white focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900 px-4 pt-2 pb-4 space-y-1">
          <Link href="/dashboard"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block rounded-md px-3 py-2 text-base font-bold ${
              pathname === "/dashboard" ? "bg-slate-800 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}>
            Dashboard
          </Link>
          <Link href="/vault"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block rounded-md px-3 py-2 text-base font-bold ${
              pathname === "/vault" ? "bg-slate-800 text-emerald-400" : "text-slate-400 hover:bg-slate-800 hover:text-emerald-300"
            }`}>
            Civic Vault
          </Link>
          <Link href="/csc-locator"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block rounded-md px-3 py-2 text-base font-bold ${
              pathname === "/csc-locator" ? "bg-slate-800 text-indigo-400" : "text-slate-400 hover:bg-slate-800 hover:text-indigo-300"
            }`}>
            CSC Locator
          </Link>
        </div>
      )}
    </nav>
  );
}
