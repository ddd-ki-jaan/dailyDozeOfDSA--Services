import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { logOut } from "../../services/authServices";
import { UserContext } from "../../contexts/userContext";

function UserProfileNavlinkDropdown() {
  const { setUserLoggedInStatusToFalse } = useContext(UserContext);

  const navigate = useNavigate();

  async function logUserOut() {
    try {
      let response = await logOut();
      if (response && response.data && response.data.success) {
        let redirectUrl = response.data.redirectUrl;
        setUserLoggedInStatusToFalse();
        navigate(redirectUrl);
      }
    } catch (error) {
      console.log("*** logUserOut error: ***", error);
    }
  }

  return (
    <div className="relative group">
      <div className="flex items-center gap-x-1 cursor-pointer">
        <div>
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-black px-[2px] py-[4px]"
                : "px-[2px] py-[4px]"
            }
          >
            Dashboard
          </NavLink>
        </div>
        <div className="transition group-hover:rotate-180 ease-in">
          <IoIosArrowDown />
        </div>
      </div>
      <div className="absolute bg-slate-100 rounded-[7px] top-[24px] shadow-md hidden group-hover:block">
        <ul className="flex flex-col text-sm">
          <NavLink
            className="px-2 py-1 hover:bg-white rounded-[7px]"
            to="dashboard"
          >
            Dashboard
          </NavLink>
          <button
            onClick={logUserOut}
            className="border-none outline-none px-2 py-1 hover:bg-white rounded-[7px]"
          >
            LogOut
          </button>
        </ul>
      </div>
    </div>
  );
}

export default UserProfileNavlinkDropdown;
