import React, { useContext, useEffect, useState } from "react";
import AddProfilePopup from "../../components/AddProfilePopup/AddProfilePopup.jsx";
import {
  socialProfileOptions,
  codingProfileOptions,
} from "../../constants/userDashboard.js";
import SheetProgressChart from "../../components/SheetProgressChart/SheetProgressChart.jsx";
import problemSheets from "../../constants/problemSheets.js";
import PDFCard from "../../components/PDFCard/PDFCard.jsx";
import ConfirmationPopup from "../../components/ConfirmationPopup/ConfirmationPopup.jsx";
import { DashboardContext } from "../../contexts/dashboardContext.jsx";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext.jsx";
import UpdateUserDetailsModal from "../../components/UpdateUserDetailsModal/UpdateUserDetailsModal.jsx";
import CodingProfileIcon from "../../components/CodingProfileIcon/CodingProfileIcon.jsx";
import SocialProfileIcon from "../../components/SocialProfileIcon/SocialProfileIcon.jsx";
import { EngineeringNotesContext } from "../../contexts/engineeringNoteContext.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import defaultProfilePic from "../../../public/defaultProfileImg.png";
import SEO from "../../SEO/SEO.jsx";

function Dashboard() {
  const pageTitle =
    "Your Personal Dashboard - Track DSA Progress & Saved Notes";
  const pageDescription =
    "Manage your DSA sheet progress, save notes, and update your profile on your personal dashboard. Stay organized and efficient with DailyDozeOfDSA.";
  const pageUrl = window.location.href;

  const {
    showUpdateProfileModal,
    showUpdateUserDetailsModal,
    toggleShowUpdateProfileModal,
    toggleUpdateUserDetailsModal,
  } = useContext(DashboardContext);
  const { userLoggedInStatus } = useContext(UserContext);
  const { savedEngineeringNotes, getUserSavedEngineeringNotesHandler } =
    useContext(EngineeringNotesContext);
  const { user } = userLoggedInStatus;
  const [isSocialProfileModal, setIsSocialProfileModal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSavedNotes() {
      setIsLoading(true);
      try {
        await getUserSavedEngineeringNotesHandler();
      } catch (error) {
        console.error("Error fetching saved notes:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSavedNotes();
  }, []);

  function clickedOnAddProfileButton(clickedOnSocialProfileButton) {
    if (clickedOnSocialProfileButton) setIsSocialProfileModal(true);
    else setIsSocialProfileModal(false);
    toggleShowUpdateProfileModal();
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <SEO title={pageTitle} description={pageDescription} url={pageUrl} />
      <div className="page-container">
        <div>
          <div className="border-b border-dashed border-black">
            <span className="text-2xl font-light">Your Profile Info...</span>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-x-2 gap-y-2">
            <div className="profile-card">
              <div className="border-black rounded-full relative mb-2">
                <img
                  className="w-28 h-28 object-cover rounded-full"
                  src={
                    user?.profilePicUrl?.includes("amazonaws.com")
                      ? defaultProfilePic
                      : user?.profilePicUrl || defaultProfilePic
                  }
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultProfilePic;
                  }}
                  alt="User Profile"
                />
                <div
                  onClick={() => toggleUpdateUserDetailsModal(user.name)}
                  className="w-8 h-8 rounded-full flex justify-center items-center bg-white hover:cursor-pointer absolute -right-1 bottom-2 scale-x-[-1]"
                >
                  <i className="fa-solid fa-pen"></i>
                </div>
              </div>
              <div>
                Name: <span className="text-sky-700">{user.name}</span>
              </div>
              <div>
                userId: <span className="text-sky-700">{user.userId}</span>
              </div>
              <UpdateUserDetailsModal
                showModal={showUpdateUserDetailsModal}
                toggleModal={() => toggleUpdateUserDetailsModal(user.name)}
              />
            </div>
            <div className="profile-card">
              <div className="text-xl font-semibold">SocialProfiles</div>
              <div className="flex gap-x-2 justify-center items-center">
                {user && user.userSocialProfiles.length === 0 && (
                  <div className="text-sm text-blue-500">
                    add your first social profile
                  </div>
                )}
                {user &&
                  user.userSocialProfiles.map((profileObj) => {
                    return (
                      <SocialProfileIcon
                        key={profileObj._id}
                        profileObj={profileObj}
                      />
                    );
                  })}
                <div
                  onClick={() => clickedOnAddProfileButton(true)}
                  className="w-10 h-10 cursor-pointer border-2 border-black rounded-full flex justify-center items-center"
                >
                  <i className="fa-solid fa-plus text-xl"></i>
                </div>
              </div>
            </div>
            <div className="profile-card">
              <div className="text-xl font-semibold">CodingProfiles</div>
              <div className="flex gap-x-2 items-center">
                {user && user.userCodingProfiles.length === 0 && (
                  <div className="text-sm text-blue-500">
                    add your first coding profile
                  </div>
                )}
                {user &&
                  user.userCodingProfiles.map((profileObj) => {
                    return (
                      <CodingProfileIcon
                        key={profileObj._id}
                        profileObj={profileObj}
                      />
                    );
                  })}

                <div
                  onClick={() => clickedOnAddProfileButton(false)}
                  className="w-10 h-10 cursor-pointer border-2 border-black rounded-full flex justify-center items-center"
                >
                  <i className="fa-solid fa-plus text-xl"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AddProfilePopup
          isSocialProfileModal={isSocialProfileModal}
          title={
            isSocialProfileModal
              ? "Add A New Social Profile..."
              : "Add A New Coding Profile..."
          }
          showPopup={showUpdateProfileModal}
          togglePopup={toggleShowUpdateProfileModal}
          dropdownOptions={
            isSocialProfileModal ? socialProfileOptions : codingProfileOptions
          }
        />
        <div className="mt-8">
          <div className="border-b border-dashed border-black">
            <span className="text-2xl font-light">
              Track Your Sheet Progress...
            </span>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 justify-items-center">
            {problemSheets.map((currSheet) => (
              <div key={currSheet.sheetName} className="w-full max-w-[220px]">
                <SheetProgressChart
                  key={currSheet.sheetName}
                  SheetName={currSheet.sheetName}
                  sheetEnum={currSheet.sheetEnum}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8">
          <div className="border-b border-dashed border-black">
            <span className="text-2xl font-light">Your Saved Notes...</span>
          </div>
          <div className="mt-6 mb-6 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-x-16 gap-y-12">
            {savedEngineeringNotes?.length > 0 ? (
              savedEngineeringNotes.slice(0, 3).map((savedNote, index) => (
                <div key={index} className="w-full max-w-[280px]">
                  <PDFCard note={savedNote} isSaved={!!savedNote.isSaved} />
                </div>
              ))
            ) : (
              <div>No Saved Notes found</div>
            )}
          </div>
          {savedEngineeringNotes.length > 3 && (
            <div
              className="mt-2 border-b border-blue-600 inline-block cursor-pointer"
              onClick={() => navigate("/mySavedNotes")}
            >
              <span className="text-blue-600 text-base font-light ">
                See More...
              </span>
            </div>
          )}
        </div>
        <ConfirmationPopup />
      </div>
    </>
  );
}

export default Dashboard;
