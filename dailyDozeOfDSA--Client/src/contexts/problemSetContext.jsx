import { createContext, useEffect, useState } from "react";
import {
  getApnaCollegeDSASheet,
  getBlind75Sheet,
  getLoveBabbar450DSASheet,
  getNeetCodeSheet,
  getNishantChaharSDESheet,
  getStriver79DSASheet,
  getStriverA2ZSheet,
  getStriverSDESheet,
} from "../services/problemSheetServices";

const ProblemSetContext = createContext();

function ProblemSetProvider({ children }) {
  const [striverSDESheetData, setStriverSDESheetData] = useState([]);
  const [striverA2ZSheetData, setStriverA2ZSheetData] = useState([]);
  const [striver79DSASheetData, setStriver79DSASheetData] = useState([]);
  const [loveBabbar450DSASheetData, setLoveBabbar450DSASheetData] = useState(
    []
  );
  const [apnaCollegeDSASheetData, setApnaCollegeDSASheetData] = useState([]);
  const [blind75SheetData, setBlind75SheetData] = useState([]);
  const [neetCodeSheetData, setNeetCodeSheetData] = useState([]);
  const [nishantChaharSDESheetData, setNishatChaharSDESheetData] = useState([]);

  const [showProblemsTable, setShowProblemsTable] = useState(null);

  const [showProblemStatusDropdown, setShowProblemStatusDropdown] =
    useState("");
  const [showProblemNotesModal, setShowProblemNotesModal] = useState(null);
  const [problemNotesInputText, setProblemNotesInputText] = useState("");
  const [problemNotesInputError, setProblemNotesInputError] = useState(null);

  function getFlattenedProblemsArr(data) {
    console.log("*** getFlattenedProblemArr data: ***", data);
    const resultArr = data.flatMap((currObj) =>
      currObj.problems.map((currProblem) => currProblem.status || null)
    );

    console.log(resultArr);
  }

  function changeProblemNotesInputText(currText) {
    if (currText.trim().length === 0) {
      updateProblemNotesInputError(
        "total numbere of chracters must be greater than 0"
      );
    } else if (currText.trim().length > 1500) {
      updateProblemNotesInputError(
        "total number of characters in the notes cannot excceed 1500"
      );
    } else {
      setProblemNotesInputError(null);
    }

    setProblemNotesInputText(currText);
  }

  function updateProblemNotesInputError(errorMessage) {
    setProblemNotesInputError(errorMessage);
  }

  async function updateSDESheet(sheetEnum) {
    try {
      let response;
      switch (sheetEnum) {
        case "STRIVER_SDE_SHEET":
          response = await getStriverSDESheet();
          if (
            response &&
            response.data &&
            response.data.success &&
            response.data.data
          ) {
            setStriverSDESheetData(response.data.data);
          }
          break;
        case "STRIVER_A2Z_DSA_SHEET":
          response = await getStriverA2ZSheet();
          if (
            response &&
            response.data &&
            response.data.success &&
            response.data.data
          ) {
            setStriverA2ZSheetData(response.data.data);
          }
          break;
        case "STRIVER_79_DSA_SHEET":
          response = await getStriver79DSASheet();
          if (
            response &&
            response.data &&
            response.data.success &&
            response.data.data
          ) {
            setStriver79DSASheetData(response.data.data);
          }
          break;
        case "LOVE_BABBAR_450_DSA_SHEET":
          response = await getLoveBabbar450DSASheet();
          if (
            response &&
            response.data &&
            response.data.success &&
            response.data.data
          ) {
            setLoveBabbar450DSASheetData(response.data.data);
          }
          break;
        case "APNA_COLLEGE_DSA_SHEET":
          response = await getApnaCollegeDSASheet();
          if (
            response &&
            response.data &&
            response.data.success &&
            response.data.data
          ) {
            setApnaCollegeDSASheetData(response.data.data);
          }
          break;
        case "BLIND_75_DSA_SHEET":
          response = await getBlind75Sheet();
          if (
            response &&
            response.data &&
            response.data.success &&
            response.data.data
          ) {
            setBlind75SheetData(response.data.data);
          }
          break;
        case "NEET_CODE_150_DSA_SHEET":
          response = await getNeetCodeSheet();
          if (
            response &&
            response.data &&
            response.data.success &&
            response.data.data
          ) {
            setNeetCodeSheetData(response.data.data);
          }
          break;
        case "NISHANT_CHAHAR_151_DSA_SHEET":
          response = await getNishantChaharSDESheet();
          if (
            response &&
            response.data &&
            response.data.success &&
            response.data.data
          ) {
            setNishatChaharSDESheetData(response.data.data);
          }
          break;
        default:
          null;
      }
    } catch (error) {
      throw error;
    }
  }

  function toggleProblemsTable(event, clickedTopicId) {
    if (showProblemsTable && showProblemsTable === clickedTopicId) {
      return;
      // setShowProblemsTable(null);
    } else {
      setShowProblemsTable(clickedTopicId);
      let element = event.target;
      while (true) {
        let elementId = element.getAttribute("id");
        if (elementId && elementId == clickedTopicId) break;
        else element = element.parentElement;
      }
      setTimeout(() => {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 500);
    }
  }

  function toggleProblemStatusDropdown(problemId) {
    if (showProblemStatusDropdown && showProblemStatusDropdown === problemId) {
      setShowProblemStatusDropdown("");
    } else {
      setShowProblemStatusDropdown(problemId);
    }
  }

  function toggleProblemNotesModal(problemId) {
    setProblemNotesInputError(null);
    setProblemNotesInputText("");
    if (showProblemNotesModal && showProblemNotesModal === problemId) {
      setShowProblemNotesModal("");
    } else {
      setShowProblemNotesModal(problemId);
    }
  }

  return (
    <ProblemSetContext.Provider
      value={{
        striverSDESheetData,
        setStriverSDESheetData,
        striverA2ZSheetData,
        setStriverA2ZSheetData,
        striver79DSASheetData,
        setStriver79DSASheetData,
        loveBabbar450DSASheetData,
        setLoveBabbar450DSASheetData,
        apnaCollegeDSASheetData,
        setApnaCollegeDSASheetData,
        blind75SheetData,
        setBlind75SheetData,
        neetCodeSheetData,
        setNeetCodeSheetData,
        nishantChaharSDESheetData,
        setNishatChaharSDESheetData,
        showProblemsTable,
        setShowProblemsTable,
        toggleProblemsTable,
        showProblemStatusDropdown,
        setShowProblemStatusDropdown,
        toggleProblemStatusDropdown,
        showProblemNotesModal,
        problemNotesInputText,
        problemNotesInputError,
        setShowProblemNotesModal,
        toggleProblemNotesModal,
        updateSDESheet,
        changeProblemNotesInputText,
      }}
    >
      {children}
    </ProblemSetContext.Provider>
  );
}

export { ProblemSetContext };
export default ProblemSetProvider;