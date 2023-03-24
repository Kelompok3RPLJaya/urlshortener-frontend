import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { SiLinkfire } from "react-icons/si";
import { AiOutlineUser } from "react-icons/ai";

interface HeaderProps {
  HandleOnClick: () => void;
  currentPath: string;
}

const Header = ({ HandleOnClick, currentPath }: HeaderProps) => {
  const [isToken, setIsToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsToken(true);
    } else {
      setIsToken(false);
    }
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
          Shortify
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
            <Link
              href="/Setting"
              className="flex items-center gap-x-2 bg-[#041267] px-4 py-2 rounded-3xl text-sm text-gray-100"
            >
              <AiOutlineUser />
              Profile
            </Link>
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
