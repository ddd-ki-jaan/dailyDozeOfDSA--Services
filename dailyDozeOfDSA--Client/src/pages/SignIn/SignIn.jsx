import React, { useContext, useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import styles from "./SignIn.module.css";
import toast from "react-hot-toast";
import { UserContext } from "../../contexts/userContext";
import Loader from "../../components/Loader/Loader";
import SEO from "../../SEO/SEO";

function SignIn() {
  const pageTitle = "Login to DailyDozeOfDSA - Access Your Personal Dashboard";
  const pageDescription =
    "Login to DailyDozeOfDSA using social accounts and access your personalized dashboard. Track your progress, manage notes, and prepare for your next interview.";
  const pageUrl = window.location.href;

  const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  const { userLoggedInStatus } = useContext(UserContext);

  async function clickedGoogleAuthBtn() {
    window.open("/api/v1/auth/google", "_self");
  }

  async function clickedGitHubAuthBtn() {
    window.open("/api/v1/auth/github", "_self");
  }

  useEffect(() => {
    const searchParmas = new URLSearchParams(location.search);
    const query_string = searchParmas.get("unauthenticated_access");
    if (query_string && query_string === "true") {
      toast.error("You need to be loggedIn first", {
        duration: 4000,
        position: "top-right",
      });
    }
  }, [location.search]);

  useEffect(() => {
    if (userLoggedInStatus) setIsLoading(false);
    console.log(userLoggedInStatus);
  }, [userLoggedInStatus]);

  if (isLoading) return <Loader />;

  if (userLoggedInStatus.loggedIn) {
    return <Navigate to="/?alreadyLoggedIn=true" />;
  }

  return (
    <>
      <SEO title={pageTitle} description={pageDescription} url={pageUrl} />
      <div
        className={[styles["login-container-outer"], "page-container"].join(
          " "
        )}
      >
        <div className={styles["login-container-inner"]}>
          <div className={styles["container-heading"]}>Login With...</div>
          <div className={styles["login-options-list"]}>
            <div
              className={[styles["login-btn"], styles["google-login"]].join(
                " "
              )}
              onClick={clickedGoogleAuthBtn}
            >
              <div className={styles["google-logo"]}>
                <i className="fa-brands fa-google"></i>
              </div>
              <div className={styles["btn-text"]}>Google</div>
            </div>
            <div
              className={[styles["login-btn"], styles["github-login"]].join(
                " "
              )}
              onClick={clickedGitHubAuthBtn}
            >
              <div className={styles["github-logo"]}>
                <i className="fa-brands fa-github"></i>
              </div>
              <div className={styles["btn-text"]}>GitHub</div>
            </div>
          </div>
        </div>
        {/* <Toaster /> */}
      </div>
    </>
  );
}

export default SignIn;
