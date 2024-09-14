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
        className="mb-[14px] p-[12px] border-[1.5px] border-black rounded-tr-[7px] rounded-bl-[7px] cursor-pointer flex flex-col-reverse md:flex-row items-center gap-y-2"
        onClick={(event) => toggleProblemsTable(event, currSubTopicData._id)}
      >
        <div className="flex flex-col md:flex-row items-center">
          <div className="whitespace-nowrap">
            Topic: {topic_no}.{currSubTopicData.sub_step_no}
          </div>
          <div className="md:ml-[24px] md:text-[1.1rem] tracking-[0.1rem]">
            <div>{currSubTopicData.topic_name}</div>
          </div>
        </div>
        <div className="w-[250px] h-[7px] md:ml-auto">
          <Progress
            progress={progreeBarPerNumber || 0}
            className=""
            color="black"
          />
        </div>
      </div>
      {showProblemsTable && showProblemsTable == currSubTopicData._id && (
        <div className="">
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
