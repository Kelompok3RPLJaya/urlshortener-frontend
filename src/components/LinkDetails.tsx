import React from "react";
import Link from "next/link";
import { MdEdit } from "react-icons/md";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdContentCopy } from "react-icons/md";
import { BsArrowReturnRight } from "react-icons/bs";
import { BsQrCode } from "react-icons/bs";

interface linkProps {
  title: string;
  date: string;
  user: string;
  short_url: string;
  long_url: string;
}

const LinkDetails = ({ title, date, user, short_url, long_url }: linkProps) => {
  return (
    <div className="w-full flex flex-col gap-y-6 h-full">
      <div className="w-full flex flex-col lg:flex-row gap-y-2 shadow-md py-6 px-8 box-border bg-white">
        <div className="w-full flex flex-col gap-y-4">
          <h3 className="text-xl font-semibold text-[#041267]">{title}</h3>
          <p className="text-[.9rem] text-[#041267] text-opacity-80">
            {date} by {user}
          </p>
        </div>
        <div className="flex items-center justify-start gap-x-2">
          <button className="px-4 py-2 flex items-center gap-x-2 bg-indigo-50 rounded-md">
            <MdEdit />
            <p className="text-[.9rem]">Edit</p>
          </button>
          <button className="p-2 flex items-center gap-x-2 border-[1.5px] border-[#041267] rounded-md border-opacity-60">
            <HiOutlineDotsHorizontal color="#041267" />
          </button>
        </div>
      </div>
      <div className="h-full shadow-md p-8 flex flex-col gap-y-8 bg-white">
        <div className="flex flex-col gap-y-3">
          <div className="w-full flex flex-col xl:flex-row gap-y-2 justify-between">
            <h3 className="text-2xl font-bold tracking-wide text-indigo-400">
              {short_url}
            </h3>
            <div className="flex items-center justify-start gap-x-2">
              <button
                type="button"
                className="px-4 py-2 flex items-center gap-x-2 bg-indigo-50 rounded-md"
              >
                <MdContentCopy />
                <p className="text-sm">Copy</p>
              </button>
              <button className="p-2 flex items-center gap-x-2 border-[1.5px] border-[#041267] rounded-md border-opacity-60">
                <HiOutlineDotsHorizontal />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            <BsArrowReturnRight />{" "}
            <p className="text-sm text-[#041267] text-opacity-60">{long_url}</p>
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
  );
};

export default LinkDetails;
