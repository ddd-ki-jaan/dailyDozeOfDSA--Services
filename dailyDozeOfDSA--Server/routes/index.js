import express from "express";
import apiRouter from "./api/index.js";
const { Router } = express;
const router = Router();
console.log("ooo yeah...");

router.get("/", (req, res) => {
  // console.log("*** req.session: ***", req.session)
  res.send("yello home...");
});

// router.get("/set-session", (req, res) => {
//   req.session.username = "aman_patel";
//   console.log("set-session: ", req.session);
//   res.send("session-set.");
// });

// router.get("/get-session", (req, res) => {
//   console.log("get-session: ", req.session);
//   res.send("get-session");
// });

// router.get("/destroy-session", (req, res) => {
//   req.session.destroy(function (err) {
//     if (err) {
//       console.log(err);
//       return;
//     }
//   });
//   res.send("destroy-session");
// });

router.use("/api", apiRouter);

export default router;
