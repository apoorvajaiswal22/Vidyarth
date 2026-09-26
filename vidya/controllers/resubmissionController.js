import Application from "../models/Application.js";


// POST: Resubmit an application
export const resubmitApplicationController = async (req, res) => {
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

    if (application.deficiencyStatus !== "RAISED") {
      return res.status(400).json({
        message: "Application does not have any raised deficiencies"
      });
    }

    application.deficiencyStatus = "RESUBMITTED";
    application.resubmittedAt = new Date();

    await application.save();

    return res.json({
      applicationId: application.applicationId,
      deficiencyStatus: application.deficiencyStatus,
      resubmittedAt: application.resubmittedAt,
      message: "Application resubmitted successfully"
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Application resubmission failed",
      error: error.message
    });
  }
};


// PUT: Update corrected information and resubmit
export const updateResubmittedApplication = async (req, res) => {
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

    const { category, documentStatus } = req.body;

    if (category) {
      application.category = category;
    }

    if (documentStatus) {
      application.documentStatus = documentStatus;
    }

    application.deficiencyStatus = "RESUBMITTED";
    application.resubmittedAt = new Date();

    await application.save();

    return res.json({
      applicationId: application.applicationId,
      category: application.category,
      documentStatus: application.documentStatus,
      deficiencyStatus: application.deficiencyStatus,
      message: "Corrected application resubmitted successfully"
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Application update failed",
      error: error.message
    });
  }
};