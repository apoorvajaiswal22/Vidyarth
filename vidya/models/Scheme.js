import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema(
  {
    schemeId: {
      type: String,
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: true
    },

    schemeType: {
      type: String,
      enum: ["SCHOLARSHIP", "FELLOWSHIP", "OVERSEAS_SCHOLARSHIP"],
      required: true
    },

    targetCategory: {
      type: String,
      default: "ST"
    },

    description: {
      type: String,
      default: ""
    },

    seatLimit: {
      type: Number,
      required: true,
      min: 1
    },

    scoringWeights: {
      marks: {
        type: Number,
        default: 0.5
      },

      income: {
        type: Number,
        default: 0.3
      },

      category: {
        type: Number,
        default: 0.2
      }
    },

    maxIncome: {
      type: Number,
      default: 500000
    },

    categoryPriority: {
      ST: {
        type: Number,
        default: 100
      },

      SC: {
        type: Number,
        default: 90
      },

      OBC: {
        type: Number,
        default: 80
      },

      EWS: {
        type: Number,
        default: 70
      },

      GENERAL: {
        type: Number,
        default: 60
      }
    },

    eligibilityRules: {
      minMarks: {
        type: Number,
        default: 0
      },

      maxIncome: {
        type: Number,
        default: 500000
      },

      requiredCategory: {
        type: String,
        default: "ST"
      },

      requiredDocuments: {
        type: [String],
        default: []
      }
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Scheme", schemeSchema);