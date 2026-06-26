"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  
  // State initialization matching the matching algorithm keys without hardcoded personal names
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Female",
    state: "Tamil Nadu",
    income: "",
    occupation: "Student",
    maritalStatus: "Single",
    locationType: "Urban",
    category: "General",
    differentlyAbled: false,
    religion: "Hindu",
    community: "General",
  });

  // Aadhaar Mock Verification States
  const [aadhaarInput, setAadhaarInput] = useState("XXXX-XXXX-");
  const [isVerifying, setIsVerifying] = useState(false);
  const [aadhaarVerified, setAadhaarVerified] = useState(false);
  const [verificationError, setVerificationError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAadhaarChange = (e) => {
    const val = e.target.value;
    // Strip everything except the final digits typed
    const cleanDigits = val.replace("XXXX-XXXX-", "").replace(/[^0-9]/g, "");
    const truncated = cleanDigits.slice(0, 4);
    setAadhaarInput(`XXXX-XXXX-${truncated}`);
    setVerificationError("");
  };

  const simulateOtpVerification = (e) => {
    e.preventDefault();
    const lastFour = aadhaarInput.replace("XXXX-XXXX-", "");
    if (lastFour.length !== 4) {
      setVerificationError("Please enter the last 4 digits of your Aadhaar card.");
      return;
    }

    setIsVerifying(true);
    setVerificationError("");

    setTimeout(() => {
      setIsVerifying(false);
      setAadhaarVerified(true);
    }, 1200);
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.name.trim()) return alert("Please enter your name");
      if (!formData.age) return alert("Please enter your age");
    }
    if (step === 2) {
      if (!formData.income) return alert("Please enter your annual income");
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!aadhaarVerified) {
      alert("Please complete the Aadhaar e-KYC Verification step to proceed.");
      return;
    }
    
    // Parse numeric fields for consistency and safety
    const preparedProfile = {
      ...formData,
      name: formData.name.trim() || "Citizen",
      age: Number(formData.age) || 0,
      income: Number(formData.income) || 0,
      aadhaarVerified: true,
      aadhaarLastFour: aadhaarInput.replace("XXXX-XXXX-", ""),
    };
    
    localStorage.setItem("userProfile", JSON.stringify(preparedProfile));
    router.push("/processing");
  };

  return (
    <main className="min-h-screen w-full bg-[#0a0f1d] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-950/40 via-[#0a0f1d] to-[#040815] text-slate-100 flex items-center justify-center p-4 sm:p-6 md:p-8 antialiased">
      {/* Decorative Background Glows */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse duration-4000"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse duration-6000"></div>

      <div className="w-full max-w-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-2xl rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.45)] overflow-hidden transition-all duration-300 hover:border-slate-700/80">
        
        {/* Header Block */}
        <div className="relative p-6 sm:p-8 border-b border-slate-800/60 bg-gradient-to-r from-slate-900/80 to-indigo-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-400">Public Service Platform</p>
                <h1 className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-indigo-200">
                  Civic Navigator
                </h1>
              </div>
            </div>
            {/* Step Counter Badge */}
            <div className="px-3.5 py-1.5 rounded-full bg-slate-950 text-slate-400 text-xs font-bold uppercase tracking-wider border border-slate-800">
              Step {step} of 3
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-slate-950 relative">
          <div 
            className="h-full bg-indigo-500 transition-all duration-300 ease-out" 
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>

        {/* Wizard Form Wrapper */}
        <div className="p-6 sm:p-8">
          
          {/* STEP 1: Personal Profile */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                  Personal Details
                </h2>
                <p className="text-xs text-slate-400">Enter basic identity parameters to determine baseline eligibility thresholds.</p>
              </div>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-300 uppercase tracking-wider" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-650 outline-none transition duration-200 focus:border-indigo-500 focus:bg-slate-950 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Age */}
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-300 uppercase tracking-wider" htmlFor="age">
                      Age (Years)
                    </label>
                    <input
                      id="age"
                      name="age"
                      type="number"
                      min="1"
                      max="120"
                      required
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="Enter age"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-650 outline-none transition duration-200 focus:border-indigo-500 focus:bg-slate-950 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-300 uppercase tracking-wider" htmlFor="gender">
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-slate-100 outline-none transition duration-200 focus:border-indigo-500 focus:bg-slate-950 focus:ring-2 focus:ring-indigo-500/20"
                    >
                      <option className="bg-slate-900" value="Female">Female</option>
                      <option className="bg-slate-900" value="Male">Male</option>
                      <option className="bg-slate-900" value="Transgender">Transgender</option>
                      <option className="bg-slate-900" value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Marital Status */}
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-300 uppercase tracking-wider" htmlFor="maritalStatus">
                    Marital Status
                  </label>
                  <select
                    id="maritalStatus"
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-slate-100 outline-none transition duration-200 focus:border-indigo-500 focus:bg-slate-950 focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <option className="bg-slate-900" value="Single">Single</option>
                    <option className="bg-slate-900" value="Married">Married</option>
                    <option className="bg-slate-900" value="Widowed">Widowed</option>
                    <option className="bg-slate-900" value="Divorced">Divorced / Separated</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Socio-Economic Profile */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                  Socio-Economic Factors
                </h2>
                <p className="text-xs text-slate-400">Determine regional and financial factors for state-specific subsidies.</p>
              </div>

              <div className="space-y-4">
                {/* Annual Income */}
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-300 uppercase tracking-wider" htmlFor="income">
                    Annual Household Income (₹)
                  </label>
                  <input
                    id="income"
                    name="income"
                    type="number"
                    min="0"
                    required
                    value={formData.income}
                    onChange={handleChange}
                    placeholder="e.g. 120000"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-650 outline-none transition duration-200 focus:border-indigo-500 focus:bg-slate-950 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                {/* Occupation */}
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-300 uppercase tracking-wider" htmlFor="occupation">
                    Primary Occupation
                  </label>
                  <select
                    id="occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-slate-100 outline-none transition duration-200 focus:border-indigo-500 focus:bg-slate-950 focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <option className="bg-slate-900" value="Student">Student</option>
                    <option className="bg-slate-900" value="Farmer">Farmer</option>
                    <option className="bg-slate-900" value="Business">Small Business Owner</option>
                    <option className="bg-slate-900" value="Artisan">Artisan / Craftsman</option>
                    <option className="bg-slate-900" value="Street Vendor">Street Vendor</option>
                    <option className="bg-slate-900" value="Employed">Salaried / Private Employee</option>
                    <option className="bg-slate-900" value="Unemployed">Unemployed</option>
                    <option className="bg-slate-900" value="Homemaker">Homemaker</option>
                  </select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Location Type */}
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-300 uppercase tracking-wider" htmlFor="locationType">
                      Sector Area
                    </label>
                    <select
                      id="locationType"
                      name="locationType"
                      value={formData.locationType}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-slate-100 outline-none transition duration-200 focus:border-indigo-500 focus:bg-slate-950 focus:ring-2 focus:ring-indigo-500/20"
                    >
                      <option className="bg-slate-900" value="Urban">Urban Municipality</option>
                      <option className="bg-slate-900" value="Rural">Rural Gram Panchayat</option>
                    </select>
                  </div>

                  {/* State */}
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-300 uppercase tracking-wider" htmlFor="state">
                      State of Residence
                    </label>
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-slate-100 outline-none transition duration-200 focus:border-indigo-500 focus:bg-slate-950 focus:ring-2 focus:ring-indigo-500/20"
                    >
                      <option className="bg-slate-900" value="Tamil Nadu">Tamil Nadu</option>
                      <option className="bg-slate-900" value="Kerala">Kerala</option>
                      <option className="bg-slate-900" value="Karnataka">Karnataka</option>
                      <option className="bg-slate-900" value="Andhra Pradesh">Andhra Pradesh</option>
                      <option className="bg-slate-900" value="Telangana">Telangana</option>
                      <option className="bg-slate-900" value="Maharashtra">Maharashtra</option>
                      <option className="bg-slate-900" value="Uttar Pradesh">Uttar Pradesh</option>
                      <option className="bg-slate-900" value="Other">Other State</option>
                    </select>
                  </div>
                </div>

                {/* Differently Abled Checkbox */}
                <div className="relative flex items-center gap-3 rounded-xl border border-slate-800/80 bg-slate-950/30 px-4 py-3.5 hover:bg-slate-950/50 transition">
                  <div className="flex h-5 items-center">
                    <input
                      id="differentlyAbled"
                      name="differentlyAbled"
                      type="checkbox"
                      checked={formData.differentlyAbled}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-slate-750 bg-slate-950 text-indigo-655 focus:ring-indigo-500/40 cursor-pointer"
                    />
                  </div>
                  <div className="text-xs leading-6">
                    <label htmlFor="differentlyAbled" className="font-semibold text-slate-200 cursor-pointer select-none">
                      Person with Disability (PwD) / Specially Abled status
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Social categories, Religion & Aadhaar Verification Mockup */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                  Social Profile & Aadhaar
                </h2>
                <p className="text-xs text-slate-400">Provide religion and community groups for targeted welfare scholarship matches.</p>
              </div>

              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Religion dropdown */}
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-300 uppercase tracking-wider" htmlFor="religion">
                      Religion
                    </label>
                    <select
                      id="religion"
                      name="religion"
                      value={formData.religion}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-slate-100 outline-none transition duration-200 focus:border-indigo-500 focus:bg-slate-950 focus:ring-2 focus:ring-indigo-500/20"
                    >
                      <option className="bg-slate-900" value="Hindu">Hindu</option>
                      <option className="bg-slate-900" value="Muslim">Muslim</option>
                      <option className="bg-slate-900" value="Christian">Christian</option>
                      <option className="bg-slate-900" value="Sikh">Sikh</option>
                      <option className="bg-slate-900" value="Buddhist">Buddhist</option>
                      <option className="bg-slate-900" value="Jain">Jain</option>
                    </select>
                  </div>

                  {/* Community dropdown */}
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-300 uppercase tracking-wider" htmlFor="community">
                      Community/Caste Category
                    </label>
                    <select
                      id="community"
                      name="community"
                      value={formData.community}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-slate-100 outline-none transition duration-200 focus:border-indigo-500 focus:bg-slate-950 focus:ring-2 focus:ring-indigo-500/20"
                    >
                      <option className="bg-slate-900" value="General">General</option>
                      <option className="bg-slate-900" value="BC">BC (Backward Class)</option>
                      <option className="bg-slate-900" value="MBC">MBC (Most Backward Class)</option>
                      <option className="bg-slate-900" value="SC">SC (Scheduled Caste)</option>
                      <option className="bg-slate-900" value="ST">ST (Scheduled Tribe)</option>
                      <option className="bg-slate-900" value="DNC">DNC (De-notified Community)</option>
                    </select>
                  </div>
                </div>

                {/* Aadhaar Verification Box */}
                <div className="bg-slate-950/50 border border-slate-800 p-5 rounded-2xl space-y-4">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-300 uppercase tracking-wider" htmlFor="aadhaar">
                      Aadhaar Identity Verification (e-KYC)
                    </label>
                    <p className="text-[10px] text-slate-500">Security Rule: Enter only the final 4 digits to simulate API matching.</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      id="aadhaar"
                      type="text"
                      value={aadhaarInput}
                      onChange={handleAadhaarChange}
                      disabled={aadhaarVerified}
                      placeholder="XXXX-XXXX-1234"
                      className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 font-mono tracking-widest outline-none disabled:opacity-50 disabled:bg-slate-900"
                    />

                    {/* Verification Action Button */}
                    <button
                      type="button"
                      onClick={simulateOtpVerification}
                      disabled={aadhaarVerified || isVerifying}
                      className={`px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white transition flex items-center justify-center shrink-0 cursor-pointer ${
                        aadhaarVerified 
                          ? "bg-emerald-600 pointer-events-none" 
                          : "bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/10"
                      }`}
                    >
                      {isVerifying ? (
                        <span className="flex items-center gap-2">
                          <span className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          OTP Sent...
                        </span>
                      ) : aadhaarVerified ? (
                        "Verified ✓"
                      ) : (
                        "Verify via OTP"
                      )}
                    </button>
                  </div>

                  {verificationError && (
                    <p className="text-red-400 text-xs font-medium">{verificationError}</p>
                  )}

                  {aadhaarVerified && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 flex items-center gap-2">
                      <span className="font-bold">✓</span>
                      Aadhaar e-KYC validation token generated. Citizen details verified.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Action Footer */}
          <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-800/60">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-5 py-3 rounded-xl border border-slate-800 bg-slate-900/30 hover:bg-slate-800 text-xs font-bold uppercase tracking-wider text-slate-300 transition cursor-pointer"
              >
                Back
              </button>
            ) : (
              <div></div> // Spacer
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 hover:scale-[1.01] active:scale-[0.99] text-xs font-bold uppercase tracking-wider text-white transition-all shadow-[0_5px_15px_rgba(79,70,229,0.2)] cursor-pointer"
              >
                Next Step
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!aadhaarVerified}
                className={`px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white transition-all shadow-md flex items-center gap-2 cursor-pointer ${
                  aadhaarVerified 
                    ? "bg-emerald-600 hover:bg-emerald-500 hover:scale-[1.01] active:scale-[0.99] shadow-emerald-600/10" 
                    : "bg-slate-800 opacity-50 cursor-not-allowed pointer-events-none"
                }`}
              >
                Analyze Welfare Benefits
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            )}
          </div>

        </div>

      </div>
    </main>
  );
}
