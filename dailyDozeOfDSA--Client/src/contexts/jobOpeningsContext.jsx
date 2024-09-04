import { createContext, useEffect, useState } from "react";
import { getJobs, getTotalNumOfJobs } from "../services/jobServices";
import { debounce } from "lodash";

const JobOpeningsContext = createContext();

function JobOpeningsProvider({ children }) {
  const [selectedPageLimit, setSelectedPageLimit] = useState(10);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [totalNumOfJobs, setTotalNumOfJobs] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [currPageJobList, setCurrPageJobList] = useState([]);
  const [searchInputText, setSearchInputText] = useState(null);

  async function getTotalNumOfJobsHandler() {
    try {
      const response = await getTotalNumOfJobs();
      setTotalNumOfJobs(response.data.totalNumOfJobs);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchJobsHandler() {
    try {
      const response = await getJobs(
        selectedPageLimit,
        (currentPageNum && currentPageNum - 1) || 0,
        (searchKeyword && searchKeyword.trim()) || ""
      );

      const data = response.data.data;
      console.log("*** fetchJobsHandler data: ***", response.data.data);
      // setCurrentPageNum(data.active_page_no);
      setTotalNumOfJobs(data.total_no_of_jobs);
      setPageCount(data.total_no_of_pages);
      setCurrPageJobList(data.page_data);
    } catch (error) {
      throw error;
    }
  }

  function setSelectedPageLimitHandler(newLimit) {
    setSelectedPageLimit(newLimit);
    setCurrentPageNum(1);
  }

  function setSearchKeywordHandler(keyword) {
    setSearchKeyword(keyword);
  }

  function setCurrentPageNumHandler(selectedPage) {
    setCurrentPageNum(selectedPage);
  }

  function setSearchInputTextHandler(inputText) {
    setSearchInputText(inputText);
  }

  return (
    <JobOpeningsContext.Provider
      value={{
        pageCount,
        totalNumOfJobs,
        selectedPageLimit,
        currentPageNum,
        searchKeyword,
        currPageJobList,
        searchInputText,
        getTotalNumOfJobsHandler,
        setSelectedPageLimitHandler,
        setSearchKeywordHandler,
        setCurrentPageNumHandler,
        fetchJobsHandler,
        setSearchInputTextHandler,
      }}
    >
      {children}
    </JobOpeningsContext.Provider>
  );
}

export { JobOpeningsContext };
export default JobOpeningsProvider;
