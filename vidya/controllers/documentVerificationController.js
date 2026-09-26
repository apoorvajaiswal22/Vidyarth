import Application from "../models/Application.js";
import { verifyDocument } from "../services/documentVerificationService.js";
import { extractTextFromImage } from "../services/ocrService.js";
import { extractDocumentFields } from "../services/documentFieldExtractor.js";

export const verifyDocumentController = async (req, res) => {
  try {
    const { application_id } = req.params;

    const application = await Application.findOne({
      applicationId: application_id
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Document image is required"
      });
    }

    // 1. OCR
    const extractedText = await extractTextFromImage(req.file.path);

    // 2. Extract structured fields from OCR text
    const extractedData = extractDocumentFields(extractedText);

    // 3. Compare extracted fields with application data
    const verificationResult = verifyDocument(
      application,
      extractedData
    );

    return res.json({
      applicationId: application.applicationId,
      applicantName: application.name,
      extractedData,
      verification: verificationResult
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "OCR document verification failed",
      error: error.message
    });
  }
};