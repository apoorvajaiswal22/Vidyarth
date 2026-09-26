import Application from "../models/Application.js";

import {
  findDuplicateApplications
} from "../services/duplicateService.js";


export const checkDuplicates =
  async (req, res) => {

    try {

      const duplicates =
        await findDuplicateApplications();


      // Flag certificate duplicates
      for (
        const duplicate
        of duplicates.certificateDuplicates
      ) {

        await Application.updateMany(
          {
            certificateNumber:
              duplicate._id
          },
          {
            duplicateStatus:
              "NEEDS_REVIEW",

            duplicateReason:
              "Repeated certificate number"
          }
        );
      }


      // Flag ID duplicates
      for (
        const duplicate
        of duplicates.idDuplicates
      ) {

        await Application.updateMany(
          {
            idNumber:
              duplicate._id
          },
          {
            duplicateStatus:
              "NEEDS_REVIEW",

            duplicateReason:
              "Repeated ID number"
          }
        );
      }


      res.json({

        message:
          "Duplicate check completed",

        certificateDuplicates:
          duplicates
            .certificateDuplicates,

        idDuplicates:
          duplicates.idDuplicates

      });

    } catch (error) {

      res.status(500).json({
        message:
          "Duplicate check failed",

        error:
          error.message
      });
    }
  };
  export const reviewDuplicate = async (req, res) => {
  try {
    const { application_id } = req.params;
    const { decision, note } = req.body;

    if (!["CONFIRMED", "CLEARED"].includes(decision)) {
      return res.status(400).json({
        message: "Decision must be CONFIRMED or CLEARED"
      });
    }

    const application = await Application.findOne({
      applicationId: application_id
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    if (application.duplicateStatus !== "NEEDS_REVIEW") {
      return res.status(400).json({
        message: "Application is not flagged for duplicate review"
      });
    }

    application.duplicateReviewStatus = decision;
    application.duplicateReviewedAt = new Date();
    application.duplicateReviewNote = note || null;

    if (decision === "CLEARED") {
      application.duplicateStatus = "CLEAR";
    }

    await application.save();

    return res.json({
      applicationId: application.applicationId,
      duplicateStatus: application.duplicateStatus,
      duplicateReviewStatus: application.duplicateReviewStatus,
      duplicateReviewNote: application.duplicateReviewNote,
      duplicateReviewedAt: application.duplicateReviewedAt,
      message:
        decision === "CONFIRMED"
          ? "Duplicate confirmed by admin"
          : "Duplicate flag cleared by admin"
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Duplicate review failed",
      error: error.message
    });
  }
};