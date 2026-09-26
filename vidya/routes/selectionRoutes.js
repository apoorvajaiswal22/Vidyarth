import express from "express";
import {
  updateSelectionDecision,
  getSelectionAuditHistory
} from "../controllers/selectionController.js";

const router = express.Router();
router.get(
  "/applications/:application_id/selection-audit",
  getSelectionAuditHistory
);
router.put(
  "/applications/:application_id/selection-decision",
  updateSelectionDecision
);

export default router;