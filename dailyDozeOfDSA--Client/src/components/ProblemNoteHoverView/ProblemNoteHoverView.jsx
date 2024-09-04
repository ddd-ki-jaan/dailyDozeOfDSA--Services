import { useContext } from "react";
import { ProblemSetContext } from "../../contexts/problemSetContext";

function ProblemNoteHoverView({ problemId, problemNote }) {
  const { toggleProblemNotesModal } = useContext(ProblemSetContext);
  return (
    <div className="hidden group-hover:block absolute right-full top-0 pr-8">
      <div className="bg-[#dcf8c6] border border-dashed border-blue-500 w-[320px] max-h-[240px] overflow-scroll rounded-[14px] rounded-br-none">
        <div className="text-sm p-4 whitespace-pre-wrap">{problemNote}</div>
        <div className="sticky bottom-0 px-2 py-1 bg-white">
          <span
            onClick={() => toggleProblemNotesModal(problemId)}
            className="cursor-pointer text-blue-500 font-semibold underline"
          >
            update note
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProblemNoteHoverView;
