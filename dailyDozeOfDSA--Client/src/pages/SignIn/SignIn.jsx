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
      <div className="page-container flex width-full h-max justify-center">
        <div className="w-[550px] h-[280px] bg-black mt-[15vh] flex flex-col text-center px-[8px] py-[16px] text-white rounded-tr-[14px] rounded-bl-[14px]">
          <div className="font-bold text-[2.2rem] mb-[60px] underline tracking-[6px]">
            Login With...
          </div>
          <div className={styles["login-options-list"]}>
            <div
              className="flex justify-evenly items-center bg-white text-black w-[180px] m-auto mb-[12px] px-[20px] py-[4px] text-[1.2rem] font-medium cursor-pointer"
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
