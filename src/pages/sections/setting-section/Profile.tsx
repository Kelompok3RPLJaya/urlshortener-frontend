import Popup from "@/components/Popup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface userData {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  created_at: string;
  updated_at: string;
  DeletedAt: any | undefined;
}

interface newUserData {
  name: string;
  email: string;
  password: string;
}

const Profile = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<newUserData>();

  const [responseMessage, setResponseMessage] = useState("");
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [data, setData] = useState<userData>();
  const [message, setMessage] = useState<string>();

  const onSubmit = async (data: newUserData) => {
    console.log(data);
    try {
      const response = await fetch(
        "https://url-shortener-production-e495.up.railway.app/api/user/edit",
        {
          method: "POST",
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
        setIsPopUpVisible(true);
        console.log(responseData);
      } else {
        setResponseMessage(responseData.message);
        setIsPopUpVisible(true);
        console.log(responseData);
      }
    } catch (error) {}
    // console.log(data);
    reset();
  };

  async function fetchData() {
    try {
      const response = await fetch(
        "https://url-shortener-production-e495.up.railway.app/api/user/me",
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      const responseData = await response.json();
      setMessage(responseData);
      if (response.ok) {
        setData(responseData.data);
      } else {
        console.log(responseData.data);
      }
    } catch (error) {}
  }

  useEffect(() => {
    fetchData();
    // console.log(data);
  }, []);

  const HandleOnClose = () => {
    setIsPopUpVisible(false);
    window.location.reload();
  };

  return (
    <>
      <form
        className="w-full flex flex-col self-end text-[#041267] overflow-y-auto pb-8 h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="px-6 flex flex-col gap-y-12">
          <div className="flex flex-col gap-y-4">
            <div className="min-h-[5rem] flex items-center justify-start border-b">
              <h2 className="text-2xl font-semibold">Preferences</h2>
            </div>
            <div className="flex flex-col gap-y-3 text-sm">
              <h3 className="text-base font-medium">Display name</h3>
              <input
                type="text"
                {...register("name")}
                placeholder={data?.name}
                className="px-4 py-3 border w-[18rem] rounded-md"
              />
            </div>
            <div className="flex flex-col gap-y-3 text-sm">
              <h3 className="text-base font-medium">Email addresses</h3>
              <input
                type="text"
                {...register("email")}
                placeholder={data?.email}
                className="px-4 py-3 border w-[18rem] rounded-md"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-3 font-medium bg-indigo-300 w-[12rem] rounded-md text-sm"
            >
              Update preferences
            </button>
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="min-h-[5rem] flex items-center justify-start border-b">
              <h2 className="text-2xl font-semibold">
                Security & authentication
              </h2>
            </div>
            <div className="flex flex-col gap-y-3 text-sm">
              <h3 className="text-base font-medium">New password</h3>
              <input
                type="text"
                placeholder="password"
                className="px-4 py-3 border w-[18rem] rounded-md"
              />
            </div>
            <div className="flex flex-col gap-y-3 text-sm">
              <h3 className="text-base font-medium">Confirm new password</h3>
              <input
                type="text"
                {...register("password")}
                placeholder="confirm password"
                className="px-4 py-3 border w-[18rem] rounded-md"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-3 font-medium border-2 border-indigo-300 w-[12rem] text-[#041267] rounded-md text-sm"
            >
              Update preferences
            </button>
          </div>
        </div>
      </form>
      {isPopUpVisible && (
        <Popup message={responseMessage} onClose={HandleOnClose} />
      )}
    </>
  );
};

export default Profile;
