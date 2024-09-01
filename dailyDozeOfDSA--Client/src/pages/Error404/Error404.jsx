import { Link, useRouteError } from "react-router-dom";
import styles from "./Error404.module.css";

const Error404 = () => {
  const error = useRouteError();
  console.log(error);

  if (error.status === 404) {
    return (
      <div className="flex justify-center items-center h-screen bg-white text-black">
        <div className="">
          <div className="text-[220px] font-bold">
            404<span className="text-red-500">!</span>
          </div>
          <div className="text-lg text-center font-medium underline text-blue-500 cursor-pointer">
            <Link to="/">Go to Home Page</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-white text-black">
      <div className="">
        <div className="text-[140px] font-bold text-center">
          Something went wrong<span className="text-red-500">!</span>
        </div>
        <div className="text-lg text-center font-medium underline text-blue-500 cursor-pointer">
          <Link to="/">Go to Home Page</Link>
        </div>
      </div>
    </div>
  );
};

export default Error404;
