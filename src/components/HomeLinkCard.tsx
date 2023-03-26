import React from 'react'
import { BsArrowReturnRight } from "react-icons/bs";

interface FeedsProp {
    user: string;
    title: string;
    time: string;
    url: string;
}

const HomeLinkCard = ({user,title, time, url}: FeedsProp) => {
  return (
    <div key={user} className="flex flex-col">
    <h1 className="mt-[1rem]">
      {user} shortened a link --- ago
    </h1>
    <div className="mt-[0.5rem] border-2 border-black h-[6rem] rounded-lg shadow-xl ">
      <h1 className="font-semibold text-2xl">{title}</h1>
      <h1 className="">{time}</h1>
      <div className="flex flex-row">
      </div>
    </div>
  </div>
  )
}

export default HomeLinkCard