import axios from "axios";

export const getStriverSDESheet = async () => {
  try {
    const response = await axios.get("/api/v1/problemSheet/getStriverSDESheet");
    return response;
  } catch (error) {
    throw error;
  }
};

export const getStriverA2ZSheet = async () => {
  try {
    const response = await axios.get("/api/v1/problemSheet/getStriverA2ZSheet");
    console.log("*** getStriverA2ZSheet response: ***", response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getStriver79DSASheet = async () => {
  try {
    const response = await axios("/api/v1/problemSheet/getStriver79Sheet");
    return response;
  } catch (error) {
    throw error;
  }
};

export const getLoveBabbar450DSASheet = async () => {
  try {
    const response = await axios(
      "/api/v1/problemSheet/getLoveBabbar450DSASheet"
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getApnaCollegeDSASheet = async () => {
  try {
    const response = await axios("/api/v1/problemSheet/getApnaCollegeDSASheet");
    return response;
  } catch (error) {
    throw error;
  }
};

export const getBlind75Sheet = async () => {
  try {
    const response = await axios("/api/v1/problemSheet/getBlind75Sheet");
    return response;
  } catch (error) {
    throw error;
  }
};

export const getNeetCodeSheet = async () => {
  try {
    const response = await axios("/api/v1/problemSheet/getNeetCodeSheet");
    return response;
  } catch (error) {
    throw error;
  }
};

export const getNishantChaharSDESheet = async () => {
  try {
    const response = await axios(
      "/api/v1/problemSheet/getNishantChaharSDESheet"
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export async function getUserProblemStatusCounts(sheetEnum) {
  try {
    const response = await axios.get(
      `/api/v1/problemSheet/getUserProblemStatusCounts?sheetName=${sheetEnum}`
    );

    return response;
  } catch (error) {
    throw error;
  }
}

export async function getProblemSheetDescrtiption(sheetEnum) {
  try {
    const response = await axios.get(
      `/api/v1/problemSheet/getProblemSheetDescription?sheetName=${sheetEnum}`
    );

    return response;
  } catch (error) {
    throw error;
  }
}