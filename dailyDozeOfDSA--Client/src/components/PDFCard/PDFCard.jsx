import React, { useContext } from "react";
import { updateUserEngNotesSavedStatus } from "../../services/userServices";
import { handleApiError } from "../../constants/reusableFunctions.js";
import { UserContext } from "../../contexts/userContext.jsx";
import { EngineeringNotesContext } from "../../contexts/engineeringNoteContext.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function PDFCard({ note, isSaved = false }) {
  const {
    isANoteGettingSaved,
    toggleConfirmationPopup,
    toggleIsANoteGettingSaved,
    fetchEngineeringNotes,
  } = useContext(EngineeringNotesContext);

  const { setUserLoggedInStatusToFalse } = useContext(UserContext);

  const navigate = useNavigate();

  async function saveNoteHandler() {
    if (isANoteGettingSaved) return;
    toggleIsANoteGettingSaved(note._id);
    try {
      const response = await updateUserEngNotesSavedStatus(note._id);
      if (response && response.data && response.data.success) {
        await fetchEngineeringNotes();
        toast.success(response.data.message, {
          position: "top-right",
          duration: 2000,
        });
      }
    } catch (error) {
      console.error("*** error saving note: ***", error);
      handleApiError(error, navigate, setUserLoggedInStatusToFalse);
    } finally {
      toggleIsANoteGettingSaved(null);
    }
  }

  return (
    <>
      <div className="min-w-[220px] h-[250px]">
        <div className="cursor-pointer relative w-full h-[200px] flex items-center border border-black rounded-tr-[7px] rounded-bl-[7px]">
          <div
            className="w-full bg-[#ff0000] text-white text-8xl font-light flex justify-center"
            onClick={() => navigate(`/pdfViewer/${note.slug}`)}
          >
            PDF
          </div>
          <div
            onClick={
              isSaved
                ? () => toggleConfirmationPopup(note._id)
                : saveNoteHandler
            }
            className="absolute top-2 right-2 text-xl"
          >
            {isANoteGettingSaved && isANoteGettingSaved === note._id ? (
              <span className="text-sm">saving...</span>
            ) : !isSaved ? (
              <i className="fa-regular fa-heart"></i>
            ) : (
              <i className="fa-solid fa-heart text-green-500"></i>
            )}
          </div>
        </div>
        <div className="w-full text-center text-ellipsis">
          <p className="line-clamp-2">{note && note.noteTitle}</p>
        </div>
      </div>
    </>
  );
}

export default PDFCard;
