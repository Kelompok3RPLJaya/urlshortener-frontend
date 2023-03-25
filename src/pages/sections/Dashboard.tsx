import React, { useState } from "react";
import Link from "next/link";
import { LinkProps } from "@/constant/Data";

import { AiOutlineSwap } from "react-icons/ai";
import { TbPlus } from "react-icons/tb";
import { useForm } from "react-hook-form";
import LinkCard from "@/components/LinkCard";
import LinkDetails from "@/components/LinkDetails";

interface FilterValues {
  filter: string;
  search: string;
  isPublic: boolean;
}

const Dashboard = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FilterValues>();

  const onSubmit = (data: FilterValues) => {
    console.log(data);
    reset();
  };

  const [details, setDetails] = useState<JSX.Element>(
    <LinkDetails
      title={LinkProps[0].title}
      date={LinkProps[0].date}
      user={LinkProps[0].user}
      short_url={LinkProps[0].short_url}
      long_url={LinkProps[0].long_url}
    />
  );
  const [active, setActive] = useState(1);
  const showDetails = (id: number) => {
    setActive(LinkProps[id - 1].id);
    setDetails(
      <LinkDetails
        title={LinkProps[id - 1].title}
        date={LinkProps[id - 1].date}
        user={LinkProps[id - 1].user}
        short_url={LinkProps[id - 1].short_url}
        long_url={LinkProps[id - 1].long_url}
      />
    );
  };

  return (
    <section className="w-full links-w flex flex-col">
      <div className="min-h-[12rem] flex justify-between items-center px-8 box-border border-b">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center gap-y-4  min-w-[15rem]"
        >
          <h2 className="text-2xl font-bold">Links</h2>
          <div className="flex items-center gap-x-2">
            <label htmlFor="filter-date" className="flex items-center gap-x-1">
              <input type="radio" value="date" {...register("filter")} />
              <p className="text-sm">Date created</p>
            </label>
            <label
              htmlFor="filter-alphabet"
              className="flex items-center gap-x-1"
            >
              <input type="radio" value="alphabet" {...register("filter")} />
              <p className="text-sm">Alphabet</p>
            </label>
          </div>
          <div className="flex items-center gap-x-4">
            <label
              htmlFor="tag"
              className="max-w-[8rem] border-2 rounded-md order-2 opacity-0 md:opacity-100"
            >
              <input
                type="text"
                className="px-3 py-[.4rem] w-full rounded-md border-2 border-indigo-300 text-sm"
                placeholder="Tag"
                {...register("search")}
              />
            </label>
            <label
              htmlFor="linkType"
              className="flex items-center gap-x-1 order-3 opacity-0"
            >
              <input type="checkbox" {...register("isPublic")} />
              <p className="text-[.9rem] text-opacity-80 text-[#041267]">
                Private links
              </p>
            </label>
            <button
              type="submit"
              className="flex items-center gap-x-2 px-4 py-2 rounded-md bg-indigo-300 order-1 hover:bg-indigo-400"
            >
              <AiOutlineSwap className=" rotate-90" />
              <p>Filter</p>
            </button>
          </div>
        </form>

        <div className="flex flex-wrap items-center justify-end gap-y-2 gap-x-2">
          <Link
            href=""
            className="p-3 bg-[#041267] text-gray-100 rounded-md text-[.9rem]"
          >
            <TbPlus />
          </Link>
          <Link
            href=""
            className="px-4 py-2 text-center bg-indigo-50 text-[#041267] rounded-md text-[.9rem]"
          >
            Upgrade
          </Link>
        </div>
      </div>
      <div className="flex overflow-y-clip">
        <div className="w-full flex flex-col gap-y-6 py-6 sm:w-[45%] md:w-1/3 overflow-y-auto">
          {LinkProps.map((link) => (
            <div
              className={`flex flex-col px-8 min-h-[8rem] gap-y-1 justify-center border-t border-b cursor-pointer ${
                active == link.id ? "bg-indigo-100" : ""
              }`}
              onClick={() => {
                showDetails(link.id);
              }}
              key={link.id}
            >
              <LinkCard
                date={link.date}
                title={link.title}
                short_url={link.short_url}
              />
            </div>
          ))}
        </div>
        <div className="hidden sm:static sm:w-[55%] md:w-2/3 sm:flex flex-col p-8 gap-y-6 bg-indigo-50 overflow-y-auto">
          {active ? details : null}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
