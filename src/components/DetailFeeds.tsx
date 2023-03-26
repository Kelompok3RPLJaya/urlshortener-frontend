import React from "react";
import { BsArrowReturnRight } from "react-icons/bs";

const DetailFeeds = () => {
  return (
    <div
      id="detailcard"
      className=" w-[50%] mr-[3rem] mt-[1rem] hidden sm:inline relative"
    >
      <div className="z-0 h-[50%] rounded-lg bg-indigo-400">

      </div>

      <div className="z-10 h-[50%] w-full rounded-lg bg-indigo-200 absolute top-[40%] transform -translate-y-1/2"></div>
    </div>
  );
};

export default DetailFeeds;
