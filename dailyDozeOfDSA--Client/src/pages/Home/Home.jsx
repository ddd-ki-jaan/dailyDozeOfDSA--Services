import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import HomePageCard from "../../components/HomePageCard/HomePageCard";
import Loader from "../../components/Loader/Loader";
import headerImage from "../../../public/header-image-5.jpg";
import {
  getAboutUs,
  getHomeSubtitle,
  getSiteOffering,
} from "../../services/homeServices.js";
import SEO from "../../SEO/SEO.jsx";
import Skeleton from "react-loading-skeleton";

function Home() {
  const pageTitle =
    "DailyDozeOfDSA - Master DSA & Crack Your Next Tech Interview";
  const pageDescription =
    "DailyDozeOfDSA helps college students and professionals prepare for technical interviews with curated DSA sheets, job listings, and engineering notes. Join us to elevate your coding skills.";
  const pageUrl = window.location.href;

  const navigate = useNavigate();
  const location = useLocation();
  const [aboutUs, setAboutUs] = useState(null);
  const [homeSubtitle, setHomeSubtitle] = useState(null);
  const [siteOffering, setSiteOffering] = useState(null);
  const [loading, setLoading] = useState(true);

  const fallbackData = {
    aboutUs: [
      {
        _id: "fallback-1a",
        content:
          "We are a leading company dedicated to providing top-notch services.",
        serialNo: 1,
      },
      {
        _id: "fallback-1b",
        content:
          "We are a leading company dedicated to providing top-notch services.",
        serialNo: 2,
      },
    ],
    homeSubtitle: [
      {
        _id: "fallback-2",
        subTitle: "Your gateway to success and achievements.",
        image: {
          url: "/header-image-5.jpg",
        },
      },
    ],
    siteOffering: [
      {
        _id: "fallback-3a",
        content: "Explore a range of services designed to help you succeed.",
        serialNo: 1,
      },
      {
        _id: "fallback-3b",
        content: "Explore a range of services designed to help you succeed.",
        serialNo: 2,
      },
    ],
  };

  function readToastMessage(message, success = true) {
    const toastOptions = {
      duration: success ? 3000 : 4000,
      position: "top-right",
    };
    if (success) toast.success(message, toastOptions);
    else toast.error(message, toastOptions);
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const logInQueryString = searchParams.get("logIn");
    const logOutQueryString = searchParams.get("logOut");
    const alreadyLoggedIn = searchParams.get("alreadyLoggedIn");
    if (logInQueryString && logInQueryString === "success") {
      readToastMessage("You have been successfully loggedIn");
    } else if (logInQueryString && logInQueryString === "failed") {
      readToastMessage("Error while loggingIn", false);
    } else if (logOutQueryString && logOutQueryString === "success") {
      readToastMessage("You have been successfully loggedOut");
    } else if (logOutQueryString && logOutQueryString === "failed") {
      readToastMessage("Error while loggingOut", false);
    } else if (alreadyLoggedIn && alreadyLoggedIn === "true") {
      readToastMessage("You are already loggedIn", false);
    }
  }, [location.search]);

  useEffect(() => {
    async function fetchData() {
      try {
        const aboutUsData = await getAboutUs();
        if (aboutUsData.data.data.length > 0) {
          setAboutUs(aboutUsData.data.data);
        } else {
          setAboutUs(fallbackData.aboutUs);
        }
      } catch (error) {
        setAboutUs(fallbackData.aboutUs);
        console.log("Error fetching About Us data", error);
        // readToastMessage("Error fetching About Us data", false);
      }

      try {
        const homeSubtitleData = await getHomeSubtitle();
        if (homeSubtitleData.data.data.length > 0) {
          setHomeSubtitle(homeSubtitleData.data.data);
        } else {
          setHomeSubtitle(fallbackData.homeSubtitle);
        }
      } catch (error) {
        setHomeSubtitle(fallbackData.homeSubtitle);
        console.log("Error fetching Home Subtitle data", error);
        // readToastMessage("Error fetching Home Subtitle data", false);
      }

      try {
        const siteOfferingData = await getSiteOffering();
        if (siteOfferingData.data.data.length > 0) {
          setSiteOffering(siteOfferingData.data.data);
        } else {
          setSiteOffering(fallbackData.siteOffering);
        }
      } catch (error) {
        setSiteOffering(fallbackData.siteOffering);
        console.log("Error fetching Site Offering data", error);
        // readToastMessage("Error fetching Site Offering data", false);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  // if (loading) {
  //   return <Loader />;
  // }

  return (
    <>
      <SEO title={pageTitle} description={pageDescription} url={pageUrl} />
      <div className="page-container w-full">
        <div className="mb-16 flex flex-col-reverse md:flex-row justify-between items-center w-full">
          <div className="md:w-1/2 w-full">
            <div className="md:text-5xl text-4xl font-extralight">
              <div className="mb-2">
                <span className="font-bold">D</span>oor to
              </div>
              <div className="mb-2">
                <span className="font-bold">S</span>uccessful
              </div>
              <div>
                <span className="font-bold">A</span>chievements
              </div>
            </div>
            <div className="mt-6">
              {loading ? (
                <Skeleton count={3} />
              ) : (
                <p className="text-[1rem]">{homeSubtitle[0]?.subTitle ?? ""}</p>
              )}
            </div>
            <div className="mt-6">
              <button
                onClick={() => navigate("/problemSet")}
                className="flex items-center gap-x-2 cursor-pointer px-4 py-1 border border-black text-lg"
              >
                go to SDE sheets
                <span>
                  <FaArrowRight />
                </span>
              </button>
            </div>
          </div>
          <div className="md:w-1/2 w-full flex justify-center">
            {loading ? (
              <Skeleton className="w-[300px] h-[300px] rounded-full md:float-right" />
            ) : (
              <div className="">
                <img
                  className="md:w-auto md:h-auto w-[380px] h-[380px] rounded-tr-[14px] rounded-bl-[14px]"
                  // src={homeSubtitle[0]?.image.url}
                  src={
                    homeSubtitle[0]?.image?.url
                      ? homeSubtitle[0]?.image?.url
                      : headerImage
                  }
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = headerImage;
                  }}
                  alt="Header Image"
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-4">
          <div>
            <div className="text-3xl font-semibold">
              What does this site offer?
            </div>
          </div>
          <div className="mt-2 gap-x-2 border border-black border-dashed p-2 rounded-[14px] ">
            <div className="w-[90%] mx-auto flex flex-col md:gap-y-2 gap-y-4">
              {loading
                ? Array.from({ length: 4 }, (item, index) => (
                    <HomePageCard
                      key={index}
                      isLoading={loading}
                      content=""
                      isRightAligned={(index & 1) === 1}
                    />
                  ))
                : siteOffering &&
                  siteOffering.map((item) => (
                    <HomePageCard
                      key={item._id}
                      isLoading={loading}
                      content={item.content}
                      isRightAligned={item.serialNo % 2 === 0}
                    />
                  ))}
              {/* {siteOffering &&
                siteOffering.map((item) => (
                  <HomePageCard
                    key={item._id}
                    content={item.content}
                    isRightAligned={item.serialNo % 2 === 0}
                  />
                ))} */}
            </div>
          </div>
        </div>
        {/* <div className="mt-8">
          <div className="">
            <div className="text-end text-3xl font-semibold">About Us</div>
            <div className="mt-2 gap-x-2 border-2 border-black border-dashed p-2 rounded-[14px] ">
              <div className="w-[90%] mx-auto flex flex-col gap-y-2">
                {aboutUs &&
                  aboutUs.map((item) => (
                    <HomePageCard
                      key={item._id}
                      content={item.content}
                      isRightAligned={item.serialNo % 2 === 0}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default Home;
