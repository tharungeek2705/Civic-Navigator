"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    maritalStatus: "",
    income: "",
    occupation: "",
    locationType: "Urban",
    state: "Tamil Nadu",
    differentlyAbled: false,
    religion: "",
    community: "",
    aadhaarNumber: "XXXX-XXXX-4456",
  });

  const [isAadhaarVerified, setIsAadhaarVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleVerifyAadhaar = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsAadhaarVerified(true);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAadhaarVerified) {
      alert("Please complete e-KYC verification.");
      return;
    }
    try {
      localStorage.setItem("userProfile", JSON.stringify(formData));
      router.push("/processing");
    } catch (error) {
      console.error(error);
    }
  };

  const selectChevronStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236366f1'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
    backgroundPosition: 'right 1rem center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '1.2rem',
    appearance: 'none'
  };

  return (
    <main className="min-h-screen w-full bg-slate-950 text-slate-50 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-950/40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-950/20 blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-200 to-emerald-400 drop-shadow-sm">
            Civic Navigator
          </h1>
          <p className="mt-3 text-xs text-indigo-400 font-bold tracking-widest uppercase">
            AI-Powered Welfare Intelligence
          </p>
        </div>

        {/* Futuristic Stepper */}
        <div className="mb-10 flex items-center justify-between px-4 relative">
          <div className="absolute top-1/2 left-8 right-8 -z-10 h-[2px] bg-slate-800 -translate-y-1/2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
          </div>
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex flex-col items-center gap-2">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl border-2 text-sm font-black transition-all duration-300 ${
                  step > num
                    ? "border-emerald-500 bg-emerald-950/60 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] backdrop-blur-md"
                    : step === num
                    ? "border-indigo-500 bg-indigo-950/60 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.4)] backdrop-blur-md scale-110"
                    : "border-slate-850 bg-slate-900/60 text-slate-500 backdrop-blur-sm"
                }`}
              >
                {step > num ? "✓" : num}
              </div>
            </div>
          ))}
        </div>

        {/* Premium Glassmorphism Form Card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-2xl p-6 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-5 animate-[fadeIn_0.3s_ease-out]">
                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-400 tracking-wider uppercase">Full Name</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 px-5 py-4 text-sm text-slate-50 placeholder-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all outline-none"
                    placeholder="Enter your legal name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-400 tracking-wider uppercase">Age</label>
                    <input type="number" name="age" required value={formData.age} onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 px-5 py-4 text-sm text-slate-50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all outline-none"
                      placeholder="Years" />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-400 tracking-wider uppercase">Gender</label>
                    <select name="gender" required value={formData.gender} onChange={handleChange} style={selectChevronStyle}
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 px-5 py-4 text-sm text-slate-50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all outline-none cursor-pointer">
                      <option value="" className="bg-slate-950">Select</option>
                      <option value="Female" className="bg-slate-950">Female</option>
                      <option value="Male" className="bg-slate-950">Male</option>
                      <option value="Transgender" className="bg-slate-950">Transgender</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-400 tracking-wider uppercase">Marital Status</label>
                  <select name="maritalStatus" required value={formData.maritalStatus} onChange={handleChange} style={selectChevronStyle}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 px-5 py-4 text-sm text-slate-50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all outline-none cursor-pointer">
                    <option value="" className="bg-slate-950">Select</option>
                    <option value="Single" className="bg-slate-950">Single</option>
                    <option value="Married" className="bg-slate-950">Married</option>
                    <option value="Widowed" className="bg-slate-950">Widowed</option>
                    <option value="Divorced" className="bg-slate-950">Divorced</option>
                  </select>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-5 animate-[fadeIn_0.3s_ease-out]">
                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-400 tracking-wider uppercase">Annual Income (₹)</label>
                  <input type="number" name="income" required value={formData.income} onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 px-5 py-4 text-sm text-slate-50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all outline-none"
                    placeholder="e.g. 120000" />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-400 tracking-wider uppercase">Occupation</label>
                  <select name="occupation" required value={formData.occupation} onChange={handleChange} style={selectChevronStyle}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 px-5 py-4 text-sm text-slate-50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all outline-none cursor-pointer">
                    <option value="" className="bg-slate-950">Select</option>
                    <option value="Farmer" className="bg-slate-950">Farmer / Agriculture</option>
                    <option value="Student" className="bg-slate-950">Student</option>
                    <option value="Unemployed" className="bg-slate-950">Unemployed</option>
                    <option value="Private Sector" className="bg-slate-950">Private Sector</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-400 tracking-wider uppercase">Sector</label>
                    <select name="locationType" value={formData.locationType} onChange={handleChange} style={selectChevronStyle}
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 px-5 py-4 text-sm text-slate-50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all outline-none cursor-pointer">
                      <option value="Urban" className="bg-slate-950">Urban</option>
                      <option value="Rural" className="bg-slate-950">Rural</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-400 tracking-wider uppercase">State</label>
                    <select name="state" value={formData.state} onChange={handleChange} style={selectChevronStyle}
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 px-5 py-4 text-sm text-slate-50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all outline-none cursor-pointer">
                      <option value="Tamil Nadu" className="bg-slate-950">Tamil Nadu</option>
                      <option value="Maharashtra" className="bg-slate-950">Maharashtra</option>
                      <option value="Uttar Pradesh" className="bg-slate-950">Uttar Pradesh</option>
                      <option value="Bihar" className="bg-slate-950">Bihar</option>
                      <option value="West Bengal" className="bg-slate-950">West Bengal</option>
                      <option value="Madhya Pradesh" className="bg-slate-950">Madhya Pradesh</option>
                      <option value="Rajasthan" className="bg-slate-950">Rajasthan</option>
                      <option value="Gujarat" className="bg-slate-950">Gujarat</option>
                      <option value="Andhra Pradesh" className="bg-slate-950">Andhra Pradesh</option>
                      <option value="Telangana" className="bg-slate-950">Telangana</option>
                      <option value="Kerala" className="bg-slate-950">Kerala</option>
                      <option value="Karnataka" className="bg-slate-950">Karnataka</option>
                      <option value="Delhi" className="bg-slate-950">Delhi</option>
                      <option value="Haryana" className="bg-slate-950">Haryana</option>
                      <option value="Punjab" className="bg-slate-950">Punjab</option>
                      <option value="Odisha" className="bg-slate-950">Odisha</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-400 tracking-wider uppercase">Religion</label>
                    <select name="religion" required value={formData.religion} onChange={handleChange} style={selectChevronStyle}
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 px-5 py-4 text-sm text-slate-50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all outline-none cursor-pointer">
                      <option value="" className="bg-slate-950">Select</option>
                      <option value="Hindu" className="bg-slate-950">Hindu</option>
                      <option value="Muslim" className="bg-slate-950">Muslim</option>
                      <option value="Christian" className="bg-slate-950">Christian</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-400 tracking-wider uppercase">Category</label>
                    <select name="community" required value={formData.community} onChange={handleChange} style={selectChevronStyle}
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 px-5 py-4 text-sm text-slate-50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all outline-none cursor-pointer">
                      <option value="" className="bg-slate-950">Select</option>
                      <option value="General" className="bg-slate-950">General / OC</option>
                      <option value="BC" className="bg-slate-950">BC</option>
                      <option value="MBC" className="bg-slate-950">MBC</option>
                      <option value="SC" className="bg-slate-950">SC / ST</option>
                    </select>
                  </div>
                </div>

                {/* Neon Mock Aadhaar E-KYC */}
                <div className="rounded-3xl border border-indigo-500/30 bg-indigo-950/30 p-6 shadow-[inset_0_0_20px_rgba(79,70,229,0.15)] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/80 shadow-[0_0_15px_rgba(79,70,229,0.5)]">
                      🛡️
                    </span>
                    <h3 className="text-sm font-bold text-slate-200 tracking-wide">Digital Identity Verification</h3>
                  </div>
                  
                  <div className="relative z-10 space-y-4">
                    <input
                      type="text"
                      readOnly
                      value={formData.aadhaarNumber}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3.5 text-center text-lg text-slate-300 font-mono tracking-[0.2em] shadow-inner outline-none cursor-not-allowed"
                    />

                    {!isAadhaarVerified ? (
                      <button
                        type="button"
                        onClick={handleVerifyAadhaar}
                        disabled={isVerifying}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-3.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] disabled:opacity-70 disabled:animate-pulse cursor-pointer"
                      >
                        {isVerifying ? "Contacting UIDAI Simulator..." : "Verify Identity"}
                      </button>
                    ) : (
                      <div className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 px-4 py-3.5 text-sm font-bold text-emerald-400 shadow-[inset_0_0_15px_rgba(16,185,129,0.2)]">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping mr-1" />
                        SECURELY VERIFIED
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Bar */}
            <div className="flex gap-4 pt-6 border-t border-slate-800 mt-6 relative z-20">
              {step > 1 && (
                <button type="button" onClick={prevStep}
                  className="w-1/3 rounded-xl border border-slate-700 bg-slate-800/80 py-3.5 text-sm font-bold text-slate-300 hover:bg-slate-750 hover:text-white transition-all backdrop-blur-md cursor-pointer">
                  Back
                </button>
              )}
              
              {step < 3 ? (
                <button type="button" onClick={nextStep}
                  className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 py-3.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] cursor-pointer">
                  Continue
                </button>
              ) : (
                <button type="submit" disabled={!isAadhaarVerified}
                  className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 disabled:from-slate-700 disabled:to-slate-700 py-3.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] disabled:shadow-none transition-all disabled:text-slate-400 cursor-pointer disabled:cursor-not-allowed">
                  Analyze Welfare Eligibility
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
