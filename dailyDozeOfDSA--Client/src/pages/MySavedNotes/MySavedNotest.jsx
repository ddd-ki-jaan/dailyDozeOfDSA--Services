import PDFCard from "../../components/PDFCard/PDFCard.jsx";
import { React, useEffect, useState, useContext } from "react";
import ConfirmationPopup from "../../components/ConfirmationPopup/ConfirmationPopup.jsx";
import { EngineeringNotesContext } from "../../contexts/engineeringNoteContext.jsx";
import NoDataFound from "../../components/NoDataFound/NoDataFound.jsx";
import Loader from "../../components/Loader/Loader.jsx";

function MySavedNotes() {
  const [isLoading, setIsLoading] = useState(false);
  const { savedEngineeringNotes, getUserSavedEngineeringNotesHandler } =
    useContext(EngineeringNotesContext);

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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="page-container">
      <div className="border-b border-dashed border-black">
        <span className="text-2xl font-light">Your Saved Notes...</span>
      </div>
      <div className="w-full mt-8">
        <div className="w-full grid grid-cols-3 gap-x-16 gap-y-12">
          {savedEngineeringNotes?.length > 0 ? (
            savedEngineeringNotes.map((savedNote, index) => (
              <PDFCard key={index} note={savedNote.note} isSaved={!!savedNote.isSaved} />
            ))
          ) : (
            <NoDataFound />
          )}
        </div>
      </div>
      <ConfirmationPopup />
    </div>
  );
}

export default MySavedNotes;