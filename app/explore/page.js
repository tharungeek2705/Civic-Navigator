"use client";

import { useState } from "react";
import Link from "next/link";

export default function ExploreSchemesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBeneficiary, setSelectedBeneficiary] = useState("All");

  // Mock list of 6 rich scheme cards (Central & State)
  const allSchemes = [
    {
      title: "PM Kisan Samman Nidhi",
      department: "Ministry of Agriculture, India",
      benefit: "₹6,000 / year",
      state: "Central Govt",
      category: "Agriculture",
      beneficiary: "Farmers",
      description: "Direct income support of ₹6,000 per year in three equal installments to all landholding farmer families.",
      link: "https://pmkisan.gov.in",
    },
    {
      title: "Pudhumai Penn Scheme",
      department: "Dept. of Social Welfare, Tamil Nadu",
      benefit: "₹1,000 / month",
      state: "Tamil Nadu",
      category: "Education",
      beneficiary: "Students",
      description: "Financial assistance of ₹1,000/month for girl students who studied in government schools to pursue higher education.",
      link: "https://www.pudhumaippenn.tn.gov.in",
    },
    {
      title: "Ayushman Bharat PM-JAY",
      department: "National Health Authority, India",
      benefit: "₹5 Lakhs / year coverage",
      state: "Central Govt",
      category: "Healthcare",
      beneficiary: "Senior Citizens",
      description: "World's largest health insurance scheme providing cashless secondary and tertiary care hospitalization coverage.",
      link: "https://pmjay.gov.in",
    },
    {
      title: "Pradhan Mantri Awas Yojana (Urban)",
      department: "Ministry of Housing, India",
      benefit: "Interest subsidy up to ₹2.67 Lakhs",
      state: "Central Govt",
      category: "Housing",
      beneficiary: "General",
      description: "Provides affordable housing for the urban poor with interest subsidies on home loans.",
      link: "https://pmay-urban.gov.in",
    },
    {
      title: "Naan Mudhalvan Skill Initiative",
      department: "Tamil Nadu Skill Development Corp.",
      benefit: "Free certifications + Placement",
      state: "Tamil Nadu",
      category: "Education",
      beneficiary: "Students",
      description: "Empowers college students with industry-relevant skill certifications and employment opportunities.",
      link: "https://www.naanmudhalvan.tn.gov.in",
    },
    {
      title: "CM Comprehensive Health Insurance (TN)",
      department: "Dept. of Health, Tamil Nadu",
      benefit: "₹5 Lakhs / year cashless cover",
      state: "Tamil Nadu",
      category: "Healthcare",
      beneficiary: "General",
      description: "State-sponsored cashless hospitalization scheme for low-income families across Tamil Nadu.",
      link: "https://www.cmchistn.com",
    },
  ];

  // Client-side filtering logic for the mock interaction
  const filteredSchemes = allSchemes.filter((scheme) => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = selectedState === "All" || scheme.state === selectedState;
    const matchesCategory = selectedCategory === "All" || scheme.category === selectedCategory;
    const matchesBeneficiary = selectedBeneficiary === "All" || scheme.beneficiary === selectedBeneficiary;
    return matchesSearch && matchesState && matchesCategory && matchesBeneficiary;
  });

  const selectChevronStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236366f1'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
    backgroundPosition: 'right 1rem center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '1.1rem',
    appearance: 'none'
  };

  return (
    <main className="min-h-screen bg-[#070c1b] pb-20 text-slate-100 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 right-1/4 w-[40%] h-[40%] rounded-full bg-indigo-950/20 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[30%] h-[30%] rounded-full bg-emerald-950/10 blur-[120px] pointer-events-none" />

      {/* Massive Search Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 text-center space-y-6 relative z-10">
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
          Global Scheme <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-100 to-emerald-400">Directory</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto font-medium">
          Instantly browse and search the entire directory of federal and state welfare provisions.
        </p>

        {/* Glowing Search Bar */}
        <div className="max-w-2xl mx-auto relative group">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 to-emerald-500 opacity-20 blur-lg group-hover:opacity-40 transition duration-1000" />
          <div className="relative flex items-center">
            <span className="absolute left-5 text-indigo-400 text-lg">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 7,400+ Government Schemes, Subsidies, and Scholarships..."
              className="w-full rounded-2xl border border-slate-800 bg-slate-900/60 pl-14 pr-6 py-4.5 text-sm text-slate-50 placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 outline-none backdrop-blur-md transition-all shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* Grid Layout Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Filter Sidebar (Left 3 Columns) */}
          <div className="lg:col-span-3 rounded-3xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-md p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Filters</h2>
              <button 
                onClick={() => { setSelectedState("All"); setSelectedCategory("All"); setSelectedBeneficiary("All"); }}
                className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-widest transition cursor-pointer"
              >
                Reset All
              </button>
            </div>

            {/* State Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">State Domicile</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                style={selectChevronStyle}
                className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-xs text-slate-200 outline-none focus:border-indigo-500/80 transition-all cursor-pointer"
              >
                <option value="All" className="bg-[#0f172a]">All Authorities</option>
                <option value="Central Govt" className="bg-[#0f172a]">Central / Federal Govt</option>
                <option value="Tamil Nadu" className="bg-[#0f172a]">Tamil Nadu</option>
                <option value="Kerala" className="bg-[#0f172a]">Kerala</option>
                <option value="Karnataka" className="bg-[#0f172a]">Karnataka</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sector Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={selectChevronStyle}
                className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-xs text-slate-200 outline-none focus:border-indigo-500/80 transition-all cursor-pointer"
              >
                <option value="All" className="bg-[#0f172a]">All Sectors</option>
                <option value="Education" className="bg-[#0f172a]">Education & Skill</option>
                <option value="Agriculture" className="bg-[#0f172a]">Agriculture & Farming</option>
                <option value="Healthcare" className="bg-[#0f172a]">Healthcare & Medical</option>
                <option value="Housing" className="bg-[#0f172a]">Housing & Infrastructure</option>
              </select>
            </div>

            {/* Beneficiary Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Beneficiary Type</label>
              <select
                value={selectedBeneficiary}
                onChange={(e) => setSelectedBeneficiary(e.target.value)}
                style={selectChevronStyle}
                className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-xs text-slate-200 outline-none focus:border-indigo-500/80 transition-all cursor-pointer"
              >
                <option value="All" className="bg-[#0f172a]">All Demographics</option>
                <option value="Students" className="bg-[#0f172a]">Students</option>
                <option value="Farmers" className="bg-[#0f172a]">Farmers</option>
                <option value="Senior Citizens" className="bg-[#0f172a]">Senior Citizens</option>
                <option value="General" className="bg-[#0f172a]">General Public</option>
              </select>
            </div>
          </div>

          {/* Scheme Results Grid (Right 9 Columns) */}
          <div className="lg:col-span-9 space-y-8">
            
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                Showing {filteredSchemes.length} Results
              </h3>
            </div>

            {filteredSchemes.length === 0 ? (
              <div className="rounded-3xl border border-slate-800 bg-slate-900/20 p-12 text-center text-slate-400 shadow-xl">
                No matching schemes found in this preview database. Try altering your filters or search query.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSchemes.map((scheme, i) => (
                  <div key={i} className="flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-900/30 p-6 space-y-5 hover:border-slate-700 transition relative overflow-hidden group">
                    <span className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-indigo-500/50 to-emerald-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 truncate max-w-[70%]">
                          {scheme.department}
                        </span>
                        <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-[9px] font-bold text-indigo-400">
                          {scheme.state}
                        </span>
                      </div>

                      {/* Title & Benefit */}
                      <div>
                        <h3 className="text-base font-extrabold text-white leading-snug group-hover:text-indigo-400 transition-colors">
                          {scheme.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-3">
                          {scheme.description}
                        </p>
                      </div>

                      {/* Benefit and tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        <span className="rounded-md bg-slate-800/80 px-2.5 py-1 text-[10px] font-bold text-emerald-400">
                          Benefit: {scheme.benefit}
                        </span>
                        <span className="rounded-md bg-slate-800/40 px-2 py-1 text-[10px] font-medium text-slate-400">
                          # {scheme.category}
                        </span>
                      </div>
                    </div>

                    {/* Action button */}
                    <a
                      href={scheme.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-700/60 py-3 text-xs font-black uppercase tracking-widest text-slate-300 hover:text-white transition-all shadow-md text-center"
                    >
                      Explore Details ↗
                    </a>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Component (Scale Illusion) */}
            <div className="flex items-center justify-between border-t border-slate-800/80 pt-6">
              <span className="text-xs text-slate-500 font-bold tracking-wide uppercase">
                Page 1 of 620
              </span>
              
              <div className="flex gap-2">
                <button
                  disabled
                  className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/20 text-slate-600 cursor-not-allowed text-xs transition"
                >
                  ← Previous
                </button>
                <button
                  onClick={() => alert("This is a hackathon mockup database preview. In production, this loads page 2 via API pagination.")}
                  className="p-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-300 text-xs transition cursor-pointer"
                >
                  Next →
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}
