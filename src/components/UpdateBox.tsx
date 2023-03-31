import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdAccessibility } from "react-icons/md";
import { HiKey } from "react-icons/hi";
import Popup from "./Popup";

interface updateProp {
  id: string;
  is_private: boolean;
  onClick: () => void;
}

const UpdateBox = ({ id, is_private, onClick }: updateProp) => {
  interface updateFrom {
    password: string;
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<updateFrom>();

  const [access, setAccess] = useState<string>();
  const [isPublic, setIsPublic] = useState<boolean>(false);
  useEffect(() => {
    if (is_private) {
      setAccess("public");
      setIsPublic(false);
    } else {
      setAccess("private");
      setIsPublic(true);
    }
  }, [id]);

  const [message, setMessage] = useState("");
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const onSubmit = async (data: updateFrom) => {
    try {
      const response = await fetch(
        `https://url-shortener-production-e495.up.railway.app/api/url_shortener/private/${id}`,
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
      onClick();
      if (response.ok) {
        setMessage(responseData.message);
        console.log(responseData.message);
        setIsPopUpVisible(true);
      } else {
        setMessage(responseData.message);
        console.log(responseData);
      }
    } catch (error) {}
  };

  const HandleOnClose = () => {
    setIsPopUpVisible(false);
  };

  return (
    <>
      <section className="flex flex-col absolute right-5 top-[120%] translate-y-2 bg-white text-sm text-[#041267] shadow-md">
        <form
          action=""
          className="flex flex-col w-[11rem]"
          onSubmit={handleSubmit(onSubmit)}
        >
          {isPublic && (
            <div className="order-2 flex items-center gap-x-2 justify-end">
              <HiKey />
              <input
                type="password"
                {...register("password")}
                placeholder="new password"
                className="focus:outline-none py-2 w-[8.6rem]"
              />
            </div>
          )}
          <button
            type="submit"
            className="px-4 py-2 text-start flex items-center gap-x-2 hover:bg-indigo-50 order-1"
          >
            <MdAccessibility />{" "}
            <span className="flex items-center gap-x-1">
              make<span className="text-indigo-600">{access}</span>
            </span>
          </button>
        </form>
      </section>
      {isPopUpVisible && <Popup message={message} onClose={HandleOnClose} />}
    </>
  );
};

export default UpdateBox;
