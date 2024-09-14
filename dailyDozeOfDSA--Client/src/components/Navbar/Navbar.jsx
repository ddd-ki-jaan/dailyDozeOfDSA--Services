import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { UserContext } from "../../contexts/userContext";
import { logOut } from "../../services/authServices";
import Footer from "../Footer/Footer";
import { RxCross1 } from "react-icons/rx";
import NavbarBiggerScreen from "../NavbarBiggerScreen/NavbarBiggerScreen";
import NavbarSmallerScreen from "../NavbarSmallerScreen/NavbarSmallerScreen";

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
    <div>
      <div
        className={
          isSidebarOpen
            ? "min-h-screen after:content after:absolute after:top-0 after:left-0 after:w-screen after:h-screen after:bg-black after:bg-opacity-80 after:z-5"
            : "min-h-screen"
        }
      >
        <NavbarBiggerScreen
          menuIconRef={menuIconRef}
          toggleSidebar={toggleSidebar}
          userLoggedInStatus={userLoggedInStatus}
        />
        <NavbarSmallerScreen
          sidebarRef={sidebarRef}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          userLoggedInStatus={userLoggedInStatus}
          logUserOut={logUserOut}
        />
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
