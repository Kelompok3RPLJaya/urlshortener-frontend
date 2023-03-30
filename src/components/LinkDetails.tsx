import React, { useState } from "react";
import Link from "next/link";
import { MdEdit } from "react-icons/md";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdContentCopy } from "react-icons/md";
import { BsArrowReturnRight } from "react-icons/bs";
import { BsQrCode } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import EditBar from "./EditBar";
import DeleteBox from "./DeleteBox";
import Popup from "./Popup";
import UpdateBox from "./UpdateBox";

interface linkProps {
  title: string;
  date: string;
  user: string;
  short_url: string;
  long_url: string;
  is_feeds: boolean;
  id: string;
  is_private: boolean;
}

const LinkDetails = ({
  title,
  date,
  user,
  short_url,
  long_url,
  is_feeds,
  id,
  is_private,
}: linkProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const HandleOnClick = () => {
    setIsEdit(!isEdit);
  };
  const [isDelete, setIsDelete] = useState(false);
  const HandleDelete = () => {
    setIsDelete(!isDelete);
  };
  const [isUpdate, setIsUpdate] = useState(false);
  const HandleOnUpdate = () => {
    setIsUpdate(!isUpdate);
  };
  const [isCopied, setIsCopied] = useState(false);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const handleCopyClick = () => {
    navigator.clipboard.writeText(short_url);
    setIsCopied(true);
    setIsPopUpVisible(true);
  };
  const HandleOnClose = () => {
    setIsPopUpVisible(false);
  };
  return (
    <>
      <div className={"w-full flex flex-col gap-y-6 h-full"}>
        <div className="w-full min-h-[9rem] flex justify-center lg:items-center flex-col lg:flex-row gap-y-2 shadow-md py-10 px-8 box-border bg-white relative">
          <div className="w-full flex flex-col gap-y-2 lg:gap-y-4">
            <h3 className="text-xl font-semibold text-[#041267]">{title}</h3>
            <p className="text-[.9rem] text-[#041267] text-opacity-80">
              {date} by {user}
            </p>
          </div>
          <div className="flex items-center justify-start gap-x-2">
            <button
              className="px-4 py-2 flex items-center gap-x-2 bg-indigo-50 rounded-md hover:bg-indigo-200 transition-all duration-100"
              onClick={HandleOnClick}
            >
              <MdEdit />
              <p className="text-[.9rem]">Edit</p>
            </button>
            <button
              className="p-2 flex items-center gap-x-2 border-[1.5px] border-[#041267] rounded-md border-opacity-60 hover:bg-[#041267] hover:text-indigo-50 transition-all duration-100 focus:outline focus:outline-slate-300"
              onClick={HandleDelete}
            >
              <HiOutlineDotsHorizontal />
            </button>
          </div>
        </div>
        {isDelete && <DeleteBox id={id} />}
        <div className="h-full shadow-md p-8 flex flex-col gap-y-8 bg-white">
          <div className="flex flex-col gap-y-3">
            <div className="w-full flex flex-col lg:flex-row gap-y-2 justify-between">
              <h3 className="text-2xl font-bold tracking-wide text-indigo-400">
                {short_url}
              </h3>
              <div className="flex items-center justify-start gap-x-2">
                <button
                  type="button"
                  className="px-4 py-2 flex items-center gap-x-2 bg-indigo-50 rounded-md hover:bg-indigo-200 transition-all duration-100"
                  onClick={handleCopyClick}
                >
                  <MdContentCopy />
                  <p className="text-sm">Copy</p>
                </button>
                <button
                  className="p-2 flex items-center gap-x-2 border-[1.5px] border-[#041267] rounded-md border-opacity-60 hover:bg-[#041267] hover:text-indigo-50 transition-all duration-100 focus:outline focus:outline-slate-300"
                  onClick={HandleOnUpdate}
                >
                  <HiOutlineDotsHorizontal />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-x-4">
              <BsArrowReturnRight />{" "}
              <p className="text-sm text-[#041267] text-opacity-60">
                {long_url}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-3">
            <p className="font-semibold text-[#041267] text-lg">QR Code</p>
            <div className="flex items-start gap-x-6">
              <BsQrCode size={85} color="#041267" opacity={0.5} />
              <Link
                href=""
                className="px-4 py-2 border text-sm hover:bg-indigo-50"
              >
                Get QR Code
              </Link>
            </div>
          </div>
        </div>
        {isUpdate && <UpdateBox id={id} is_private={is_private} />}
        {isCopied && isPopUpVisible && (
          <Popup message="Copied!" onClose={HandleOnClose} />
        )}
      </div>

      <section
        className={`absolute right-0 top-0 h-full bg-white w-[20rem] shadow-md transition-all duration-300 ${
          isEdit ? "" : " translate-x-[20rem]"
        }`}
      >
        <div className="min-h-[4.5rem] bg-[#273143] text-indigo-50 flex items-center justify-between px-6">
          <p className="uppercase font-medium tracking-wide">Edit link</p>
          <button type="button" onClick={HandleOnClick}>
            <IoClose size={25} />
          </button>
        </div>
        <EditBar
          title={title}
          long_url={long_url}
          short_url={short_url}
          is_feeds={is_feeds}
          id={id}
        />
      </section>
    </>
  );
};

export default LinkDetails;
