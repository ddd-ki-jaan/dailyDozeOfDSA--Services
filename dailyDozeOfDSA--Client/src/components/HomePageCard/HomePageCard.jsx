import React from "react";
import Skeleton from "react-loading-skeleton";

function HomePageCard({ isLoading = false, content, isRightAligned }) {
  if (isLoading) {
    return (
      <div className={isRightAligned ? "self-end" : ""}>
        <Skeleton
          className={`rounded-[14px] w-[500px] h-[120px] ${
            isRightAligned ? "rounded-bl-none" : "rounded-br-none"
          }`}
        />
      </div>
    );
  }

  return (
    <div
      className={`bg-[#dcf8c6] p-2 rounded-[14px] w-[500px] ${
        isRightAligned ? "self-end rounded-bl-none" : "rounded-br-none"
      }`}
    >
      {content}
    </div>
  );
}

export default HomePageCard;
