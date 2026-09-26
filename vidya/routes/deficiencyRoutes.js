import express from "express";

import {
  checkDeficiency,
  verifyResubmission
} from "../controllers/deficiencyController.js";

const router = express.Router();

router.get(
  "/applications/:application_id/deficiency",
  checkDeficiency
);

router.post(
  "/applications/:application_id/verify-resubmission",
  verifyResubmission
);

export default router;