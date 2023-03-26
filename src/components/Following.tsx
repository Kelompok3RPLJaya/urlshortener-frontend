import React from "react";
import Linkcard from "@/components/FeedsLinkCard";
export const feeds = [
  {
    user: "dafian",
    title: "Zoom Demo Progress RPL (following)",
    time: "March 25 2022, 7:44",
    url: "shortify.in/zoomnyaRPL",
  },
  {
    user: "adrian",
    title: "Zoom rapat RPL (follwoing)",
    time: "March 29 2022, 7:44",
    url: "shortify.in/halomas",
  },
  {
    user: "kepin",
    title: "Zoom rapat PMK(following)",
    time: "March 145 2022, 7:44",
    url: "shortify.in/rapatPMK",
  },
];

const Following = () => {
  return (
    <>
      <div className=" border-red-400 border-2 mx-[3rem] w-full">
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
        className="border-2 border-black w-[50%] mr-[3rem] mt-[1rem] hidden sm:inline"
      ></div>
    </>
  );
};

export default Following;
