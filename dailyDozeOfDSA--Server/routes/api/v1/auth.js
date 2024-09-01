import express, { request } from "express";
import dotenv from "dotenv";
import passport from "passport";
import User from "../../../models/User/User.js";

dotenv.config();

const { Router } = express;
const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

/** google auth login success and failure conditions */
router.get("/login/google/success", (request, response) => {
  response.redirect(`${process.env.CLIENT_URL}/?logIn=success`);
});

router.get("/login/google/failed", (request, response) => {
  response.redirect(`${process.env.CLIENT_URL}/?logIn=failed`);
});

/** github auth login success and failure conditions */
router.get("/login/github/success", (request, response) => {
  response.redirect(`${process.env.CLIENT_URL}/?logIn=success`);
});

router.get("/login/github/failed", (request, response) => {
  response.redirect(`${process.env.CLIENT_URL}/?logIn=failed`);
});

/** route for logging user out */
router.get("/logout", (request, response) => {
  if (request.session) {
    console.log("*** yello session: ***", request.session);
    request.session.destroy((error) => {
      if (error) {
        response.status(500).json({
          success: false,
          redirectUrl: "/?logOut=failed",
        });
      } else {
        response.status(200).json({
          success: true,
          redirectUrl: "/?logOut=success",
        });
      }
    });
  } else {
    response.status(200).json({
      success: true,
      redirectUrl: "/?logOut=success",
    });
  }
});

router.get("/check-session", async (request, response) => {
  try {
    if (request.isAuthenticated()) {
      let session_user = request.user;
      let user = await User.findById(session_user._id)
        .populate({
          path: "userCodingProfiles",
          model: "UserProfile",
        })
        .populate({
          path: "userSocialProfiles",
          model: "UserProfile",
        })
        .populate({
          path: "sdeSheetsProblemStatus",
          model: "UserProblemStatus",
        });
      return response.json({ loggedIn: true, user });
    } else {
      return response.json({ loggedIn: false, user: null });
    }
  } catch (error) {
    console.log("*** check-session error: ***", error);
    return response.json({ loggedIn: false, user: null });
  }
});

// callback route for google to redirect to
router.get(
  "/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "/api/v1/auth/login/google/failed",
    successRedirect: "/api/v1/auth/login/google/success",
  })
);

// callback route for github to redirect to
router.get(
  "/github/redirect",
  passport.authenticate("github", {
    failureRedirect: "/api/v1/auth/login/github/failed",
    successRedirect: "/api/v1/auth/login/github/success",
  })
);

export default router;
