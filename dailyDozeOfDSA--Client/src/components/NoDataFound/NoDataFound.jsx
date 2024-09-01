import { CiCircleInfo } from "react-icons/ci";

function NoDataFound() {
  return (
    <div className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center leading-[60px] text-red-500">
      <span className="text-[120px]">
        <CiCircleInfo />
      </span>
      <div className="text-[100px]">no data found...</div>
    </div>
  );
}

export default NoDataFound;
