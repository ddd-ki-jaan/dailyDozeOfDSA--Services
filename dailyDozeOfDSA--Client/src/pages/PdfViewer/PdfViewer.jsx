import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { IoCloseOutline } from "react-icons/io5";
import { UserContext } from "../../contexts/userContext";
import PDFViewerNavbar from "../../components/PDFViewerComponents/PDFViewerNavbar/PDFViewerNavbar";
import { PDFViewerContext } from "../../contexts/pdfViewerContext";
import PDFPageThumbnail from "../../components/PDFViewerComponents/PDFPageThumbnail/PDFPageThumbnail";
import PDFPageBookmars from "../../components/PDFViewerComponents/PDFPageBookmarks/PDFPageBookmarks";
import { useNavigate, useParams } from "react-router-dom";
import { handleApiError } from "../../constants/reusableFunctions";
import { getNotesUrlFromSlug } from "../../services/engineeringNotesServices";
import { Virtuoso } from "react-virtuoso";
import CreateBookmarkFormModal from "../../components/PDFViewerComponents/CreateBookmarkFormModal/CreateBookmarkFormModal";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function pdfViewer() {
  const { userLoggedInStatus, setUserLoggedInStatusToFalse } =
    useContext(UserContext);
  const {
    totalNumOfPages,
    pageScaleNum,
    showPageThumbnails,
    showMyBookmarks,
    onDocumentLoadSuccess,
    closeLeftSlider,
  } = useContext(PDFViewerContext);

  const navigate = useNavigate();

  const [notesUrl, setNotesUrl] = useState(null);

  let { slug = "" } = useParams();

  let loggedIn = userLoggedInStatus?.loggedIn ?? false;

  const virtuosoRef = useRef(null);

  function navigateToClickedPageNumber(pageIndex) {
    virtuosoRef?.current.scrollToIndex({
      index: pageIndex,
    });
    return false;
  }

  async function getNotesUrlFromSlugHandler() {
    try {
      const response = await getNotesUrlFromSlug(slug);
      if (response?.data?.success) {
        setNotesUrl(response.data.data);
      }
    } catch (error) {
      console.log("*** getNotesUrlFromSlugHandler error: ***", error);
      handleApiError(error, navigate, setUserLoggedInStatusToFalse);
    }
  }

  useEffect(() => {
    document.body.style.width = "100%";
    document.body.style.border = "none";

    getNotesUrlFromSlugHandler();

    return () => {
      document.body.style.width = "980px";
      document.body.style.borderWidth = "0 2px";
      document.body.style.borderStyle = "solid";
      document.body.style.borderColor = "black";
    };
  }, []);

  return (
    <>
      <div className="">
        {notesUrl && (
          <Document file={notesUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <div>
              <PDFViewerNavbar />
              <div className="flex gap-x-2 ml-4">
                <div
                  className={`w-[300px] min-w-[300px] sticky top-[50px] h-screen overflow-y-auto transition-all duration-500 ease-in-out ${
                    showPageThumbnails || showMyBookmarks
                      ? "ml-0"
                      : "-ml-[300px]"
                  }`}
                >
                  {showPageThumbnails && (
                    <PDFPageThumbnail
                      navigateToClickedPageNumberHandler={
                        navigateToClickedPageNumber
                      }
                    />
                  )}

                  {showMyBookmarks && false && <PDFPageBookmars />}
                  <div className="absolute top-0 right-[20px]">
                    <IoCloseOutline
                      className="text-2xl bg-blue-100 cursor-pointer w-6 h-6"
                      onClick={closeLeftSlider}
                    />
                  </div>
                </div>
                <div className="flex-grow overflow-y-auto">
                  <Virtuoso
                    ref={virtuosoRef}
                    totalCount={totalNumOfPages}
                    itemContent={(index) => (
                      <div className="mb-4">
                        <Page
                          width="800"
                          scale={pageScaleNum}
                          pageNumber={index + 1}
                        />
                        <span className="text-sm">
                          {index + 1} / {totalNumOfPages}
                        </span>
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
          </Document>
        )}
      </div>
      <CreateBookmarkFormModal />
    </>
  );
}

export default pdfViewer;