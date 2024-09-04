import { socialProfileOptions } from "../../constants/userDashboard";
import { TbHttpDelete } from "react-icons/tb";
import { deleteUserSocialProfile } from "../../services/userServices";
import toast, { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { handleApiError } from "../../constants/reusableFunctions";
import { useNavigate } from "react-router-dom";

function SocialProfileIcon({ profileObj }) {
  const { updateUserData, setUserLoggedInStatusToFalse } =
    useContext(UserContext);

  const navigate = useNavigate();

  async function deleteUserSocialProfileHandler() {
    try {
      const response = await deleteUserSocialProfile(profileObj._id);
      if (
        (response && response.data && response.data.success,
        response.data.updatedUserSocialProfiles)
      ) {
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
      console.log("*** deleteUserSocialProfileHandler error: ***", error);
      handleApiError(error, navigate, setUserLoggedInStatusToFalse);
    }
  }

  const profile = socialProfileOptions.find(
    (currProfile) => currProfile.value === profileObj.profileName
  );

  const logoImg = profile?.logoImg || <span className="text-sm">profile</span>;

  return (
    <div className="relative group w-10 h-10 flex justify-center items-center rounded-full text-lg">
      <img src={logoImg} />
      <span
        onClick={deleteUserSocialProfileHandler}
        className="absolute cursor-pointer top-full pt-2 px-2"
      >
        <TbHttpDelete className="text-2xl text-red-500 group-hover:block hidden" />
      </span>
      {/* <Toaster /> */}
    </div>
  );
}

export default SocialProfileIcon;
