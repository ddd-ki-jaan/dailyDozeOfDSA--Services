import React, { useContext, useEffect, useState } from "react";
import { ProblemSetContext } from "../../contexts/problemSetContext";
import { UserContext } from "../../contexts/userContext";
import { handleApiError } from "../../constants/reusableFunctions";
import { Label, Modal, Textarea, Flowbite, Button } from "flowbite-react";
import { MdError } from "react-icons/md";
import { updateUserProblemNotes } from "../../services/userServices";
import toast from "react-hot-toast";
import { BiLoaderAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function ProblemNotesModal({ problemId, sheetEnum, problemNote }) {
  const { setUserLoggedInStatusToFalse } = useContext(UserContext);

  const {
    showProblemNotesModal,
    toggleProblemNotesModal,
    problemNotesInputText,
    problemNotesInputError,
    changeProblemNotesInputText,
    updateSDESheet,
  } = useContext(ProblemSetContext);

  const [isProcessing, setIsProcessing] = useState(false);
  const [modalSize, setModalSize] = useState("sm");

  const navigate = useNavigate();

  useEffect(() => {
    if (
      showProblemNotesModal &&
      problemNote &&
      showProblemNotesModal === problemId
    ) {
      changeProblemNotesInputText(problemNote);
    }
  }, [showProblemNotesModal]);

  useEffect(() => {
    function updateModalSize() {
      const width = window.innerWidth;
      if (width < 640) {
        setModalSize("sm");
      } else if (width >= 640 && width < 768) {
        setModalSize("md");
      } else {
        setModalSize("lg");
      }
    }

    updateModalSize();
    window.addEventListener("resize", updateModalSize);

    () => {
      window.removeEventListener("resize", updateModalSize);
    };
  }, []);

  async function updateProblemNotesHandler() {
    try {
      if (problemNotesInputError) return;

      setIsProcessing(true);
      const response = await updateUserProblemNotes(
        problemId,
        problemNotesInputText,
        sheetEnum
      );

      if (response.data.success) {
        toast.success(response.data.message, {
          position: "top-right",
          duration: 3000,
        });
        updateSDESheet(sheetEnum);
      }
    } catch (error) {
      handleApiError(error, navigate, setUserLoggedInStatusToFalse);
    }

    setIsProcessing(false);
    toggleProblemNotesModal();
  }

  const customTheme = {
    textarea: {
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
      <Modal
        show={showProblemNotesModal === problemId}
        size={modalSize}
        onClose={() => toggleProblemNotesModal(problemId)}
        dismissible
      >
        <Modal.Header>Write Your Personalized Note...</Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <div>
                <Label htmlFor="problemNote" value="Problem Note" />
              </div>
              <Textarea
                rows={5}
                color="bllack"
                value={problemNotesInputText}
                onChange={(event) =>
                  changeProblemNotesInputText(event.target.value)
                }
                id="problemNote"
                placeholder="Write a note..."
              />
              {problemNotesInputError && (
                <span className="flex items-center gap-x-1 text-sm text-red-500">
                  <MdError /> {problemNotesInputError}
                </span>
              )}
            </div>
            <div className="float-end mt-4">
              <button
                onClick={() => toggleProblemNotesModal(problemId)}
                className="border rounded-[7px] border-black text-black px-4 py-2"
              >
                Cancel
              </button>
              <Button
                color="bllack"
                onClick={updateProblemNotesHandler}
                isProcessing={isProcessing}
                disabled={isProcessing}
                processingSpinner={
                  <BiLoaderAlt className="animate-spin text-lg" />
                }
                className="inline-block ml-4 border border-black bg-black text-white hover:bg-white hover:text-black"
              >
                Save Note
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Flowbite>
  );
}

export default ProblemNotesModal;
