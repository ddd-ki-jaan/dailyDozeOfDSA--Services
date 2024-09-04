import express from "express";
import {
  getEngineeringNotes,
  getEngineeringNoteCategories,
  getEngineeringNoteTags,
  getEngineeringNoteById,
  yelloGetEngineeringNotes,
  getNotesUrlFromSlug,
} from "../../../controllers/engineeringNotesController.js";

const { Router } = express;
const router = Router();

router.get("/getEngineeringNotes", yelloGetEngineeringNotes);
router.get("/getEngineeringNoteCategories", getEngineeringNoteCategories);
router.get("/getEngineeringNoteTags", getEngineeringNoteTags);
router.get("/getEngineeringNoteById/:noteId", getEngineeringNoteById);
router.get("/getNotesUrlFromSlug", getNotesUrlFromSlug);

export default router;