import express from "express";

import {
  resubmitApplicationController,
  updateResubmittedApplication
} from "../controllers/resubmissionController.js";

const router = express.Router();

router.post(
  "/applications/:application_id/resubmit",
  resubmitApplicationController
);

router.put(
  "/applications/:application_id/resubmit",
  updateResubmittedApplication
);

export default router;