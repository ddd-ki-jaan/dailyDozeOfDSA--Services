import JobCard from "../../components/JobCard/JobCard";
import ReactPaginate from "react-paginate";
import { JobOpeningsContext } from "../../contexts/jobOpeningsContext";
import { useContext, useEffect, useRef, useState } from "react";
import { Select, Label } from "flowbite-react";
import Loader from "../../components/Loader/Loader";
import { debounce } from "lodash";
import SEO from "../../SEO/SEO";
import NoDataFound from "../../components/NoDataFound/NoDataFound";
import { pageLimitOptions } from "../../constants/jobOpenings";
import { handleApiError } from "../../constants/reusableFunctions";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";

function JobOpenings() {
  const pageTitle = "Latest Software Engineering Job Openings - Apply Now";
  const pageDescription =
    "Discover top software engineering job openings from leading companies. Filter by location, experience, and more to find your perfect role and apply today.";
  const pageUrl = window.location.href;

  const {
    selectedPageLimit,
    currentPageNum,
    pageCount,
    searchKeyword,
    currPageJobList,
    searchInputText,
    setSelectedPageLimitHandler,
    setSearchKeywordHandler,
    setCurrentPageNumHandler,
    fetchJobsHandler,
    setSearchInputTextHandler,
  } = useContext(JobOpeningsContext);

  const { setLoggedInStatusToFalse } = useContext(UserContext);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("*** yello currentPageNum: ***", currentPageNum);
    (async function fetchJobs() {
      setIsLoading(true);
      try {
        await fetchJobsHandler();
      } catch (error) {
        console.log("*** fetchJobs error: ***", error);
        handleApiError(error, navigate, setLoggedInStatusToFalse);
      }
      setIsLoading(false);
    })();
  }, [currentPageNum, selectedPageLimit, searchKeyword]);

  const debounceSearch = useRef(
    debounce(function (inputText) {
      setSearchKeywordHandler(inputText.trim());
      setCurrentPageNumHandler(1);
    }, 2000)
  ).current;

  useEffect(() => {
    if (searchInputText !== null) {
      debounceSearch(searchInputText);
    }
  }, [searchInputText]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <SEO title={pageTitle} description={pageDescription} url={pageUrl} />
      <div className="page-container">
        <div className="flex flex-col gap-y-2 sm:flex-row justify-between items-center">
          <div className="flex items-center gap-x-2">
            <Label
              className="text-md font-normal"
              htmlFor="pageLimitOptions"
              value="Select Page limit: "
            />
            <Select
              value={selectedPageLimit}
              onChange={(event) =>
                setSelectedPageLimitHandler(event.target.value)
              }
              sizing="sm"
              id="pageLimitOptions"
              color="bllack"
              className="flowbite-select"
              required
            >
              {pageLimitOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="border-b-2 border-black w-full sm:w-auto flex items-center px-2">
            <div>
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <div className="w-full">
              <input
                autoFocus
                value={searchInputText || ""}
                onChange={(event) =>
                  setSearchInputTextHandler(event.target.value)
                }
                placeholder="Search by Company Name / Job Title / Tags"
                className="w-full sm:w-[330px] md:w-[350px] outline-none px-3 text-lg placeholder-gray-500 placeholder:text-sm placeholder:font-light"
              />
            </div>
          </div>
        </div>

        {currPageJobList && currPageJobList.length > 0 ? (
          <div className="mt-4">
            {currPageJobList.map((jobData, index) => (
              <JobCard
                key={index}
                companyName={jobData.company.companyName}
                jobTitle={jobData.jobTitle}
                tags={jobData.tags}
                applyLink={jobData.applyLink}
                company={jobData.company}
              />
            ))}
          </div>
        ) : (
          <NoDataFound />
        )}
        {pageCount && pageCount > 0 ? (
          <ReactPaginate
            containerClassName="paginate-container"
            pageCount={pageCount}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            initialPage={currentPageNum - 1}
            previousLabel="<<"
            nextLabel=">>"
            breakLabel="..."
            onPageChange={(event) =>
              setCurrentPageNumHandler(event.selected + 1)
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
      </div>
    </>
  );
}

export default JobOpenings;
