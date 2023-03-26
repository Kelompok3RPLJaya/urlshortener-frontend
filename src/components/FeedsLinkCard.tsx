import React from "react";

interface FeedsProp {
  user: string;
  title: string;
  time: string;
  url: string;
}

const FeedsLinkCard = ({ user, title, time, url }: FeedsProp) => {
  return (
    <div
      key={user}
      className="flex justify-between min-h-[5rem] items-center rounded-lg shadow-lg border-[0.1rem] mt-[1rem] px-[0.5rem]"
    >
      <h1 className="font-semibold text-md w-[10rem] md:text-xl xl:w-[25rem] lg:w-[15rem]">
        {title}
      </h1>
      <h1>by : {user}</h1>
      <h1 className="">{time}</h1>
    </div>
  );
};

export default FeedsLinkCard;
