import { Progress } from "flowbite-react";
import ProblemsTable from "../ProblemsTable/ProblemsTable";
import { Flowbite } from "flowbite-react";
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
        className="mb-[14px] p-[12px] border border-black rounded-tr-[7px] rounded-bl-[7px] cursor-pointer flex flex-col-reverse sm:flex-row sm:justify-between items-center gap-y-2"
      >
        <div className="flex flex-col items-center sm:flex-row">
          <div className="text-nowrap text-[1rem]">
            Day: {currTopicData.day_no || currTopicData.topic_no}
          </div>
          <div className="text-nowrap sm:text-wrap sm:ml-[24px] text-[1rem] sm:text-[1.2rem] font-[400] tracking-[0.1rem]">
            {currTopicData.topic_name}
          </div>
        </div>
        <div className="w-[250px] h-[7px]">
          <Progress
            progress={progressBarPerNum || 0}
            className=""
            color="black"
          />
        </div>
      </div>
      {showProblemsTable && showProblemsTable == currTopicData._id && (
        <div>
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
