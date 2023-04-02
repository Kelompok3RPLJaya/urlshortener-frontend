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
  isPublic: boolean;
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

const Dashboard = () => {
  // const token = window.localStorage.getItem("token");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FilterValues>();

  const onSubmit = async (data: FilterValues) => {
    try {
      const response = await fetch(
        `https://urlshortener-backend-production.up.railway.app/api/url_shortener/me?search=${data.search}`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        if (responseData.data.length == 0) {
          setFound(false);
        } else {
          setFound(true);
        }
        setData(responseData.data);
        setSuccess(true);
        setActive(responseData.data[0]?.id);
        setDetails(
          <LinkDetails
            title={responseData.data[0]?.title}
            date={responseData.data[0]?.created_at}
            user={responseData.data[0]?.username}
            short_url={responseData.data[0]?.short_url}
            long_url={responseData.data[0]?.long_url}
            is_feeds={responseData.data[0]?.is_feeds}
            id={responseData.data[0]?.id}
            is_private={responseData.data[0]?.is_private}
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
  const [totalPages, setTotalPages] = useState(1);
  const [totalData, setTotalData] = useState<number>();
  const [max, setMax] = useState(false);
  const HandleEdit = (text: string) => {
    setIsEdit(!isEdit);
    setIsPopUpVisible(true);
    setMessage(text);
  };
  const HandleUpdate = () => {
    setIsUpdate(!isUpdate);
  };
  const HandleDelete = (text: string) => {
    setIsDelete(!isDelete);
    setIsPopUpVisible(true);
    setMessage(text);
  };

  async function fetchData() {
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
        if (responseData.data.length == 0) {
          setFound(false);
        } else {
          setFound(true);
        }
        if (page == 1) {
          setData(responseData.data.data_per_page);
        } else {
          setData((prevData) => [
            ...prevData,
            ...responseData.data.data_per_page,
          ]);
        }
        setSuccess(true);
        setTotalPages(responseData.data.meta.max_page);
        setTotalData(responseData.data.meta.total_data);
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
  }

  useEffect(() => {
    fetchData();
  }, [isUpdate, isEdit, isDelete, page, perPage]);

  const nextPage = () => {
    if (page == totalPages) {
      setMax(true);
    } else {
      setPage((prev) => prev + 1);
    }
  };

  const showDetails = (
    id: string,
    title: string,
    date: string,
    user: string,
    short_url: string,
    long_url: string,
    is_feeds: boolean,
    is_private: boolean
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
  return (
    <section className="w-full links-w flex flex-col">
      <div className="min-h-[12rem] flex justify-between items-center px-8 box-border border-b">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center gap-y-4  min-w-[15rem]"
        >
          <h2 className="text-2xl font-bold">Links</h2>
          <div className="flex items-center gap-x-2">
            <label htmlFor="filter-date" className="flex items-center gap-x-1">
              <input type="radio" value="date" {...register("filter")} />
              <p className="text-sm">Date created</p>
            </label>
            <label
              htmlFor="filter-alphabet"
              className="flex items-center gap-x-1"
            >
              <input type="radio" value="alphabet" {...register("filter")} />
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
            <label
              htmlFor="linkType"
              className="flex items-center gap-x-1 order-3 opacity-0"
            >
              <input type="checkbox" {...register("isPublic")} />
              <p className="text-[.9rem] text-opacity-80 text-[#041267]">
                Private links
              </p>
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
          <Link
            href=""
            className="p-3 bg-[#041267] text-gray-100 rounded-md text-[.9rem]"
          >
            <TbPlus />
          </Link>
          <Link
            href=""
            className="px-4 py-2 text-center bg-indigo-50 text-[#041267] rounded-md text-[.9rem]"
          >
            Upgrade
          </Link>
        </div>
      </div>
      <div className="flex h-full overflow-y-clip relative">
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
                    link.is_private
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
                className="p-2 rounded-full shadow-md"
              >
                <BsArrowDown size={25} />
              </button>
            </div>
          )}
        </div>
        <div
          className={`absolute w-full h-full top-0 overflow-x-hidden sm:static sm:w-[55%] md:w-2/3 flex flex-col items-center md:p-8 bg-indigo-50 overflow-y-auto ${
            active ? "flex" : " right-[100%]"
          }`}
        >
          <div className="min-h-[4.5rem] w-full bg-[#273143] text-indigo-50 flex items-center justify-between px-6 sm:hidden">
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
