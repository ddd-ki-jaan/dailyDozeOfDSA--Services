import express from 'express';
import { 
    getAboutus,
    getHomeSubtittle,
    getSiteOffering
} from "../../../controllers/homeController.js";

const { Router } = express;
const router = Router();

router.get('/aboutUs', getAboutus);
router.get('/homeSubtittle', getHomeSubtittle);
router.get('/siteOffering', getSiteOffering);

export default router;