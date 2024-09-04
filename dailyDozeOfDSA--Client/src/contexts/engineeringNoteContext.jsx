import { createContext, useState } from "react";
import { getUserSavedEngineeringNotes } from "../services/userServices";
import {
  getEngineeringNotes,
  getEngineeringNoteCategories,
} from "../services/engineeringNotesServices";

const EngineeringNotesContext = createContext();

function EngineeringNotesProvider({ children }) {
  const [engineeringNotes, setEngineeringNotes] = useState([]);
  const [engineeringNoteCategories, setEngineeringNoteCategories] = useState(
    []
  );
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [savedEngineeringNotes, setSavedEngineeringNotes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activePageNumber, setActivePageNumber] = useState(null);
  const [totalNumOfPages, setTotalNumOfPages] = useState(null);
  const [isANoteGettingSaved, setIsANoteGettingSaved] = useState(null);
  const [showSavedNotes, setShowSavedNotes] = useState(null);

  async function getEngineeringNotesHandler() {
    try {
      const response = await getEngineeringNotes();
      setEngineeringNotes(response.data.data);
    } catch (error) {
      console.log("*** getEngineeringNotesHandler error: ", error);
      throw error;
    }
  }

  async function getEngineeringNoteCategoriesHandler() {
    try {
      const response = await getEngineeringNoteCategories();
      setEngineeringNoteCategories(response.data.data);
    } catch (error) {
      console.log("*** getEngineeringNoteCategoriesHandler error: ", error);
      throw error;
    }
  }

  async function getUserSavedEngineeringNotesHandler() {
    try {
      const response = await getEngineeringNotes("ALL", 0, true);
      if (response?.data?.success) {
        setSavedEngineeringNotes(response.data.data || []);
      }
    } catch (error) {
      console.error("*** fetchUserSavedEngineeringNotes error: ", error);
      throw error;
    }
  }

  function setSavedEngineeringNoteshandler(notes) {
    setSavedEngineeringNotes(notes);
  }

  function setEngineeringNotesHandler(notes) {
    setEngineeringNotes(notes);
  }

  function setEngineeringNoteCategoriesHandler(categories) {
    setEngineeringNoteCategories(categories);
  }

  function setSelectedCategoryHandler(categoryVal) {
    setSelectedCategory(categoryVal);
  }

  function setActivePageNumberHandler(pageNum) {
    setActivePageNumber(pageNum);
  }

  function setTotalNumOfPagesHandler(totalPages) {
    setTotalNumOfPages(totalPages);
  }

  function toggleIsANoteGettingSaved(noteId) {
    setIsANoteGettingSaved(noteId);
  }

  function toggleConfirmationPopup(cardId) {
    setShowConfirmationPopup(cardId);
  }

  function toggleShowSavedNotes(updatedStatus) {
    setShowSavedNotes(updatedStatus);
  }

  async function fetchEngineeringNotes() {
    try {
      const response = await getEngineeringNotes(
        selectedCategory,
        activePageNumber - 1,
        showSavedNotes
      );
      if (response?.data?.success) {
        setEngineeringNotes(response.data.data || []);
        setTotalNumOfPages(response.data.totalNumOfPages || 0);
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <EngineeringNotesContext.Provider
      value={{
        engineeringNotes,
        showConfirmationPopup,
        savedEngineeringNotes,
        engineeringNoteCategories,
        selectedCategory,
        activePageNumber,
        totalNumOfPages,
        isANoteGettingSaved,
        showSavedNotes,
        setSelectedCategoryHandler,
        setActivePageNumberHandler,
        setTotalNumOfPagesHandler,
        toggleConfirmationPopup,
        toggleIsANoteGettingSaved,
        toggleShowSavedNotes,
        setEngineeringNotesHandler,
        getEngineeringNotesHandler,
        setSavedEngineeringNoteshandler,
        setEngineeringNoteCategoriesHandler,
        getUserSavedEngineeringNotesHandler,
        getEngineeringNoteCategoriesHandler,
        fetchEngineeringNotes,
      }}
    >
      {children}
    </EngineeringNotesContext.Provider>
  );
}

export { EngineeringNotesContext };
export default EngineeringNotesProvider;
