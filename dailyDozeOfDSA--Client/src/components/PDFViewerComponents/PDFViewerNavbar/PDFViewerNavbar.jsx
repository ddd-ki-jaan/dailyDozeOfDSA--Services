import { useContext } from "react";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";
import { PDFViewerContext } from "../../../contexts/pdfViewerContext";

function PDFViewerNavbar() {
  const {
    pageScaleNum,
    showPageThumbnails,
    showMyBookmarks,
    toggleShowPageThumbnails,
    toggleShowMyBookmarks,
    setPageScaleNumHandler,
  } = useContext(PDFViewerContext);

  return (
    <div className="flex items-center justify-around min-w-[980px] w-screen h-[50px] mb-4 bg-black sticky top-0 z-10">
      <div className="flex text-white items-center h-full gap-x-8 font-light">
        <button
          className={`px-4 py-1 ${
            showPageThumbnails ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={toggleShowPageThumbnails}
        >
          PageThumbnails
        </button>
        {false && (
          <button
            className={`px-4 py-1 ${
              showMyBookmarks ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={toggleShowMyBookmarks}
          >
            Your Bookmarks
          </button>
        )}
      </div>
      <div className="text-white flex items-center gap-x-8">
        <button
          className="flex items-center gap-x-2 bg-blue-500 px-4 py-1"
          onClick={() => setPageScaleNumHandler(pageScaleNum - 0.1)}
        >
          <span>
            <FiZoomOut />
          </span>
          zoom out
        </button>
        <button
          className="flex items-center gap-x-2 bg-blue-500 px-4 py-1"
          onClick={() => setPageScaleNumHandler(pageScaleNum + 0.1)}
        >
          <span>
            <FiZoomIn />
          </span>
          zoom in
        </button>
      </div>
    </div>
  );
}

export default PDFViewerNavbar;
