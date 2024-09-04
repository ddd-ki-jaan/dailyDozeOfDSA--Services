import { Modal, Label, TextInput, FileInput, Flowbite } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/userContext";
import { updateUserDetails } from "../../services/userServices";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { DashboardContext } from "../../contexts/dashboardContext";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { handleApiError } from "../../constants/reusableFunctions";
import { Button } from "flowbite-react";
import { BiLoaderAlt } from "react-icons/bi";

function UpdateUserDetailsModal({ showModal, toggleModal }) {
  const { userLoggedInStatus, updateUserData, setUserLoggedInStatusToFalse } =
    useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const {
    modalInputUserName,
    modalInputUserProfilePic,
    modalPreviewProfilePicURL,
    updateModalUserNameInputError,
    updateModalFileInputError,
    updateModalInputUserName,
    updateModalInputUserProfilePic,
    updateModalPreviewProfilePicURL,
    setUpdateModalUserNameInputErrorHandler,
    setUpdateModalFileInputErrorHandler,
  } = useContext(DashboardContext);

  const navigate = useNavigate();

  const maxFileSize = 2 * 1024 * 1024;

  const customTheme = {
    modal: {
      header: {
        close: {
          base: "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-black hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white",
        },
      },
    },
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
    button: {
      color: {
        bllack:
          "border border-black bg-black text-white enabled:hover:border enabled:hover:border-black enabled:hover:bg-white enabled:hover:text-black",
      },
    },
  };

  useEffect(() => {
    if (userLoggedInStatus && userLoggedInStatus.loggedIn) {
      updateModalInputUserName(userLoggedInStatus.user.name);
    }
  }, [userLoggedInStatus]);

  async function updateUserDetailsHandler() {
    setIsLoading(true);
    try {
      if (updateModalUserNameInputError || updateModalFileInputError) return;
      const response = await updateUserDetails(
        modalInputUserName,
        modalInputUserProfilePic
      );
      const responseData = response.data;
      if (responseData.success) {
        updateUserData("name", responseData.updatedUserName);
        updateUserData("profilePicUrl", responseData.updatedProfilePicUrl);
        toast.success("User Details have been updated successfully", {
          duration: 3000,
          position: "top-right",
        });
      }
    } catch (error) {
      handleApiError(error, navigate, setUserLoggedInStatusToFalse);
    }
    setIsLoading(false);
    toggleModal();
  }

  function changeUserNameHandler(event) {
    setUpdateModalUserNameInputErrorHandler(null);
    let curr_name = event.target.value;
    if (curr_name.trim().length < 1) {
      setUpdateModalUserNameInputErrorHandler(
        "length of the name cannot be less than 1 character"
      );
    }
    if (curr_name.trim().length > 26) {
      setUpdateModalUserNameInputErrorHandler(
        "length of the name cannot exceed 26 characters"
      );
    }

    updateModalInputUserName(curr_name);
  }

  function changeProfilePicHandler(event) {
    setUpdateModalFileInputErrorHandler(null);

    const file = event.target.files[0];
    console.log("*** yello file: ***", file);
    if (!file) {
      setUpdateModalFileInputErrorHandler("No file selected!");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setUpdateModalFileInputErrorHandler("Please select an image file!");
      return;
    }
    if (file.size > maxFileSize) {
      setUpdateModalFileInputErrorHandler("File size cannot exceed 2MB!");
      return;
    }

    updateModalInputUserProfilePic(file);

    const fileURL = URL.createObjectURL(file);
    updateModalPreviewProfilePicURL(fileURL);
  }

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Modal show={showModal} size="md" onClose={toggleModal} dismissible>
        <Modal.Header>Update User Details...</Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <div>
                <Label htmlFor="userName" value="Your Name" />
              </div>
              <TextInput
                rows={4}
                id="userName"
                value={modalInputUserName || ""}
                onChange={changeUserNameHandler}
                color="bllack"
              />
              {updateModalUserNameInputError && (
                <div className="text-sm text-red-600">
                  {updateModalUserNameInputError}
                </div>
              )}
            </div>
            <div className="mt-4">
              <div>
                <Label htmlFor="userProfilePic" value="Your Profile Pic" />
              </div>
              <FileInput
                id="userProfilePic"
                accept="image/*"
                onChange={changeProfilePicHandler}
              />
              {updateModalFileInputError && (
                <div className="text-sm text-red-600">
                  {updateModalFileInputError}
                </div>
              )}
              {!updateModalFileInputError && modalPreviewProfilePicURL && (
                <div className="w-full h-28 mt-2 flex justify-center">
                  <img
                    className="w-28 h-full rounded-full object-cover border border-black p-1"
                    src={modalPreviewProfilePicURL}
                  />
                </div>
              )}
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-x-1 mb-2 text-sm text-blue-600">
                <span>
                  <IoIosInformationCircleOutline />
                </span>
                for now you cannot change your userId
              </div>
              <div className="float-end">
                <button
                  onClick={toggleModal}
                  className="border rounded-[7px] border-black text-black px-4 py-2"
                >
                  Cancel
                </button>
                {/* <button
                  onClick={updateUserDetailsHandler}
                  className="border-black border bg-black rounded-[7px] ml-4 text-white px-4 py-2"
                >
                  Update
                </button> */}
                <Button
                  color="bllack"
                  isProcessing={isLoading}
                  processingSpinner={
                    <BiLoaderAlt className="animate-spin text-lg" />
                  }
                  disabled={isLoading}
                  onClick={updateUserDetailsHandler}
                  className="inline-block ml-4 border border-black bg-black text-white hover:bg-white hover:text-black"
                >
                  Update
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* <Toaster /> */}
    </Flowbite>
  );
}

export default UpdateUserDetailsModal;
