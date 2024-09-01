import express from "express";
import {
  getJobs,
  getAllJobs,
  getAllCompanies,
  getAllTags,
  getTotalNumOfJobs,
} from "../../../controllers/jobController.js";

const { Router } = express;
const router = Router();

router.get("/getJobs", getJobs);
// router.get("/all-jobs", getAllJobs);
// router.get("/all-companies", getAllCompanies);
// router.get("/all-tags", getAllTags);
router.get("/getTotalNumOfJobs", getTotalNumOfJobs);

export default router;
