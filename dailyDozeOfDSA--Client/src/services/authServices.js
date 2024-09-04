import axios from "axios";

export const googleAuthentication = async () => {
  try {
    const response = await axios.get("/api/v1/auth/google", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const logOut = async () => {
  try {
    const response = await axios.get("/api/v1/auth/logout", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};