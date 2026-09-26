import Application from "./models/Application.js";

// Calculate merit score
export const calculateMerit = async (req, res) => {
  try {
    const { applicationId } = req.body;

    const application = await Application.findOne({
      applicationId
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    // Sample scoring logic
    const marksScore = application.marks;

    let incomeScore;

    if (application.income <= 50000) {
      incomeScore = 100;
    } else if (application.income <= 100000) {
      incomeScore = 90;
    } else if (application.income <= 200000) {
      incomeScore = 75;
    } else {
      incomeScore = 50;
    }

    let categoryScore;

    if (application.category === "ST") {
      categoryScore = 100;
    } else if (application.category === "SC") {
      categoryScore = 90;
    } else if (application.category === "OBC") {
      categoryScore = 80;
    } else {
      categoryScore = 60;
    }

    // Weighted score
    const finalScore =
      marksScore * 0.5 +
      incomeScore * 0.3 +
      categoryScore * 0.2;

    application.meritScore = Number(finalScore.toFixed(2));

    await application.save();

    res.json({
      message: "Merit score calculated successfully",
      applicationId: application.applicationId,
      meritScore: application.meritScore
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
export const getRanking = async (req, res) => {
  try {
    const { scheme } = req.params;

    const applications = await Application.find({
      scheme: scheme,
      eligibilityStatus: "ELIGIBLE",
      documentStatus: "VERIFIED"
    }).sort({
      meritScore: -1
    });

    // Assign ranks
    for (let i = 0; i < applications.length; i++) {
      applications[i].rank = i + 1;
      await applications[i].save();
    }

    res.json({
      scheme,
      totalApplicants: applications.length,
      ranking: applications
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};