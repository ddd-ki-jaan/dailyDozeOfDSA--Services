import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { UserContext } from "../../contexts/userContext";
import { logOut } from "../../services/authServices";
import Footer from "../Footer/Footer";
import UserProfileNavlinkDropdown from "../UserProfileNavlinkDropdown/UserProfileNavlinkDropdown";
import { HiOutlineMenu } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";

function Navbar() {
  const { userLoggedInStatus } = useContext(UserContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuIconRef = useRef(null);
  const sidebarRef = useRef(null);

  const navigate = useNavigate();

  const { setUserLoggedInStatusToFalse } = useContext(UserContext);

  async function logUserOut(event) {
    try {
      let response = await logOut();
      if (response && response.data && response.data.success) {
        let redirectUrl = response.data.redirectUrl;
        setUserLoggedInStatusToFalse();
        navigate(redirectUrl);
      }
    } catch (error) {
      console.log("*** logUserOut error: ***", error);
    } finally {
      toggleSidebar(event);
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !menuIconRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [isSidebarOpen]);

  function toggleSidebar(event) {
    event.stopPropagation();
    setIsSidebarOpen((prevState) => !prevState);
  }

  return (
    <div
      className={
        isSidebarOpen
          ? "after:content after:absolute after:top-0 after:left-0 after:w-screen after:h-screen after:bg-black after:bg-opacity-80 after:z-5"
          : ""
      }
    >
      <div className="navbar-outer-container px-0">
        <div className="flex items-center justify-between px-[18px] py-[8px] border-b-2 border-black">
          <div className={styles["navbar-left"]}>
            <div
              className={styles["navbar-logo"]}
              onClick={() => navigate("/")}
            >
              <div className={styles["logo-img"]}>DailyDozeOfDSA</div>
            </div>
          </div>
          <div ref={menuIconRef} className="lg:hidden z-10">
            <HiOutlineMenu
              onClick={toggleSidebar}
              className="cursor-pointer text-2xl"
            />
          </div>
          <div className="hidden lg:block">
            <div className={styles["nav-links-container"]}>
              <div>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? [styles["active-link"], styles["nav-link"]].join(" ")
                      : styles["nav-link"]
                  }
                  to="/"
                >
                  Home
                </NavLink>
              </div>
              <div>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? [styles["active-link"], styles["nav-link"]].join(" ")
                      : styles["nav-link"]
                  }
                  to="problemSet"
                >
                  ProblemSet
                </NavLink>
              </div>
              <div>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? [styles["active-link"], styles["nav-link"]].join(" ")
                      : styles["nav-link"]
                  }
                  to="JobOpenings"
                >
                  JobOpenings
                </NavLink>
              </div>
              <div>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? [styles["active-link"], styles["nav-link"]].join(" ")
                      : styles["nav-link"]
                  }
                  to={{
                    pathname: "engineeringNotes",
                    search: "?category=ALL&pageNum=1&showSavedNotes=false",
                  }}
                >
                  EngineeringNotes
                </NavLink>
              </div>
              <div>
                {userLoggedInStatus && userLoggedInStatus.loggedIn ? (
                  <UserProfileNavlinkDropdown />
                ) : (
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? [styles["active-link"], styles["nav-link"]].join(" ")
                        : styles["nav-link"]
                    }
                    to="signIn"
                  >
                    SignIn
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* sidebar */}
        <div
          ref={sidebarRef}
          className={`sidebar-container lg:hidden px-4 py-8 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "ml-0" : "-ml-[280px]"
          } absolute h-screen w-[280px] bg-white bg-opacity-95 z-10 top-0`}
        >
          <div className="float-right cursor-pointer" onClick={toggleSidebar}>
            <RxCross1 className="text-black text-2xl" />
          </div>
          <div className="mt-24 flex flex-col gap-y-6 text-lg">
            <div>
              <NavLink
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  isActive
                    ? [styles["active-link"], styles["nav-link"]].join(" ")
                    : styles["nav-link"]
                }
                to="/"
              >
                Home
              </NavLink>
            </div>
            <div>
              <NavLink
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  isActive
                    ? [styles["active-link"], styles["nav-link"]].join(" ")
                    : styles["nav-link"]
                }
                to="problemSet"
              >
                ProblemSet
              </NavLink>
            </div>
            <div>
              <NavLink
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  isActive
                    ? [styles["active-link"], styles["nav-link"]].join(" ")
                    : styles["nav-link"]
                }
                to="JobOpenings"
              >
                JobOpenings
              </NavLink>
            </div>
            <div>
              <NavLink
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  isActive
                    ? [styles["active-link"], styles["nav-link"]].join(" ")
                    : styles["nav-link"]
                }
                to={{
                  pathname: "engineeringNotes",
                  search: "?category=ALL&pageNum=1&showSavedNotes=false",
                }}
              >
                EngineeringNotes
              </NavLink>
            </div>
            {userLoggedInStatus && userLoggedInStatus.loggedIn && (
              <div>
                <NavLink
                  onClick={toggleSidebar}
                  className={({ isActive }) =>
                    isActive
                      ? [styles["active-link"], styles["nav-link"]].join(" ")
                      : styles["nav-link"]
                  }
                  to="dashboard"
                >
                  Dashboard
                </NavLink>
              </div>
            )}
            <div>
              {userLoggedInStatus && userLoggedInStatus.loggedIn ? (
                <button onClick={logUserOut} className="px-6 py-2 bg-red-400">
                  logOut
                </button>
              ) : (
                <NavLink
                  onClick={toggleSidebar}
                  className="px-6 py-2 bg-green-400"
                  to="signIn"
                >
                  SignIn
                </NavLink>
              )}
            </div>
          </div>
        </div>

        <div className={styles["navigate-icons-container"]}>
          <div className={styles["prev-icon"]} onClick={() => navigate(-1)}>
            <i className="fa-regular fa-circle-left"></i>
          </div>
          <div className={styles["next-icon"]} onClick={() => navigate(1)}>
            <i className="fa-regular fa-circle-right"></i>
          </div>
        </div>
      </div>

      <Outlet />
      <Footer />
    </div>
  );
}

export default Navbar;
