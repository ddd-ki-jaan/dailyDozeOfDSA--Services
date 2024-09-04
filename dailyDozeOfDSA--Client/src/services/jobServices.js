import axios from "axios";

export const getTotalNumOfJobs = async () => {
  try {
    const response = await axios.get("/api/v1/jobOpenings/getTotalNumOfJobs");
    return response;
  } catch (error) {
    throw error;
  }
}

export const getJobs = async (limit, offset, keyword) => {
  try {
    const response = await axios.get(
      `/api/v1/jobOpenings/getJobs?limit=${limit}&offset=${offset}&keyword=${keyword}`
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllJobs = async () => {
  try {
    const response = await axios.get("/api/v1/all-jobs");
    return response;
  } catch (error) {
    throw error;
  }
};