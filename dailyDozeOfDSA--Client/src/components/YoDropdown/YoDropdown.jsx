import React, { useState, useContext, useEffect } from "react";
import { ProblemSetContext } from "../../contexts/problemSetContext";
import { IoIosArrowDown } from "react-icons/io";
import { updateUserProblemStatus } from "../../services/userServices";
import { UserContext } from "../../contexts/userContext";
import toast from "react-hot-toast";
import { handleApiError } from "../../constants/reusableFunctions";
import { useLocation, useNavigate } from "react-router-dom";
import { BsInfoCircleFill } from "react-icons/bs";

function YoDropdown({ sheetEnum, problemId, problemStatus }) {
  const { showProblemStatusDropdown, toggleProblemStatusDropdown } =
    useContext(ProblemSetContext);
  const { userLoggedInStatus, setUserLoggedInStatusToFalse } =
    useContext(UserContext);
  const { updateSDESheet } = useContext(ProblemSetContext);
  const { loggedIn, user } = userLoggedInStatus;

  const navigate = useNavigate();

  const status = !loggedIn
    ? "select"
    : problemStatus
    ? problemStatus.toLowerCase()
    : "pending";

  let dropdownBorderColor = "border-black";
  if (loggedIn) {
    if (!problemStatus || (problemStatus && problemStatus === "PENDING")) {
      dropdownBorderColor = "border-[#FFA500] text-[#FFA500]";
    } else if (problemStatus === "DONE")
      dropdownBorderColor = "border-[#228B22] text-[#228B22]";
    else if (problemStatus === "REVISIT")
      dropdownBorderColor = "border-[#1E90FF] text-[#1E90FF]";
  }

  async function changeProblemStatusHandler(statusVal) {
    try {
      if (loggedIn && problemStatus && problemStatus === statusVal) {
        toast(
          <div className="flex items-center gap-x-2">
            <span>
              <BsInfoCircleFill className="text-blue-500" />
            </span>
            problem status is already
            <span className="font-semibold">{statusVal.toLowerCase()}</span>
          </div>,
          {
            position: "top-right",
            duration: 3000,
          }
        );

        toggleProblemStatusDropdown();
        return;
      }
      const response = await updateUserProblemStatus(
        problemId,
        statusVal,
        sheetEnum
      );
      if (response && response.data && response.data.success) {
        toast.success(response.data.message, {
          position: "top-right",
          duration: 2000,
        });

        updateSDESheet(sheetEnum);
      }
    } catch (error) {
      console.log("*** changeProblemStatusHandler error: ***", error);
      handleApiError(error, navigate, setUserLoggedInStatusToFalse);
    }

    toggleProblemStatusDropdown();
  }

  return (
    <div className="">
      <div className="">
        <button
          onClick={() => toggleProblemStatusDropdown(problemId)}
          className={`flex items-center bg-none font-medium px-4 py-1 border rounded ${dropdownBorderColor}`}
        >
          {status}
          <span className="ml-2">
            <IoIosArrowDown />
          </span>
        </button>
      </div>
      <div>
        {showProblemStatusDropdown &&
          showProblemStatusDropdown === problemId && (
            <ul className="absolute mt-1 bg-slate-100 text-black py-1 rounded-[7px]">
              {Array.from([
                { label: "pending", value: "PENDING" },
                { label: "done", value: "DONE" },
                { label: "revisit", value: "REVISIT" },
              ]).map((currStatus) => (
                <li
                  key={currStatus.value}
                  onClick={() => changeProblemStatusHandler(currStatus.value)}
                  className="cursor-pointer py-1 hover:bg-white px-4"
                >
                  {currStatus.label}
                </li>
              ))}
            </ul>
          )}
      </div>
    </div>
  );
}

export default YoDropdown;
