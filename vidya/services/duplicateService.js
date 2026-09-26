import Application from "../models/Application.js";


export async function findDuplicateApplications() {

  const certificateDuplicates =
    await Application.aggregate([

      {
        $group: {
          _id: "$certificateNumber",

          applications: {
            $push: "$applicationId"
          },

          count: {
            $sum: 1
          }
        }
      },

      {
        $match: {
          count: {
            $gt: 1
          }
        }
      }

    ]);


  const idDuplicates =
    await Application.aggregate([

      {
        $group: {
          _id: "$idNumber",

          applications: {
            $push: "$applicationId"
          },

          count: {
            $sum: 1
          }
        }
      },

      {
        $match: {
          count: {
            $gt: 1
          }
        }
      }

    ]);


  return {
    certificateDuplicates,
    idDuplicates
  };
}