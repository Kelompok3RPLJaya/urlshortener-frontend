import React from "react";
import Linkcard from "@/components/FeedsLinkCard";
import { BsArrowReturnRight } from "react-icons/bs";
export const feeds = [
  {
    user: "zafran",
    title: "Zoom Demo Progress RPL",
    time: "March 25 2022, 7:44 ",
    url: "shortify.in/zoomnya-RPL",
  },
  {
    user: "adrian",
    title: "Zoom rapat RPL",
    time: "March 29 2022, 7:44 ",
    url: "shortify.in/halomas",
  },
  {
    user: "kepin",
    title: "Zoom rapat PMK",
    time: "March 145 2022, 7:44 ",
    url: "shortify.in/rapatPMK",
  },
  {
    user: "zafran",
    title: "Zoom Demo Progress RPL",
    time: "March 25 2022, 7:44 ",
    url: "shortify.in/zoomnyaRPL",
  },
  {
    user: "adrian",
    title: "Zoom rapat RPL",
    time: "March 29 2022, 7:44 ",
    url: "shortify.in/halomas",
  },
  {
    user: "kepin",
    title: "Zoom rapat PMK",
    time: "March 145 2022, 7:44 ",
    url: "shortify.in/rapatPMK",
  },
];

const Foryou = () => {
  return (
    <>
      <div className=" mx-[1rem] sm:mx-[1.5rem] max-w-full min-w-[60%]">
        {feeds.map((feed) => (
          <Linkcard
            key={feed.user}
            user={feed.user}
            title={feed.title}
            time={feed.time}
            url={feed.url}
          />
        ))}
      </div>
      <div
        id="detailcard"
        className=" w-[50%] mr-[2rem] mt-[1rem] hidden sm:inline relative"
      >
        <div className="flex items-center z-0 min-h-[5.5rem] rounded-t-lg bg-indigo-400">
          <h1 className="flex items-center max-h-full text-2xl font-semibold px-3">
            {feeds[0].title}
          </h1>
        </div>
        <div className="z-10 max-h-[50%] w-full rounded-lg bg-indigo-200 absolute top-[40%] transform -translate-y-[8.75rem] text-xl px-3 pb-4">
          <h1 className="py-2">created at : {feeds[0].time}</h1>
          <h1 className="py-2">by user : {feeds[0].user}</h1>

          <div className="flex flex-row items-center gap-x-4">
            <BsArrowReturnRight className="text-indigo-500 text-3xl hidden lg:inline" />
            <h1 className="text-md lg:text-2xl font-semibold ">
              {feeds[0].url}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Foryou;
