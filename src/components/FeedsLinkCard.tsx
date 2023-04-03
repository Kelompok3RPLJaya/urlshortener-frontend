import React from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { useState } from "react";
interface FeedsProp {
  user: string;
  title: string;
  time: string;
  url: string;
}

const FeedsLinkCard = ({ user, title, time, url }: FeedsProp) => {
  const [dotActive, setDotActive] = useState(false);
  const setDot = () => {
    setDotActive(!dotActive);
  };

  return (
    <>
      <h1 className="font-semibold text-sm w-[40%] md:text-base xl:w-[16rem] lg:w-[15rem]">
        {title}
      </h1>
      <h1 className="w-[22%] text-sm">by : {user}</h1>
      <h1 className="w-[22%] text-sm overflow-clip ml-2">{time}</h1>
      <HiEllipsisVertical
        className="absolute top-0 right-0 mt-1 cursor-pointer h-7 w-7"
        onClick={setDot}
      />
      <div
        className={`absolute border-[0.1rem] bg-gray-100 rounded-md min-h-[4rem] w-[8rem] top-0 right-[1.6rem] ${
          dotActive ? "display: marker:inline" : "hidden"
        }`}
      >
        <h1 className="pt-1 pl-2 w-full border-b">Follow</h1>
        <h1 className="pt-1 pl-2 w-full border-b">Unfollow</h1>
      </div>
    </>
  );
};

export default FeedsLinkCard;
