import React, { useContext, useEffect, useState } from "react";
import styles from "./Striver79DSASheet.module.css";
import { ProblemSetContext } from "../../../contexts/problemSetContext";
import {
  getStriver79DSASheet,
  getProblemSheetDescrtiption,
} from "../../../services/problemSheetServices";
import { UserContext } from "../../../contexts/userContext";
import ProblemTopic from "../../../components/ProblemTopic/ProblemTopic";
import Loader from "../../../components/Loader/Loader";
import ProblemSheetCredit from "../../../components/ProblemSheetCredit/ProblemSheetCredit";
import SEO from "../../../SEO/SEO";

function StriverSDESheet({ sheetEnum }) {
  const pageTitle =
    "Striver's 79 DSA Sheet - Solve DSA Problems for Interview Success";
  const pageDescription =
    "Tackle Striver's 79 DSA Sheet, a curated collection of essential DSA problems to boost your interview preparation. Track your progress and master each topic.";
  const pageUrl = window.location.href;

  const {
    striver79DSASheetData,
    setStriver79DSASheetData,
    showProblemsTable,
    toggleProblemsTable,
  } = useContext(ProblemSetContext);
  // const [loadingState, setLoadingState] = useState(true);
  const [loadingSheet, setLoadingSheet] = useState(true);
  const [loadingSheetDescription, setLoadingSheetDescription] = useState(true);
  const [sheetDescription, setSheetDescription] = useState(null);

  const dummySheetDescription = {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla nec dictum dapibus, eros orci elementum eros, vel egestas ligula felis ac ante. Sed cursus euismod turpis, id laoreet mi cursus sed.",
    title: "Sheet Credit",
  };

  useEffect(() => {
    const fetchStriver79SheetData = async () => {
      try {
        const response = await getStriver79DSASheet();
        setStriver79DSASheetData(response.data.data);
        // setLoadingState(false);
      } catch (error) {
        // setLoadingState(false);
        console.log(error);
      } finally {
        setLoadingSheet(false);
      }
    };

    fetchStriver79SheetData();
  }, []);

  useEffect(() => {
    const fetchSheetDescription = async () => {
      try {
        const response = await getProblemSheetDescrtiption(sheetEnum);
        setSheetDescription(response.data.data);
      } catch (error) {
        setSheetDescription(dummySheetDescription);
        console.log("Error fetching sheet description:", error);
      } finally {
        setLoadingSheetDescription(false);
      }
    };

    fetchSheetDescription();
  }, [sheetEnum]);

  if (loadingSheet || loadingSheetDescription) {
    return <Loader />;
  }

  return (
    <>
      <SEO title={pageTitle} description={pageDescription} url={pageUrl} />
      <div className="page-container">
        <ProblemSheetCredit sheetDescription={sheetDescription} />
        {striver79DSASheetData.map((currTopicData) => (
          <ProblemTopic
            sheetEnum={sheetEnum}
            key={currTopicData._id}
            currTopicData={currTopicData}
            showProblemsTable={showProblemsTable}
            toggleProblemsTable={toggleProblemsTable}
          />
        ))}
      </div>
    </>
  );
}

export default StriverSDESheet;
