import React from "react";
import { BsArrowReturnRight } from "react-icons/bs";

interface Detailprops {
  title: string;
  time: string;
  user: string;
  url: string;
}
const offset = `calc(100vh - 3rem)`;
const DetailFeeds = ({ title, time, user, url }: Detailprops) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(`poplink.site/short/` + url);
  };

  return (
    <>
      <div className="flex items-center absolute top-0 z-0 h-[6rem]  w-full rounded-t-lg bg-indigo-300 shadow-md">
        <h1 className="flex items-center max-h-full text-2xl font-semibold px-3">
          {title}
        </h1>
      </div>

      <div className=" z-10 h-[12rem] w-full rounded-lg bg-indigo-100 top-[5.5rem] absolute text-lg px-3 pb-4 shadow-md">
        <h1 className="py-2 font-medium">
          <span className="text-indigo-600  text-xm">Created at :</span> {time}
        </h1>
        <h1 className="py-2 font-medium">
          <span className="text-indigo-600  text-sm">By User :</span> {user}
        </h1>

        <div className="flex flex-row relative items-center gap-x-4">
          <BsArrowReturnRight className="text-indigo-500 text-3xl hidden lg:inline" />
          <h1 className="text-md lg:text-xl font-semibold text-ellipsis overflow-hidden flex-grow pr-[7rem]">
            poplink.site/short/{url}
          </h1>
          <button
            onClick={handleCopyClick}
            className="absolute w-15 h-10 px-4 py-1 bg-indigo-200 rounded-md right-0"
          >
            Copy!
          </button>
        </div>
      </div>
    </>
  );
};

export default DetailFeeds;
