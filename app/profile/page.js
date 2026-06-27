"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const profileFields = [
  { key: "name", label: "Full Name", type: "text" },
  { key: "age", label: "Age (Years)", type: "number" },
  { key: "gender", label: "Gender", type: "select", options: ["Female", "Male", "Transgender", "Other"] },
  { key: "state", label: "State of Residence", type: "select", options: ["Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh", "Telangana", "Maharashtra", "Uttar Pradesh", "Other"] },
  { key: "income", label: "Annual Income (₹)", type: "number" },
  { key: "occupation", label: "Occupation", type: "select", options: ["Student", "Farmer", "Business", "Artisan", "Street Vendor", "Employed", "Unemployed", "Homemaker"] },
  { key: "maritalStatus", label: "Marital Status", type: "select", options: ["Single", "Married", "Widowed", "Divorced"] },
  { key: "locationType", label: "Sector Area", type: "select", options: ["Urban", "Rural"] },
  { key: "religion", label: "Religion", type: "select", options: ["Hindu", "Muslim", "Christian", "Sikh", "Buddhist", "Jain"] },
  { key: "community", label: "Community/Caste", type: "select", options: ["General", "BC", "MBC", "SC", "ST", "DNC"] },
];

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("userProfile");
      if (stored) {
        const parsed = JSON.parse(stored);
        setProfile(parsed);
        setEditData(parsed);
      }
    } catch (e) {
      console.error("Failed to load profile from localStorage", e);
    }
  }, []);

  const handleChange = (key, value) => {
    setEditData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    const updated = {
      ...editData,
      age: Number(editData.age) || 0,
      income: Number(editData.income) || 0,
    };
    localStorage.setItem("userProfile", JSON.stringify(updated));
    setProfile(updated);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancel = () => {
    setEditData(profile);
    setEditing(false);
  };

  if (!profile) {
    return (
      <main className="min-h-screen w-full bg-[#0a0f1d] text-slate-100 flex items-center justify-center p-4 antialiased">
        <div className="text-center space-y-6 max-w-md">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800">
              <svg className="h-8 w-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-extrabold">No Profile Found</h2>
          <p className="text-sm text-slate-400">Complete the onboarding form first to create your citizen profile.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold uppercase tracking-wider text-white transition shadow-lg shadow-indigo-600/20"
          >
            Go to Onboarding
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-[#0a0f1d] text-slate-100 p-4 sm:p-6 md:p-8 antialiased">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/40 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-md">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 shadow-[0_0_20px_rgba(79,70,229,0.3)]">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <div>
              <div className="flex items-center gap-2 text-indigo-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                <span className="text-xs font-bold uppercase tracking-wider">Citizen Profile</span>
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight">User Settings</h1>
              <p className="text-slate-400 text-xs mt-0.5">
                Manage and update your demographic parameters for welfare eligibility.
              </p>
            </div>
          </div>
          <Link
            href="/dashboard"
            className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-300 hover:bg-slate-800 transition shadow-md cursor-pointer"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Save Confirmation Banner */}
        {saved && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 animate-fadeIn">
            <span className="text-emerald-400 font-bold text-sm">✓</span>
            <p className="text-emerald-300 text-xs font-semibold">Profile updated successfully! Your eligibility matches will refresh on the next dashboard visit.</p>
          </div>
        )}

        {/* Aadhaar Verification Badge */}
        {profile.aadhaarVerified && (
          <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/10 flex items-center gap-3">
            <span className="text-indigo-400 font-bold text-sm">✅</span>
            <p className="text-slate-300 text-xs leading-relaxed">
              <span className="font-semibold text-white">Aadhaar e-KYC Verified</span> — Last 4 digits: <span className="font-mono text-indigo-300">{profile.aadhaarLastFour || "****"}</span>. Identity token is cryptographically secured.
            </p>
          </div>
        )}

        {/* Profile Data Grid */}
        <div className="bg-slate-900/30 border border-slate-800 rounded-3xl overflow-hidden">
          <div className="p-5 border-b border-slate-800/60 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
              Demographic Parameters
            </h2>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold uppercase tracking-wider text-white transition shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
            )}
          </div>

          <div className="grid gap-px bg-slate-800/40 sm:grid-cols-2">
            {profileFields.map((field) => {
              const value = editing ? editData[field.key] : profile[field.key];
              return (
                <div key={field.key} className="bg-slate-900/60 p-5 space-y-2">
                  <label
                    htmlFor={`profile-${field.key}`}
                    className="block text-[10px] font-bold uppercase tracking-wider text-slate-500"
                  >
                    {field.label}
                  </label>

                  {editing ? (
                    field.type === "select" ? (
                      <select
                        id={`profile-${field.key}`}
                        value={value ?? ""}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-2.5 text-sm text-slate-100 outline-none transition duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                      >
                        {field.options.map((opt) => (
                          <option key={opt} className="bg-slate-900" value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        id={`profile-${field.key}`}
                        type={field.type}
                        value={value ?? ""}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-2.5 text-sm text-slate-100 outline-none transition duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                      />
                    )
                  ) : (
                    <p className="text-sm font-semibold text-white">
                      {field.key === "income" ? `₹${Number(value || 0).toLocaleString("en-IN")}` : (value || "—")}
                    </p>
                  )}
                </div>
              );
            })}

            {/* Differently Abled Status */}
            <div className="bg-slate-900/60 p-5 space-y-2">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Person with Disability (PwD)
              </span>
              {editing ? (
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editData.differentlyAbled || false}
                    onChange={(e) => handleChange("differentlyAbled", e.target.checked)}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500/40"
                  />
                  <span className="text-sm text-slate-300">Yes, PwD status</span>
                </label>
              ) : (
                <p className="text-sm font-semibold text-white">
                  {profile.differentlyAbled ? "Yes ✓" : "No"}
                </p>
              )}
            </div>
          </div>

          {/* Edit Actions Footer */}
          {editing && (
            <div className="p-5 border-t border-slate-800/60 flex items-center justify-end gap-3 bg-slate-900/40">
              <button
                onClick={handleCancel}
                className="px-5 py-2.5 rounded-xl border border-slate-800 bg-slate-900/30 hover:bg-slate-800 text-xs font-bold uppercase tracking-wider text-slate-300 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 hover:scale-[1.01] active:scale-[0.99] text-xs font-bold uppercase tracking-wider text-white transition-all shadow-[0_5px_15px_rgba(16,185,129,0.2)] cursor-pointer flex items-center gap-2"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Data Management Info */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
            Data Management Notice
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            All profile data is stored exclusively in your browser&apos;s <span className="font-mono text-slate-300">localStorage</span>. No data is transmitted to external servers. Clearing your browser data will reset your profile. This is a hackathon prototype demonstrating client-side data sovereignty.
          </p>
        </div>

      </div>
    </main>
  );
}
