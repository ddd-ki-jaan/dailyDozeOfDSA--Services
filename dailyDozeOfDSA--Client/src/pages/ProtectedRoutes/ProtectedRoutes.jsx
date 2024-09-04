import React, { useState, useContext, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import Loader from "../../components/Loader/Loader";

function ProtectedRoutes() {
  const { userLoggedInStatus } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userLoggedInStatus) setIsLoading(false);
  }, [userLoggedInStatus]);

  if (isLoading) {
    return <Loader />;
  }

  return userLoggedInStatus && userLoggedInStatus.loggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/signIn?unauthenticated_access=true" />
  );
}

export default ProtectedRoutes;
