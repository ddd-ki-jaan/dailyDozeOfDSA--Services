import React from "react";
import ProblemSetCard from "../../components/ProblemSetCard/ProblemSetCard";
import problemSheets from "../../constants/problemSheets";
import SEO from "../../SEO/SEO";

function ProblemSet() {
  const pageUrl = window.location.href;
  const pageTitle = "Explore Curated DSA Problem Sheets for Interview Prep";
  const pageDescription =
    "Browse a wide range of curated DSA sheets to enhance your coding skills and ace technical interviews. Find the perfect sheet to match your preparation needs.";

  return (
    <>
      <SEO title={pageTitle} description={pageDescription} url={pageUrl} />
      <div className="page-container">
        <div className="grid gap-y-8 gap-x-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
          {problemSheets.map((problemSheet, index) => (
            <div className="max-w-[280px] w-full">
              <ProblemSetCard
                key={index}
                sheetName={problemSheet.sheetName}
                slug={problemSheet.slug}
                sheetEnum={problemSheet.sheetEnum}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProblemSet;
