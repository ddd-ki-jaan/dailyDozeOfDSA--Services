import { useState } from "react";
import { sitePageLinks, siteOtherPageLinks } from "../../constants/Footer";
import { IoMdHeart } from "react-icons/io";
import { NavLink } from "react-router-dom";
import ReportBugFormModal from "../ReportBugFormModal/ReportBugFormModal";
import ContactUsFormModal from "../ContactUsFormModal/ContactUsFormModal";

function Footer() {
  const [showReportBugFormModal, setShowReportBugFormModal] = useState(false);
  const [showContactUsFormModal, setShowContactUsFormModal] = useState(false);

  function toggleReportBugFormModal() {
    setShowReportBugFormModal((prev) => !prev);
  }

  function toggleContactUsFormModal() {
    setShowContactUsFormModal((prev) => !prev);
  }

  return (
    <div className="">
      <div className="page-container flex justify-between bg-black text-white ">
        <div>
          <div className="font-bold text-xl cursor-pointer">DailyDozeOfDSA</div>
        </div>
        <div className="text-sm font-light">
          <ul className="flex flex-col gap-y-1">
            {sitePageLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className="cursor-pointer"
              >
                {link.title}
              </NavLink>
            ))}
          </ul>
        </div>
        <div className="text-sm font-light">
          <ul className="flex flex-col gap-y-1">
            {siteOtherPageLinks.map((link) => (
              <li
                key={link.path}
                className="cursor-pointer"
                onClick={
                  link.path === "reportBug"
                    ? toggleReportBugFormModal
                    : link.path === "contactUs"
                    ? toggleContactUsFormModal
                    : null
                }
              >
                {link.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <div className="text-center flex items-center justify-center">
          made with <IoMdHeart className="inline text-xl" />.
        </div>
      </div>
      <ReportBugFormModal
        show={showReportBugFormModal}
        toggle={toggleReportBugFormModal}
      />
      <ContactUsFormModal
        show={showContactUsFormModal}
        toggle={toggleContactUsFormModal}
      />
    </div>
  );
}

export default Footer;
