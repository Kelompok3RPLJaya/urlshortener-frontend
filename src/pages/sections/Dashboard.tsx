import React from "react";
import Link from "next/link";
import { AiOutlineSwap } from "react-icons/ai";
import { TbLayoutList } from "react-icons/tb";
import { MdEdit } from "react-icons/md";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdContentCopy } from "react-icons/md";
import { BsArrowReturnRight } from "react-icons/bs";
import { BsQrCode } from "react-icons/bs";

const Dashboard = () => {
  return (
    <section className="flex flex-col w-full">
      <div className="min-h-[12rem] flex justify-between px-8 box-border border-b">
        <div className="flex flex-col justify-center gap-y-4">
          <h2 className="text-2xl font-bold">Links</h2>
          <label htmlFor="filter" className="flex items-center gap-x-4">
            <div className="flex items-center gap-x-2">
              <input type="radio" name="filter" />
              <p className="text-sm">Date created</p>
            </div>
            <div className="flex items-center gap-x-2">
              <input type="radio" name="filter" />
              <p className="text-sm">Alphabet</p>
            </div>
          </label>
          <div className="flex items-center gap-x-4">
            <button
              type="button"
              className="flex items-center gap-x-2 px-4 py-2 rounded-md bg-indigo-300"
            >
              <AiOutlineSwap className=" rotate-90" />
              <p>Filter</p>
            </button>
            <label
              htmlFor="tag"
              className="max-w-[8rem] border-2 rounded-md hidden md:inline-flex"
            >
              <input
                type="text"
                className="px-3 py-[.4rem] w-full rounded-md border-2 border-indigo-300 text-sm"
                placeholder="Tag"
              />
            </label>
            <label htmlFor="linkType" className="flex items-center gap-x-2">
              <input type="checkbox" />
              <p className="text-[.9rem] text-opacity-80 text-[#041267]">
                Public links only
              </p>
            </label>
          </div>
        </div>
        <div className="flex-col justify-center gap-y-2 hidden md:flex">
          <Link
            href=""
            className="px-4 py-2 bg-[#041267] text-gray-100 rounded-md text-[.9rem]"
          >
            Custom Links
          </Link>
          <Link
            href=""
            className="px-4 py-2 text-center bg-indigo-50 text-[#041267] rounded-md text-[.9rem]"
          >
            Select date
          </Link>
        </div>
      </div>
      <div className="h-full flex">
        <div className="w-full h-full border-r py-6 text-[#041267] md:w-1/3">
          <div className="flex flex-col px-8 min-h-[8rem] gap-y-1 justify-center border-t border-b">
            <p className="text-[.85rem] text-[#4e558e]">21 March 2023</p>
            <div className="flex items-center gap-x-2 ">
              <TbLayoutList />
              <p className="text-[.9rem]">
                Open recruitment RPL laboratory administrator
              </p>
            </div>
            <p className="text-indigo-400 text-sm pl-6 box-border">
              shortify.zoomOprecAdmin
            </p>
          </div>
        </div>
        <div className="w-2/3 hidden md:flex flex-col p-8 gap-y-6 bg-indigo-50">
          <div className="w-full flex shadow-md py-6 px-8 bg-white">
            <div className="w-2/3 flex flex-col gap-y-4">
              <h3 className="text-xl font-semibold text-[#041267]">
                Open recruitment RPL laboratory administrator
              </h3>
              <p className="text-[.9rem] text-[#041267] text-opacity-80">
                March 23, 2023 7:44 PM GMT+7 by Zhafran Dzaky
              </p>
            </div>
            <div className="w-1/3 flex items-center justify-end gap-x-2">
              <button className="px-4 py-2 flex items-center gap-x-2 bg-indigo-50 rounded-md">
                <MdEdit />
                <p className="text-[.9rem]">Edit</p>
              </button>
              <button className="p-2 flex items-center gap-x-2 border-2 border-[#041267] rounded-md border-opacity-60">
                <HiOutlineDotsHorizontal />
              </button>
            </div>
          </div>
          <div className="h-full shadow-md p-8 flex flex-col gap-y-8 bg-white">
            <div className="flex flex-col gap-y-3">
              <div className="w-full flex justify-between">
                <h3 className="text-2xl font-bold tracking-wide text-indigo-400">
                  shortify.zoomOprecAdmin
                </h3>
                <div className="w-1/3 flex items-center justify-end gap-x-2">
                  <button
                    type="button"
                    className="px-4 py-2 flex items-center gap-x-2 bg-indigo-50 rounded-md"
                  >
                    <MdContentCopy />
                    <p className="text-[.9rem]">Copy</p>
                  </button>
                  <button className="p-2 flex items-center gap-x-2 border-2 border-[#041267] rounded-md border-opacity-60">
                    <HiOutlineDotsHorizontal />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-x-4">
                <BsArrowReturnRight />{" "}
                <p className="text-sm text-[#041267] text-opacity-60">
                  https://docs.github.com/en/pull-requests/
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-3">
              <p className="font-semibold text-[#041267]">QR Code</p>
              <div className="flex items-start gap-x-6">
                <BsQrCode size={80} color="#041267" opacity={0.5} />
                <Link href="" className="px-4 py-2 border text-sm">
                  Get QR Code
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
