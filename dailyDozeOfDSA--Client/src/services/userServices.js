import axios from "axios";

export async function updateUserDetails(
  updatedUserName,
  updatedUserProfilePic
) {
  const formDataToSend = new FormData();
  formDataToSend.append("updatedUserName", updatedUserName);
  updatedUserProfilePic
    ? formDataToSend.append("file", updatedUserProfilePic)
    : null;
  try {
    const response = await axios.put(
      "/api/v1/user/updateUserDetails",
      formDataToSend,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateUserCodingProfile(profileName, profileLink) {
  try {
    const response = await axios.post("/api/v1/user/updateUserCodingProfile", {
      profileName,
      profileLink,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateUserSocialProfile(profileName, profileLink) {
  try {
    const response = await axios.post("/api/v1/user/updateUserSocialProfile", {
      profileName,
      profileLink,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function deleteUserCodingProfile(profileId) {
  try {
    const response = await axios.delete(
      `/api/v1/user/deleteUserCodingProfile/${profileId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function deleteUserSocialProfile(profileId) {
  try {
    const response = await axios.delete(
      `/api/v1/user/deleteUserSocialProfile/${profileId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateUserProblemStatus(
  problemId,
  problemStatus,
  sheetName
) {
  try {
    const response = await axios.post("/api/v1/user/updateUserProblemStatus", {
      problemId,
      problemStatus,
      sheetName,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateUserProblemNotes(
  problemId,
  problemNote,
  sheetName
) {
  try {
    const response = await axios.post("/api/v1/user/updateUserProblemNotes", {
      problemId,
      problemNote,
      sheetName,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateUserEngNotesSavedStatus(noteId) {
  try {
    const response = await axios.post(
      `/api/v1/user/updateUserEngNotesSavedStatus?noteId=${noteId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getUserSavedEngineeringNotes() {
  try {
    const response = await axios.get("/api/v1/user/getUserEngineeringNotes");
    return response;
  } catch (error) {
    throw error;
  }
}
