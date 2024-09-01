import { useContext } from "react";
import { ProblemSetContext } from "../../contexts/problemSetContext";
import ProblemNotesModal from "../ProblemNotesModal/ProblemNotesModal";
import YoDropdown from "../YoDropdown/YoDropdown";
import styles from "./ProblemsTable.module.css";
import { Flowbite } from "flowbite-react";
import { CiStickyNote } from "react-icons/ci";
import { FaStarOfLife } from "react-icons/fa";
import { UserContext } from "../../contexts/userContext";
import ProblemNoteHoverView from "../ProblemNoteHoverView/ProblemNoteHoverView";

function ProblemsTable({ sheetEnum, problemsArr }) {
  const { userLoggedInStatus } = useContext(UserContext);
  const { user } = userLoggedInStatus;

  const customTheme = {
    dropdown: {
      floating: {
        base: "z-10 w-fit divide-y divide-gray-100 focus:outline-none",
      },
      button: {
        base: "group relative flex items-stretch justify-center p-0.5 text-center font-medium",
        color: {
          bllack: "bg-black",
        },
      },
    },
  };

  const { toggleProblemNotesModal } = useContext(ProblemSetContext);

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <div className={styles["table-container"]}>
        <table className={styles["problems-table"]}>
          <thead>
            <tr>
              <th>Status</th>
              <th>Problem Name</th>
              <th>Practice/Article links</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {problemsArr.map((curr_problem) => {
              return (
                <tr key={curr_problem._id}>
                  <td className="">
                    <YoDropdown
                      sheetEnum={sheetEnum}
                      problemId={curr_problem._id}
                      problemStatus={curr_problem.status}
                    />
                    {/* <span className="absolute top-0 left-0 w-6 h-1/2 bg-blue-500"></span> */}
                  </td>
                  <td className="text-base">{curr_problem.problem_name}</td>
                  <td>
                    <div className="flex gap-x-2">
                      <div className="px-2 py-1 text-sm bg-[#dcf8c6] w-fit rounded-[6px] rounded-br-none cursor-pointer underline text-blue-600">
                        link-1
                      </div>
                      <div className="px-2 py-1 text-sm bg-[#dcf8c6] w-fit rounded-[6px] rounded-br-none cursor-pointer underline text-blue-600">
                        link-2
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="group relative">
                      <span>
                        <CiStickyNote
                          onClick={() =>
                            toggleProblemNotesModal(curr_problem._id)
                          }
                          className="relative inline-block text-2xl cursor-pointer text-black"
                        />
                        {curr_problem.problemNote &&
                          curr_problem.problemNote.trim().length > 0 && (
                            <FaStarOfLife className="absolute text-[9px] text-blue-500 top-0 left-full" />
                          )}
                      </span>
                      {curr_problem.problemNote &&
                        curr_problem.problemNote.trim().length > 0 && (
                          <ProblemNoteHoverView
                            problemNote={curr_problem.problemNote}
                            problemId={curr_problem._id}
                          />
                        )}
                    </span>
                    <ProblemNotesModal
                      problemId={curr_problem._id}
                      sheetEnum={sheetEnum}
                      problemNote={curr_problem.problemNote || null}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Flowbite>
  );
}

export default ProblemsTable;
