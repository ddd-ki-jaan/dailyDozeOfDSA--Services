import { useState } from "react";
import { sitePageLinks, siteOtherPageLinks } from "../../constants/Footer";
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
        <div className="hidden sm:block">
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
      <div className="py-2 gap-x-4 flex items-center justify-center">
        <div className="flex items-center">
          <span className="mr-2 underline">follow us on:</span>
          <div className="flex items-center gap-x-2">
            <a target="_blank" href="https://www.instagram.com/dailydozeofdsa/">
              <img
                className="w-6 h-6 cursor-pointer"
                src="/instagram.png"
                alt="instagram"
              />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/company/daily-doze-of-dsa/?viewAsMember=true"
            >
              <img
                className="w-6 h-6 cursor-pointer"
                src="/linkedin.png"
                alt="linkedin"
              />
            </a>
          </div>
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
