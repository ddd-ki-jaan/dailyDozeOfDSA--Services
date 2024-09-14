import { useEffect } from "react";
import { Link, useRouteError } from "react-router-dom";

const Error404 = () => {
  const error = useRouteError();

  useEffect(() => {
    function changePageStyle() {
      document.body.style.width = "100vw";
      document.body.style.border = "none";
    }

    changePageStyle();

    return () => {
      const bodyWidth = window.innerWidth >= 1024 ? "980px" : "100vw";
      document.body.style.width = bodyWidth;
      document.body.style.borderLeft = "1px solid #000";
      document.body.style.borderRight = "1px solid #000";
    };
  }, []);

  if (error?.status === 404) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-white text-black">
        <div className="text-8xl sm:text-[14rem] md:text-[16rem] font-bold">
          404<span className="text-red-500">!</span>
        </div>
        <div className="text-lg sm:text-2xl text-center font-medium underline text-blue-500 cursor-pointer">
          <Link to="/">Go to Home Page</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white text-black">
      <div className="text-6xl sm:text-[4rem] md:text-[8rem] font-bold text-center">
        Something went wrong<span className="text-red-500">!</span>
      </div>
      <div className="text-lg sm:text-2xl text-center font-medium underline text-blue-500 cursor-pointer">
        <Link to="/">Go to Home Page</Link>
      </div>
    </div>
  );
};

export default Error404;
