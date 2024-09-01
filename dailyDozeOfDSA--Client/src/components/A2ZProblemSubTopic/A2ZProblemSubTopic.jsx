import { useContext, useEffect, useState } from "react";
import styles from "./A2ZProblemSubTopic.module.css";
import ProblemsTable from "../ProblemsTable/ProblemsTable";
import { Progress, Flowbite } from "flowbite-react";
import { UserContext } from "../../contexts/userContext";

function A2ZProblemSubTopic({
  sheetEnum,
  topic_no,
  currSubTopicData,
  showProblemsTable,
  toggleProblemsTable,
}) {
  const { userLoggedInStatus } = useContext(UserContext);
  let loggedIn = userLoggedInStatus?.loggedIn;

  const [progreeBarPerNumber, setProgressBarPerNumber] = useState(null);

  useEffect(() => {
    /** function for calculating the progress bar percentage number */
    (function calcProgressBarPercentageNum() {
      if (!loggedIn) return;
      let totalNumOfSolvedProblems = currSubTopicData.problems.reduce(
        (acc, curr) => acc + (curr.status && curr.status === "DONE" ? 1 : 0),
        0
      );
      let totalNumOfProblems = currSubTopicData.problems.length;

      let calculatedProgressBarPerNum =
        (totalNumOfSolvedProblems / totalNumOfProblems) * 100;

      setProgressBarPerNumber(calculatedProgressBarPerNum);
    })();
  }, [currSubTopicData]);

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
        id={currSubTopicData._id}
        className={styles["topic-header-container"]}
        onClick={(event) => toggleProblemsTable(event, currSubTopicData._id)}
      >
        <div className={styles["header-topic-no"]}>
          <div>
            Topic: {topic_no}.{currSubTopicData.sub_step_no}
          </div>
        </div>
        <div className={styles["header-topic-name"]}>
          <div>{currSubTopicData.topic_name}</div>
        </div>
        <div className={styles["progress-bar"]}>
          <Progress
            progress={progreeBarPerNumber || 0}
            className=" "
            color="black"
          />
        </div>
      </div>
      {showProblemsTable && showProblemsTable == currSubTopicData._id && (
        <div className={styles["problems-table-container"]}>
          <ProblemsTable
            sheetEnum={sheetEnum}
            problemsArr={currSubTopicData.problems}
          />
        </div>
      )}
    </Flowbite>
  );
}

export default A2ZProblemSubTopic;
