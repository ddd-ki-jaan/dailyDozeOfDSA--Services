import { useState, useContext } from "react";
import A2ZProblemSubTopic from "../A2ZProblemSubTopic/A2ZProblemSubTopic";
import { ProblemSetContext } from "../../contexts/problemSetContext";
import styles from "./A2ZProblemTopic.module.css";

function A2ZProblemTopic({ sheetEnum, currTopicData }) {
  const { showProblemsTable, toggleProblemsTable } =
    useContext(ProblemSetContext);

  return (
    <>
      <div id={currTopicData._id} className={styles["topic-header-container"]}>
        <div className={styles["header-topic-no"]}>
          <div>Topic: {currTopicData.step_no}</div>
        </div>
        <div className={styles["header-topic-name"]}>
          {currTopicData.topic_name}
        </div>
      </div>
      <div className={styles["sub-topic-container"]}>
        {currTopicData.sub_steps.map((currSubTopic) => (
          <A2ZProblemSubTopic
            key={currSubTopic._id}
            sheetEnum={sheetEnum}
            topic_no={currTopicData.step_no}
            currSubTopicData={currSubTopic}
            showProblemsTable={showProblemsTable}
            toggleProblemsTable={toggleProblemsTable}
          />
        ))}
      </div>
    </>
  );
}

export default A2ZProblemTopic;
