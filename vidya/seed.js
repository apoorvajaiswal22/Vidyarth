import mongoose from "mongoose";
import dotenv from "dotenv";

import Application from "./models/Application.js";
import Scheme from "./models/Scheme.js";

dotenv.config();

const schemes = [
  {
    schemeId: "SCH001",
    name: "National Fellowship for Scheduled Tribes",
    schemeType: "FELLOWSHIP",
    targetCategory: "ST",

    description:
      "MoTA fellowship scheme for eligible Scheduled Tribe students pursuing higher research programmes.",

    seatLimit: 10,

    scoringWeights: {
      marks: 0.5,
      income: 0.3,
      category: 0.2
    },

    maxIncome: 500000,

    categoryPriority: {
      ST: 100,
      SC: 90,
      OBC: 80,
      EWS: 70,
      GENERAL: 60
    },

    eligibilityRules: {
      minMarks: 60,
      maxIncome: 500000,
      requiredCategory: "ST",
      requiredDocuments: [
        "Caste Certificate",
        "Income Certificate",
        "Academic Certificate",
        "Identity Proof"
      ]
    }
  },

  {
    schemeId: "SCH002",
    name: "National Overseas Scholarship",
    schemeType: "OVERSEAS_SCHOLARSHIP",
    targetCategory: "ST",

    description:
      "MoTA overseas scholarship scheme for eligible Scheduled Tribe students pursuing higher studies abroad.",

    seatLimit: 5,

    scoringWeights: {
      marks: 0.5,
      income: 0.3,
      category: 0.2
    },

    maxIncome: 500000,

    categoryPriority: {
      ST: 100,
      SC: 90,
      OBC: 80,
      EWS: 70,
      GENERAL: 60
    },

    eligibilityRules: {
      minMarks: 60,
      maxIncome: 500000,
      requiredCategory: "ST",
      requiredDocuments: [
        "Caste Certificate",
        "Income Certificate",
        "Academic Certificate",
        "Identity Proof",
        "Admission/Offer Letter"
      ]
    }
  }
];

const applications = [
  {
    applicationId: "APP001",
    schemeId: "SCH001",
    name: "Rahul Sharma",
    state: "Uttar Pradesh",
    category: "GENERAL",
    marks: 95,
    income: 120000,
    certificateNumber: "CERT001",
    idNumber: "ID001",
    status: "ELIGIBLE",
    documentStatus: "VERIFIED",
    submittedAt: new Date("2026-09-01"),
    verifiedAt: new Date("2026-09-02")
  },

  {
    applicationId: "APP002",
    schemeId: "SCH001",
    name: "Priya Singh",
    state: "Delhi",
    category: "OBC",
    marks: 92,
    income: 150000,
    certificateNumber: "CERT002",
    idNumber: "ID002",
    status: "ELIGIBLE",
    documentStatus: "VERIFIED",
    submittedAt: new Date("2026-09-01"),
    verifiedAt: new Date("2026-09-02")
  },

  {
    applicationId: "APP003",
    schemeId: "SCH001",
    name: "Aman Verma",
    state: "Bihar",
    category: "SC",
    marks: 88,
    income: 100000,
    certificateNumber: "CERT003",
    idNumber: "ID003",
    status: "ELIGIBLE",
    documentStatus: "VERIFIED",
    submittedAt: new Date("2026-09-01"),
    verifiedAt: new Date("2026-09-02")
  },

  {
    applicationId: "APP004",
    schemeId: "SCH001",
    name: "Neha Gupta",
    state: "Rajasthan",
    category: "GENERAL",
    marks: 85,
    income: 200000,
    certificateNumber: "CERT004",
    idNumber: "ID004",
    status: "ELIGIBLE",
    documentStatus: "VERIFIED",
    submittedAt: new Date("2026-09-01"),
    verifiedAt: new Date("2026-09-02")
  },

  {
    applicationId: "APP005",
    schemeId: "SCH001",
    name: "Vikas Kumar",
    state: "Madhya Pradesh",
    category: "OBC",
    marks: 82,
    income: 180000,
    certificateNumber: "CERT005",
    idNumber: "ID005",
    status: "ELIGIBLE",
    documentStatus: "VERIFIED",
    submittedAt: new Date("2026-09-01"),
    verifiedAt: new Date("2026-09-02")
  },

  {
    applicationId: "APP006",
    schemeId: "SCH001",
    name: "Test Duplicate",
    state: "Maharashtra",
    category: "EWS",
    marks: 78,
    income: 220000,
    certificateNumber: "CERT005",
    idNumber: "ID006",
    status: "ELIGIBLE",
    documentStatus: "VERIFIED",
    submittedAt: new Date("2026-09-01"),
    verifiedAt: new Date("2026-09-02")
  },

  {
    applicationId: "APP007",
    schemeId: "SCH001",
    name: "Sakshi Mehta",
    state: "Uttar Pradesh",
    category: "EWS",
    marks: 91,
    income: 90000,
    certificateNumber: "CERT007",
    idNumber: "ID007",
    status: "ELIGIBLE",
    documentStatus: "VERIFIED",
    submittedAt: new Date("2026-09-01"),
    verifiedAt: new Date("2026-09-02")
  },

  {
    applicationId: "APP008",
    schemeId: "SCH001",
    name: "Arjun Yadav",
    state: "Haryana",
    category: "OBC",
    marks: 89,
    income: 130000,
    certificateNumber: "CERT008",
    idNumber: "ID008",
    status: "ELIGIBLE",
    documentStatus: "VERIFIED",
    submittedAt: new Date("2026-09-01"),
    verifiedAt: new Date("2026-09-02")
  },

  {
    applicationId: "APP009",
    schemeId: "SCH001",
    name: "Kavya Patel",
    state: "Gujarat",
    category: "GENERAL",
    marks: 87,
    income: 250000,
    certificateNumber: "CERT009",
    idNumber: "ID009",
    status: "ELIGIBLE",
    documentStatus: "VERIFIED",
    submittedAt: new Date("2026-09-01"),
    verifiedAt: new Date("2026-09-02")
  },

  {
    applicationId: "APP010",
    schemeId: "SCH001",
    name: "Rohan Das",
    state: "West Bengal",
    category: "SC",
    marks: 84,
    income: 110000,
    certificateNumber: "CERT010",
    idNumber: "ID010",
    status: "ELIGIBLE",
    documentStatus: "VERIFIED",
    submittedAt: new Date("2026-09-01"),
    verifiedAt: new Date("2026-09-02")
  },

  {
    applicationId: "APP011",
    schemeId: "SCH001",
    name: "Ananya Rao",
    state: "Karnataka",
    category: "GENERAL",
    marks: 94,
    income: 300000,
    certificateNumber: "CERT011",
    idNumber: "ID011",
    status: "ELIGIBLE",
    documentStatus: "VERIFIED",
    submittedAt: new Date("2026-09-01"),
    verifiedAt: new Date("2026-09-02")
  },

  {
    applicationId: "APP012",
    schemeId: "SCH001",
    name: "Mohit Singh",
    state: "Punjab",
    category: "OBC",
    marks: 86,
    income: 160000,
    certificateNumber: "CERT012",
    idNumber: "ID012",
    status: "ELIGIBLE",
    documentStatus: "VERIFIED",
    submittedAt: new Date("2026-09-01"),
    verifiedAt: new Date("2026-09-02")
  },

  {
    applicationId: "APP013",
    schemeId: "SCH001",
    name: "Pooja Kumari",
    state: "Bihar",
    category: "EWS",
    marks: 80,
    income: 70000,
    certificateNumber: "CERT013",
    idNumber: "ID013",
    status: "ELIGIBLE",
    documentStatus: "VERIFIED",
    submittedAt: new Date("2026-09-01"),
    verifiedAt: new Date("2026-09-02")
  },

  {
    applicationId: "APP014",
    schemeId: "SCH001",
    name: "Aditya Mishra",
    state: "Uttar Pradesh",
    category: "GENERAL",
    marks: 90,
    income: 280000,
    certificateNumber: "CERT014",
    idNumber: "ID014",
    status: "ELIGIBLE",
    documentStatus: "VERIFIED",
    submittedAt: new Date("2026-09-01"),
    verifiedAt: new Date("2026-09-02")
  },

  {
    applicationId: "APP015",
    schemeId: "SCH001",
    name: "Sneha Jain",
    state: "Maharashtra",
    category: "SC",
    marks: 83,
    income: 95000,
    certificateNumber: "CERT015",
    idNumber: "ID015",
    status: "ELIGIBLE",
    documentStatus: "VERIFIED",
    submittedAt: new Date("2026-09-01"),
    verifiedAt: new Date("2026-09-02")
  },

  {
    applicationId: "APP016",
    schemeId: "SCH001",
    name: "Karan Joshi",
    state: "Rajasthan",
    category: "OBC",
    marks: 79,
    income: 210000,
    certificateNumber: "CERT016",
    idNumber: "ID016",
    status: "ELIGIBLE",
    documentStatus: "VERIFIED",
    submittedAt: new Date("2026-09-01"),
    verifiedAt: new Date("2026-09-02")
  },

  {
    applicationId: "APP017",
    schemeId: "SCH001",
    name: "Meera Nair",
    state: "Kerala",
    category: "GENERAL",
    marks: 96,
    income: 350000,
    certificateNumber: "CERT017",
    idNumber: "ID017",
    status: "ELIGIBLE",
    documentStatus: "VERIFIED",
    submittedAt: new Date("2026-09-01"),
    verifiedAt: new Date("2026-09-02")
  },

  {
    applicationId: "APP018",
    schemeId: "SCH001",
    name: "Vivek Kumar",
    state: "Jharkhand",
    category: "ST",
    marks: 77,
    income: 60000,
    certificateNumber: "CERT018",
    idNumber: "ID018",
    status: "ELIGIBLE",
    documentStatus: "VERIFIED",
    submittedAt: new Date("2026-09-01"),
    verifiedAt: new Date("2026-09-02")
  },

  {
    applicationId: "APP019",
    schemeId: "SCH001",
    name: "Isha Sharma",
    state: "Delhi",
    category: "GENERAL",
    marks: 93,
    income: 400000,
    certificateNumber: "CERT019",
    idNumber: "ID019",
    status: "ELIGIBLE",
    documentStatus: "VERIFIED",
    submittedAt: new Date("2026-09-01"),
    verifiedAt: new Date("2026-09-02")
  },

  {
    applicationId: "APP020",
    schemeId: "SCH001",
    name: "Nitin Kumar",
    state: "Odisha",
    category: "OBC",
    marks: 81,
    income: 140000,
    certificateNumber: "CERT020",
    idNumber: "ID020",
    status: "ELIGIBLE",
    documentStatus: "VERIFIED",
    submittedAt: new Date("2026-09-01"),
    verifiedAt: new Date("2026-09-02")
  },

  {
    applicationId: "APP021",
    schemeId: "SCH001",
    name: "Divya Singh",
    state: "Uttar Pradesh",
    category: "SC",
    marks: 88,
    income: 125000,
    certificateNumber: "CERT021",
    idNumber: "ID021",
    status: "ELIGIBLE",
    documentStatus: "VERIFIED",
    submittedAt: new Date("2026-09-01"),
    verifiedAt: new Date("2026-09-02")
  },

  {
    applicationId: "APP022",
    schemeId: "SCH001",
    name: "Harsh Vardhan",
    state: "Himachal Pradesh",
    category: "GENERAL",
    marks: 75,
    income: 450000,
    certificateNumber: "CERT022",
    idNumber: "ID022",
    status: "ELIGIBLE",
    documentStatus: "VERIFIED",
    submittedAt: new Date("2026-09-01"),
    verifiedAt: new Date("2026-09-02")
  },

  {
    applicationId: "APP023",
    schemeId: "SCH001",
    name: "Simran Kaur",
    state: "Punjab",
    category: "OBC",
    marks: 92,
    income: 190000,
    certificateNumber: "CERT023",
    idNumber: "ID023",
    status: "ELIGIBLE",
    documentStatus: "VERIFIED",
    submittedAt: new Date("2026-09-01"),
    verifiedAt: new Date("2026-09-02")
  },

  {
    applicationId: "APP024",
    schemeId: "SCH001",
    name: "Ravi Yadav",
    state: "Madhya Pradesh",
    category: "ST",
    marks: 73,
    income: 50000,
    certificateNumber: "CERT024",
    idNumber: "ID024",
    status: "ELIGIBLE",
    documentStatus: "VERIFIED",
    submittedAt: new Date("2026-09-01"),
    verifiedAt: new Date("2026-09-02")
  },

  {
    applicationId: "APP025",
    schemeId: "SCH001",
    name: "Nisha Verma",
    state: "Chhattisgarh",
    category: "SC",
    marks: 85,
    income: 105000,
    certificateNumber: "CERT025",
    idNumber: "ID025",
    status: "ELIGIBLE",
    documentStatus: "VERIFIED",
    submittedAt: new Date("2026-09-01"),
    verifiedAt: new Date("2026-09-02")
  },

  {
    applicationId: "APP026",
    schemeId: "SCH001",
    name: "Aarav Gupta",
    state: "Gujarat",
    category: "GENERAL",
    marks: 89,
    income: 270000,
    certificateNumber: "CERT026",
    idNumber: "ID026",
    status: "SUBMITTED",
    documentStatus: "PENDING",
    submittedAt: new Date("2026-09-01")
  },

  {
    applicationId: "APP027",
    schemeId: "SCH001",
    name: "Tanvi Sinha",
    state: "Bihar",
    category: "EWS",
    marks: 76,
    income: 80000,
    certificateNumber: "CERT027",
    idNumber: "ID027",
    status: "SUBMITTED",
    documentStatus: "PENDING",
    submittedAt: new Date("2026-09-01")
  },

  {
    applicationId: "APP028",
    schemeId: "SCH001",
    name: "Yash Thakur",
    state: "Uttarakhand",
    category: "OBC",
    marks: 70,
    income: 230000,
    certificateNumber: "CERT028",
    idNumber: "ID028",
    status: "REJECTED",
    documentStatus: "REVIEW",
    submittedAt: new Date("2026-09-01")
  },

  {
    applicationId: "APP029",
    schemeId: "SCH001",
    name: "Riya Kapoor",
    state: "Delhi",
    category: "GENERAL",
    marks: 98,
    income: 0,
    certificateNumber: "CERT029",
    idNumber: "ID029",
    status: "ELIGIBLE",
    documentStatus: "VERIFIED",
    submittedAt: new Date("2026-09-01"),
    verifiedAt: new Date("2026-09-02")
  },

  {
    applicationId: "APP030",
    schemeId: "SCH001",
    name: "Dev Sharma",
    state: "Karnataka",
    category: "SC",
    marks: 65,
    income: 500000,
    certificateNumber: "CERT030",
    idNumber: "ID002",
    status: "ELIGIBLE",
    documentStatus: "VERIFIED",
    submittedAt: new Date("2026-09-01"),
    verifiedAt: new Date("2026-09-02")
  }
];
// =====================================================
// GENERATED DEMO DATA
// APP031 - APP200
// =====================================================

const states = [
  "Uttar Pradesh",
  "Bihar",
  "Jharkhand",
  "Chhattisgarh",
  "Madhya Pradesh",
  "Rajasthan",
  "Maharashtra",
  "Gujarat",
  "Odisha",
  "West Bengal",
  "Karnataka",
  "Kerala",
  "Tamil Nadu",
  "Telangana",
  "Andhra Pradesh",
  "Haryana",
  "Punjab",
  "Himachal Pradesh",
  "Uttarakhand",
  "Assam",
  "Tripura",
  "Meghalaya",
  "Nagaland",
  "Mizoram",
  "Sikkim",
  "Manipur",
  "Delhi"
];

const firstNames = [
  "Aarav",
  "Aditi",
  "Aditya",
  "Akash",
  "Aman",
  "Ananya",
  "Anjali",
  "Arjun",
  "Ayush",
  "Bhavna",
  "Chandan",
  "Deepak",
  "Divya",
  "Harsh",
  "Isha",
  "Karan",
  "Kavya",
  "Khushi",
  "Manish",
  "Meera",
  "Mohit",
  "Nandini",
  "Neha",
  "Nikhil",
  "Pallavi",
  "Pooja",
  "Pranav",
  "Priya",
  "Rahul",
  "Ravi",
  "Riya",
  "Rohan",
  "Sakshi",
  "Sameer",
  "Shivam",
  "Simran",
  "Sneha",
  "Sonia",
  "Tanvi",
  "Varun",
  "Vikas",
  "Vivek",
  "Yash"
];

const lastNames = [
  "Sharma",
  "Singh",
  "Kumar",
  "Verma",
  "Yadav",
  "Gupta",
  "Patel",
  "Mishra",
  "Mehta",
  "Jain",
  "Joshi",
  "Das",
  "Rao",
  "Nair",
  "Kaur",
  "Thakur",
  "Sinha",
  "Chauhan",
  "Pandey",
  "Sahu"
];

const categories = [
  "ST",
  "ST",
  "ST",
  "ST",
  "ST",
  "SC",
  "SC",
  "OBC",
  "OBC",
  "EWS",
  "GENERAL"
];

const generatedApplications = [];

for (let i = 31; i <= 200; i++) {
  const index = i - 31;

  const category =
    categories[index % categories.length];

  const state =
    states[index % states.length];

  const firstName =
    firstNames[index % firstNames.length];

  const lastName =
    lastNames[(index * 3) % lastNames.length];

  const name =
    `${firstName} ${lastName}`;

  // Marks between 60 and 99
  const marks =
    60 + ((index * 7) % 40);

  // Income between ₹40,000 and ₹5,00,000
  const income =
    40000 + ((index * 17321) % 461000);

  let status;
  let documentStatus;

  /*
   * Create a realistic distribution of
   * application stages.
   */

  if (index % 17 === 0) {
    status = "SUBMITTED";
    documentStatus = "PENDING";
  } else if (index % 19 === 0) {
    status = "REJECTED";
    documentStatus = "REVIEW";
  } else if (index % 7 === 0) {
    status = "VERIFIED";
    documentStatus = "VERIFIED";
  } else {
    status = "ELIGIBLE";
    documentStatus = "VERIFIED";
  }

  /*
   * Some applications intentionally fail
   * the marks requirement.
   */
  if (index % 23 === 0) {
    status = "REJECTED";
    documentStatus = "REVIEW";
  }

  /*
   * Create duplicate certificate numbers
   * for testing duplicate detection.
   */
  let certificateNumber;

  if (i === 51 || i === 101 || i === 151) {
    certificateNumber = "CERT005";
  } else if (i === 72 || i === 122 || i === 172) {
    certificateNumber = "CERT018";
  } else {
    certificateNumber = `CERT${String(i).padStart(3, "0")}`;
  }

  /*
   * Create duplicate ID numbers
   * for testing duplicate detection.
   */
  let idNumber;

  if (i === 61 || i === 111 || i === 161) {
    idNumber = "ID002";
  } else if (i === 82 || i === 132 || i === 182) {
    idNumber = "ID018";
  } else {
    idNumber = `ID${String(i).padStart(3, "0")}`;
  }

  /*
   * Most applications belong to SCH001.
   * Some belong to SCH002 so that the
   * second scheme also has test data.
   */
  const schemeId =
    index % 5 === 0
      ? "SCH002"
      : "SCH001";

  /*
   * SCH002 requires an additional
   * Admission/Offer Letter.
   *
   * We don't currently have a document
   * array in Application.js, so this is
   * represented through the application
   * stage only for now.
   */

  const submittedAt =
    new Date(
      2026,
      7,
      1 + (index % 30)
    );

  const application = {
    applicationId:
      `APP${String(i).padStart(3, "0")}`,

    schemeId,

    name,

    state,

    category,

    marks,

    income,

    certificateNumber,

    idNumber,

    status,

    documentStatus,

    submittedAt
  };

  /*
   * Add verifiedAt only when documents
   * have been verified.
   */
  if (documentStatus === "VERIFIED") {
    application.verifiedAt =
      new Date(
        submittedAt.getTime() +
        24 * 60 * 60 * 1000
      );
  }

  /*
   * Add some deficiency cases.
   *
   * These fields already exist in
   * Application.js.
   */
  if (index % 29 === 0) {
    application.deficiencyStatus = "RAISED";

    application.deficiencyReasons = [
      "Income certificate requires verification",
      "Additional supporting document required"
    ];

    application.deficiencyRaisedAt =
      new Date(
        submittedAt.getTime() +
        2 * 24 * 60 * 60 * 1000
      );
  }

  generatedApplications.push(application);
}

// Add generated applications to existing dataset
applications.push(...generatedApplications);

console.log(
  "Generated applications:",
  generatedApplications.length
);

console.log(
  "Total applications:",
  applications.length
);
async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");

    // Clear old data
    await Application.deleteMany({});
    await Scheme.deleteMany({});

    // Insert schemes
    await Scheme.insertMany(schemes);

    // Insert applications
    await Application.insertMany(applications);

    console.log("Schemes inserted:", schemes.length);
    console.log("Applications inserted:", applications.length);

    console.log("Sample data inserted successfully");

    await mongoose.connection.close();

    console.log("MongoDB connection closed");

  } catch (error) {
    console.error("Seeding failed:", error.message);

    await mongoose.connection.close();

    process.exit(1);
  }
}

seedDatabase();