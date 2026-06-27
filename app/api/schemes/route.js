import { NextResponse } from "next/server";

// ── 30-scheme master database ──────────────────────────────────────────────
const SCHEMES_DB = [
  {
    id: 1, title: "Pudhumai Penn Scheme",
    department: "Dept. of Social Welfare, Tamil Nadu",
    benefit: "₹1,000 / month",
    gender: "Female", occupation: "Student", state: "Tamil Nadu",
    minAge: 15, maxAge: 25, incomeLimit: 250000,
    officialLink: "https://www.pudhumaippenn.tn.gov.in",
    requiredDocs: ["College Fee Receipt", "10th/12th Marksheet", "Income Certificate"],
  },
  {
    id: 2, title: "Tamil Puthalvan Scheme",
    department: "Dept. of Social Welfare, Tamil Nadu",
    benefit: "₹1,000 / month",
    gender: "Male", occupation: "Student", state: "Tamil Nadu",
    minAge: 15, maxAge: 25, incomeLimit: 250000,
    officialLink: "https://www.tamilputhalvan.tn.gov.in",
    requiredDocs: ["College Fee Receipt", "10th/12th Marksheet", "Income Certificate"],
  },
  {
    id: 3, title: "PM Kisan Samman Nidhi",
    department: "Ministry of Agriculture, India",
    benefit: "₹6,000 / year",
    gender: null, occupation: "Farmer", state: null,
    minAge: 18, maxAge: 100, incomeLimit: 300000, locationType: "Rural",
    officialLink: "https://pmkisan.gov.in",
    requiredDocs: ["Land Patta Records", "Aadhaar Card", "Bank Passbook"],
  },
  {
    id: 4, title: "Destitute Widow Pension Scheme",
    department: "Revenue Department, Tamil Nadu",
    benefit: "₹1,200 / month",
    gender: "Female", occupation: null, state: "Tamil Nadu",
    minAge: 18, maxAge: 100, incomeLimit: 100000, maritalStatus: "Widowed",
    officialLink: "https://tnesevai.tn.gov.in",
    requiredDocs: ["Death Certificate of Husband", "Widow Certificate", "Income Certificate"],
  },
  {
    id: 5, title: "PM Mudra Yojana (Shishu/Kishore/Tarun)",
    department: "Ministry of Finance, India",
    benefit: "Collateral-free loan up to ₹10 Lakhs",
    gender: null, occupation: "Business", state: null,
    minAge: 18, maxAge: 65, incomeLimit: null,
    officialLink: "https://www.mudra.org.in",
    requiredDocs: ["Business Plan", "Identity Proof", "Enterprise Address Proof"],
  },
  {
    id: 6, title: "Pradhan Mantri Awas Yojana (Urban)",
    department: "Ministry of Housing, India",
    benefit: "Interest subsidy up to ₹2.67 Lakhs",
    gender: null, occupation: null, state: null,
    minAge: 18, maxAge: 100, incomeLimit: 300000, locationType: "Urban",
    officialLink: "https://pmay-urban.gov.in",
    requiredDocs: ["Affidavit of No Home Ownership", "Aadhaar Card", "Income Certificate"],
  },
  {
    id: 7, title: "PM Awas Yojana (Gramin)",
    department: "Ministry of Rural Development, India",
    benefit: "₹1.2 Lakh for house construction",
    gender: null, occupation: null, state: null,
    minAge: 18, maxAge: 100, incomeLimit: 150000, locationType: "Rural",
    officialLink: "https://pmayg.nic.in",
    requiredDocs: ["BPL Card", "Ration Card", "Aadhaar Card"],
  },
  {
    id: 8, title: "TNSDC Naan Mudhalvan",
    department: "Tamil Nadu Skill Development Corp.",
    benefit: "Free professional certifications + job placement",
    gender: null, occupation: "Student", state: "Tamil Nadu",
    minAge: 17, maxAge: 30, incomeLimit: null,
    officialLink: "https://www.naanmudhalvan.tn.gov.in",
    requiredDocs: ["College ID", "Aadhaar Card", "Semester Marksheet"],
  },
  {
    id: 9, title: "Indira Gandhi National Widow Pension",
    department: "Ministry of Rural Development, India",
    benefit: "₹300–₹500 / month",
    gender: "Female", occupation: null, state: null,
    minAge: 40, maxAge: 79, incomeLimit: 100000, maritalStatus: "Widowed",
    officialLink: "https://nsap.nic.in",
    requiredDocs: ["Husband's Death Certificate", "BPL Certificate", "Aadhaar Card"],
  },
  {
    id: 10, title: "Ayushman Bharat PM-JAY",
    department: "National Health Authority, India",
    benefit: "₹5 Lakhs / year cashless health cover",
    gender: null, occupation: null, state: null,
    minAge: 0, maxAge: 120, incomeLimit: 120000,
    officialLink: "https://pmjay.gov.in",
    requiredDocs: ["PM-JAY Golden Card", "Ration Card", "Aadhaar Card"],
  },
  {
    id: 11, title: "CM Comprehensive Health Insurance (TN)",
    department: "Dept. of Health, Tamil Nadu",
    benefit: "₹5 Lakhs / year cashless hospitalisation",
    gender: null, occupation: null, state: "Tamil Nadu",
    minAge: 0, maxAge: 120, incomeLimit: 120000,
    officialLink: "https://www.cmchistn.com",
    requiredDocs: ["Income Certificate <₹1.2L", "Smart Ration Card", "Aadhaar Card"],
  },
  {
    id: 12, title: "PM Vishwakarma Yojana",
    department: "Ministry of MSME, India",
    benefit: "₹15,000 toolkit + 5% business loans",
    gender: null, occupation: "Artisan", state: null,
    minAge: 18, maxAge: 80, incomeLimit: null,
    officialLink: "https://pmvishwakarma.gov.in",
    requiredDocs: ["Artisan Certificate", "Aadhaar Card", "Bank Details"],
  },
  {
    id: 13, title: "Stand-Up India",
    department: "Ministry of Finance, India",
    benefit: "Loans up to ₹1 Crore for SC/ST/Women entrepreneurs",
    gender: "Female", occupation: "Business", state: null,
    minAge: 18, maxAge: 70, incomeLimit: null,
    targetCommunity: ["SC", "ST"],
    officialLink: "https://www.standupmitra.in",
    requiredDocs: ["Caste Certificate", "Company Registration", "Project Estimate"],
  },
  {
    id: 14, title: "PM Matru Vandana Yojana",
    department: "Ministry of Women & Child Development",
    benefit: "₹5,000 pregnancy support",
    gender: "Female", occupation: null, state: null,
    minAge: 19, maxAge: 45, incomeLimit: 800000, maritalStatus: "Married",
    officialLink: "https://wcd.nic.in",
    requiredDocs: ["MCP Card", "Aadhaar", "Bank Passbook"],
  },
  {
    id: 15, title: "Dr. Muthulakshmi Maternity Benefit (TN)",
    department: "Dept. of Health, Tamil Nadu",
    benefit: "₹18,000 cash to pregnant mothers",
    gender: "Female", occupation: null, state: "Tamil Nadu",
    minAge: 19, maxAge: 45, incomeLimit: 200000,
    officialLink: "https://picme.tn.gov.in",
    requiredDocs: ["Pregnancy Registration", "ANC Cards", "Aadhaar"],
  },
  {
    id: 16, title: "UYEGP Scheme (TN)",
    department: "Dept. of Industries & Commerce, TN",
    benefit: "25% subsidy up to ₹1.25 Lakhs for new enterprise",
    gender: null, occupation: "Unemployed", state: "Tamil Nadu",
    minAge: 18, maxAge: 35, incomeLimit: 150000,
    officialLink: "https://www.msmeonline.tn.gov.in",
    requiredDocs: ["Project Quotations", "TC/Marksheet", "Income Certificate"],
  },
  {
    id: 17, title: "PM Kaushal Vikas Yojana 4.0",
    department: "Ministry of Skill Development, India",
    benefit: "Free vocational training + certification",
    gender: null, occupation: "Unemployed", state: null,
    minAge: 15, maxAge: 45, incomeLimit: null,
    officialLink: "https://www.pmkvyofficial.org",
    requiredDocs: ["Educational Certificates", "Aadhaar", "Bank Account"],
  },
  {
    id: 18, title: "PM SVANidhi",
    department: "Ministry of Housing and Urban Affairs",
    benefit: "₹10,000 working capital micro-loan",
    gender: null, occupation: "Street Vendor", state: null,
    minAge: 18, maxAge: 100, incomeLimit: null, locationType: "Urban",
    officialLink: "https://pmsvanidhi.mohua.gov.in",
    requiredDocs: ["Vending Certificate", "Vendor ID", "Aadhaar"],
  },
  {
    id: 19, title: "Dr. Ambedkar Post-Matric Scholarship",
    department: "Ministry of Social Justice, India",
    benefit: "100% tuition + maintenance allowance",
    gender: null, occupation: "Student", state: null,
    minAge: 16, maxAge: 30, incomeLimit: 250000,
    targetCommunity: ["SC", "ST", "BC", "MBC", "DNC"],
    officialLink: "https://scholarships.gov.in",
    requiredDocs: ["College Invoice", "Caste Certificate", "Income Certificate"],
  },
  {
    id: 20, title: "TAHDCO Subsidy Loans",
    department: "Tamil Nadu Adi Dravidar Housing & Dev Corp",
    benefit: "30% capital subsidy for entrepreneurship",
    gender: null, occupation: null, state: "Tamil Nadu",
    minAge: 18, maxAge: 65, incomeLimit: 250000,
    targetCommunity: ["SC", "ST"],
    officialLink: "https://tahdco.tn.gov.in",
    requiredDocs: ["SC/ST Certificate", "Project Cost Plan", "Income Certificate"],
  },
  {
    id: 21, title: "Pre-Matric Scholarship for Minorities",
    department: "Ministry of Minority Affairs, India",
    benefit: "Full school fee waiver + monthly stipend",
    gender: null, occupation: "Student", state: null,
    minAge: 6, maxAge: 16, incomeLimit: 100000,
    targetReligion: ["Muslim", "Christian", "Sikh", "Buddhist", "Jain"],
    officialLink: "https://scholarships.gov.in",
    requiredDocs: ["Minority Declaration", "Previous Marksheet", "Income Certificate"],
  },
  {
    id: 22, title: "MGNREGA Employment Guarantee",
    department: "Ministry of Rural Development, India",
    benefit: "100 days guaranteed wage employment",
    gender: null, occupation: null, state: null,
    minAge: 18, maxAge: 100, incomeLimit: null, locationType: "Rural",
    officialLink: "https://nrega.nic.in",
    requiredDocs: ["Job Card Application", "Aadhaar", "Local Residence Verification"],
  },
  {
    id: 23, title: "Mahila Samman Savings Certificate",
    department: "Ministry of Finance, India",
    benefit: "7.5% tax-free deposit interest for women",
    gender: "Female", occupation: null, state: null,
    minAge: 18, maxAge: 100, incomeLimit: null,
    officialLink: "https://www.indiapost.gov.in",
    requiredDocs: ["Savings Application Form", "Aadhaar", "PAN Card"],
  },
  {
    id: 24, title: "Indira Gandhi National Disability Pension",
    department: "Ministry of Rural Development, India",
    benefit: "Monthly pension for disabled BPL citizens",
    gender: null, occupation: null, state: null,
    minAge: 18, maxAge: 100, incomeLimit: 100000, differentlyAbled: true,
    officialLink: "https://nsap.nic.in",
    requiredDocs: ["Disability Certificate 40%+", "Income/BPL Proof", "Aadhaar"],
  },
  {
    id: 25, title: "PM Shram Yogi Maan-dhan",
    department: "Ministry of Labour & Employment, India",
    benefit: "₹3,000 / month pension after age 60",
    gender: null, occupation: "Employed", state: null,
    minAge: 18, maxAge: 40, incomeLimit: 180000,
    officialLink: "https://maandhan.in",
    requiredDocs: ["Unorganised Worker Declaration", "Aadhaar", "Bank Details"],
  },
  {
    id: 26, title: "DDU-GKY Rural Skill Training",
    department: "Ministry of Rural Development, India",
    benefit: "Free skill courses + placement guarantee",
    gender: null, occupation: "Unemployed", state: null,
    minAge: 15, maxAge: 35, incomeLimit: null, locationType: "Rural",
    officialLink: "http://ddugky.gov.in",
    requiredDocs: ["BPL Card", "Rural Address Proof", "Aadhaar"],
  },
  {
    id: 27, title: "Sukanya Samriddhi Yojana",
    department: "Ministry of Finance, India",
    benefit: "8.2% p.a. tax-free savings for girl child",
    gender: "Female", occupation: null, state: null,
    minAge: 1, maxAge: 10, incomeLimit: null,
    officialLink: "https://www.indiapost.gov.in",
    requiredDocs: ["Girl Child Birth Certificate", "Parent Aadhaar", "Address Proof"],
  },
  {
    id: 28, title: "Indira Gandhi Old Age Pension",
    department: "Ministry of Rural Development, India",
    benefit: "Monthly social security pension",
    gender: null, occupation: null, state: null,
    minAge: 60, maxAge: 120, incomeLimit: 100000,
    officialLink: "https://nsap.nic.in",
    requiredDocs: ["Age Certificate", "BPL Certificate", "Aadhaar"],
  },
  {
    id: 29, title: "NEEDS Scheme (TN Graduates)",
    department: "Dept. of Industries & Commerce, TN",
    benefit: "25% state subsidy up to ₹75 Lakhs for graduates",
    gender: null, occupation: "Unemployed", state: "Tamil Nadu",
    minAge: 21, maxAge: 45, incomeLimit: null,
    officialLink: "https://www.msmeonline.tn.gov.in",
    requiredDocs: ["Degree Certificate", "Detailed Project Report", "Partnership Deed"],
  },
  {
    id: 30, title: "CM Girl Child Protection Scheme (TN)",
    department: "Dept. of Social Welfare, Tamil Nadu",
    benefit: "₹50,000 fixed deposit for girl child",
    gender: "Female", occupation: null, state: "Tamil Nadu",
    minAge: 0, maxAge: 3, incomeLimit: 72000,
    officialLink: "https://tnesevai.tn.gov.in",
    requiredDocs: ["Birth Certificate", "Sterilisation Certificate", "Income Proof"],
  },
];

// ── Scoring helpers ────────────────────────────────────────────────────────
function clamp(n) { return Math.max(0, Math.min(100, Math.round(n))); }

function score(scheme, u) {
  let pct = 100;
  const matched = [];
  const missing = [];

  // Gender
  if (scheme.gender) {
    if (u.gender === scheme.gender) matched.push(`Gender requirement met (${scheme.gender})`);
    else { pct -= 40; missing.push(`Gender target mismatch — requires ${scheme.gender}`); }
  }

  // Age
  if (scheme.minAge != null && u.age < scheme.minAge) {
    pct -= 30;
    missing.push(`Below minimum age (requires ≥ ${scheme.minAge} yrs)`);
  } else if (scheme.maxAge != null && u.age > scheme.maxAge) {
    pct -= 30;
    missing.push(`Exceeds maximum age (limit: ${scheme.maxAge} yrs)`);
  } else if (scheme.minAge != null || scheme.maxAge != null) {
    matched.push(`Age eligibility verified (${u.age} yrs)`);
  }

  // State
  if (scheme.state) {
    if (u.state === scheme.state) matched.push(`State residency verified (${scheme.state})`);
    else { pct -= 40; missing.push(`Domicile state mismatch — requires ${scheme.state}`); }
  }

  // Income
  if (scheme.incomeLimit != null) {
    if (u.income > scheme.incomeLimit) {
      pct -= 35;
      missing.push(`Income exceeds ceiling (₹${scheme.incomeLimit.toLocaleString("en-IN")})`);
    } else {
      matched.push(`Income under ceiling (< ₹${scheme.incomeLimit.toLocaleString("en-IN")})`);
    }
  }

  // Location
  if (scheme.locationType) {
    if (u.locationType === scheme.locationType) matched.push(`Geographical eligibility met (${scheme.locationType})`);
    else { pct -= 25; missing.push(`Requires ${scheme.locationType} sector residence`); }
  }

  // Occupation
  if (scheme.occupation) {
    if (u.occupation === scheme.occupation) matched.push(`Occupation matched: ${scheme.occupation}`);
    else { pct -= 35; missing.push(`Requires occupation: ${scheme.occupation}`); }
  }

  // Marital status
  if (scheme.maritalStatus) {
    if (u.maritalStatus === scheme.maritalStatus) matched.push(`Marital status verified (${scheme.maritalStatus})`);
    else { pct -= 45; missing.push(`Requires marital status: ${scheme.maritalStatus}`); }
  }

  // Disability
  if (scheme.differentlyAbled) {
    if (u.differentlyAbled) matched.push("Disability criteria met (PwD)");
    else { pct -= 50; missing.push("Requires official Disability Certificate (PwD ≥ 40%)"); }
  }

  // Community
  if (scheme.targetCommunity) {
    if (scheme.targetCommunity.includes(u.community)) matched.push(`Community eligibility met (${u.community})`);
    else { pct -= 40; missing.push(`Requires community: [${scheme.targetCommunity.join(", ")}]`); }
  }

  // Religion
  if (scheme.targetReligion) {
    if (scheme.targetReligion.includes(u.religion)) matched.push(`Minority religion criteria met (${u.religion})`);
    else { pct -= 50; missing.push(`Requires minority religion: [${scheme.targetReligion.join(", ")}]`); }
  }

  // Bonus boosts
  if (u.occupation === "Student" && scheme.title.toLowerCase().includes("scholarship")) pct += 8;
  if (u.occupation === "Student" && scheme.title.toLowerCase().includes("skill"))       pct += 4;
  if (u.occupation === "Farmer"  && scheme.title.toLowerCase().includes("kisan"))       pct += 8;

  const final = clamp(pct);
  return {
    id: scheme.id,
    title: scheme.title,
    department: scheme.department,
    benefit: scheme.benefit,
    officialLink: scheme.officialLink,
    matchPercentage: final,
    matchedCriteria: matched.length ? matched : ["General citizen criteria verified"],
    missingDocuments: final === 100 ? [] : missing,
    requiredDocsList: scheme.requiredDocs || ["Aadhaar Card"],
  };
}

// ── POST handler ───────────────────────────────────────────────────────────
export async function POST(request) {
  try {
    const body = await request.json();

    const user = {
      name:            body.name          || "Citizen",
      age:             Number(body.age)   || 0,
      gender:          body.gender        || "Female",
      state:           body.state         || "Tamil Nadu",
      income:          Number(body.income)|| 0,
      occupation:      body.occupation    || "Student",
      maritalStatus:   body.maritalStatus || "Single",
      locationType:    body.locationType  || "Urban",
      differentlyAbled: Boolean(body.differentlyAbled),
      religion:        body.religion      || "Hindu",
      community:       body.community     || "General",
    };

    const results = SCHEMES_DB
      .map((s) => score(s, user))
      .filter((s) => s.matchPercentage >= 40)
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
      .slice(0, 6);

    return NextResponse.json({ schemes: results });
  } catch (err) {
    return NextResponse.json(
      { error: "Scheme computation failed: " + err.message },
      { status: 400 }
    );
  }
}
