import express from "express";

import {
  checkDuplicates,
  reviewDuplicate
} from "../controllers/duplicateController.js";
const router = express.Router();
router.put(
  "/applications/:application_id/duplicate-review",
  reviewDuplicate
);
router.get(
  "/duplicates",
  checkDuplicates
);

export default router;