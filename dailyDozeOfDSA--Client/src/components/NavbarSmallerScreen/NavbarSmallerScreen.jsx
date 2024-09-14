import { NavLink } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import styles from "./NavbarSmallerScreen.module.css";

function NavbarSmallerScreen({
  sidebarRef,
  isSidebarOpen,
  toggleSidebar,
  userLoggedInStatus,
  logUserOut,
}) {
  return (
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
  );
}

export default NavbarSmallerScreen;
