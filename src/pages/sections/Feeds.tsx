import HomeLinkCard from "@/components/FeedsLinkCard";
import { use, useState } from "react";
import React from "react";
import Foryou from "@/components/Foryou";
import Following from "@/components/Following";

const Feeds = () => {
  const [active, setActive] = useState("foryou");
  const [section, setSection] = useState(<Foryou />);

  const updateActive = (value: string, section: JSX.Element) => {
    setActive(value);
    setSection(section);
  };

  return (
    <section className="flex flex-wrap w-full links-w bg-gray-50">
      <div className="w-full">
        <div className="flex flex-row h-[4rem] items-center gap-x-[2rem] px-[2rem] font-bold text-xl sm:text-lg ">
          <h1 className="">Feeds</h1>
          <button
            onClick={() => {
              updateActive("foryou", <Foryou />);
            }}
            className={`${
              active == "foryou"
                ? "text-indigo-500 border-b-2 border-indigo-500"
                : "text-gray-400"
            }`}
          >
            For you
          </button>
          <button
            onClick={() => {
              updateActive("following", <Following />);
            }}
            className={`${
              active == "following"
                ? "text-indigo-500 border-b-2 border-indigo-500"
                : "text-gray-400"
            }`}
          >
            Following
          </button>
        </div>

        <div className="flex flex-row w-full">{active ? section : null}</div>
      </div>
    </section>
  );
};

export default Feeds;
