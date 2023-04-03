import React from "react";
import Linkcard from "@/components/FeedsLinkCard";
import { BsArrowReturnRight } from "react-icons/bs";
import { useState, useEffect } from "react";
import DetailFeeds from "./DetailFeeds";
import DetailFeedsMobile from "./DetailFeedsMobile";
import { IoMdClose } from "react-icons/io";

interface FYPData {
  id: string;
  title: string;
  username: string;
  method: string;
  url_shortener_id: string;
  created_at: string;
  data: {
    before: string;
    after: string;
  };
}

const Foryou = () => {
  const [data, setData] = useState<FYPData[]>([]);
  const [success, setSuccess] = useState(false);
  const [details, setDetails] = useState<JSX.Element>();
  const [detailsMobile, setDetailsMobile] = useState<JSX.Element>();
  const [active, setActive] = useState<string>();
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  async function fetchData(page: number, perPage: number) {
    try {
      const response = await fetch(
        `https://urlshortener-backend-production.up.railway.app/api/feeds?page=${page}&per_page=${perPage}`
      );

      const responseData = await response.json();
      // console.log(responseData.data);
      console.log(responseData.data.data_per_page);
      if (response.ok) {
        setData(responseData.data.data_per_page);
        setSuccess(true);
        setTotalPages(responseData.data.meta.max_page);
      } else {
        console.log(responseData.message);
        setSuccess(false);
      }
    } catch (error) {}
  }

  useEffect(() => {
    fetchData(page, perPage);
  }, [page, perPage]);

  const showDetails = (
    id: string,
    title: string,
    time: string,
    user: string,
    url: string
  ) => {
    setActive(id);
    setShow(true);
    setDetails(<DetailFeeds title={title} time={time} user={user} url={url} />);
    setDetailsMobile(
      <DetailFeedsMobile title={title} time={time} user={user} url={url} />
    );
  };

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  return (
    <>
      <div className="flex overflow-y-clip w-full links-w feeds-h">
        <div className="flex flex-col mx-[1rem] sm:mx-[1.5rem] w-full lg:w-[65%] overflow-y-auto">
          {data.map((feed) => (
            <div
              key={feed.id}
              className={`relative flex justify-between min-h-[5rem] items-center rounded-[0.4rem] border-[0.1rem] mt-[1rem] px-[0.5rem] sm:px-[1.5rem] ${
                active == feed.id
                  ? "bg-indigo-100 text-indigo-500 shadow-lg"
                  : "text-gray-700"
              }`}
              onClick={() => {
                showDetails(
                  feed.id,
                  feed.title,
                  feed.created_at,
                  feed.username,
                  feed.data.after
                );
              }}
            >
              <Linkcard
                key={feed.id}
                user={feed.username}
                title={feed.title}
                time={feed.created_at}
                url={feed.data.after}
              />
            </div>
          ))}
          <div className="flex justify-between sm:justify-end px-2 py-4 lg:hidden">
            <button
              className="w-[5rem] h-[2.25rem] bg-indigo-300 rounded-lg mr-2 uppercase font-medium"
              onClick={prevPage}
            >
              prev
            </button>
            <h1 className="text-md text-indigo-500 font-medium">
              showing page {page} of {totalPages}
            </h1>
            <button
              className="w-[5rem] h-[2.25rem] bg-indigo-300 rounded-lg ml-2 uppercase font-medium"
              onClick={nextPage}
            >
              next
            </button>
          </div>
        </div>
        <div
          id="detailcard"
          className="h-auto relative w-[35%] mr-[2rem] mt-[1rem] hidden lg:inline"
        >
          {active ? details : null}

          <div className="flex flex-col absolute bottom-0 right-0 h-[4rem] items-center pr-4 mb-4">
            <h1 className="text-md text-indigo-500 font-medium">
              showing page {page} of {totalPages}
            </h1>
            <div id="button pagination" className="flex flex-row ">
              <button
                className="w-[5rem] h-[2.25rem] bg-indigo-300 rounded-lg mr-2 uppercase font-medium"
                onClick={prevPage}
              >
                prev
              </button>
              <button
                className="w-[5rem] h-[2.25rem] bg-indigo-300 rounded-lg ml-2 uppercase font-medium"
                onClick={nextPage}
              >
                next
              </button>
            </div>
          </div>
        </div>
        {show ? (
          <div
            id="detailcard mobile"
            className={`lg:w-[35%] w-[70%] sm:w-[50%] absolute right-0 h-full overflow-y-auto lg:hidden`}
          >
            <button className="absolute right-0" onClick={() => setShow(false)}>
              <IoMdClose
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

export default Foryou;
