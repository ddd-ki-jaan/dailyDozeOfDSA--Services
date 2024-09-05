import { codingProfileOptions } from "../../constants/userDashboard";
import { TbHttpDelete } from "react-icons/tb";
import { deleteUserCodingProfile } from "../../services/userServices";
import toast, { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { handleApiError } from "../../constants/reusableFunctions";
import { useNavigate } from "react-router-dom";

function CodingProfileIcon({ profileObj }) {
  const { updateUserData, setUserLoggedInStatusToFalse } =
    useContext(UserContext);

  const navigate = useNavigate();

  async function deleteUserCodingProfileHandler() {
    try {
      const response = await deleteUserCodingProfile(profileObj._id);
      if (response && response.data && response.data.success) {
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
      console.log("*** deleteUserCodingProfileHandler error: ***", error);
      handleApiError(error, navigate, setUserLoggedInStatusToFalse);
    }
  }

  const profile = codingProfileOptions.find(
    (currProfile) => currProfile.value === profileObj.profileName
  );

  const logoText = profile?.logoText || (
    <span className="text-sm">profile</span>
  );

  return (
    <div className="relative group w-10 h-10 bg-black flex justify-center items-center rounded-full text-white text-lg font-light">
      <span
        className="cursor-pointer"
        onClick={() => window.open(profileObj.profileLink, "_blank")}
      >
        {logoText}
      </span>
      <span
        onClick={deleteUserCodingProfileHandler}
        className="absolute cursor-pointer top-full pt-2 px-2"
      >
        <TbHttpDelete className="text-2xl text-red-500 group-hover:block hidden" />
      </span>
      {/* <Toaster /> */}
    </div>
  );
}

export default CodingProfileIcon;
