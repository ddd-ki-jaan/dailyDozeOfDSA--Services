import React from "react";

function JobCard({ companyName, jobTitle, tags, applyLink, company }) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-y-4 justify-between border border-black rounded-tr-[7px] rounded-bl-[7px] px-[18px] py-[14px] mb-[16px]">
      <div className="flex items-center">
        <div className="w-[45px] min-w-[45px] mr-[40px] bg-white">
          <img
            src={company?.companyLogo || "/suitcase[1].png"}
            alt={`${companyName} Logo`}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="">
          <div className="text-base sm:text-[1.3rem] font-medium tracking-[0.1rem]">
            {companyName} -{" "}
            <span className="font-light tracking-[0.05rem]">{jobTitle}</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-y-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-black text-white mr-[7px] text-sm sm:text-[0.9rem] font-semibold py-[2px] px-[12px]"
              >
                {tag.tagName}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="self-end sm:self-center text-nowrap">
        <button
          className="text-sm sm:text-base border-black sm:bg-black border sm:border-none sm:outline-none px-[14px] py-[7px] font-semibold sm:tracking-[0.2rem] text-black sm:text-white hover:cursor-pointer"
          onClick={() => window.open(applyLink, "_blank")}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}

export default JobCard;
