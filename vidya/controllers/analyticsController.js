import Application from "../models/Application.js";


export const getAnalytics =
  async (req, res) => {

    try {

      // ==============================
      // BASIC COUNTS
      // ==============================

      const totalApplications =
        await Application.countDocuments();


      const verified =
        await Application.countDocuments({
          status: {
            $in: [
              "VERIFIED",
              "ELIGIBLE"
            ]
          }
        });


      const eligible =
        await Application.countDocuments({
          status: {
            $in: [
              "ELIGIBLE"
            ]
          }
        });


      const recommended =
        await Application.countDocuments({
          selectionStatus:
            "RECOMMENDED"
        });


      const waitlisted =
        await Application.countDocuments({
          selectionStatus:
            "WAITLISTED"
        });


      const rejected =
        await Application.countDocuments({
          status:
            "REJECTED"
        });


      const duplicateFlags =
        await Application.countDocuments({
          duplicateStatus:
            "NEEDS_REVIEW"
        });


      // ==============================
      // APPLICATIONS BY STATE
      // ==============================

      const byState =
        await Application.aggregate([

          {
            $group: {
              _id: "$state",

              count: {
                $sum: 1
              }
            }
          },

          {
            $sort: {
              count: -1
            }
          }

        ]);


      // ==============================
      // APPLICATIONS BY SCHEME
      // ==============================

      const byScheme =
        await Application.aggregate([

          {
            $group: {
              _id: "$schemeId",

              count: {
                $sum: 1
              }
            }
          },

          {
            $sort: {
              count: -1
            }
          }

        ]);


      // ==============================
      // STATUS BREAKDOWN
      // ==============================

      const byStatus =
        await Application.aggregate([

          {
            $group: {
              _id: "$status",

              count: {
                $sum: 1
              }
            }
          }

        ]);


      // ==============================
      // AVERAGE PROCESSING TIME
      // submittedAt → verifiedAt
      // ==============================

      const processingData =
        await Application.aggregate([

          {
            $match: {
              submittedAt: {
                $exists: true
              },

              verifiedAt: {
                $exists: true
              }
            }
          },

          {
            $project: {

              processingTimeHours: {

                $divide: [

                  {
                    $subtract: [
                      "$verifiedAt",
                      "$submittedAt"
                    ]
                  },

                  1000 * 60 * 60

                ]

              }

            }
          },

          {
            $group: {

              _id: null,

              averageHours: {
                $avg:
                  "$processingTimeHours"
              }

            }

          }

        ]);


      const averageProcessingTime =
        processingData.length > 0
          ? Number(
              processingData[0]
                .averageHours
                .toFixed(2)
            )
          : 0;


      // ==============================
      // DROP-OFF RATES
      // ==============================

      const submitted =
        totalApplications;


      const verifiedCount =
        verified;


      const eligibleCount =
        eligible;


      const recommendedCount =
        recommended;


      // Submitted → Verified
      const submittedToVerifiedDropOff =
        submitted > 0
          ? Number(
              (
                ((submitted -
                  verifiedCount) /
                  submitted) *
                100
              ).toFixed(2)
            )
          : 0;


      // Verified → Eligible
      const verifiedToEligibleDropOff =
        verifiedCount > 0
          ? Number(
              (
                ((verifiedCount -
                  eligibleCount) /
                  verifiedCount) *
                100
              ).toFixed(2)
            )
          : 0;


      // Eligible → Recommended
      const eligibleToRecommendedDropOff =
        eligibleCount > 0
          ? Number(
              (
                ((eligibleCount -
                  recommendedCount) /
                  eligibleCount) *
                100
              ).toFixed(2)
            )
          : 0;


      // ==============================
      // RESPONSE
      // ==============================

      res.json({

        overview: {

          totalApplications,

          verified,

          eligible,

          recommended,

          waitlisted,

          rejected,

          duplicateFlags

        },


        applicationsByState:
          byState,


        applicationsByScheme:
          byScheme,


        statusBreakdown:
          byStatus,


        averageProcessingTime: {

          hours:
            averageProcessingTime

        },


        dropOffRates: {

          submittedToVerified:
            submittedToVerifiedDropOff,

          verifiedToEligible:
            verifiedToEligibleDropOff,

          eligibleToRecommended:
            eligibleToRecommendedDropOff

        }

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        message:
          "Analytics generation failed",

        error:
          error.message

      });

    }

  };