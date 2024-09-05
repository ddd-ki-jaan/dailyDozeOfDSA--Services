import User from "../models/User/User.js";
import UserCodingProfileEnum from "../enums/UserCodingProfileEnum.js";
import UserSocialProfileEnum from "../enums/UserSocialProfileEnum.js";
import UserProfile from "../models/User/UserProfile.js";
import UserProblemStatusEnum from "../enums/UserProblemStatusEnum.js";
import UserProblemStatus from "../models/User/UserProblemStatus.js";
import SavedNote from "../models/User/SavedNote.js";
import Note from "../models/Notes/NoteModel.js";
import ProblemSheetNameEnum from "../enums/ProblemSheetNameEnum.js";
import { updateUserDetails } from "../services/userServices.js";
import { isValidCodingProfileLink, isValidSocialProfileLink } from "../services/utilServices.js";

export async function updateUser(request, response) {
  try {
    const session_user = request.user;
    const { updatedUserName } = request.body;
    const file = request.file;

    const updatedUser = await updateUserDetails(
      session_user._id,
      updatedUserName,
      file
    );

    return response.status(200).json({
      success: true,
      message: "user details got updated successfully",
      updatedUserName: updatedUser.name,
      updatedProfilePicUrl: updatedUser.profilePicUrl,
    });
  } catch (error) {
    console.error("***updateUser error***", error);
    return response.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
}

export async function updateUserCodingProfile(request, response) {
  try {
    const session_user = request.user;
    const { profileName, profileLink } = request.body;
    if (!profileName || !profileLink) {
      return response.status(400).json({
        success: false,
        message: "you need to provide both profileName as well as profileLink",
      });
    }

    if (!UserCodingProfileEnum.includes(profileName)) {
      return response.status(400).json({
        success: false,
        message: "profile name couldn't be recognized",
      });
    }

    if (!isValidCodingProfileLink(profileName, profileLink)) {
      return response.status(400).json({
        success: false,
        message: "Invalid profile link for the selected profile name",
      });
    }

    /** search if there exists a user coding profile by the profileName */
    let user = await User.findById(session_user._id).populate({
      path: "userCodingProfiles",
      model: "UserProfile",
    });

    let codingProfileObj = user.userCodingProfiles.find(
      (curr_profile) => curr_profile.profileName === profileName
    );
    console.log("*** codingProfileObj: ***", codingProfileObj);
    if (!!codingProfileObj) {
      /** if there exists a user profile by the profileName,
       * then update the profileLink of the same
       */
      codingProfileObj.profileLink = profileLink;

      await codingProfileObj.save();

      const user = await User.findById(session_user._id).populate({
        path: "userCodingProfiles",
        model: "UserProfile",
      });
      let userCodingProfiles = user.userCodingProfiles;
      userCodingProfiles.map((curr_profile) => {
        if (curr_profile.profileName !== profileName) return curr_profile;
        else return { ...curr_profile, profileLink };
      });

      user.userCodingProfiles = userCodingProfiles;
      const savedUser = await user.save();
      const updatedUser = await savedUser.populate({
        path: "userCodingProfiles",
        model: "UserProfile",
      });

      return response.status(200).json({
        success: true,
        message: "your coding profile got updated successfully",
        updatedUserCodingProfiles: updatedUser.userCodingProfiles,
      });
    }

    /** if there not exists a user profile by the profileName,
     * then create a new one
     */
    const newCodingProfileDoc = await UserProfile.create({
      profileName,
      profileLink,
    });

    user.userCodingProfiles.push(newCodingProfileDoc);
    const savedUser = await user.save();
    const updatedUser = await savedUser.populate({
      path: "userCodingProfiles",
      model: "UserProfile",
    });

    return response.status(200).json({
      success: true,
      message: "your coding profile got updated successfully",
      updatedUserCodingProfiles: updatedUser.userCodingProfiles,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
}

export async function deleteUserCodingProfile(request, response) {
  try {
    console.log("*** inside deleteUserCodingProfile controller ***");
    const session_user = request.user;
    const { profileId } = request.params;
    console.log(profileId);

    if (!profileId) {
      return response.status(400).json({
        success: false,
        message: "profile id must be provided",
      });
    }

    const deleteResult = await UserProfile.deleteOne({ _id: profileId });

    if (deleteResult.deletedCount && deleteResult.deletedCount === 0) {
      return response.status(404).json({
        success: false,
        message: "user social/coding profile not found",
      });
    }

    let user = await User.findById(session_user._id);
    let updatedUserCodingProfiles = user.userCodingProfiles.filter(
      (curr_profile) => curr_profile.toString() !== profileId
    );

    user.userCodingProfiles = updatedUserCodingProfiles;
    let savedUser = await user.save();
    let updatedUser = await savedUser.populate({
      path: "userCodingProfiles",
      model: "UserProfile",
    });

    return response.status(200).json({
      success: true,
      message: "user coding profile deleted successfully",
      updatedUserCodingProfiles: updatedUser.userCodingProfiles,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
}

export async function updateUserSocialProfile(request, response) {
  try {
    const session_user = request.user;
    const { profileName, profileLink } = request.body;
    if (!profileName || !profileLink) {
      return response.status(400).json({
        success: false,
        message: "you need to provide both profileName as well as profileLink",
      });
    }

    if (!UserSocialProfileEnum.includes(profileName)) {
      return response.status(400).json({
        success: false,
        message: "profile name couldn't be recognized",
      });
    }

    if (!isValidSocialProfileLink(profileName, profileLink)) {
      return response.status(400).json({
        success: false,
        message: "Invalid profile link for the selected profile name",
      });
    }

    /** search if there exists a user coding profile by the profileName */
    let user = await User.findById(session_user._id).populate({
      path: "userSocialProfiles",
      model: "UserProfile",
    });

    let socialProfileObj = user.userSocialProfiles.find(
      (curr_profile) => curr_profile.profileName === profileName
    );

    if (!!socialProfileObj) {
      /** if there exists a user profile by the profileName,
       * then update the profileLink of the same
       */
      socialProfileObj.profileLink = profileLink;

      await socialProfileObj.save();

      const user = await User.findById(session_user._id).populate({
        path: "userSocialProfiles",
        model: "UserProfile",
      });
      let userSocialProfiles = user.userSocialProfiles;
      userSocialProfiles.map((curr_profile) => {
        if (curr_profile.profileName !== profileName) return curr_profile;
        else return { ...curr_profile, profileLink };
      });

      user.userSocialProfiles = userSocialProfiles;
      const savedUser = await user.save();
      const updatedUser = await savedUser.populate({
        path: "userSocialProfiles",
        model: "UserProfile",
      });

      console.log("*** updatedUser: ***", updatedUser);

      return response.status(200).json({
        success: true,
        message: "your social profile got updated successfully",
        updatedUserSocialProfiles: updatedUser.userSocialProfiles,
      });
    }

    /** if there not exists a user profile by the profileName,
     * then create a new one
     */
    const newSocialProfileDoc = await UserProfile.create({
      profileName,
      profileLink,
    });

    user.userSocialProfiles.push(newSocialProfileDoc);
    const savedUser = await user.save();
    const updatedUser = await savedUser.populate({
      path: "userSocialProfiles",
      model: "UserProfile",
    });

    return response.status(200).json({
      success: true,
      message: "your social profile got updated successfully",
      updatedUserSocialProfiles: updatedUser.userSocialProfiles,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
}

export async function deleteUserSocialProfile(request, response) {
  try {
    console.log("*** inside deleteUserSocialProfile controller ***");
    const session_user = request.user;
    const { profileId } = request.params;
    console.log(profileId);

    if (!profileId) {
      return response.status(400).json({
        success: false,
        message: "profile id must be provided",
      });
    }

    const deleteResult = await UserProfile.deleteOne({ _id: profileId });

    if (deleteResult.deletedCount && deleteResult.deletedCount === 0) {
      return response.status(404).json({
        success: false,
        message: "user social/coding profile not found",
      });
    }

    let user = await User.findById(session_user._id);
    let updatedUserSocialProfiles = user.userSocialProfiles.filter(
      (curr_profile) => curr_profile.toString() !== profileId
    );

    user.userSocialProfiles = updatedUserSocialProfiles;
    let savedUser = await user.save();
    let updatedUser = await savedUser.populate({
      path: "userSocialProfiles",
      model: "UserProfile",
    });

    return response.status(200).json({
      success: true,
      message: "user social profile deleted successfully",
      updatedUserSocialProfiles: updatedUser.userSocialProfiles,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
}

export async function updateUserProblemStatus(request, response) {
  try {
    const sessionUser = request.user;
    const { problemId, problemStatus, sheetName } = request.body;

    if (!problemId) {
      return response.status(400).json({
        success: false,
        message: "problem id must be provided",
      });
    }

    if (!problemStatus) {
      return response.status(400).json({
        success: false,
        message: "problem status must be provided",
      });
    }

    if (!sheetName) {
      return response.status(400).json({
        success: false,
        message: "sheet name must be provided",
      });
    }

    /** check if the problem status matches the enum value */
    const problemStatusEnumExists =
      UserProblemStatusEnum.includes(problemStatus);

    if (!problemStatusEnumExists) {
      return response.status(400).json({
        success: false,
        message: "problem status couldn't be recognized",
      });
    }

    /** check if the problem sheet name is in the ProblemSheetNameEnum array */
    if (!ProblemSheetNameEnum.includes(sheetName)) {
      return response.status(400).json({
        success: false,
        message: "sheet name couldn't be recognized",
      });
    }

    /** upsert the document with the new problem status */
    const updatedUserProblemStatusDoc =
      await UserProblemStatus.findOneAndUpdate(
        {
          problem: problemId,
          user: sessionUser,
        },
        {
          $set: {
            problemStatus: problemStatus,
            sheetName: sheetName,
          },
        },
        {
          upsert: true,
          new: true,
        }
      );

    return response.status(200).json({
      success: true,
      message: "problem status got updated successfully",
      updatedUserProblemStatusDoc,
    });
  } catch (error) {
    console.log("*** updateUserProblemStatus error: ***", error);
    return response.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
}

export async function updateUserProblemNotes(request, response) {
  try {
    const sessionUser = request.user;

    const { problemNote, problemId, sheetName } = request.body;
    if (!problemNote || problemNote.length === 0) {
      return response.status(400).json({
        success: false,
        message: "problem note must be provided",
      });
    }

    if (!problemId) {
      return response.status(400).json({
        success: false,
        message: "problem id must be provided",
      });
    }

    if (!sheetName) {
      return response.status(400).json({
        success: false,
        message: "sheet name must be provided",
      });
    }

    /** check if sheet name is in the ProblemSheetNameEnum array */
    if (!ProblemSheetNameEnum.includes(sheetName)) {
      return response.status(400).json({
        success: false,
        message: "sheet name couldn't be recognized",
      });
    }

    if (problemNote.length > 1500) {
      return response.status(400).json({
        success: false,
        message:
          "total number of characters in the problem note cannot excceed 1500",
      });
    }

    /** upsert the document with the new problem note */
    const updatedUserProblemStatusDoc =
      await UserProblemStatus.findOneAndUpdate(
        {
          problem: problemId,
          user: sessionUser,
        },
        {
          $set: {
            problemNote: problemNote,
            sheetName: sheetName,
          },
        },
        {
          upsert: true,
          new: true,
        }
      );

    return response.status(200).json({
      success: true,
      message: "problem note got updated successfully",
      updatedUserProblemStatusDoc,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
}

export async function udpateUserEngNotesSavedStatus(request, response) {
  try {
    const sessionUser = request.user;
    const noteId = request.query.noteId;

    if (!noteId) {
      return response.status(400).json({
        success: false,
        message: "note id must be provided",
      });
    }

    const note = await Note.findById(noteId);
    if (!note) {
      return response.status(404).json({
        success: false,
        message: "invalid note, note id couldn't be recognized",
      });
    }

    let savedNote = await SavedNote.findOne({
      note: noteId,
      createdBy: sessionUser,
    });

    if (!savedNote) {
      savedNote = new SavedNote({
        note: noteId,
        isSaved: true,
        createdBy: sessionUser,
        updatedBy: sessionUser,
      });
    } else {
      savedNote.isSaved = !savedNote.isSaved;
      savedNote.updatedBy = sessionUser;
    }

    const savedNoteResult = await savedNote.save();
    return response.status(200).json({
      success: true,
      message: savedNoteResult.isSaved
        ? "notes got saved successfully"
        : "notes got removed from your saved collection successfully",
      data: savedNoteResult,
    });
  } catch (error) {
    console.log("*** updateUserEngNotesSavedStatus error: ***", error);
    return response.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
}

export async function getUserEngineeringNotes(request, response) {
  try {
    const sessionUser = request.user;

    const notes = await SavedNote.find({
      createdBy: sessionUser,
      isSaved: true,
    }).populate({
      path: "note",
      populate: [
        { path: "noteTags", model: "NoteTag" },
        { path: "noteCategories", model: "NoteCategory" },
        { path: "noteContent", model: "Media" },
      ],
    });
    response.status(200).json({ success: true, data: notes });
  } catch (error) {
    console.log("Error fetching user engineering notes:", error);
    response.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
}
