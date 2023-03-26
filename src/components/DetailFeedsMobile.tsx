import React from "react";

interface Detailprops {
  title: string;
  time: string;
  user: string;
  url: string;
}

const DetailFeedsMobile = ({ title, time, user, url }: Detailprops) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <>
      <div className="w-full h-full bg-indigo-50 ">
        <div className="flex items-center h-[4rem] bg-indigo-400 ">
          <h1 className="pl-[1.5rem] text-lg uppercase font-medium text-gray-100">
            Details
          </h1>
        </div>
        <div className="flex flex-col  px-[1.5rem] py-[1rem]">
          <div className="bg-indigo-100 min-w-[80%] mt-[1rem] py-1 px-2 rounded">
            <h1 className="text-indigo-600 text-lg font-semibold w-[7rem]">
              Title:{" "}
            </h1>
            <h1>{title}</h1>
          </div>
          <div className="bg-indigo-100 min-w-[80%] mt-[1rem] py-2 px-2 rounded">
            <h1 className="text-indigo-600 text-lg font-semibold w-[7rem]">
              Created at:{" "}
            </h1>
            <h1>{time}</h1>
          </div>
          <div className="bg-indigo-100 min-w-[80%] mt-[1rem] py-2 p-2 rounded">
            <h1 className="text-indigo-600 text-lg font-semibold w-[7rem]">
              By:{" "}
            </h1>
            <h1>{user}</h1>
          </div>
          <div className="relative bg-indigo-100 min-w-[80%] mt-[1rem] py-2 px-2 rounded">
            <h1 className="text-indigo-600 text-lg font-semibold w-[7rem]">
              Url:{" "}
            </h1>
            <button
              onClick={handleCopyClick}
              className="absolute w-15 h-8 mx-2 my-1 px-4 py-1 bg-indigo-200 rounded-md right-0 top-0 "
            >
              Copy!
            </button>
            <h1 className="overflow-hidden">Poppins.in/{url}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailFeedsMobile;
