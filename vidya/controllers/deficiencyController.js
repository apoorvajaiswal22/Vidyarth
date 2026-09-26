import Application from "../models/Application.js";
import Scheme from "../models/Scheme.js";
import { detectDeficiencies } from "../services/deficiencyService.js";

export const checkDeficiency = async (req, res) => {
  try {
    const { application_id } = req.params;

    const application = await Application.findOne({
      applicationId: application_id
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    const scheme = await Scheme.findOne({
      schemeId: application.schemeId
    });

    if (!scheme) {
      return res.status(404).json({
        message: "Scheme not found"
      });
    }

    const deficiencies = detectDeficiencies(
      application,
      scheme
    );

    if (deficiencies.length === 0) {
      application.deficiencyStatus = "NONE";
      application.deficiencyReasons = [];

      await application.save();

      return res.json({
        applicationId: application.applicationId,
        deficiencyStatus: "NONE",
        deficiencies: [],
        message: "No deficiencies found"
      });
    }

    application.deficiencyStatus = "RAISED";
    application.deficiencyReasons = deficiencies;
    application.deficiencyRaisedAt = new Date();

    await application.save();

    return res.json({
      applicationId: application.applicationId,
      deficiencyStatus: "RAISED",
      deficiencies,
      message: "Application deficiencies detected"
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Deficiency check failed",
      error: error.message
    });
  }
};
export const verifyResubmission = async (req, res) => {
  try {
    const { application_id } = req.params;

    const application = await Application.findOne({
      applicationId: application_id
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    if (application.deficiencyStatus !== "RESUBMITTED") {
      return res.status(400).json({
        message: "Application must be resubmitted before verification"
      });
    }

    const scheme = await Scheme.findOne({
      schemeId: application.schemeId
    });

    if (!scheme) {
      return res.status(404).json({
        message: "Scheme not found"
      });
    }

    const deficiencies = detectDeficiencies(
      application,
      scheme
    );

    // Deficiencies still exist
    if (deficiencies.length > 0) {
      application.deficiencyStatus = "RAISED";
      application.deficiencyReasons = deficiencies;
      application.deficiencyRaisedAt = new Date();

      await application.save();

      return res.json({
        applicationId: application.applicationId,
        deficiencyStatus: "RAISED",
        deficiencies,
        message: "Deficiencies still exist after resubmission"
      });
    }

    // All deficiencies resolved
    application.deficiencyStatus = "RESOLVED";
    application.deficiencyReasons = [];
    application.deficiencyResolvedAt = new Date();

    await application.save();

    return res.json({
      applicationId: application.applicationId,
      deficiencyStatus: "RESOLVED",
      deficiencies: [],
      message: "All deficiencies resolved successfully"
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Resubmission verification failed",
      error: error.message
    });
  }
};