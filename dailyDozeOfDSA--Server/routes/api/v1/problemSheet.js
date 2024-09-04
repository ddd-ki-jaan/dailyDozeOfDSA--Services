import express from "express";
import {
  getStriverSDESheet,
  getStriverA2ZSheet,
  getStriver79Sheet,
  getLoveBabbar450DSASheet,
  getApnaCollegeDSASheet,
  getBlind75Sheet,
  getNeetCodeSheet,
  getNishantChaharSDESheet,
  getProblemSheetsProblemsStatusDetails,
  getSheetDescription,
} from "../../../controllers/problemSheetController.js";
import { ensureAuthentication } from "../../../middleware/authMiddleware.js";

const { Router } = express;
const router = Router();

router.get("/getStriverSDESheet", getStriverSDESheet);
router.get("/getStriverA2ZSheet", getStriverA2ZSheet);
router.get("/getStriver79Sheet", getStriver79Sheet);
router.get("/getLoveBabbar450DSASheet", getLoveBabbar450DSASheet);
router.get("/getApnaCollegeDSASheet", getApnaCollegeDSASheet);
router.get("/getBlind75Sheet", getBlind75Sheet);
router.get("/getNeetCodeSheet", getNeetCodeSheet);
router.get("/getNishantChaharSDESheet", getNishantChaharSDESheet);
router.get("/getUserProblemStatusCounts", ensureAuthentication, getProblemSheetsProblemsStatusDetails);
router.get('/getProblemSheetDescription', getSheetDescription);

export default router;
