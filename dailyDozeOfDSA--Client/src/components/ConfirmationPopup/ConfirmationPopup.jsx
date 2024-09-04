import { Button, Flowbite, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useContext, useState } from "react";
import { EngineeringNotesContext } from "../../contexts/engineeringNoteContext.jsx";
import { UserContext } from "../../contexts/userContext.jsx";
import { updateUserEngNotesSavedStatus } from "../../services/userServices.js";
import { handleApiError } from "../../constants/reusableFunctions.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BiLoaderAlt } from "react-icons/bi";

function ConfirmationPopup() {
  const {
    showConfirmationPopup,
    toggleConfirmationPopup,
    fetchEngineeringNotes,
  } = useContext(EngineeringNotesContext);

  const { setUserLoggedInStatusToFalse } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function unsaveNoteHandler() {
    setLoading(true);
    try {
      const response = await updateUserEngNotesSavedStatus(
        showConfirmationPopup
      );
      if (response && response.data && response.data.success) {
        await fetchEngineeringNotes();
        toast.success(response.data.message, {
          position: "top-right",
          duration: 2000,
        });
      }
    } catch (error) {
      console.error("*** unsaveNoteHandler error: ***", error);
      handleApiError(error, navigate, setUserLoggedInStatusToFalse);
    } finally {
      toggleConfirmationPopup(null);
      setLoading(false);
    }
  }

  function handleCancelConfirmationPopup() {
    toggleConfirmationPopup(null);
  }

  const customTheme = {
    button: {
      color: {
        bllack: "border border-black bg-black text-white",
      },
    },
  };

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Modal
        show={showConfirmationPopup}
        size="md"
        onClose={handleCancelConfirmationPopup}
        popup
        dismissible
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 font-light text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-xl font-light text-gray-500 dark:text-gray-400">
              Are you sure, you want to remove this Note from your likes?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                isProcessing={loading}
                processingSpinner={
                  <BiLoaderAlt className="animate-spin text-lg" />
                }
                onClick={unsaveNoteHandler}
                // className="font-light border border-black bg-black text-white px-4 py-2 rounded-[7px]"
                color="bllack"
                disabled={loading}
              >
                Yes, I'm Sure
              </Button>
              <button
                onClick={handleCancelConfirmationPopup}
                className="font-light border border-black px-4 py-2 rounded-[7px]"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Flowbite>
  );
}

export default ConfirmationPopup;
