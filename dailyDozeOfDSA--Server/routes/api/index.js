import express from "express";
import v1Router from "./v1/index.js";

const { Router } = express;
const router = Router();

router.use("/v1", v1Router);

export default router;
