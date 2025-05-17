import { CiCircleInfo } from "react-icons/ci";

function ServerErrorPage() {
  return (
    <div className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="w-full flex flex-col justify-center items-center leading-[60px] text-red-500 text-center">
        <div className="text-[4rem] sm:text-[6rem] md:text-[8rem]">
          <CiCircleInfo />
        </div>
        <div className="text-[1.5rem] sm:text-[2rem] md:text-[3rem] font-semibold mb-2">
          Oops! Something went wrong.
        </div>
        <div className="text-[1rem] sm:text-[1.2rem] md:text-[1.4rem] text-gray-600 max-w-[80%]">
          We’re having trouble connecting to the server right now. <br />
          Please try again later or contact the site administrator if the
          problem persists.
        </div>
      </div>
    </div>
  );
}

export default ServerErrorPage;
