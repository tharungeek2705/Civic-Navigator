import { NextResponse } from "next/server";

// Dynamic 30 schemes database with specific religion and community filters, and official redirect links
const schemesDB = [
  {
    id: 1,
    title: "Pudhumai Penn Scheme",
    department: "Department of Social Welfare, Tamil Nadu",
    benefit: "₹1,000 / month",
    targetGender: "Female",
    targetOccupation: "Student",
    targetState: "Tamil Nadu",
    minAge: 15,
    maxAge: 25,
    incomeLimit: 250000,
    locationType: null,
    category: null,
    requiresDifferentlyAbled: false,
    requiresWidowed: false,
    officialLink: "https://www.pudhumaippenn.tn.gov.in",
    requiredDocsList: ["College Fee Receipt", "10th/12th Marksheet", "Income Certificate"]
  },
  {
    id: 2,
    title: "Tamil Puthalvan Scheme",
    department: "Department of Social Welfare, Tamil Nadu",
    benefit: "₹1,000 / month",
    targetGender: "Male",
    targetOccupation: "Student",
    targetState: "Tamil Nadu",
    minAge: 15,
    maxAge: 25,
    incomeLimit: 250000,
    locationType: null,
    category: null,
    requiresDifferentlyAbled: false,
    requiresWidowed: false,
    officialLink: "https://www.tamilputhalvan.tn.gov.in",
    requiredDocsList: ["College Fee Receipt", "10th/12th Marksheet", "Income Certificate"]
  },
  {
    id: 3,
    title: "PM Kisan Samman Nidhi",
    department: "Ministry of Agriculture & Farmers Welfare, India",
    benefit: "₹6,000 / year",
    targetGender: null,
    targetOccupation: "Farmer",
    targetState: null,
    minAge: 18,
    maxAge: 100,
    incomeLimit: 300000,
    locationType: "Rural",
    category: null,
    requiresDifferentlyAbled: false,
    requiresWidowed: false,
    officialLink: "https://pmkisan.gov.in",
    requiredDocsList: ["Land Patta Records", "Aadhaar Card", "Bank Passbook Copy"]
  },
  {
    id: 4,
    title: "Destitute Widow Pension Scheme",
    department: "Revenue Department, Tamil Nadu",
    benefit: "₹1,200 / month",
    targetGender: "Female",
    targetOccupation: null,
    targetState: "Tamil Nadu",
    minAge: 18,
    maxAge: 100,
    incomeLimit: 100000,
    locationType: null,
    category: null,
    requiresDifferentlyAbled: false,
    requiresWidowed: true,
    officialLink: "https://tnesevai.tn.gov.in",
    requiredDocsList: ["Death Certificate of Husband", "Widow Certificate", "Income Certificate"]
  },
  {
    id: 5,
    title: "Pradhan Mantri Mudra Yojana",
    department: "Ministry of Finance, India",
    benefit: "Collateral-free business loans up to ₹10 Lakhs",
    targetGender: null,
    targetOccupation: "Business",
    targetState: null,
    minAge: 18,
    maxAge: 65,
    incomeLimit: null,
    locationType: null,
    category: null,
    requiresDifferentlyAbled: false,
    requiresWidowed: false,
    officialLink: "https://www.mudra.org.in",
    requiredDocsList: ["Business Proposal Plan", "Proof of Identity", "Address Proof of Enterprise"]
  },
  {
    id: 6,
    title: "Pradhan Mantri Awas Yojana (Urban)",
    department: "Ministry of Housing and Urban Affairs, India",
    benefit: "Interest subsidy of up to ₹2.67 Lakhs for housing",
    targetGender: null,
    targetOccupation: null,
    targetState: null,
    minAge: 18,
    maxAge: 100,
    incomeLimit: 300000,
    locationType: "Urban",
    category: null,
    requiresDifferentlyAbled: false,
    requiresWidowed: false,
    officialLink: "https://pmay-urban.gov.in",
    requiredDocsList: ["Affidavit of Homelessness", "Aadhaar Card", "Income Certificate"]
  },
  {
    id: 7,
    title: "Pradhan Mantri Awas Yojana (Gramin)",
    department: "Ministry of Rural Development, India",
    benefit: "₹1.2 Lakh financial assistance for house construction",
    targetGender: null,
    targetOccupation: null,
    targetState: null,
    minAge: 18,
    maxAge: 100,
    incomeLimit: 150000,
    locationType: "Rural",
    category: null,
    requiresDifferentlyAbled: false,
    requiresWidowed: false,
    officialLink: "https://pmayg.nic.in",
    requiredDocsList: ["BPL Card copy", "Ration Card", "Aadhaar Card"]
  },
  {
    id: 8,
    title: "TNSDC Naan Mudhalvan Skill Training",
    department: "Tamil Nadu Skill Development Corporation",
    benefit: "Free professional certification & job placement training",
    targetGender: null,
    targetOccupation: "Student",
    targetState: "Tamil Nadu",
    minAge: 17,
    maxAge: 30,
    incomeLimit: null,
    locationType: null,
    category: null,
    requiresDifferentlyAbled: false,
    requiresWidowed: false,
    officialLink: "https://www.naanmudhalvan.tn.gov.in",
    requiredDocsList: ["College ID Card", "Aadhaar Card", "Semester Marksheet"]
  },
  {
    id: 9,
    title: "Indira Gandhi National Widow Pension Scheme",
    department: "Ministry of Rural Development, India",
    benefit: "₹300 - ₹500 / month pension assistance",
    targetGender: "Female",
    targetOccupation: null,
    targetState: null,
    minAge: 40,
    maxAge: 79,
    incomeLimit: 100000,
    locationType: null,
    category: null,
    requiresDifferentlyAbled: false,
    requiresWidowed: true,
    officialLink: "https://nsap.nic.in",
    requiredDocsList: ["Death Certificate of Husband", "BPL Certificate", "Aadhaar Card"]
  },
  {
    id: 10,
    title: "Sukanya Samriddhi Yojana",
    department: "Ministry of Finance, India",
    benefit: "Tax-free girl child savings scheme with high interest (8.2%)",
    targetGender: "Female",
    targetOccupation: null,
    targetState: null,
    minAge: 1,
    maxAge: 10,
    incomeLimit: null,
    locationType: null,
    category: null,
    requiresDifferentlyAbled: false,
    requiresWidowed: false,
    officialLink: "https://www.indiapost.gov.in",
    requiredDocsList: ["Birth Certificate of Girl Child", "Aadhaar of Parent/Guardian", "Address Proof"]
  },
  {
    id: 11,
    title: "PM Vishwakarma Yojana",
    department: "Ministry of Micro, Small & Medium Enterprises, India",
    benefit: "₹15,000 digital toolkit incentive & 5% interest business loans",
    targetGender: null,
    targetOccupation: "Artisan",
    targetState: null,
    minAge: 18,
    maxAge: 80,
    incomeLimit: null,
    locationType: null,
    category: null,
    requiresDifferentlyAbled: false,
    requiresWidowed: false,
    officialLink: "https://pmvishwakarma.gov.in",
    requiredDocsList: ["Trade Certificate/Artisan card", "Aadhaar Card", "Bank Account Details"]
  },
  {
    id: 12,
    title: "Ayushman Bharat PM-JAY",
    department: "National Health Authority, India",
    benefit: "₹5 Lakhs / year cashless family health insurance",
    targetGender: null,
    targetOccupation: null,
    targetState: null,
    minAge: 0,
    maxAge: 120,
    incomeLimit: 120000,
    locationType: null,
    category: null,
    requiresDifferentlyAbled: false,
    requiresWidowed: false,
    officialLink: "https://pmjay.gov.in",
    requiredDocsList: ["PM-JAY Golden Card / Letter", "Ration Card (Smart Card)", "Aadhaar Card"]
  },
  {
    id: 13,
    title: "Chief Minister's Comprehensive Health Insurance",
    department: "Department of Health & Family Welfare, Tamil Nadu",
    benefit: "₹5 Lakhs / year cashless hospitalization coverage",
    targetGender: null,
    targetOccupation: null,
    targetState: "Tamil Nadu",
    minAge: 0,
    maxAge: 120,
    incomeLimit: 120000,
    locationType: null,
    category: null,
    requiresDifferentlyAbled: false,
    requiresWidowed: false,
    officialLink: "https://www.cmchistn.com",
    requiredDocsList: ["Income Certificate (< ₹1.2L)", "Ration Card (Smart Card)", "Aadhaar Card"]
  },
  {
    id: 14,
    title: "Stand-Up India Scheme",
    department: "Ministry of Finance, India",
    benefit: "Business loans up to ₹1 Crore for women or SC/ST entrepreneurs",
    targetGender: "Female",
    targetOccupation: "Business",
    targetState: null,
    minAge: 18,
    maxAge: 70,
    incomeLimit: null,
    locationType: null,
    targetCommunity: ["SC", "ST"],
    requiresDifferentlyAbled: false,
    requiresWidowed: false,
    officialLink: "https://www.standupmitra.in",
    requiredDocsList: ["Caste Certificate", "Company Registration Proof", "Project Estimate Report"]
  },
  {
    id: 15,
    title: "PM Matru Vandana Yojana",
    department: "Ministry of Women & Child Development, India",
    benefit: "₹5,000 pregnancy financial support in bank account",
    targetGender: "Female",
    targetOccupation: null,
    targetState: null,
    minAge: 19,
    maxAge: 45,
    incomeLimit: 800000,
    locationType: null,
    category: null,
    requiresDifferentlyAbled: false,
    requiresWidowed: false,
    officialLink: "https://wcd.nic.in",
    requiredDocsList: ["Mother-Child Protection Card (MCP)", "Aadhaar of Mother", "Bank Passbook Copy"]
  },
  {
    id: 16,
    title: "Dr. Muthulakshmi Reddy Maternity Benefit",
    department: "Department of Health, Tamil Nadu",
    benefit: "₹18,000 cash assistance for pregnant mothers",
    targetGender: "Female",
    targetOccupation: null,
    targetState: "Tamil Nadu",
    minAge: 19,
    maxAge: 45,
    incomeLimit: 200000,
    locationType: null,
    category: null,
    requiresDifferentlyAbled: false,
    requiresWidowed: false,
    officialLink: "https://picme.tn.gov.in",
    requiredDocsList: ["Pregnancy Registration Certificate", "ANC Checkup Cards", "Aadhaar Card"]
  },
  {
    id: 17,
    title: "Mahila Samman Savings Certificate",
    department: "Ministry of Finance, India",
    benefit: "High-yield 7.5% secure deposit interest for women",
    targetGender: "Female",
    targetOccupation: null,
    targetState: null,
    minAge: 18,
    maxAge: 100,
    incomeLimit: null,
    locationType: null,
    category: null,
    requiresDifferentlyAbled: false,
    requiresWidowed: false,
    officialLink: "https://www.indiapost.gov.in",
    requiredDocsList: ["Savings Application Form", "Aadhaar Card", "PAN Card"]
  },
  {
    id: 18,
    title: "UYEGP Scheme",
    department: "Department of Industries & Commerce, Tamil Nadu",
    benefit: "Up to 25% project capital subsidy (up to ₹1.25 Lakhs) for new business",
    targetGender: null,
    targetOccupation: "Unemployed",
    targetState: "Tamil Nadu",
    minAge: 18,
    maxAge: 35,
    incomeLimit: 150000,
    locationType: null,
    category: null,
    requiresDifferentlyAbled: false,
    requiresWidowed: false,
    officialLink: "https://www.msmeonline.tn.gov.in",
    requiredDocsList: ["Project Quotations", "Transfer Certificate (Marksheet)", "Income Certificate"]
  },
  {
    id: 19,
    title: "NEEDS Scheme",
    department: "Department of Industries & Commerce, Tamil Nadu",
    benefit: "25% state subsidy on investments up to ₹75 Lakhs for graduates",
    targetGender: null,
    targetOccupation: "Unemployed",
    targetState: "Tamil Nadu",
    minAge: 21,
    maxAge: 45,
    incomeLimit: null,
    locationType: null,
    category: null,
    requiresDifferentlyAbled: false,
    requiresWidowed: false,
    officialLink: "https://www.msmeonline.tn.gov.in",
    requiredDocsList: ["Degree Certificate", "Detailed Project Report (DPR)", "Partnership Deed/Rent Proof"]
  },
  {
    id: 20,
    title: "PM Kaushal Vikas Yojana",
    department: "Ministry of Skill Development & Entrepreneurship, India",
    benefit: "Free vocational training & skill certifications",
    targetGender: null,
    targetOccupation: "Unemployed",
    targetState: null,
    minAge: 15,
    maxAge: 45,
    incomeLimit: null,
    locationType: null,
    category: null,
    requiresDifferentlyAbled: false,
    requiresWidowed: false,
    officialLink: "https://www.pmkvyofficial.org",
    requiredDocsList: ["Educational Certificates", "Aadhaar Card", "Bank Account Copy"]
  },
  {
    id: 21,
    title: "DDU-GKY Training Scheme",
    department: "Ministry of Rural Development, India",
    benefit: "Free skill-based courses and placements for rural youth",
    targetGender: null,
    targetOccupation: "Unemployed",
    targetState: null,
    minAge: 15,
    maxAge: 35,
    incomeLimit: null,
    locationType: "Rural",
    category: null,
    requiresDifferentlyAbled: false,
    requiresWidowed: false,
    officialLink: "http://ddugky.gov.in",
    requiredDocsList: ["BPL Card copy", "Proof of Rural Address", "Aadhaar Card"]
  },
  {
    id: 22,
    title: "MGNREGA Rural Employment Guarantee",
    department: "Ministry of Rural Development, India",
    benefit: "100 days of guaranteed wage employment at local worksites",
    targetGender: null,
    targetOccupation: null,
    targetState: null,
    minAge: 18,
    maxAge: 100,
    incomeLimit: null,
    locationType: "Rural",
    category: null,
    requiresDifferentlyAbled: false,
    requiresWidowed: false,
    officialLink: "https://nrega.nic.in",
    requiredDocsList: ["MGNREGA Job Card Application", "Aadhaar Card", "Local Residence Verification"]
  },
  {
    id: 23,
    title: "Dr. Ambedkar Post-Matric Scholarship",
    department: "Ministry of Social Justice and Empowerment, India",
    benefit: "100% tuition reimbursement and maintenance allowances for student candidates",
    targetGender: null,
    targetOccupation: "Student",
    targetState: null,
    minAge: 16,
    maxAge: 30,
    incomeLimit: 250000,
    locationType: null,
    targetCommunity: ["SC", "ST", "BC", "MBC", "DNC"],
    requiresDifferentlyAbled: false,
    requiresWidowed: false,
    officialLink: "https://scholarships.gov.in",
    requiredDocsList: ["College Fee Invoice", "Caste Certificate", "Income Certificate"]
  },
  {
    id: 24,
    title: "PM Shram Yogi Maan-dhan",
    department: "Ministry of Labour & Employment, India",
    benefit: "₹3,000 monthly pension for unorganized sector workers post age 60",
    targetGender: null,
    targetOccupation: "Employed",
    targetState: null,
    minAge: 18,
    maxAge: 40,
    incomeLimit: 180000,
    locationType: null,
    category: null,
    requiresDifferentlyAbled: false,
    requiresWidowed: false,
    officialLink: "https://maandhan.in",
    requiredDocsList: ["Unorganized Worker Declaration", "Aadhaar Card", "Savings Bank details"]
  },
  {
    id: 25,
    title: "PM SVANidhi",
    department: "Ministry of Housing and Urban Affairs, India",
    benefit: "₹10,000 starting collateral-free working capital loan",
    targetGender: null,
    targetOccupation: "Street Vendor",
    targetState: null,
    minAge: 18,
    maxAge: 100,
    incomeLimit: null,
    locationType: "Urban",
    category: null,
    requiresDifferentlyAbled: false,
    requiresWidowed: false,
    officialLink: "https://pmsvanidhi.mohua.gov.in",
    requiredDocsList: ["Vending Certificate (LoR)", "Identity Card of Vendor", "Aadhaar Card"]
  },
  {
    id: 26,
    title: "Indira Gandhi National Old Age Pension Scheme",
    department: "Ministry of Rural Development, India",
    benefit: "Monthly social security pension for senior citizens",
    targetGender: null,
    targetOccupation: null,
    targetState: null,
    minAge: 60,
    maxAge: 120,
    incomeLimit: 100000,
    locationType: null,
    category: null,
    requiresDifferentlyAbled: false,
    requiresWidowed: false,
    officialLink: "https://nsap.nic.in",
    requiredDocsList: ["Age Proof Certificate", "BPL Certificate", "Aadhaar Card"]
  },
  {
    id: 27,
    title: "Indira Gandhi National Disability Pension Scheme",
    department: "Ministry of Rural Development, India",
    benefit: "Monthly pension for disabled citizens under poverty line",
    targetGender: null,
    targetOccupation: null,
    targetState: null,
    minAge: 18,
    maxAge: 100,
    incomeLimit: 100000,
    locationType: null,
    category: null,
    requiresDifferentlyAbled: true,
    requiresWidowed: false,
    officialLink: "https://nsap.nic.in",
    requiredDocsList: ["Disability Certificate (40%+)", "Income Proof / BPL Card", "Aadhaar Card"]
  },
  {
    id: 28,
    title: "CM Girl Child Protection Scheme",
    department: "Department of Social Welfare, Tamil Nadu",
    benefit: "₹50,000 fixed deposit in the name of girl child",
    targetGender: "Female",
    targetOccupation: null,
    targetState: "Tamil Nadu",
    minAge: 0,
    maxAge: 3,
    incomeLimit: 72000,
    locationType: null,
    category: null,
    requiresDifferentlyAbled: false,
    requiresWidowed: false,
    officialLink: "https://tnesevai.tn.gov.in",
    requiredDocsList: ["Birth Certificate of Child", "Sterilization Certificate of Parents", "Income Proof"]
  },
  {
    id: 29,
    title: "TAHDCO Loan Subsidies",
    department: "Tamil Nadu Adi Dravidar Housing & Development Corporation",
    benefit: "30% capital assets subsidy for entrepreneurial project financing",
    targetGender: null,
    targetOccupation: null,
    targetState: "Tamil Nadu",
    minAge: 18,
    maxAge: 65,
    incomeLimit: 250000,
    locationType: null,
    targetCommunity: ["SC", "ST"],
    requiresDifferentlyAbled: false,
    requiresWidowed: false,
    officialLink: "https://tahdco.tn.gov.in",
    requiredDocsList: ["Community Certificate (SC/ST)", "Project Cost Breakdown", "Income Certificate"]
  },
  {
    id: 30,
    title: "Pre-Matric Scholarship for Minorities",
    department: "Ministry of Minority Affairs, India",
    benefit: "Full school tuition waiver and stipend for school education",
    targetGender: null,
    targetOccupation: "Student",
    targetState: null,
    minAge: 6,
    maxAge: 16,
    incomeLimit: 100000,
    locationType: null,
    targetReligion: ["Muslim", "Christian", "Sikh", "Buddhist", "Jain"],
    requiresDifferentlyAbled: false,
    requiresWidowed: false,
    officialLink: "https://scholarships.gov.in",
    requiredDocsList: ["Self Declaration of Minority Community", "Previous Class Marksheet", "Income Certificate"]
  }
];

// Helper to clamp matching percentages within bounds [0, 100]
function clampScore(score) {
  return Math.max(0, Math.min(100, Math.round(score)));
}

export async function POST(request) {
  try {
    const body = await request.json();

    const userProfile = {
      name: body.name || "Citizen",
      age: Number(body.age) || 0,
      gender: body.gender || "Female",
      state: body.state || "Tamil Nadu",
      income: Number(body.income) || 0,
      occupation: body.occupation || "Student",
      maritalStatus: body.maritalStatus || "Single",
      locationType: body.locationType || "Urban",
      category: body.category || "General",
      differentlyAbled: Boolean(body.differentlyAbled),
      religion: body.religion || "Hindu",
      community: body.community || "General"
    };

    const calculatedSchemes = schemesDB.map((scheme) => {
      let matchPercentage = 100;
      const matchedCriteria = [];
      const missingDocuments = [];

      // 1. Gender Verification
      if (scheme.targetGender) {
        if (userProfile.gender !== scheme.targetGender) {
          matchPercentage -= 40;
          missingDocuments.push(`Gender target mismatch (Requires: ${scheme.targetGender})`);
        } else {
          matchedCriteria.push(`Gender requirement met (${scheme.targetGender})`);
        }
      }

      // 2. Age Restrictions
      if (scheme.minAge !== null || scheme.maxAge !== null) {
        if (scheme.minAge !== null && userProfile.age < scheme.minAge) {
          matchPercentage -= 30;
          missingDocuments.push(`Below minimum age criteria (Requires: ${scheme.minAge} years)`);
        } else if (scheme.maxAge !== null && userProfile.age > scheme.maxAge) {
          matchPercentage -= 30;
          missingDocuments.push(`Exceeds maximum age limit (Limit: ${scheme.maxAge} years)`);
        } else {
          matchedCriteria.push(`Age eligibility verified (${userProfile.age} yrs)`);
        }
      }

      // 3. State/Residence Residency Proofs
      if (scheme.targetState) {
        if (userProfile.state !== scheme.targetState) {
          matchPercentage -= 40;
          missingDocuments.push(`Domicile state mismatch (Requires: ${scheme.targetState})`);
        } else {
          matchedCriteria.push(`State residency verified (${scheme.targetState})`);
        }
      }

      // 4. Annual Income Restrictions
      if (scheme.incomeLimit !== null) {
        if (userProfile.income > scheme.incomeLimit) {
          matchPercentage -= 35;
          missingDocuments.push(`Income exceeds eligibility cap (Limit: ₹${scheme.incomeLimit.toLocaleString('en-IN')})`);
        } else {
          matchedCriteria.push(`Annual income under ceiling (< ₹${scheme.incomeLimit.toLocaleString('en-IN')})`);
        }
      }

      // 5. Area / Location Type
      if (scheme.locationType) {
        if (userProfile.locationType !== scheme.locationType) {
          matchPercentage -= 25;
          missingDocuments.push(`Requires residence in a ${scheme.locationType} sector`);
        } else {
          matchedCriteria.push(`Geographical eligibility met (${scheme.locationType})`);
        }
      }

      // 6. Primary Occupation Category
      if (scheme.targetOccupation) {
        if (userProfile.occupation !== scheme.targetOccupation) {
          matchPercentage -= 35;
          missingDocuments.push(`Requires occupation profile: ${scheme.targetOccupation}`);
        } else {
          matchedCriteria.push(`Occupation matched: ${scheme.targetOccupation}`);
        }
      }

      // 7. Social Security Check: Widow Status
      if (scheme.requiresWidowed) {
        if (userProfile.maritalStatus !== "Widowed") {
          matchPercentage -= 45;
          missingDocuments.push("Social status criteria mismatch (Requires: Widowed)");
        } else {
          matchedCriteria.push("Social status verified (Widowed)");
        }
      }

      // 8. Person with Disability Status
      if (scheme.requiresDifferentlyAbled) {
        if (!userProfile.differentlyAbled) {
          matchPercentage -= 50;
          missingDocuments.push("Requires official Disability Certification (PwD)");
        } else {
          matchedCriteria.push("Disability criteria met");
        }
      }

      // 9. Community/Caste Category Constraints
      if (scheme.targetCommunity) {
        const isMatched = scheme.targetCommunity.includes(userProfile.community);
        if (!isMatched) {
          matchPercentage -= 40;
          missingDocuments.push(`Requires target community groups: [${scheme.targetCommunity.join(", ")}]`);
        } else {
          matchedCriteria.push(`Community caste group eligibility met (${userProfile.community})`);
        }
      }

      // 10. Religion Minorities Constraints
      if (scheme.targetReligion) {
        const isMatched = scheme.targetReligion.includes(userProfile.religion);
        if (!isMatched) {
          matchPercentage -= 50;
          missingDocuments.push(`Requires minority religion profile: [${scheme.targetReligion.join(", ")}]`);
        } else {
          matchedCriteria.push(`Minority religion criteria met (${userProfile.religion})`);
        }
      }

      // 11. Overlap boosts
      if (userProfile.occupation === "Student" && scheme.title.toLowerCase().includes("scholarship")) {
        matchPercentage += 10;
      }
      if (userProfile.occupation === "Student" && scheme.title.toLowerCase().includes("skill")) {
        matchPercentage += 5;
      }
      if (userProfile.occupation === "Farmer" && scheme.title.toLowerCase().includes("kisan")) {
        matchPercentage += 10;
      }

      const finalPercentage = clampScore(matchPercentage);

      // Collect specific document inputs if the scheme criteria have passed perfectly (0 missing documents)
      // Otherwise, return missing documents showing failed criteria details
      const actualMissing = finalPercentage === 100 ? [] : missingDocuments;

      return {
        id: scheme.id,
        title: scheme.title,
        department: scheme.department,
        benefit: scheme.benefit,
        matchPercentage: finalPercentage,
        matchedCriteria: matchedCriteria.length > 0 ? matchedCriteria : ["General Citizen Criteria Verified"],
        missingDocuments: actualMissing,
        officialLink: scheme.officialLink,
        requiredDocsList: scheme.requiredDocsList || ["Aadhaar Card", "Ration Card"]
      };
    });

    // Filtering, sorting and slicing top 6 schemes
    const filteredSchemes = calculatedSchemes
      .filter((s) => s.matchPercentage >= 40)
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
      .slice(0, 6);

    return NextResponse.json({ schemes: filteredSchemes });
  } catch (error) {
    return NextResponse.json({ error: "Failed to compile scheme results: " + error.message }, { status: 400 });
  }
}
