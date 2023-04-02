import React, { useState } from "react";
import { RiEyeCloseLine } from "react-icons/ri";
import { RxTrash } from "react-icons/rx";
import Popup from "./Popup";

interface DeleteProps {
  id: string;
  onClick: (text: string) => void;
}

const DeleteBox = ({ id, onClick }: DeleteProps) => {
  const [message, setMessage] = useState("");
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const HandleOnHide = () => {
    setMessage("Belum bisa hide hehe");
    setIsPopUpVisible(true);
  };
  const HandleOnClick = async (data: DeleteProps) => {
    try {
      const response = await fetch(
        `https://urlshortener-backend-production.up.railway.app/api/url_shortener/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        setMessage(responseData.message);
        onClick(responseData.message);
        console.log(responseData.message);
        setIsPopUpVisible(true);
      } else {
        setMessage(responseData.message);
        onClick(responseData.message);
      }
    } catch (error) {}
  };
  const HandleOnClose = () => {
    setIsPopUpVisible(false);
  };
  return (
    <section className="flex flex-col absolute right-5 top-[120%] bg-white text-sm text-[#041267] shadow-md">
      <button
        type="button"
        className="px-4 py-2 text-start flex items-center gap-x-2 w-[8rem] hover:bg-indigo-50"
        onClick={HandleOnHide}
      >
        <RiEyeCloseLine /> Hide
      </button>
      <button
        type="button"
        className="px-4 py-2 text-start flex items-center gap-x-2 w-[8rem] text-red-600 hover:bg-indigo-50"
        onClick={() => HandleOnClick({ id, onClick })}
      >
        <RxTrash /> Delete
      </button>
    </section>
  );
};

export default DeleteBox;
