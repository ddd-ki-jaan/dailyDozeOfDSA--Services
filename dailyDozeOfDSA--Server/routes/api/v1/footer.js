import express from 'express';
import {
    saveContactUs,
    saveReportBug
} from "../../../controllers/footerController.js";

const { Router } = express;
const router = Router();

router.post("/contactUs", saveContactUs);
router.post("/reportBug", saveReportBug);

export default router;