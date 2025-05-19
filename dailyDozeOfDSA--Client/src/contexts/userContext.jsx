import axios from "axios";
import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [userLoggedInStatus, setUserLoggedInStatus] = useState(null);
  const [serverDown, setServerDown] = useState(false);

  function setUserLoggedInStatusToNull() {
    setUserLoggedInStatus(null);
  }

  function setUserLoggedInStatusToFalse() {
    setUserLoggedInStatus({
      loggedIn: false,
      user: null,
    });
  }

  function updateUserData(updatedDataKey, updatedDataVal) {
    setUserLoggedInStatus((prevState) => {
      return {
        ...prevState,
        user: {
          ...prevState.user,
          [updatedDataKey]: updatedDataVal,
        },
      };
    });
  }

  async function checkLoginStatus() {
    try {
      const res = await axios.get("/api/v1/auth/check-session");
      if (res.data) {
        setUserLoggedInStatus(res.data);
        setServerDown(false);
      }
    } catch (error) {
      console.log("Error checking user session:", error);
      setServerDown(true);
    }
  }

  useEffect(() => {
    checkLoginStatus();

    // const interval = setInterval(() => {
    //   checkLoginStatus();
    // }, 5000);

    // return () => clearInterval(interval);
  }, []);

  return (
    <UserContext.Provider
      value={{
        userLoggedInStatus,
        serverDown,
        setUserLoggedInStatusToNull,
        setUserLoggedInStatusToFalse,
        updateUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext };
export default UserProvider;