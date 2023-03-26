import HomeLinkCard from "@/components/FeedsLinkCard";
import { useState } from "react";
import React from "react";
import Foryou from "@/components/Foryou";
import Following from "@/components/Following";

export const feeds = [
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

const Feeds = () => {
  const [active, setActive] = useState("foryou");
  const [section, setSection] = useState(<Foryou />);
  const updateActive = (value: string, section: JSX.Element) => {
    setActive(value);
    setSection(section);
  };

  return (
    <section className="flex flex-wrap w-full bg-gray-50">
      <div className="h-full w-[100%] border-blue-400 border-2">
        <div className="h-full rounded-lg shadow-2xl border-[0.1rem]">
          <div className="flex flex-row h-[4rem] items-center gap-x-[2rem] px-[2rem] font-bold text-xl sm:text-lg">
            <h1 className="">Feeds</h1>
            <button
              onClick={() => {
                updateActive("foryou", <Foryou />);
              }}
              className={`${
                active == "foryou" ? "text-indigo-500" : "text-black"
              }`}
            >
              For you
            </button>
            <button
              onClick={() => {
                updateActive("following", <Following />);
              }}
              className={`${
                active == "following" ? "text-indigo-500" : "text-black"
              }`}
            >
              Following
            </button>
          </div>

          <div className="flex flex-row w-full">{active ? section : null}</div>
        </div>
      </div>
      <div className="w-full border-2 border-black"></div>
    </section>
  );
};

export default Feeds;
