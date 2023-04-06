import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LinkProps } from "@/constant/Data";

import { AiOutlineSwap } from "react-icons/ai";
import { TbPlus } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { BsArrowDown } from "react-icons/bs";
import LinkCard from "@/components/LinkCard";
import LinkDetails from "@/components/LinkDetails";
import Popup from "@/components/Popup";

interface FilterValues {
  filter: string;
  search: string;
}

interface LinkData {
  id: string;
  title: string;
  long_url: string;
  short_url: string;
  views: number;
  is_private: boolean;
  is_feeds: boolean;
  username: string;
  created_at: string;
  update_at: string;
  DeleteAt: any | undefined;
}

interface dashboardProp {
  handleNew: () => void;
}

const Dashboard = ({ handleNew }: dashboardProp) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FilterValues>();

  const onSubmit = async (prop: FilterValues) => {
    setMax(true);
    console.log(prop);
    try {
      const response = await fetch(
        `https://urlshortener-backend-production.up.railway.app/api/url_shortener/me?search=${prop.search}&filter=${prop.filter}`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        if (responseData.data.data_per_page.length == 0) {
          setFound(false);
        } else {
          setFound(true);
        }
        setData(responseData.data.data_per_page);
        setSuccess(true);
        setActive(responseData.data.data_per_page[0]?.id);
        setDetails(
          <LinkDetails
            title={responseData.data.data_per_page[0]?.title}
            date={responseData.data.data_per_page[0]?.created_at}
            user={responseData.data.data_per_page[0]?.username}
            short_url={responseData.data.data_per_page[0]?.short_url}
            long_url={responseData.data.data_per_page[0]?.long_url}
            is_feeds={responseData.data.data_per_page[0]?.is_feeds}
            id={responseData.data.data_per_page[0]?.id}
            is_private={responseData.data.data_per_page[0]?.is_private}
            views={responseData.data.data_per_page[0]?.views}
            onClickEdit={HandleEdit}
            onClickUpdate={HandleUpdate}
            onClickDelete={HandleDelete}
          />
        );
      } else {
        console.log(responseData.message);
        setSuccess(false);
      }
    } catch (error) {}
    reset();
  };

  const [data, setData] = useState<LinkData[]>([]);
  const [success, setSuccess] = useState(false);
  const [details, setDetails] = useState<JSX.Element>();
  const [active, setActive] = useState<string>();
  const [found, setFound] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState<number>();
  const [totalData, setTotalData] = useState<number>(0);
  const [max, setMax] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const HandleEdit = (text: string) => {
    setIsEdit(!isEdit);
    setIsPopUpVisible(true);
    setMessage(text);
  };
  const HandleUpdate = (text: string) => {
    setIsUpdate(!isUpdate);
    setIsPopUpVisible(true);
    setMessage(text);
  };
  const HandleDelete = (text: string) => {
    setIsDelete(!isDelete);
    setIsPopUpVisible(true);
    setMessage(text);
  };

  async function fetchFreshData() {
    try {
      const response = await fetch(
        `https://urlshortener-backend-production.up.railway.app/api/url_shortener/me?page=${page}&per_page=${perPage}`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        setSuccess(true);
        setTotalPages(responseData.data.meta.max_page);
        setTotalData(responseData.data.meta.total_data);
        if (page >= responseData.data.meta.max_page) {
          setMax(true);
        } else {
          setMax(false);
        }
        if (page == 1) {
          setData(responseData.data.data_per_page);
          if (responseData.data.data_per_page.length == 0) {
            setFound(false);
          } else if (responseData.data.data_per_page.length > 0) {
            setFound(true);
          }
          setActive(responseData.data.data_per_page[0]?.id);
          setDetails(
            <LinkDetails
              title={responseData.data.data_per_page[0]?.title}
              date={responseData.data.data_per_page[0]?.created_at}
              user={responseData.data.data_per_page[0]?.username}
              short_url={responseData.data.data_per_page[0]?.short_url}
              long_url={responseData.data.data_per_page[0]?.long_url}
              is_feeds={responseData.data.data_per_page[0]?.is_feeds}
              id={responseData.data.data_per_page[0]?.id}
              is_private={responseData.data.data_per_page[0]?.is_private}
              views={responseData.data.data_per_page[0]?.views}
              onClickEdit={HandleEdit}
              onClickUpdate={HandleUpdate}
              onClickDelete={HandleDelete}
            />
          );
        } else {
          setData((prevData) => [
            ...prevData,
            ...responseData.data.data_per_page,
          ]);
        }
      } else {
        console.log(responseData.message);
        setSuccess(false);
      }
    } catch (error) {}
  }

  async function fetchUpdatedData() {
    try {
      const response = await fetch(
        `https://urlshortener-backend-production.up.railway.app/api/url_shortener/me?page=${1}&per_page=${perPage}`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        setSuccess(true);
        setTotalPages(responseData.data.meta.max_page);
        setTotalData(responseData.data.meta.total_data);
        if (1 >= responseData.data.meta.max_page) {
          setMax(true);
        } else {
          setMax(false);
        }
        setData(responseData.data.data_per_page);
        if (responseData.data.data_per_page.length == 0) {
          setFound(false);
        } else if (responseData.data.data_per_page.length > 0) {
          setFound(true);
        }
        setActive(responseData.data.data_per_page[0]?.id);
        setDetails(
          <LinkDetails
            title={responseData.data.data_per_page[0]?.title}
            date={responseData.data.data_per_page[0]?.created_at}
            user={responseData.data.data_per_page[0]?.username}
            short_url={responseData.data.data_per_page[0]?.short_url}
            long_url={responseData.data.data_per_page[0]?.long_url}
            is_feeds={responseData.data.data_per_page[0]?.is_feeds}
            id={responseData.data.data_per_page[0]?.id}
            is_private={responseData.data.data_per_page[0]?.is_private}
            views={responseData.data.data_per_page[0]?.views}
            onClickEdit={HandleEdit}
            onClickUpdate={HandleUpdate}
            onClickDelete={HandleDelete}
          />
        );
      } else {
        setError(true);
        setErrorMessage(responseData.message);
        setSuccess(false);
      }
    } catch (error) {}
  }

  useEffect(() => {
    setTimeout(() => {
      fetchFreshData();
    }, 500);
  }, [page]);

  useEffect(() => {
    fetchUpdatedData();
  }, [isEdit, isDelete, isUpdate]);

  const nextPage = () => {
    setPage(page + 1);
  };

  const showDetails = (
    id: string,
    title: string,
    date: string,
    user: string,
    short_url: string,
    long_url: string,
    is_feeds: boolean,
    is_private: boolean,
    views: number
  ) => {
    setActive(id);
    setDetails(
      <LinkDetails
        title={title}
        date={date}
        user={user}
        short_url={short_url}
        long_url={long_url}
        is_feeds={is_feeds}
        id={id}
        is_private={is_private}
        views={views}
        onClickEdit={HandleEdit}
        onClickUpdate={HandleUpdate}
        onClickDelete={HandleDelete}
      />
    );
  };

  const HandleOnClick = () => {
    setActive("");
  };

  const HandleOnClose = () => {
    setIsPopUpVisible(false);
  };

  if (error) {
    <section className="w-full links-w flex justify-center items-center text-[#041267]">
      <div className="flex flex-col items-center gap-y-6">
        <div className="text-lg font-medium text-[#041267] flex flex-col items-center gap-y-2">
          <p>{errorMessage}</p>
        </div>
      </div>
    </section>;
  } else if (!success) {
    return (
      <section className="w-full links-w flex justify-center items-center text-[#041267]">
        <div className="flex flex-col items-center gap-y-6">
          <div className="w-6 h-6 rounded-full bg-indigo-300 animate-bounce"></div>
          <div className="text-lg font-medium text-[#041267] flex flex-col items-center gap-y-2">
            <p>Please wait for a moment</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="w-full links-w flex flex-col">
      <div className="min-h-[12rem] flex justify-between items-center px-8 box-border border-b">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center gap-y-4 min-w-[15rem]"
        >
          <h2 className="text-2xl font-bold">Links</h2>
          <div className="flex items-center gap-x-2">
            <label htmlFor="filter-date" className="flex items-center gap-x-1">
              <input type="radio" value="created_at" {...register("filter")} />
              <p className="text-sm">Date created</p>
            </label>
            <label
              htmlFor="filter-alphabet"
              className="flex items-center gap-x-1"
            >
              <input type="radio" value="short_url" {...register("filter")} />
              <p className="text-sm">Alphabet</p>
            </label>
          </div>
          <div className="flex items-center gap-x-4">
            <label
              htmlFor="tag"
              className="max-w-[8rem] border-2 rounded-md order-2 opacity-0 md:opacity-100"
            >
              <input
                type="text"
                className="px-3 py-[.4rem] w-full rounded-md border-2 border-indigo-300 text-sm"
                placeholder="search"
                {...register("search")}
              />
            </label>
            <button
              type="submit"
              className="flex items-center gap-x-2 px-4 py-2 rounded-md bg-indigo-300 order-1 hover:bg-indigo-400"
            >
              <AiOutlineSwap className=" rotate-90" />
              <p>Filter</p>
            </button>
          </div>
        </form>

        <div className="flex flex-wrap items-center justify-end gap-y-2 gap-x-2">
          <button
            type="button"
            className="p-3 bg-[#041267] text-gray-100 rounded-md text-[.9rem]"
            onClick={handleNew}
          >
            <TbPlus />
          </button>
          <Link
            href=""
            className="px-4 py-2 text-center bg-indigo-50 text-[#041267] rounded-md text-[.9rem]"
          >
            Upgrade
          </Link>
        </div>
      </div>
      <div className="flex h-full overflow-y-clip">
        <div className="w-full flex flex-col gap-y-6 py-6 sm:w-[45%] md:w-1/3 overflow-y-auto">
          {success && found ? (
            data.map((link) => (
              <div
                className={`flex flex-col px-8 min-h-[8rem] gap-y-1 justify-center border-t border-b cursor-pointer ${
                  active == link.id ? "bg-indigo-100" : ""
                }`}
                onClick={() => {
                  showDetails(
                    link.id,
                    link.title,
                    link.created_at,
                    link.username,
                    link.short_url,
                    link.long_url,
                    link.is_feeds,
                    link.is_private,
                    link.views
                  );
                }}
                key={link.id}
              >
                <LinkCard
                  date={link.created_at}
                  title={link.title}
                  short_url={link.short_url}
                />
              </div>
            ))
          ) : (
            <div className="flex flex-col justify-center items-center gap-y-2">
              <CiSearch size={40} color="#041267" className="opacity-50" />
              <p className="tracking-wide text-[#041267] text-opacity-70">
                Can&rsquo;t find any link for now
              </p>
            </div>
          )}
          {max ? null : (
            <div className="w-full flex justify-center items-center">
              <button
                type="button"
                onClick={nextPage}
                className="p-2 rounded-full shadow-md animate-bounce"
              >
                <BsArrowDown size={22} color="#041267" />
              </button>
            </div>
          )}
        </div>
        <div
          className={`absolute w-full h-full top-0 overflow-x-hidden sm:static sm:w-[55%] md:w-2/3 flex flex-col items-center md:p-8 bg-indigo-50 overflow-y-auto ${
            active ? "flex" : " right-[100%]"
          }`}
        >
          <div className="min-h-[4.5rem] w-full bg-[#273143] text-indigo-50 flex items-center justify-between px-6 sm:hidden sticky top-0 z-10">
            <p className="uppercase font-medium tracking-wide">Link Details</p>
            <button type="button" onClick={HandleOnClick}>
              <IoClose size={25} />
            </button>
          </div>
          <div className="w-full flex flex-col p-8 gap-y-8 md:p-0">
            {active ? (
              details
            ) : (
              <div className="w-full h-full flex items-center justify-center min-h-[5rem] bg-white">
                <p className="tracking-wide text-[#041267] text-opacity-70">
                  No link selected
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {isPopUpVisible && <Popup message={message} onClose={HandleOnClose} />}
    </section>
  );
};

export default Dashboard;
