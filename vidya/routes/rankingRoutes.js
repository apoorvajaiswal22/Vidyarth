import express from "express";

import {
  getRankedApplications
} from "../controllers/rankingController.js";

const router = express.Router();

router.get(
  "/applications/:scheme_id/ranked",
  getRankedApplications
);

export default router;