import React, { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { UserContext } from "../../contexts/userContext";
import Footer from "../Footer/Footer";
import UserProfileNavlinkDropdown from "../UserProfileNavlinkDropdown/UserProfileNavlinkDropdown";

function Navbar() {
  const { userLoggedInStatus } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div>
      <div className="min-h-screen">
        <div className={styles["navbar-container"]}>
          <div className={styles["navbar-left"]}>
            <div
              className={styles["navbar-logo"]}
              onClick={() => navigate("/")}
            >
              <div className={styles["logo-img"]}>DailyDozeOfDSA</div>
            </div>
          </div>
          <div className={styles["navbar-right"]}>
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
        <div className={styles["navigate-icons-container"]}>
          <div className={styles["prev-icon"]} onClick={() => navigate(-1)}>
            <i className="fa-regular fa-circle-left"></i>
          </div>
          <div className={styles["next-icon"]} onClick={() => navigate(1)}>
            <i className="fa-regular fa-circle-right"></i>
          </div>
        </div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Navbar;
