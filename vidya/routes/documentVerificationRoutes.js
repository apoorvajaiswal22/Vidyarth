import express from "express";
import multer from "multer";

import {
  verifyDocumentController
} from "../controllers/documentVerificationController.js";

const router = express.Router();

const upload = multer({
  dest: "uploads/"
});

router.post(
  "/applications/:application_id/document-verification",
  upload.single("document"),
  verifyDocumentController
);

export default router;