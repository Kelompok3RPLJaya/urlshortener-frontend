import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineQrcode } from "react-icons/ai";
import { MdContentCopy } from "react-icons/md";
import { RxTwitterLogo } from "react-icons/rx";
import Popup from "./Popup";

interface editProps {
  title: string;
  long_url: string;
  short_url: string;
  is_feeds: boolean;
  id: string;
  onClick: (message: string) => void;
}

const EditBar = ({
  title,
  long_url,
  short_url,
  is_feeds,
  id,
  onClick,
}: editProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<editProps>({
    defaultValues: {
      title: "",
      short_url: "",
    },
  });

  const [isMessage, setIsMessage] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const onSubmit = async (data: editProps) => {
    try {
      const response = await fetch(
        `https://url-shortener-production-e495.up.railway.app/api/url_shortener/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        setResponseMessage(responseData.message);
        onClick(responseData.message);
        setIsMessage(true);
        setIsPopUpVisible(true);
        console.log(data);
      } else {
        setResponseMessage(responseData.message);
        onClick(responseData.message);
        setIsMessage(true);
        setIsPopUpVisible(true);
        console.log(responseData);
      }
    } catch (error) {}
    reset();
    console.log(data);
  };

  const [isCopied, setIsCopied] = useState(false);
  const handleCopyClick = () => {
    navigator.clipboard.writeText(short_url);
    setIsCopied(true);
    setIsPopUpVisible(true);
  };
  const HandleOnClose = () => {
    setIsPopUpVisible(false);
    setIsCopied(false);
    setIsMessage(false);
  };

  return (
    <section className="w-full landing-h flex flex-col p-5 gap-y-8">
      <div className="flex flex-col gap-y-2">
        <div className="text-[#041267] text-[1.05rem] font-medium">
          <span>poppins.in/</span>
          {short_url}
        </div>
        <div className="flex justify-start gap-x-1 items-center text-sm text-indigo-500">
          <button
            type="button"
            className="flex items-center gap-x-1 px-2 py-2 rounded-md hover:bg-indigo-50"
            onClick={handleCopyClick}
          >
            <MdContentCopy /> Copy
          </button>
          <button
            type="button"
            className="flex items-center gap-x-1 px-2 py-2 rounded-md hover:bg-indigo-50"
          >
            <AiOutlineQrcode /> Create QR
          </button>
          <button
            type="button"
            className="flex items-center gap-x-1 px-2 py-2 rounded-md hover:bg-indigo-50"
          >
            <RxTwitterLogo /> Tweet
          </button>
        </div>
      </div>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col h-full gap-y-6 justify-between"
      >
        <div className="flex flex-col gap-y-6">
          <h2 className="font-medium">Edit Link</h2>
          <div className="flex flex-col gap-y-2">
            <div className="bg-indigo-50 flex flex-col gap-y-2 p-3 text-sm">
              <label htmlFor="">Title</label>
              <input
                type="text"
                {...register("title")}
                placeholder={title}
                className=" bg-transparent focus:outline-none"
              />
            </div>
            <div className="bg-indigo-50 flex flex-col gap-y-2 p-3 text-sm">
              <label htmlFor="">Url</label>
              <input
                type="text"
                {...register("long_url")}
                placeholder={long_url}
                className=" bg-transparent focus:outline-none"
              />
            </div>
            <div className="bg-indigo-50 flex flex-col gap-y-2 p-3 text-sm">
              <label htmlFor="">Custom Url</label>
              <div className="flex items-center gap-x-1">
                <p className="text-[#273143] text-opacity-70">poppins.in/</p>
                <input
                  type="text"
                  {...register("short_url")}
                  placeholder={short_url}
                  className=" bg-transparent focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-x-2 text-sm text-[#041267]">
            <input type="checkbox" {...register("is_feeds")} />
            <label htmlFor="is_feeds">show to feeds</label>
          </div>
        </div>
        <div className="flex flex-col w-full gap-y-6">
          <div className="w-full h-[.7px] bg-[#273143] bg-opacity-40"></div>
          <button
            type="submit"
            className="uppercase text-sm bg-indigo-300 py-3 font-semibold text-[#041267]"
          >
            <Link href="/User">save</Link>
          </button>
        </div>
      </form>
      {isCopied && isPopUpVisible && (
        <Popup message="Copied!" onClose={HandleOnClose} />
      )}
    </section>
  );
};

export default EditBar;
