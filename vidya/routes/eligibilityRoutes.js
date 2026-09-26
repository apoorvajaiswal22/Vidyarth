import express from "express";
import {
  checkApplicationEligibility
} from "../controllers/eligibilityController.js";

const router = express.Router();

router.get(
  "/applications/:application_id/eligibility",
  checkApplicationEligibility
);

export default router;