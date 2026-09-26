import Application from "../models/Application.js";
import SelectionAudit from "../models/SelectionAudit.js";


// ======================================================
// UPDATE SELECTION DECISION
// ======================================================

export const updateSelectionDecision = async (req, res) => {
  try {
    const { application_id } = req.params;

    const {
      decision,
      reason,
      decidedBy
    } = req.body;


    // --------------------------------------------------
    // Validate decision
    // --------------------------------------------------

    if (
      ![
        "RECOMMENDED",
        "WAITLISTED",
        "REJECTED"
      ].includes(decision)
    ) {
      return res.status(400).json({
        message:
          "Decision must be RECOMMENDED, WAITLISTED or REJECTED"
      });
    }


    // --------------------------------------------------
    // Find application
    // --------------------------------------------------

    const application =
      await Application.findOne({
        applicationId: application_id
      });

    if (!application) {
      return res.status(404).json({
        message:
          "Application not found"
      });
    }


    // --------------------------------------------------
    // Store previous status
    // --------------------------------------------------

    const previousStatus =
      application.selectionStatus;


    console.log(
      "----------------------------------------"
    );

    console.log(
      "Selection update requested"
    );

    console.log(
      "Application:",
      application.applicationId
    );

    console.log(
      "Previous selection status:",
      previousStatus
    );

    console.log(
      "New selection status:",
      decision
    );


    // --------------------------------------------------
    // Update selection status
    // --------------------------------------------------

    application.selectionStatus =
      decision;


    // --------------------------------------------------
    // Update application status
    // --------------------------------------------------

    if (decision === "REJECTED") {
      application.status =
        "REJECTED";
    }

    if (
      decision === "RECOMMENDED" ||
      decision === "WAITLISTED"
    ) {
      application.status =
        "ELIGIBLE";
    }


    // --------------------------------------------------
    // SAVE APPLICATION
    // --------------------------------------------------

    await application.save();


    // --------------------------------------------------
    // IMPORTANT:
    // Read the application again from MongoDB.
    //
    // This verifies what was ACTUALLY stored.
    // --------------------------------------------------

    const savedApplication =
      await Application.findOne({
        applicationId: application_id
      });


    console.log(
      "Status after MongoDB save:",
      savedApplication.selectionStatus
    );


    // --------------------------------------------------
    // If MongoDB did not save the expected status,
    // stop here instead of creating an incorrect
    // audit record.
    // --------------------------------------------------

    if (
      savedApplication.selectionStatus !==
      decision
    ) {
      console.error(
        "DATABASE STATUS MISMATCH"
      );

      return res.status(500).json({
        message:
          "Selection status was not saved correctly",
        expected:
          decision,
        actual:
          savedApplication.selectionStatus
      });
    }


    // --------------------------------------------------
    // CREATE AUDIT RECORD
    // --------------------------------------------------

    const audit =
      await SelectionAudit.create({
        applicationId:
          savedApplication.applicationId,

        schemeId:
          savedApplication.schemeId,

        previousStatus:
          previousStatus,

        newStatus:
          decision,

        reason:
          reason || "",

        meritScore:
          savedApplication.meritScore,

        rank:
          savedApplication.rank,

        decidedBy:
          decidedBy || "ADMIN"
      });


    console.log(
      "Audit record created:",
      audit._id
    );

    console.log(
      "Final selection status:",
      savedApplication.selectionStatus
    );

    console.log(
      "----------------------------------------"
    );


    // --------------------------------------------------
    // RESPONSE
    // --------------------------------------------------

    return res.json({
      message:
        "Selection decision updated successfully",

      application: {
        applicationId:
          savedApplication.applicationId,

        name:
          savedApplication.name,

        meritScore:
          savedApplication.meritScore,

        rank:
          savedApplication.rank,

        selectionStatus:
          savedApplication.selectionStatus,

        applicationStatus:
          savedApplication.status
      },

      audit: {
        auditId:
          audit._id,

        previousStatus:
          audit.previousStatus,

        newStatus:
          audit.newStatus,

        reason:
          audit.reason,

        decidedBy:
          audit.decidedBy,

        decidedAt:
          audit.decidedAt
      }
    });

  } catch (error) {

    console.error(
      "Selection decision error:",
      error
    );

    return res.status(500).json({
      message:
        "Selection decision update failed",

      error:
        error.message
    });
  }
};


// ======================================================
// GET SELECTION AUDIT HISTORY
// ======================================================

export const getSelectionAuditHistory =
  async (req, res) => {

    try {

      const { application_id } =
        req.params;


      // ------------------------------------------------
      // Get current application
      // ------------------------------------------------

      const application =
        await Application.findOne({
          applicationId:
            application_id
        });


      if (!application) {

        return res.status(404).json({
          message:
            "Application not found"
        });
      }


      // ------------------------------------------------
      // Get audit history
      // ------------------------------------------------

      const history =
        await SelectionAudit.find({
          applicationId:
            application_id
        })
        .sort({
          decidedAt: -1
        });


      // ------------------------------------------------
      // Return current status + history
      // ------------------------------------------------

      return res.json({

        applicationId:
          application_id,

        currentSelectionStatus:
          application.selectionStatus,

        currentApplicationStatus:
          application.status,

        totalRecords:
          history.length,

        history

      });

    } catch (error) {

      console.error(
        error
      );

      return res.status(500).json({
        message:
          "Failed to fetch selection audit history",

        error:
          error.message
      });
    }
  };