import React, { useContext, useEffect, useState } from "react";
import styles from "./StriverA2ZDSASheet.module.css";
import { ProblemSetContext } from "../../../contexts/problemSetContext";
import {
  getStriverA2ZSheet,
  getProblemSheetDescrtiption,
} from "../../../services/problemSheetServices";
import { UserContext } from "../../../contexts/userContext";
import ProblemTopic from "../../../components/ProblemTopic/ProblemTopic";
import Loader from "../../../components/Loader/Loader";
import A2ZProblemTopic from "../../../components/A2ZProblemTopic/A2ZProblemTopic";
import ProblemSheetCredit from "../../../components/ProblemSheetCredit/ProblemSheetCredit";
import SEO from "../../../SEO/SEO";

function StriverA2ZDSASheet({ sheetEnum }) {
  const pageTitle =
    "Striver's A2Z DSA Sheet - Solve DSA Problems for Interview Success";
  const pageDescription =
    "Tackle Striver's A2Z DSA Sheet, a curated collection of essential DSA problems to boost your interview preparation. Track your progress and master each topic.";
  const pageUrl = window.location.href;

  const { striverA2ZSheetData, setStriverA2ZSheetData } =
    useContext(ProblemSetContext);
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
    const fetchStriverA2ZSheetData = async () => {
      try {
        const response = await getStriverA2ZSheet();
        setStriverA2ZSheetData(response.data.data);
        // setLoadingState(false);
      } catch (error) {
        // setLoadingState(false);
        console.log(error);
      } finally {
        setLoadingSheet(false);
      }
    };

    fetchStriverA2ZSheetData();
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
        {striverA2ZSheetData.map((currTopicData) => (
          <A2ZProblemTopic
            key={currTopicData._id}
            sheetEnum={sheetEnum}
            currTopicData={currTopicData}
          />
        ))}
      </div>
    </>
  );
}

export default StriverA2ZDSASheet;
