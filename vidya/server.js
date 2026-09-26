import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import eligibilityRoutes from "./routes/eligibilityRoutes.js";
import deficiencyRoutes from "./routes/deficiencyRoutes.js";
import documentVerificationRoutes from "./routes/documentVerificationRoutes.js";
import selectionRoutes from "./routes/selectionRoutes.js";
import rankingRoutes
  from "./routes/rankingRoutes.js";

import duplicateRoutes
  from "./routes/duplicateRoutes.js";
import resubmissionRoutes from "./routes/resubmissionRoutes.js";
import analyticsRoutes
  from "./routes/analyticsRoutes.js";


dotenv.config();


const app = express();


app.use(cors());

app.use(express.json());
app.use("/api/admin", selectionRoutes);

app.use("/api/admin", documentVerificationRoutes);
// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    console.log(
      "MongoDB connected successfully"
    );

  })
  .catch((error) => {

    console.error(
      "MongoDB connection failed:",
      error.message
    );

  });


// Routes

app.use(
  "/api/admin",
  rankingRoutes
);

app.use(
  "/api/admin",
  duplicateRoutes
);

app.use(
  "/api/admin",
  analyticsRoutes
);
app.use("/api/admin", eligibilityRoutes);
app.use("/api/admin", deficiencyRoutes);
app.use("/api/admin", resubmissionRoutes);
// Health check

app.get(
  "/",
  (req, res) => {

    res.json({

      message:
        "Member 5 Selection & Analytics Engine is running"

    });

  }
);


const PORT =
  process.env.PORT || 5000;


app.listen(
  PORT,
  () => {

    console.log(
      `Server running on port ${PORT}`
    );

  }
);