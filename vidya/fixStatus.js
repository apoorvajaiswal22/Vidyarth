import mongoose from "mongoose";
import dotenv from "dotenv";
import Application from "./models/Application.js";

dotenv.config();

async function fixStatus() {
  try {

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const result =
      await Application.updateMany(
        {
          schemeId: "SCH001"
        },
        {
          $set: {
            status: "ELIGIBLE"
          }
        }
      );

    console.log(
      `${result.modifiedCount} applications restored to ELIGIBLE`
    );

    await mongoose.disconnect();

    console.log("Done");

  } catch (error) {

    console.error(
      "Error:",
      error.message
    );

  }
}

fixStatus();