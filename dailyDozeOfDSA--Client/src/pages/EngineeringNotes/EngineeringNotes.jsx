import { React, useContext, useEffect, useState } from "react";
import PDFCard from "../../components/PDFCard/PDFCard";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmationPopup from "../../components/ConfirmationPopup/ConfirmationPopup.jsx";
import { EngineeringNotesContext } from "../../contexts/engineeringNoteContext";
import ReactPaginate from "react-paginate";
import { getEngineeringNoteCategories } from "../../services/engineeringNotesServices";
import SEO from "../../SEO/SEO.jsx";
import Loader from "../../components/Loader/Loader";
import NoDataFound from "../../components/NoDataFound/NoDataFound.jsx";
import { handleApiError } from "../../constants/reusableFunctions.js";
import { UserContext } from "../../contexts/userContext.jsx";
import { Label, Select } from "flowbite-react";

function EngineeringNotes() {
  const pageTitle = "Access Free Engineering Notes - Computer Science & More";
  const pageDescription =
    "Access comprehensive engineering notes covering all possible topics in the CSE domain. Ideal for students and professionals alike.";
  const pageUrl = window.location.href;

  const {
    engineeringNotes,
    engineeringNoteCategories,
    totalNumOfPages,
    selectedCategory,
    activePageNumber,
    showSavedNotes,
    setEngineeringNoteCategoriesHandler,
    setSelectedCategoryHandler,
    setActivePageNumberHandler,
    toggleShowSavedNotes,
    fetchEngineeringNotes,
  } = useContext(EngineeringNotesContext);

  const { setUserLoggedInStatusToFalse } = useContext(UserContext);

  const [loadingNotes, setLoadingNotes] = useState(true);
  const [loadingNotesCategories, setLoadingNotesCategories] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  function updateQueryParams(paramName, paramVal) {
    queryParams.set(paramName, paramVal);

    const newSearch = `?${queryParams.toString()}`;
    navigate({ search: newSearch });
  }

  function changeCategoryHandler(categoryVal) {
    setSelectedCategoryHandler(categoryVal);
    setActivePageNumberHandler(1);
    updateQueryParams("category", categoryVal);
    updateQueryParams("pageNum", 1);
  }

  function changeActivePageNumHandler(pageNum) {
    setActivePageNumberHandler(pageNum);
    updateQueryParams("pageNum", pageNum);
  }

  function toggleShowSavedNotesButtonHandler(currStatus) {
    toggleShowSavedNotes(!currStatus);
    setSelectedCategoryHandler("ALL");
    setActivePageNumberHandler(1);
    updateQueryParams("showSavedNotes", !currStatus);
    updateQueryParams("category", "ALL");
    updateQueryParams("pageNum", 1);
  }

  async function fetchEngineeringNoteCategories() {
    try {
      const categoriesResponse = await getEngineeringNoteCategories();
      if (categoriesResponse?.data?.success) {
        setEngineeringNoteCategoriesHandler(categoriesResponse.data.data || []);
      }
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    const queryCategoryVal = queryParams.get("category") || "ALL";
    const queryPageNumVal = queryParams.get("pageNum") || 1;
    const queryShowSavedNotesVal = queryParams.get("showSavedNotes") === "true";

    setSelectedCategoryHandler(queryCategoryVal);
    setActivePageNumberHandler(queryPageNumVal);
    toggleShowSavedNotes(queryShowSavedNotesVal);
  }, []);

  useEffect(() => {
    if (selectedCategory && activePageNumber && showSavedNotes !== null) {
      (async function () {
        try {
          await fetchEngineeringNoteCategories();
          await fetchEngineeringNotes();
        } catch (error) {
          setActivePageNumberHandler(null);
          setEngineeringNoteCategoriesHandler(null);
          toggleShowSavedNotes(null);
          handleApiError(error, navigate, setUserLoggedInStatusToFalse);
        } finally {
          setLoadingNotes(false);
          setLoadingNotesCategories(false);
        }
      })();
    }
  }, [selectedCategory, activePageNumber, showSavedNotes]);

  if (loadingNotesCategories || loadingNotes) {
    return <Loader />;
  }

  return (
    <>
      <SEO title={pageTitle} description={pageDescription} url={pageUrl} />
      <div className="page-container">
        <div className="flex flex-col sm:flex-row gap-y-4 justify-between items-center">
          <div className="flex self-end sm:self-auto sm:flex-col md:flex-row gap-y-2 items-center gap-x-2">
            <Label
              className="text-md font-normal"
              htmlFor="notesCategoryOptions"
              value="Select Notes Category: "
            />
            <Select
              value={selectedCategory}
              onChange={(event) => changeCategoryHandler(event.target.value)}
              sizing="sm"
              id="notesCategoryOptions"
              color="bllack"
              className="flowbite-select"
              required
            >
              {engineeringNoteCategories.map((option) => (
                <option key={option.optionValue} value={option.optionValue}>
                  {option.optionLabel}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex self-end sm:self-auto gap-x-2 cursor-pointer">
            <div
              className={`after:transition-all after:ease-in-out duration-1000 relative w-[64px] h-[24px] rounded-full border border-dashed border-black after:absolute after:w-5 after:h-5 after:bg-gray-400  after:rounded-full after:top-1/2 after:-translate-y-1/2 ${
                showSavedNotes
                  ? "bg-green-500 border-green-500 after:bg-gray-200 after:left-[40px]"
                  : "after:left-[2px]"
              }`}
              onClick={() => toggleShowSavedNotesButtonHandler(showSavedNotes)}
            ></div>
            <div>My Saved Notes</div>
          </div>
        </div>
        <div className="w-full mt-8 mb-[32px]">
          <div className="w-full grid grid-cols-1 gap-x-4 gap-y-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-items-center">
            {engineeringNotes?.length > 0 ? (
              engineeringNotes.map((note, index) => (
                <div key={note._id} className="max-w-[280px] w-full">
                  <PDFCard note={note} isSaved={!!note.isSaved} />
                </div>
              ))
            ) : (
              <NoDataFound />
            )}
          </div>
        </div>
        {engineeringNotes?.length > 0 &&
        totalNumOfPages &&
        totalNumOfPages > 0 &&
        activePageNumber ? (
          <ReactPaginate
            containerClassName="paginate-container"
            pageCount={totalNumOfPages}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            forcePage={activePageNumber - 1}
            previousLabel="<<"
            nextLabel=">>"
            breakLabel="..."
            onPageChange={(event) =>
              changeActivePageNumHandler(event.selected + 1)
            }
            breakClassName={"break"}
            pageClassName={"container-li"}
            pageLinkClassName={"container-li-a"}
            previousClassName={"container-li"}
            previousLinkClassName={"container-li-a"}
            nextClassName={"container-li"}
            nextLinkClassName={"container-li-a"}
            activeClassName={"active-li"}
            disabledClassName={"disabled-li"}
          />
        ) : null}
        <ConfirmationPopup />
      </div>
    </>
  );
}

export default EngineeringNotes;
