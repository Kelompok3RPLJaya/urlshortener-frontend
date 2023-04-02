import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { TbLayoutList } from "react-icons/tb";

interface linkProps {
  date: string;
  title: string;
  short_url: string;
}

const LinkCard = ({ date, title, short_url }: linkProps) => {
  const router = useRouter();
  return (
    <>
      <p className="text-[.85rem] text-[#4e558e]">{date}</p>
      <div className="flex items-center gap-x-2 ">
        <TbLayoutList />
        <p className="text-[.9rem]">{title}</p>
      </div>
      <Link href="" className="text-indigo-400 text-sm pl-6 box-border">
        {short_url}
      </Link>
    </>
  );
};

export default LinkCard;
