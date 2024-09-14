import { CiCircleInfo } from "react-icons/ci";

function NoDataFound() {
  return (
    <div className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
      <div className="w-full flex flex-col justify-center items-center leading-[60px] text-red-500">
        <div className="text-[4rem] sm:text-[6rem] md:text-[8rem]">
          <CiCircleInfo />
        </div>
        <div className="text-[2rem] sm:text-[4rem] md:text-[6rem] text-nowrap">
          no data found...
        </div>
      </div>
    </div>
  );
}

export default NoDataFound;
