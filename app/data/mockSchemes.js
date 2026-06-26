export const familyMembers = [
  { id: "all", name: "All Family Members" },
  { id: "tharun", name: "Tharun (Self - Student)" },
  { id: "father", name: "Father (Head of Household)" },
  { id: "mother", name: "Mother (Co-Applicant)" }
];

export const schemes = [
  {
    id: 1,
    title: "AICTE Pragati Scholarship for Girls/Students",
    targetId: "tharun",
    matchPercentage: 98,
    department: "Ministry of Education",
    urgency: "High - Closes in 5 Days",
    matchedCriteria: [
      "Pursuing B.E. in Technical Degree",
      "Age matching youth demographic",
      "First year/Second year enrollment verified"
    ],
    missingDocuments: ["Current Semester Fee Receipt"],
    amount: "₹50,000 / year"
  },
  {
    id: 2,
    title: "PM Kisan Samman Nidhi",
    targetId: "father",
    matchPercentage: 100,
    department: "Ministry of Agriculture",
    urgency: "Medium - Next Installment Aug 2026",
    matchedCriteria: [
      "Valid Aadhaar linked to Bank",
      "Land ownership records verified (Patta)",
      "Registered as active farmer"
    ],
    missingDocuments: [],
    amount: "₹6,000 / year"
  },
  {
    id: 3,
    title: "Moovalur Ramamirtham Pudhumai Penn",
    targetId: "mother",
    matchPercentage: 85,
    department: "Social Welfare, Govt of TN",
    urgency: "Low - Rolling Admissions",
    matchedCriteria: [
      "Resident of Tamil Nadu",
      "Government school education criteria met"
    ],
    missingDocuments: ["Income Certificate (< ₹2L)", "Ration Card (Smart Card) update"],
    amount: "₹1,000 / month"
  },
  {
    id: 4,
    title: "TNSDC Naan Mudhalvan Skill Training",
    targetId: "tharun",
    matchPercentage: 100,
    department: "Tamil Nadu Skill Development",
    urgency: "High - AI/ML Cohort starting soon",
    matchedCriteria: [
      "Undergraduate Student in TN",
      "Computer Science / AIML specialization",
      "Aadhaar e-KYC verified"
    ],
    missingDocuments: [],
    amount: "Free Premium Certification"
  }
];