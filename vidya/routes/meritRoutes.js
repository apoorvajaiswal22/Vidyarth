import express from "express";

import {
  calculateMerit,
  getRanking
} from "../controllers/meritController.js";

const router = express.Router();

router.post("/calculate", calculateMerit);

router.get("/ranking/:scheme", getRanking);

export default router;