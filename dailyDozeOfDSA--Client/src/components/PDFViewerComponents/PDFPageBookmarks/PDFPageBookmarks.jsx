import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/userContext";
import { IoAddOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { PDFViewerContext } from "../../../contexts/pdfViewerContext";
import { handleApiError } from "../../../constants/reusableFunctions";

function PDFPageBookmars() {
  const { userLoggedInStatus, setUserLoggedInStatusToFalse } =
    useContext(UserContext);
  const { toggleShowCreateBookmarkModal } = useContext(PDFViewerContext);

  const loggedIn = userLoggedInStatus?.loggedIn ?? false;

  const navigate = useNavigate();

  function clickedOnCreateBookmarkButton() {
    if (!loggedIn) {
      toast.error(
        "you need to be loggedIn first to create/view your bookmarks",
        {
          duration: 3000,
          position: "top-right",
        }
      );
      return;
    }

    toggleShowCreateBookmarkModal();
  }

  return (
    <div className="bg-blue-200 min-h-screen">
      <div className="py-8">
        <div className="px-4 mb-4">
          <button
            onClick={clickedOnCreateBookmarkButton}
            className="flex items-center gap-x-2 bg-blue-500 px-4 py-2 text-white"
          >
            <span>
              <IoAddOutline className="text-lg" />
            </span>
            create a new bookmark
          </button>
          {!loggedIn && (
            <div className="mt-2 text-sm text-red-800">
              ( kindly{" "}
              <span
                className="underline cursor-pointer"
                onClick={() => navigate("/signIn")}
              >
                logIn
              </span>{" "}
              to create/view your bookmarks)
            </div>
          )}
        </div>
        {loggedIn && false && (
          <div>
            <div className="px-4 text-lg pb-2 border-b border-black">
              Your Saved Bookmarks
            </div>
            <div className="px-4 mt-4">
              <ul className="list-disc px-4">
                <li className="text-sm mb-2">
                  page:{" "}
                  <span className="text-blue-800 underline cursor-pointer">
                    42
                  </span>{" "}
                  -{" "}
                  <span className="text-blue-800 underline cursor-pointer">
                    bookmark titleeeeeeeeeeee
                  </span>
                </li>
                <li className="text-sm mb-2">
                  page:{" "}
                  <span className="text-blue-800 underline cursor-pointer">
                    42
                  </span>{" "}
                  -{" "}
                  <span className="text-blue-800 underline cursor-pointer">
                    yello bookmark title
                  </span>
                </li>
                <li className="text-sm mb-2">
                  page:{" "}
                  <span className="text-blue-800 underline cursor-pointer">
                    42
                  </span>{" "}
                  -{" "}
                  <span className="text-blue-800 underline cursor-pointer">
                    another bookmark
                  </span>{" "}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PDFPageBookmars;
