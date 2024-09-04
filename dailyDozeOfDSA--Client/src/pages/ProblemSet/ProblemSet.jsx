import React from "react";
import styles from "./ProblemSet.module.css";
import ProblemSetCard from "../../components/ProblemSetCard/ProblemSetCard";
import problemSheets from "../../constants/problemSheets";
import { Helmet } from "react-helmet-async";
import SEO from "../../SEO/SEO";

function ProblemSet() {
  const pageUrl = window.location.href;
  const pageTitle = "Explore Curated DSA Problem Sheets for Interview Prep";
  const pageDescription =
    "Browse a wide range of curated DSA sheets to enhance your coding skills and ace technical interviews. Find the perfect sheet to match your preparation needs.";

  return (
    <>
      <SEO title={pageTitle} description={pageDescription} url={pageUrl} />
      <div
        className={[styles["problemSet-container"], "page-container"].join(" ")}
      >
        <div className={styles["problems-card-container"]}>
          {problemSheets.map((problemSheet, index) => (
            <ProblemSetCard
              key={index}
              sheetName={problemSheet.sheetName}
              slug={problemSheet.slug}
              sheetEnum={problemSheet.sheetEnum}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default ProblemSet;
