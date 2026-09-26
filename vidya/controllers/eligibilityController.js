import Application from "../models/Application.js";
import Scheme from "../models/Scheme.js";
import { checkEligibility } from "../services/eligibilityService.js";

export const checkApplicationEligibility = async (req, res) => {
  try {
    const { application_id } = req.params;

    // Find application
    const application = await Application.findOne({
      applicationId: application_id
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    // Find scheme
    const scheme = await Scheme.findOne({
      schemeId: application.schemeId
    });

    if (!scheme) {
      return res.status(404).json({
        message: "Scheme not found"
      });
    }

    // Run eligibility check FIRST
    const eligibilityResult = checkEligibility(
      application,
      scheme
    );

    // Save eligibility result in MongoDB
    if (eligibilityResult.eligible) {
      application.status = "ELIGIBLE";
    } else {
      application.status = "REJECTED";
    }

    await application.save();

    // Return response
    return res.json({
      applicationId: application.applicationId,
      applicantName: application.name,
      schemeId: scheme.schemeId,
      schemeName: scheme.name,
      eligible: eligibilityResult.eligible,
      passedChecks: eligibilityResult.passedChecks,
      reasons: eligibilityResult.reasons
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Eligibility check failed",
      error: error.message
    });
  }
};