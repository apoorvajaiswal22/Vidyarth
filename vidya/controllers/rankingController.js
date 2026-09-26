import Application from "../models/Application.js";
import Scheme from "../models/Scheme.js";
import { calculateMeritScore } from "../services/scoringService.js";

export const getRankedApplications = async (req, res) => {
  try {
    const { scheme_id } = req.params;

    // Find scheme
    const scheme = await Scheme.findOne({
      schemeId: scheme_id
    });

    if (!scheme) {
      return res.status(404).json({
        message: "Scheme not found"
      });
    }

    // Get eligible and document-verified applications
    // belonging to the required category.
    const applications = await Application.find({
      schemeId: scheme_id,
      status: "ELIGIBLE",
      documentStatus: "VERIFIED",
      category: scheme.eligibilityRules.requiredCategory
    });

    // Calculate merit score
    const scoredApplications = applications.map((application) => {
      const score = calculateMeritScore(
        application,
        scheme
      );

      return {
        application,
        ...score
      };
    });

    // Sort applications
    scoredApplications.sort((a, b) => {
      // Higher merit score first
      if (b.finalScore !== a.finalScore) {
        return b.finalScore - a.finalScore;
      }

      // Lower income first
      if (
        a.application.income !==
        b.application.income
      ) {
        return (
          a.application.income -
          b.application.income
        );
      }

      // Earlier submission first
      return (
        new Date(a.application.submittedAt) -
        new Date(b.application.submittedAt)
      );
    });

    // Create ranked response
    const rankedApplications =
      scoredApplications.map((item, index) => {
        const rank = index + 1;

        // Algorithmic recommendation only.
        // This is NOT saved to MongoDB.
        const algorithmRecommendation =
          rank <= scheme.seatLimit
            ? "RECOMMENDED"
            : "WAITLISTED";

        /*
         * IMPORTANT:
         *
         * Always use the actual admin selection status
         * if it already exists.
         *
         * Only PENDING applications use the
         * algorithmic recommendation.
         */
        let selectionStatus;

        if (
          item.application.selectionStatus &&
          item.application.selectionStatus !== "PENDING"
        ) {
          selectionStatus =
            item.application.selectionStatus;
        } else {
          selectionStatus =
            algorithmRecommendation;
        }

        // Debug information
        console.log(
          "RANKING:",
          item.application.applicationId,
          "| MongoDB status:",
          item.application.selectionStatus,
          "| Returned status:",
          selectionStatus
        );

        return {
          applicationId:
            item.application.applicationId,

          name:
            item.application.name,

          state:
            item.application.state,

          category:
            item.application.category,

          marks:
            item.application.marks,

          income:
            item.application.income,

          marksScore:
            item.marksScore,

          incomeScore:
            item.incomeScore,

          categoryScore:
            item.categoryScore,

          contributions: {
            marks: Number(
              (
                item.marksScore *
                scheme.scoringWeights.marks
              ).toFixed(2)
            ),

            income: Number(
              (
                item.incomeScore *
                scheme.scoringWeights.income
              ).toFixed(2)
            ),

            category: Number(
              (
                item.categoryScore *
                scheme.scoringWeights.category
              ).toFixed(2)
            )
          },

          meritScore:
            item.finalScore,

          rank,

          // Actual admin decision OR
          // temporary algorithmic recommendation
          selectionStatus
        };
      });

    /*
     * IMPORTANT:
     *
     * Only meritScore and rank are saved.
     *
     * selectionStatus is NEVER updated here.
     *
     * Therefore:
     *
     * Admin WAITLISTED remains WAITLISTED.
     * Admin REJECTED remains REJECTED.
     * Admin RECOMMENDED remains RECOMMENDED.
     */
    for (const item of rankedApplications) {
      await Application.updateOne(
        {
          applicationId:
            item.applicationId
        },
        {
          $set: {
            meritScore:
              item.meritScore,

            rank:
              item.rank
          }
        }
      );
    }

    return res.json({
      schemeId:
        scheme.schemeId,

      schemeName:
        scheme.name,

      seatLimit:
        scheme.seatLimit,

      totalApplications:
        rankedApplications.length,

      applications:
        rankedApplications
    });

  } catch (error) {
    console.error(
      "Ranking generation error:",
      error
    );

    return res.status(500).json({
      message:
        "Ranking generation failed",

      error:
        error.message
    });
  }
};