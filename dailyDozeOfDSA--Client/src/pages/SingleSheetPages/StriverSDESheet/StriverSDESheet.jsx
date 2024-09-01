import React, { useContext, useEffect, useState } from "react";
import styles from "./StriverSDESheet.module.css";
import { ProblemSetContext } from "../../../contexts/problemSetContext";
import {
  getStriverSDESheet,
  getProblemSheetDescrtiption,
} from "../../../services/problemSheetServices";
import ProblemTopic from "../../../components/ProblemTopic/ProblemTopic";
import Loader from "../../../components/Loader/Loader";
import ProblemSheetCredit from "../../../components/ProblemSheetCredit/ProblemSheetCredit";
import SEO from "../../../SEO/SEO";

function StriverSDESheet({ sheetEnum }) {
  const pageTitle =
    "Striver's SDE Sheet - Solve DSA Problems for Interview Success";
  const pageDescription =
    "Tackle Striver's SDE Sheet, a curated collection of essential DSA problems to boost your interview preparation. Track your progress and master each topic.";
  const pageUrl = window.location.href;

  const {
    striverSDESheetData,
    setStriverSDESheetData,
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
    const fetchStriverSDESheetData = async () => {
      try {
        const response = await getStriverSDESheet();
        setStriverSDESheetData(response.data.data);
        // setLoadingState(false);
      } catch (error) {
        // setLoadingState(false);
        console.log(error);
      } finally {
        setLoadingSheet(false);
      }
    };

    fetchStriverSDESheetData();
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
        {striverSDESheetData.map((currTopicData) => (
          <ProblemTopic
            key={currTopicData._id}
            sheetEnum={sheetEnum}
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
