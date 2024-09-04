import { createContext, useState } from "react";

const DashboardContext = createContext();

function DashboardProvider({ children }) {
  const [showUpdateProfileModal, setShowProfileModal] = useState(false);
  const [showSavedNotesModal, setShowSavedNotesModal] = useState(false);
  const [showUpdateUserDetailsModal, setShowUpdateUserDetailsModal] =
    useState(false);
  const [modalInputUserName, setModalInputUserName] = useState(null);
  const [modalInputUserProfilePic, setModalInputUserProfilePic] =
    useState(null);
  const [modalPreviewProfilePicURL, setModalPreviewProfilePicURL] =
    useState(null);
  const [updateModalUserNameInputError, setUpdateModalUserNameInputError] =
    useState(null);
  const [updateModalFileInputError, setUpdateModalFileInputError] =
    useState(null);
  const [selectedProfileName, setSelectedProfileName] = useState("");
  const [selectedProfileLink, setSelectedProfileLink] = useState("");
  const [profileNameInputError, setProfileNameInputError] = useState(null);
  const [profileLinkInputError, setProfileLinkInputError] = useState(null);

  function toggleShowUpdateProfileModal() {
    setShowProfileModal((prevState) => !prevState);
    setSelectedProfileName("");
    setSelectedProfileLink("");
    setProfileNameInputError(null);
    setProfileLinkInputError(null);
  }

  function toggleUpdateUserDetailsModal(userName) {
    setShowUpdateUserDetailsModal((prevState) => !prevState);
    setModalInputUserName(userName);
    setModalInputUserProfilePic(null);
    setModalPreviewProfilePicURL(null);
    setUpdateModalUserNameInputError(null);
    setUpdateModalFileInputError(null);
  }

  function updateModalInputUserName(currUserName) {
    setModalInputUserName(currUserName);
  }

  function updateModalInputUserProfilePic(currProfilePic) {
    setModalInputUserProfilePic(currProfilePic);
  }

  function updateModalPreviewProfilePicURL(currProfilePicURL) {
    setModalPreviewProfilePicURL(currProfilePicURL);
  }

  function setUpdateModalUserNameInputErrorHandler(errorMessage) {
    setUpdateModalUserNameInputError(errorMessage);
  }

  function setUpdateModalFileInputErrorHandler(errorMessage) {
    setUpdateModalFileInputError(errorMessage);
  }

  function updateSelectedProfileName(
    selectedProfileNameVal,
    userSocialOrCodingProfiles
  ) {
    setProfileNameInputError(null);
    setSelectedProfileName(selectedProfileNameVal);
    setSelectedProfileLink("");
    let alreadyExists;
    if (userSocialOrCodingProfiles) {
      alreadyExists = userSocialOrCodingProfiles.find(
        (currProfile) => currProfile.profileName === selectedProfileNameVal
      );
    }

    if (alreadyExists) setSelectedProfileLink(alreadyExists.profileLink);
  }

  function updateSelectedProfileLink(inputProfileLinkVal) {
    setProfileLinkInputError(null);
    setSelectedProfileLink(inputProfileLinkVal);
  }

  /** set errorMessage for profileName input */
  function updateProfileNameInputError(errorMessage) {
    setProfileNameInputError(errorMessage);
  }

  /** set errorMessage for profileLink input */
  function updateProfileLinkInputError(errorMessage) {
    setProfileLinkInputError(errorMessage);
  }

  return (
    <DashboardContext.Provider
      value={{
        showUpdateProfileModal,
        showSavedNotesModal,
        showUpdateUserDetailsModal,
        modalInputUserName,
        modalInputUserProfilePic,
        modalPreviewProfilePicURL,
        updateModalUserNameInputError,
        updateModalFileInputError,
        selectedProfileName,
        selectedProfileLink,
        profileNameInputError,
        profileLinkInputError,
        toggleShowUpdateProfileModal,
        toggleUpdateUserDetailsModal,
        updateModalInputUserName,
        updateModalInputUserProfilePic,
        updateModalPreviewProfilePicURL,
        setUpdateModalUserNameInputErrorHandler,
        setUpdateModalFileInputErrorHandler,
        updateSelectedProfileName,
        updateSelectedProfileLink,
        updateProfileNameInputError,
        updateProfileLinkInputError,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export { DashboardContext };
export default DashboardProvider;