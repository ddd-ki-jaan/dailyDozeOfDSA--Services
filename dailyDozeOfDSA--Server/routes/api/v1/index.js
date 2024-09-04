import express from "express";
import auth from "./auth.js";
import problemSheet from "./problemSheet.js";
import job from "./job.js";
import user from "./user.js";
import home from "./home.js";
import footer from "./footer.js";
import note from "./engineeringNotes.js";
const { Router } = express;
const router = Router();

router.use("/auth", auth);
router.use("/problemSheet", problemSheet);
router.use("/jobOpenings", job);
router.use("/user", user);
router.use("/home", home);
router.use("/footer", footer);
router.use("/notes", note);

export default router;