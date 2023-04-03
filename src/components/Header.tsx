import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { SiLinkfire } from "react-icons/si";
import { AiOutlineUser } from "react-icons/ai";

interface HeaderProps {
  HandleOnClick: () => void;
  currentPath: string;
  onClick: () => void;
}

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

const Header = ({ HandleOnClick, currentPath, onClick }: HeaderProps) => {
  const [isToken, setIsToken] = useState(false);

  const [data, setData] = useState<userData>();
  const [message, setMessage] = useState<string>();
  async function fetchData() {
    try {
      const response = await fetch(
        "https://urlshortener-backend-production.up.railway.app/api/user/me",
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
        // console.log(responseData);
      } else {
        // console.log(responseData);
      }
    } catch (error) {}
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsToken(true);
    } else {
      setIsToken(false);
    }
    fetchData();
  }, []);

  return (
    <section className="min-h-[4.5rem] w-full bg-indigo-50 flex justify-between px-[1.6rem] box-border text-[#041267]">
      <div className="flex items-center gap-x-8">
        {currentPath == "/User" && (
          <button type="button" onClick={HandleOnClick}>
            <HiOutlineMenu size={30} />
          </button>
        )}
        <Link href="/" className="flex items-center gap-x-2 text-lg">
          <SiLinkfire size={28} />
          Poplink
        </Link>
      </div>
      <div className="flex justify-center items-center gap-x-4">
        {isToken && (
          <div className="flex items-center gap-x-4">
            {currentPath !== "/User" && (
              <Link
                href="/User"
                className="px-4 py-2 text-sm text-[#041267] rounded-3xl"
              >
                Dashboard
              </Link>
            )}
            <button
              type="button"
              onClick={onClick}
              className="flex items-center gap-x-2 bg-[#041267] px-4 py-2 rounded-3xl text-sm text-gray-100"
            >
              <AiOutlineUser />
              {data?.name}
            </button>
          </div>
        )}
        {!isToken && (
          <>
            <Link
              href="/Register"
              className="px-4 py-2 text-sm bg-[#041267] text-gray-100 rounded-3xl"
            >
              Register
            </Link>
            <Link
              href="/Login"
              className="px-4 py-2 text-sm bg-[#041267] text-gray-100 rounded-3xl"
            >
              Log in
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

export default Header;
