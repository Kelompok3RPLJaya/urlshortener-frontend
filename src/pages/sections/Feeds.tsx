import HomeLinkCard from "@/components/HomeLinkCard";
import { useState } from "react";
import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/swiper-bundle.css";
import Foryou from "@/components/Foryou";

export const feeds = [
  {
    user: "zafran",
    title: "Zoom Demo Progress RPL",
    time: "March 25 2022, 7:44 GMT+7",
    url: "shortify.in/zoomnyaRPL",
  },
  {
    user: "adrian",
    title: "Zoom rapat RPL",
    time: "March 29 2022, 7:44 GMT+7",
    url: "shortify.in/halomas",
  },
  {
    user: "kepin",
    title: "Zoom rapat PMK",
    time: "March 145 2022, 7:44 GMT+7",
    url: "shortify.in/rapatPMK",
  },
];



const Feeds = () => {
    const swiper = useSwiper();
    const[active, setActive] = useState("foryou");

    const updateActive = (value:string) => {
        setActive(value);
    }

  return (
    <section className="flex flex-wrap w-full bg-gray-50">
      <div className="h-full w-[100%] border-blue-400 border-2">
        <div className="h-full rounded-lg shadow-2xl border-[0.1rem]">
          <div className="flex flex-row h-[4rem] items-center gap-x-[2rem] px-[2rem] font-bold text-xl sm:text-lg">
            <h1 className="">Feeds</h1>
            <button onClick={() => swiper && swiper.slideNext()} className={`${active == "foryou" ? "text-indigo-500": "text-black"}`}>For you</button>
            <button onClick={() => swiper && swiper.slidePrev()} className={`${active == "following" ? "text-indigo-500": "text-black"}`}>Following</button>
          </div>

          <div className="flex flex-row w-full">
            <div className="mt-[1rem] border-red-400 border-2 mx-[3rem]">
              {feeds.map((feed) => (
                <HomeLinkCard
                  key={feed.user}
                  user={feed.user}
                  title={feed.title}
                  time={feed.time}
                  url={feed.url}
                />
              ))}
            </div>
            <div id="detailcard" className="border-2 border-black w-[50%] mr-[3rem]">

            </div>
          </div>
        </div>
      </div>
      <div className="w-full border-2 border-black"></div>
    </section>
  );
};

export default Feeds;
