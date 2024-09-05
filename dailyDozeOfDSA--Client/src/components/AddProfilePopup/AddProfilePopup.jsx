import React, { useContext, useState } from "react";
import {
  Modal,
  TextInput,
  Select,
  Label,
  Flowbite,
  Button,
} from "flowbite-react";
import { DashboardContext } from "../../contexts/dashboardContext";
import {
  updateUserCodingProfile,
  updateUserSocialProfile,
} from "../../services/userServices";
import { UserContext } from "../../contexts/userContext";
import toast, { Toaster } from "react-hot-toast";
import { handleApiError } from "../../constants/reusableFunctions";
import { useNavigate } from "react-router-dom";
import { BiLoaderAlt } from "react-icons/bi";

function AddProfilePopup({
  isSocialProfileModal,
  showPopup,
  togglePopup,
  title,
  dropdownOptions,
}) {
  const {
    selectedProfileName,
    selectedProfileLink,
    updateSelectedProfileName,
    updateSelectedProfileLink,
    profileNameInputError,
    profileLinkInputError,
    updateProfileNameInputError,
    updateProfileLinkInputError,
  } = useContext(DashboardContext);

  const { userLoggedInStatus, updateUserData, setUserLoggedInStatusToFalse } =
    useContext(UserContext);
  const { user } = userLoggedInStatus;

  const [profileSubmitted, setProfileSubmitted] = useState(false);

  const navigate = useNavigate();

  function changeProfileNameHandler(selecteProfileNameVal) {
    updateSelectedProfileName(
      selecteProfileNameVal,
      isSocialProfileModal ? user.userSocialProfiles : user.userCodingProfiles
    );
  }

  function changeProfileLinkHandler(inputProfileLinkVal) {
    updateSelectedProfileLink(inputProfileLinkVal);
  }

  function isValidCodingProfileLink(profileName, profileLink) {
    const regexMap = {
      CODEFORCES: /^https?:\/\/(www\.)?codeforces\.com\/profile\/[a-zA-Z0-9_]+\/?$/,
      CODECHEF: /^https?:\/\/(www\.)?codechef\.com\/users\/[a-zA-Z0-9_]+\/?$/,
      LEETCODE: /^https?:\/\/(www\.)?leetcode\.com\/u\/[a-zA-Z0-9_]+\/?$/,
      HACKERRANK: /^https?:\/\/(www\.)?hackerrank\.com\/profile\/[a-zA-Z0-9_]+\/?$/,
    };
  
    const regex = regexMap[profileName];
    return regex ? regex.test(profileLink) : false;
  }

  async function updateUserCodingProfileHandler() {
    if (profileSubmitted) return;

    try {
      if (!selectedProfileName || selectedProfileName.length === 0) {
        updateProfileNameInputError("you need to select a profile name");
        return;
      }
      if (!selectedProfileLink || selectedProfileLink.length === 0) {
        updateProfileLinkInputError(
          "you need to put the url corresponding to the profile name"
        );
        return;
      }
      if (!isValidCodingProfileLink(selectedProfileName, selectedProfileLink)) {
        updateProfileLinkInputError(
          `Invalid URL for ${selectedProfileName}. Please provide a valid URL.`
        );
        return;
      }

      setProfileSubmitted(true);
      const response = await updateUserCodingProfile(
        selectedProfileName,
        selectedProfileLink
      );

      if (response.data.success) {
        updateUserData(
          "userCodingProfiles",
          response.data.updatedUserCodingProfiles
        );
        toast.success(response.data.message, {
          position: "top-right",
          duration: 3000,
        });
      }
    } catch (error) {
      handleApiError(error, navigate, setUserLoggedInStatusToFalse);
    }

    setProfileSubmitted(false);
    togglePopup();
  }

  function isValidSocialProfileLink(profileName, profileLink) {
    const regexMap = {
      LINKEDIN: /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/,
      GITHUB: /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/,
      TWITTER: /^https?:\/\/(www\.)?x\.com\/[a-zA-Z0-9_]+\/?$/,
      YOUTUBE: /^https?:\/\/(www\.)?youtube\.com\/@?[a-zA-Z0-9_-]+\/?$/
    };
  
    const regex = regexMap[profileName];
    return regex ? regex.test(profileLink) : false;
  }  

  async function updateUserSocialProfileHandler() {
    if (profileSubmitted) return;
    try {
      if (!selectedProfileName || selectedProfileName.length === 0) {
        updateProfileNameInputError("you need to select a profile name");
        return;
      }
      if (!selectedProfileLink || selectedProfileLink.length === 0) {
        updateProfileLinkInputError(
          "you need to put the url corresponding to the profile name"
        );
        return;
      }
      if (!isValidSocialProfileLink(selectedProfileName, selectedProfileLink)) {
        updateProfileLinkInputError(
          `Invalid URL for ${selectedProfileName}. Please provide a valid URL.`
        );
        return;
      }

      setProfileSubmitted(true);
      const response = await updateUserSocialProfile(
        selectedProfileName,
        selectedProfileLink
      );

      if (response.data.success) {
        updateUserData(
          "userSocialProfiles",
          response.data.updatedUserSocialProfiles
        );
        toast.success(response.data.message, {
          position: "top-right",
          duration: 3000,
        });
      }
    } catch (error) {
      handleApiError(error, navigate, setUserLoggedInStatusToFalse);
    }

    setProfileSubmitted(false);
    togglePopup();
  }

  const customTheme = {
    textInput: {
      field: {
        input: {
          colors: {
            bllack:
              "border-gray-300 bg-gray-50 text-gray-900 focus:border-black focus:ring-black",
          },
        },
      },
    },
    select: {
      colors: {
        bllack:
          "border-gray-300 bg-gray-50 text-gray-900 focus:border-black focus:ring-black",
      },
    },
    button: {
      color: {
        bllack:
          "border border-black bg-black text-white enabled:hover:border enabled:hover:border-black enabled:hover:bg-white enabled:hover:text-black",
      },
    },
  };

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Modal show={showPopup} onClose={togglePopup} dismissible>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <Label
                  className="text-md"
                  htmlFor="platformNames"
                  value="Choose Profile Name: "
                />
                <div className="">
                  <Select
                    value={selectedProfileName}
                    onChange={(event) =>
                      changeProfileNameHandler(event.target.value)
                    }
                    sizing="sm"
                    id="platformNames"
                    color="bllack"
                    required
                  >
                    {dropdownOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              {profileNameInputError && (
                <div className="text-sm text-red-600 mt-1">
                  {profileNameInputError}
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label
                  className="text-md"
                  htmlFor="platformLink"
                  value="Enter Profile URL: "
                />
                <div>
                  <TextInput
                    id="platformLink"
                    value={selectedProfileLink}
                    onChange={(event) =>
                      changeProfileLinkHandler(event.target.value)
                    }
                    sizing="sm"
                    color="bllack"
                  />
                </div>
              </div>
              {profileLinkInputError && (
                <div className="text-sm text-red-600 mt-1">
                  {profileLinkInputError}
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="">
          <div className="ml-auto">
            <button
              onClick={togglePopup}
              className="border border-black px-4 py-2 rounded-[7px] font-medium"
            >
              Cancel
            </button>
          </div>
          <div>
            <Button
              color="bllack"
              isProcessing={profileSubmitted}
              processingSpinner={
                <BiLoaderAlt className="animate-spin text-lg" />
              }
              onClick={
                isSocialProfileModal
                  ? updateUserSocialProfileHandler
                  : updateUserCodingProfileHandler
              }
              className="inline-block border border-black bg-black text-white hover:bg-white hover:text-black"
            >
              Save
            </Button>
            {/* <button
              onClick={
                isSocialProfileModal
                  ? updateUserSocialProfileHandler
                  : updateUserCodingProfileHandler
              }
              className="border border-black bg-black text-white px-4 py-2 rounded-[7px] font-medium"
            >
              Save
            </button> */}
          </div>
        </Modal.Footer>
      </Modal>
      {/* <Toaster /> */}
    </Flowbite>
  );
}

export default AddProfilePopup;
