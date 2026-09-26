import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    applicationId: {
      type: String,
      required: true,
      unique: true
    },

    schemeId: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true
    },

    state: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    marks: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },

    income: {
      type: Number,
      required: true,
      min: 0
    },

    certificateNumber: {
      type: String,
      required: true
    },

    idNumber: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: [
        "SUBMITTED",
        "VERIFIED",
        "ELIGIBLE",
        "REJECTED",
        "RECOMMENDED",
        "WAITLISTED"
      ],
      default: "SUBMITTED"
    },

    documentStatus: {
      type: String,
      enum: [
        "PENDING",
        "VERIFIED",
        "REVIEW"
      ],
      default: "PENDING"
    },

    meritScore: {
      type: Number,
      default: null
    },

    rank: {
      type: Number,
      default: null
    },

    selectionStatus: {
      type: String,
      enum: [
        "PENDING",
        "RECOMMENDED",
        "WAITLISTED",
        "REJECTED"
      ],
      default: "PENDING"
    },

    duplicateStatus: {
      type: String,
      enum: [
        "CLEAR",
        "NEEDS_REVIEW"
      ],
      default: "CLEAR"
    },

    duplicateReason: {
      type: String,
      default: null
    },
    deficiencyStatus: {
  type: String,
  enum: ["NONE", "RAISED", "RESUBMITTED", "RESOLVED"],
  default: "NONE"
},

deficiencyReasons: {
  type: [String],
  default: []
},
duplicateReviewStatus: {
  type: String,
  enum: ["PENDING", "CONFIRMED", "CLEARED"],
  default: "PENDING"
},
duplicateReviewedAt: {
  type: Date
},
duplicateReviewNote: {
  type: String,
  default: null
},

deficiencyRaisedAt: {
  type: Date
},

resubmittedAt: {
  type: Date
},

deficiencyResolvedAt: {
  type: Date
},

    submittedAt: {
      type: Date,
      default: Date.now
    },

    verifiedAt: {
      type: Date
    },

    selectedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "Application",
  applicationSchema
);