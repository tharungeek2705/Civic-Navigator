"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1 = phone input, 2 = OTP input
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
    setPhone(val);
    setError("");
  };

  const handleOtpChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 4);
    setOtp(val);
    setError("");
  };

  const handleGetOtp = (e) => {
    e.preventDefault();
    if (phone.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setLoading(true);
    setError("");
    // Simulate OTP generation delay
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1200);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (otp.length !== 4) {
      setError("Please enter the 4-digit OTP sent to your mobile.");
      return;
    }
    setLoading(true);
    setError("");
    // Simulate OTP verification
    setTimeout(() => {
      setLoading(false);
      router.push("/");
    }, 1500);
  };

  return (
    <main className="min-h-screen w-full bg-[#0a0f1d] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-950/40 via-[#0a0f1d] to-[#040815] text-slate-100 flex items-center justify-center p-4 sm:p-6 md:p-8 antialiased relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse"></div>

      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-2xl rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.45)] overflow-hidden transition-all duration-300 hover:border-slate-700/80">
          
          {/* Header */}
          <div className="relative p-6 sm:p-8 border-b border-slate-800/60 bg-gradient-to-r from-slate-900/80 to-indigo-950/20">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-400">Public Service Platform</p>
                <h1 className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-indigo-200">
                  Civic Navigator
                </h1>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Step Indicator */}
            <div className="flex items-center gap-3">
              <div className={`flex items-center justify-center h-7 w-7 rounded-lg text-xs font-bold ${step >= 1 ? "bg-indigo-600 text-white shadow-sm" : "bg-slate-950 text-slate-600"}`}>
                {step > 1 ? "✓" : "1"}
              </div>
              <div className={`flex-1 h-0.5 rounded-full transition-all duration-500 ${step > 1 ? "bg-indigo-500" : "bg-slate-800"}`}></div>
              <div className={`flex items-center justify-center h-7 w-7 rounded-lg text-xs font-bold ${step === 2 ? "bg-indigo-600 text-white shadow-sm" : "bg-slate-950 text-slate-600"}`}>
                2
              </div>
            </div>

            {/* Step 1: Mobile Number */}
            {step === 1 && (
              <form onSubmit={handleGetOtp} className="space-y-5 animate-fadeIn">
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                    Mobile Authentication
                  </h2>
                  <p className="text-xs text-slate-400">Enter your Aadhaar-linked mobile number to receive a one-time password.</p>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-300 uppercase tracking-wider" htmlFor="login-phone">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-500 font-mono">+91</span>
                    <input
                      id="login-phone"
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="98765 43210"
                      maxLength={10}
                      autoFocus
                      className="w-full rounded-xl border border-slate-800 bg-slate-950/50 pl-14 pr-4 py-3.5 text-sm text-slate-100 font-mono tracking-widest placeholder:text-slate-600 outline-none transition duration-200 focus:border-indigo-500 focus:bg-slate-950 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-red-400 text-xs font-medium flex items-center gap-1.5">
                    <span className="text-red-500">✗</span> {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 hover:scale-[1.01] active:scale-[0.99] text-xs font-bold uppercase tracking-wider text-white transition-all shadow-[0_5px_15px_rgba(79,70,229,0.2)] disabled:opacity-60 disabled:pointer-events-none cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      Get OTP
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Step 2: OTP Verification */}
            {step === 2 && (
              <form onSubmit={handleVerify} className="space-y-5 animate-fadeIn">
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                    OTP Verification
                  </h2>
                  <p className="text-xs text-slate-400">
                    A 4-digit OTP has been sent to <span className="text-white font-mono font-semibold">+91 {phone.slice(0, 5)} {phone.slice(5)}</span>
                  </p>
                </div>

                {/* Simulated OTP delivery badge */}
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 flex items-center gap-2">
                  <span className="font-bold">✓</span>
                  OTP delivered successfully via SMS gateway. (Demo: Enter any 4 digits)
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-300 uppercase tracking-wider" htmlFor="login-otp">
                    One-Time Password
                  </label>
                  <input
                    id="login-otp"
                    type="text"
                    value={otp}
                    onChange={handleOtpChange}
                    placeholder="● ● ● ●"
                    maxLength={4}
                    autoFocus
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3.5 text-center text-2xl text-slate-100 font-mono tracking-[0.5em] placeholder:text-slate-700 placeholder:tracking-[0.3em] placeholder:text-lg outline-none transition duration-200 focus:border-indigo-500 focus:bg-slate-950 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-xs font-medium flex items-center gap-1.5">
                    <span className="text-red-500">✗</span> {error}
                  </p>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => { setStep(1); setOtp(""); setError(""); }}
                    className="px-5 py-3.5 rounded-xl border border-slate-800 bg-slate-900/30 hover:bg-slate-800 text-xs font-bold uppercase tracking-wider text-slate-300 transition cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 hover:scale-[1.01] active:scale-[0.99] text-xs font-bold uppercase tracking-wider text-white transition-all shadow-[0_5px_15px_rgba(16,185,129,0.2)] disabled:opacity-60 disabled:pointer-events-none cursor-pointer flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <span className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Verifying...
                      </>
                    ) : (
                      <>
                        Verify & Login
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Footer disclaimer */}
            <div className="pt-4 border-t border-slate-800/60">
              <p className="text-[10px] text-slate-500 text-center leading-relaxed">
                By logging in, you agree to the platform&apos;s Terms of Service. This is a hackathon demo — no real SMS is sent. Your data stays in-browser via localStorage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
