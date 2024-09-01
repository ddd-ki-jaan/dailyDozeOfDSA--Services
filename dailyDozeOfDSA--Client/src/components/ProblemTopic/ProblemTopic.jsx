import { Progress } from "flowbite-react";
import ProblemsTable from "../ProblemsTable/ProblemsTable";
import { Flowbite } from "flowbite-react";
import styles from "./ProblemTopic.module.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/userContext";

function ProblemTopic({
  sheetEnum,
  currTopicData,
  showProblemsTable,
  toggleProblemsTable,
}) {
  const { userLoggedInStatus } = useContext(UserContext);
  let loggedIn = userLoggedInStatus?.loggedIn;

  const [progressBarPerNum, setProgressBarPerNumber] = useState(null);

  useEffect(() => {
    /** function for calculating the progress bar percentage number */
    (function calcProgressBarPercentageNum() {
      if (!loggedIn) return;
      let totalNumOfSolvedProblems = currTopicData.problems.reduce(
        (acc, curr) => acc + (curr.status && curr.status === "DONE" ? 1 : 0),
        0
      );
      let totalNumOfProblems = currTopicData.problems.length;

      let calculatedProgressBarPerNum =
        (totalNumOfSolvedProblems / totalNumOfProblems) * 100;

      setProgressBarPerNumber(calculatedProgressBarPerNum);
    })();
  }, [currTopicData]);

  const customTheme = {
    progress: {
      color: {
        black: "bg-black",
      },
    },
  };

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <div
        id={currTopicData._id}
        onClick={(event) => toggleProblemsTable(event, currTopicData._id)}
        className={styles["topic-header-container"]}
      >
        <div className={styles["header-topic-no"]}>
          <div>Day: {currTopicData.day_no || currTopicData.topic_no}</div>
        </div>
        <div className={styles["header-topic-name"]}>
          <div>{currTopicData.topic_name}</div>
        </div>
        <div className={styles["progress-bar"]}>
          <Progress
            progress={progressBarPerNum || 0}
            className=" "
            color="black"
          />
        </div>
      </div>
      {showProblemsTable && showProblemsTable == currTopicData._id && (
        <div className={styles["problems-table-container"]}>
          <ProblemsTable
            sheetEnum={sheetEnum}
            problemsArr={currTopicData.problems}
          />
        </div>
      )}
    </Flowbite>
  );
}

export default ProblemTopic;
