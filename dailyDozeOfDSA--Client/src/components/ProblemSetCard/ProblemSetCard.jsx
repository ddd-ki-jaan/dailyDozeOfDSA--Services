import React from "react";
import styles from "./ProblemSetCard.module.css";
import { useNavigate } from "react-router-dom";

function ProblemSetCard({ sheetName, slug }) {
  const navigate = useNavigate();

  function cardClickHandler() {
    navigate(slug);
  }

  return (
    <div className={styles["card-container"]} onClick={cardClickHandler}>
      <div className={styles["card-name"]}>
        <div>{sheetName}</div>
      </div>
    </div>
  );
}

export default ProblemSetCard;
