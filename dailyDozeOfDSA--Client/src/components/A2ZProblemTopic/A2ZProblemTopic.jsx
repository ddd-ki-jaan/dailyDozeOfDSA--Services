import { useState, useContext } from "react";
import A2ZProblemSubTopic from "../A2ZProblemSubTopic/A2ZProblemSubTopic";
import { ProblemSetContext } from "../../contexts/problemSetContext";

function A2ZProblemTopic({ sheetEnum, currTopicData }) {
  const { showProblemsTable, toggleProblemsTable } =
    useContext(ProblemSetContext);

  return (
    <div>
      <div
        id={currTopicData._id}
        className="mb-[14px] mt-[28px] p-[12px] border border-black rounded-tr-[7px] rounded-bl-[7px] flex flex-col sm:flex-row items-center first:mt-0"
      >
        <div className="whitespace-nowrap font-semibold sm:font-normal">
          Topic: {currTopicData.step_no}
        </div>
        <div className="tracking-[0.1rem] font-semibold sm:font-normal sm:text-[1.2rem] sm:ml-[24px]">
          {currTopicData.topic_name}
        </div>
      </div>
      <div className="ml-[24px] sm:ml-[48px]">
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
    </div>
  );
}

export default A2ZProblemTopic;
