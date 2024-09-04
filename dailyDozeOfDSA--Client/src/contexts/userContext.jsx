import axios from "axios";
import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [userLoggedInStatus, setUserLoggedInStatus] = useState(null);

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

  useEffect(() => {
    (async function () {
      const checkLoggedInStatus = await axios.get("/api/v1/auth/check-session");
      if (checkLoggedInStatus.data) {
        setUserLoggedInStatus(checkLoggedInStatus.data);
      }
    })();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userLoggedInStatus,
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