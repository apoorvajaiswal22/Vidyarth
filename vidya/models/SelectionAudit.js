import mongoose from "mongoose";

const selectionAuditSchema = new mongoose.Schema(
  {
    applicationId: {
      type: String,
      required: true
    },

    schemeId: {
      type: String,
      required: true
    },

    previousStatus: {
      type: String,
      required: true
    },

    newStatus: {
      type: String,
      enum: [
        "RECOMMENDED",
        "WAITLISTED",
        "REJECTED"
      ],
      required: true
    },

    reason: {
      type: String,
      default: ""
    },

    meritScore: {
      type: Number,
      default: null
    },

    rank: {
      type: Number,
      default: null
    },

    decidedBy: {
      type: String,
      default: "ADMIN"
    },

    decidedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "SelectionAudit",
  selectionAuditSchema
);