import { ensureAuthentication } from "../../../middleware/authMiddleware.js";
import {
  deleteUserCodingProfile,
  deleteUserSocialProfile,
  updateUserCodingProfile,
  updateUserProblemNotes,
  updateUserProblemStatus,
  updateUserSocialProfile,
  udpateUserEngNotesSavedStatus,
  getUserEngineeringNotes,
} from "../../../controllers/userController.js";
import { updateUserDetails } from "../../../services/userServices.js";
import { updateUser } from "../../../controllers/userController.js";
import upload from "../../../middleware/multerMiddleware.js";
import { Router } from "express";

const router = Router();

/** route for updating user profile details - name and profileImg */
router.put(
  "/updateUserDetails",
  ensureAuthentication,
  upload.single("file"),
  updateUser
);

/** route for updating user coding profile details */
router.post(
  "/updateUserCodingProfile",
  ensureAuthentication,
  updateUserCodingProfile
);

/** route for updating user social profile details */
router.post(
  "/updateUserSocialProfile",
  ensureAuthentication,
  updateUserSocialProfile
);

/** route for deleting user coding profile */
router.delete(
  "/deleteUserCodingProfile/:profileId",
  ensureAuthentication,
  deleteUserCodingProfile
);

/** route for deleting user social profile */
router.delete(
  "/deleteUserSocialProfile/:profileId",
  ensureAuthentication,
  deleteUserSocialProfile
);

/** route for updating user problem status - pending, done or revisit */
router.post(
  "/updateUserProblemStatus",
  ensureAuthentication,
  updateUserProblemStatus
);

/** route for updating user problem note */
router.post(
  "/updateUserProblemNotes",
  ensureAuthentication,
  updateUserProblemNotes
);

router.post(
  "/updateUserEngNotesSavedStatus",
  ensureAuthentication,
  udpateUserEngNotesSavedStatus
);

router.get(
  "/getUserEngineeringNotes",
  ensureAuthentication,
  getUserEngineeringNotes
);

export default router;
