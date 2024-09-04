import { useState, createContext } from "react";

const PDFViewerContext = createContext();

function PDFViewerContextProvider({ children }) {
  const [totalNumOfPages, setTotalNumOfPages] = useState(0);
  const [pageScaleNum, setPageScaleNum] = useState(1);
  const [showPageThumbnails, setShowPageThumbnails] = useState(true);
  const [showMyBookmarks, setShowMyBookmarks] = useState(false);
  const [lastViewedThumbnailPageNum, setLastViewedThumbnailPageNum] =
    useState(null);
  const [showCreateBookmarkModal, setShowCreateBookmarkModal] = useState(false);
  const [createBookmarkFormData, setCreateBookmarkFormData] = useState({
    pageNum: "",
    bookmarkTitle: "",
    bookmarkDescription: "",
  });
  const [createBookmarkFormFieldErrors, setCreateBookmarkFormFieldErrors] =
    useState({
      pageNum: "",
      bookmarkTitle: "",
      bookmarkDescription: "",
    });

  function setPageScaleNumHandler(newScale) {
    setPageScaleNum(newScale);
  }

  function toggleShowPageThumbnails() {
    if (showMyBookmarks) setShowMyBookmarks(false);
    setShowPageThumbnails((prevState) => !prevState);
  }

  function toggleShowMyBookmarks() {
    if (showPageThumbnails) setShowPageThumbnails(false);
    setShowMyBookmarks((prevState) => !prevState);
  }

  function closeLeftSlider() {
    setShowPageThumbnails(false);
    setShowMyBookmarks(false);
  }

  function onDocumentLoadSuccess({ numPages }) {
    setTotalNumOfPages(numPages);
  }

  function setLastViewedThumbnailPageNumHandler(pageNum) {
    setLastViewedThumbnailPageNum(pageNum);
  }

  function toggleShowCreateBookmarkModal() {
    setShowCreateBookmarkModal((prevState) => !prevState);
  }

  function setCreateBookmarkFormDataHandler(key, val) {
    setCreateBookmarkFormData((prevState) => ({
      ...prevState,
      [key]: val,
    }));

    let _val = val.trim();
    let errorMessage = "";
    setCreateBookmarkFormFieldErrorsHandler(key, "");
    if (!_val) {
      errorMessage = "this field cannot be empty";
    }
    switch (key) {
      case "pageNum":
        if (_val) {
          if (isNaN(_val)) {
            errorMessage = "page number is not valid";
          } else if (_val <= 0) {
            errorMessage = "page number cannot be less than 0";
          } else if (_val > totalNumOfPages) {
            errorMessage =
              "page number cannot be greater than total number of pages";
          }
        }
        break;
      case "bookmarkTitle":
        if (_val && _val.length > 25) {
          errorMessage =
            "length of the title cannot exceed more than 25 characters";
        }
        break;
      case "bookmarkDescription":
        if (_val && _val.length > 750) {
          errorMessage =
            "length of description cannot exceed more than 750 chracters";
        }
        break;
      default:
        null;
    }

    if (errorMessage) {
      setCreateBookmarkFormFieldErrorsHandler(key, errorMessage);
    }
  }

  function setCreateBookmarkFormFieldErrorsHandler(key, val) {
    setCreateBookmarkFormFieldErrors((prevState) => ({
      ...prevState,
      [key]: val,
    }));
  }

  return (
    <PDFViewerContext.Provider
      value={{
        totalNumOfPages,
        pageScaleNum,
        showPageThumbnails,
        showMyBookmarks,
        lastViewedThumbnailPageNum,
        createBookmarkFormData,
        createBookmarkFormFieldErrors,
        showCreateBookmarkModal,
        setPageScaleNumHandler,
        toggleShowPageThumbnails,
        toggleShowMyBookmarks,
        closeLeftSlider,
        onDocumentLoadSuccess,
        setLastViewedThumbnailPageNumHandler,
        toggleShowCreateBookmarkModal,
        setCreateBookmarkFormDataHandler,
        setCreateBookmarkFormFieldErrorsHandler,
      }}
    >
      {children}
    </PDFViewerContext.Provider>
  );
}

export { PDFViewerContext };
export default PDFViewerContextProvider;
