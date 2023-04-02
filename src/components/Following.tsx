import React from "react";
import Linkcard from "@/components/FeedsLinkCard";
import { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import DetailFeeds from "./DetailFeeds";
import { LinkProps } from "@/constant/Data";
import DetailFeedsMobile from "./DetailFeedsMobile";

const Following = () => {
  const [details, setDetails] = useState<JSX.Element>(
    <DetailFeeds
      title={LinkProps[0].title}
      time={LinkProps[0].date}
      user={LinkProps[0].user}
      url={LinkProps[0].short_url}
    />
  );
  const [detailsMobile, setDetailsMobile] = useState<JSX.Element>(
    <DetailFeedsMobile
      title={LinkProps[0].title}
      time={LinkProps[0].date}
      user={LinkProps[0].user}
      url={LinkProps[0].short_url}
    />
  );
  const [active, setActive] = useState(1);
  const [show, setShow] = useState(false);

  const showDetails = (id: number) => {
    setActive(LinkProps[id - 1].id);
    setShow(true);
    setDetails(
      <DetailFeeds
        title={LinkProps[id - 1].title}
        time={LinkProps[id - 1].date}
        user={LinkProps[id - 1].user}
        url={LinkProps[id - 1].short_url}
      />
    );
    setDetailsMobile(
      <DetailFeedsMobile
        title={LinkProps[id - 1].title}
        time={LinkProps[id - 1].date}
        user={LinkProps[id - 1].user}
        url={LinkProps[id - 1].short_url}
      />
    );
  };

  return (
    <>
      <div className="flex overflow-y-clip w-full links-w feeds-h border-2">
        <div className="flex flex-col mx-[1rem] sm:mx-[1.5rem] w-full lg:w-[65%] overflow-y-auto ">
          {LinkProps.map((feed) => (
            <div
              key={feed.id}
              className={`relative flex justify-between min-h-[5rem] items-center rounded-[0.4rem] border-[0.1rem] mt-[1rem] px-[0.5rem] sm:px-[1.5rem] ${
                active == feed.id
                  ? "bg-indigo-100 text-indigo-500 shadow-lg"
                  : "text-gray-700"
              }`}
              onClick={() => {
                showDetails(feed.id);
              }}
            >
              <Linkcard
                key={feed.user}
                user={feed.user}
                title={feed.title}
                time={feed.date}
                url={feed.short_url}
              />
            </div>
          ))}
        </div>
        <div
          id="detailcard"
          className="h-auto relative w-[35%] mr-[2rem] mt-[1rem] hidden lg:inline"
        >
          {active ? details : null}
        </div>
        {show ? (
          <div
            id="detailcard mobile"
            className={`lg:w-[35%] w-[50%] absolute right-0 h-full overflow-y-auto lg:hidden`}
          >
            <button className="absolute right-0" onClick={() => setShow(false)}>
              <RiCloseCircleLine
                className={`text-4xl my-[1rem] mx-[1rem] text-indigo-600`}
              />
            </button>
            {detailsMobile}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Following;
