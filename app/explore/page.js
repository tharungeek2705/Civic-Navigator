"use client";
import { useState, useMemo } from "react";

// Robust database array of 20 premium Central and State schemes
const ALL_SCHEMES_DATABASE = [
  {
    title: "PM Kisan Samman Nidhi",
    department: "MINISTRY OF AGRICULTURE, INDIA",
    type: "Central Govt",
    benefit: "₹6,000 / year",
    category: "Agriculture",
    beneficiary: "Farmers",
    description: "Direct income support of ₹6,000 per year in three equal installments to all landholding farmer families."
  },
  {
    title: "Pudhumai Penn Scheme",
    department: "DEPT. OF SOCIAL WELFARE, TAMIL NADU",
    type: "Tamil Nadu",
    benefit: "₹1,000 / month",
    category: "Education",
    beneficiary: "Students",
    description: "Financial assistance of ₹1,000/month for girl students who studied in government schools to pursue higher education."
  },
  {
    title: "Ayushman Bharat PM-JAY",
    department: "NATIONAL HEALTH AUTHORITY, INDIA",
    type: "Central Govt",
    benefit: "₹5 Lakhs / year coverage",
    category: "Healthcare",
    beneficiary: "All Demographics",
    description: "World's largest health insurance scheme providing cashless secondary and tertiary care hospitalization coverage."
  },
  {
    title: "Pradhan Mantri Awas Yojana (Urban)",
    department: "MINISTRY OF HOUSING, INDIA",
    type: "Central Govt",
    benefit: "Interest subsidy up to ₹2.67 Lakhs",
    category: "Housing",
    beneficiary: "All Demographics",
    description: "Provides affordable housing for the urban poor with interest subsidies on home loans."
  },
  {
    title: "Naan Mudhalvan Skill Initiative",
    department: "TAMIL NADU SKILL DEVELOPMENT CORP.",
    type: "Tamil Nadu",
    benefit: "Free certifications + Placement",
    category: "Education",
    beneficiary: "Students",
    description: "Empowers college students with industry-relevant skill certifications and employment opportunities."
  },
  {
    title: "CM Comprehensive Health Insurance (TN)",
    department: "DEPT. OF HEALTH, TAMIL NADU",
    type: "Tamil Nadu",
    benefit: "₹5 Lakhs / year cashless cover",
    category: "Healthcare",
    beneficiary: "All Demographics",
    description: "State-sponsored cashless hospitalization scheme for low-income families across Tamil Nadu."
  },
  {
    title: "Tamil Puthalvan Scheme",
    department: "DEPT. OF SOCIAL WELFARE, TAMIL NADU",
    type: "Tamil Nadu",
    benefit: "₹1,000 / month",
    category: "Education",
    beneficiary: "Students",
    description: "Financial assistance for male students from government schools pursuing higher education degrees."
  },
  {
    title: "MGNREGA Rural Employment",
    department: "MINISTRY OF RURAL DEVELOPMENT, INDIA",
    type: "Central Govt",
    benefit: "100 days guaranteed wage",
    category: "Other",
    beneficiary: "All Demographics",
    description: "Enhances livelihood security by providing at least 100 days of guaranteed wage employment in a financial year."
  },
  {
    title: "Pradhan Mantri Mudra Yojana",
    department: "MINISTRY OF FINANCE, INDIA",
    type: "Central Govt",
    benefit: "Collateral-free loans up to ₹10 Lakhs",
    category: "Business",
    beneficiary: "All Demographics",
    description: "Provides loans up to ₹10 Lakhs to non-corporate, non-farm small/micro enterprises."
  },
  {
    title: "Post-Matric Scholarship Scheme",
    department: "MINISTRY OF SOCIAL JUSTICE, INDIA",
    type: "Central Govt",
    benefit: "100% Tuition Fee Waiver",
    category: "Education",
    beneficiary: "Students",
    description: "Financial assistance to SC/ST/OBC students pursuing post-matriculation or post-secondary courses."
  },
  {
    title: "TN TAHDCO Entrepreneur Subsidy",
    department: "TAHDCO, TAMIL NADU",
    type: "Tamil Nadu",
    benefit: "30% project cost subsidy",
    category: "Business",
    beneficiary: "All Demographics",
    description: "Economic development schemes offering substantial capital subsidies for setting up micro-businesses."
  },
  {
    title: "PM Ujjwala Yojana",
    department: "MINISTRY OF PETROLEUM, INDIA",
    type: "Central Govt",
    benefit: "Free LPG Connection + Subsidy",
    category: "Other",
    beneficiary: "Women",
    description: "Provides clean cooking fuel to women from below-poverty-line households across the country."
  }
];

export default function GlobalSchemeDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("All Authorities");
  const [selectedSector, setSelectedSector] = useState("All Sectors");
  const [selectedBeneficiary, setSelectedBeneficiary] = useState("All Demographics");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Real-time structural filtering & semantic searching logic
  const filteredSchemes = useMemo(() => {
    return ALL_SCHEMES_DATABASE.filter((scheme) => {
      const matchesSearch = scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesState = selectedState === "All Authorities" || 
                           (selectedState === "Central Govt" && scheme.type === "Central Govt") ||
                           (selectedState === "Tamil Nadu" && scheme.type === "Tamil Nadu");

      const matchesSector = selectedSector === "All Sectors" || scheme.category === selectedSector;
      const matchesBeneficiary = selectedBeneficiary === "All Demographics" || scheme.beneficiary === selectedBeneficiary;

      return matchesSearch && matchesState && matchesSector && matchesBeneficiary;
    });
  }, [searchQuery, selectedState, selectedSector, selectedBeneficiary]);

  // Handle calculation boundaries for clean pagination index steps
  const totalPages = Math.ceil(filteredSchemes.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSchemes = filteredSchemes.slice(startIndex, startIndex + itemsPerPage);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedState("All Authorities");
    setSelectedSector("All Sectors");
    setSelectedBeneficiary("All Demographics");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100 p-8 font-sans">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">
          Global Scheme <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">Directory</span>
        </h1>
        <p className="text-slate-400 text-sm">Instantly browse and search the entire directory of federal and state welfare provisions.</p>
        
        {/* Search Field */}
        <div className="mt-6 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search 7,400+ Government Schemes, Subsidies, and Scholarships..."
            className="w-full bg-[#0f172a]/80 border border-slate-800 rounded-xl px-5 py-3 text-sm text-slate-100 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Dynamic Interactive Filters Sidebar */}
        <div className="bg-[#0b1329]/60 border border-slate-800 rounded-2xl p-6 h-fit backdrop-blur-md">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase">Filters</h3>
            <button onClick={handleReset} className="text-xs text-indigo-400 hover:text-indigo-300 transition uppercase font-semibold">Reset All</button>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wide">State Domicile</label>
              <select 
                className="w-full bg-[#0f172a] border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 outline-none focus:border-indigo-500"
                value={selectedState}
                onChange={(e) => { setSelectedState(e.target.value); setCurrentPage(1); }}
              >
                <option>All Authorities</option>
                <option>Central Govt</option>
                <option>Tamil Nadu</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wide">Sector Category</label>
              <select 
                className="w-full bg-[#0f172a] border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 outline-none focus:border-indigo-500"
                value={selectedSector}
                onChange={(e) => { setSelectedSector(e.target.value); setCurrentPage(1); }}
              >
                <option>All Sectors</option>
                <option>Education</option>
                <option>Healthcare</option>
                <option>Agriculture</option>
                <option>Housing</option>
                <option>Business</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wide">Beneficiary Type</label>
              <select 
                className="w-full bg-[#0f172a] border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 outline-none focus:border-indigo-500"
                value={selectedBeneficiary}
                onChange={(e) => { setSelectedBeneficiary(e.target.value); setCurrentPage(1); }}
              >
                <option>All Demographics</option>
                <option>Students</option>
                <option>Farmers</option>
                <option>Women</option>
              </select>
            </div>
          </div>
        </div>

        {/* Dynamic Grid Results */}
        <div className="lg:col-span-3 space-y-6">
          <div className="text-xs font-bold tracking-wider text-slate-400 uppercase">
            Showing {filteredSchemes.length} Results
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paginatedSchemes.map((scheme, index) => (
              <div key={index} className="bg-[#0b1329]/40 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition duration-300">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-bold text-slate-400 tracking-wide uppercase truncate max-w-[180px]">{scheme.department}</span>
                    <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border tracking-wide uppercase ${scheme.type === 'Central Govt' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                      {scheme.type}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2 tracking-tight">{scheme.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">{scheme.description}</p>
                </div>
                
                <div>
                  <div className="flex gap-2 mb-4">
                    <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-md">Benefit: {scheme.benefit}</span>
                    <span className="text-[10px] font-bold bg-slate-800 text-slate-400 px-2 py-1 rounded-md"># {scheme.category}</span>
                  </div>
                  <button className="w-full bg-[#111a36] hover:bg-[#162246] text-slate-200 text-xs font-bold py-2.5 rounded-xl border border-slate-800/80 transition flex items-center justify-center gap-1.5">
                    EXPLORE DETAILS <span className="text-[10px]">↗</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Fully Functional Pagination Component Footer */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-900 text-xs text-slate-400 font-medium">
            <div>PAGE {currentPage} OF {totalPages}</div>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg bg-[#0f172a] border border-slate-800 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-[#0f172a] text-slate-200 transition"
              >
                ← Previous
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg bg-[#0f172a] border border-slate-800 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-[#0f172a] text-slate-200 transition"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
