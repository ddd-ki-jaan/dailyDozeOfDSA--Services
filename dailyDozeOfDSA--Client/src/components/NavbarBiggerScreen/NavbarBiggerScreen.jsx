import UserProfileNavlinkDropdown from "../UserProfileNavlinkDropdown/UserProfileNavlinkDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import styles from "./NavbarBiggerScreen.module.css";

function NavbarBiggerScreen({
  menuIconRef,
  toggleSidebar,
  userLoggedInStatus,
}) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between px-[18px] py-[8px] border-b-2 border-black">
      <div className={styles["navbar-left"]}>
        <div className={styles["navbar-logo"]} onClick={() => navigate("/")}>
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
  );
}

export default NavbarBiggerScreen;
