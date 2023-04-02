import Link from "next/link";
import React, { useState } from "react";
import { RiHomeLine } from "react-icons/ri";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { RxStack } from "react-icons/rx";
import { IoMdLink } from "react-icons/io";
import { TbSettings2 } from "react-icons/tb";
import Header from "./Header";
import Dashboard from "@/pages/sections/Dashboard";
import Homepage from "@/pages/sections/Homepage";
import Feeds from "@/pages/sections/Feeds";
import SettingNav from "./SettingNav";
import FAQ from "@/pages/sections/FAQ";

const Sidebar = () => {
  const [sidebar, showSidebar] = useState(false);
  const HandleOnClick = () => {
    if (sidebar == true) {
      showSidebar(false);
    } else {
      showSidebar(true);
    }
  };
  const [active, setActive] = useState("dashboard");
  const [currentPage, setCurrentPage] = useState(<Dashboard />);

  const updateActive = (value: string, page: JSX.Element) => {
    setActive(value);
    setCurrentPage(page);
  };

  const links = [
    {
      title: "Home",
      icon: <RiHomeLine size={18} />,
      active: active === "home",
      onClick: () => {
        updateActive("home", <Homepage />);
        showSidebar(false);
      },
    },
    {
      title: "Dashboard",
      icon: <MdOutlineSpaceDashboard size={18} />,
      active: active === "dashboard",
      onClick: () => {
        updateActive("dashboard", <Dashboard />);
        showSidebar(false);
      },
    },
    {
      title: "Feeds",
      icon: <RxStack size={18} />,
      active: active === "feeds",
      onClick: () => {
        updateActive("feeds", <Feeds />);
        showSidebar(false);
      },
    },
    {
      title: "About",
      icon: <IoMdLink size={18} />,
      active: active === "about",
      onClick: () => {
        updateActive("faq", <FAQ />);
        showSidebar(false);
      },
    },
    {
      title: "Setting",
      icon: <TbSettings2 size={18} />,
      active: active === "setting",
      onClick: () => {
        updateActive("setting", <SettingNav />);
        showSidebar(false);
      },
    },
  ];

  return (
    <>
      <Header HandleOnClick={HandleOnClick} currentPath={`/User`} />
      <div className="flex landing-h">
        <section
          className={`bg-indigo-50 landing-h absolute z-10 md:static ${
            sidebar ? "w-[15rem]" : "md:min-w-[5rem] w-0"
          }`}
        >
          <div
            className={`flex flex-col justify-between gap-y-2 py-4 box-border ${
              sidebar ? "pr-4" : "w-full px-4"
            }`}
          >
            {links.map((link) => (
              <Link
                key={link.title}
                href=""
                className={`flex items-center h-10 text-[.9rem] ${
                  link.active
                    ? sidebar
                      ? "bg-indigo-300 rounded-r-3xl"
                      : "bg-indigo-300 rounded-lg"
                    : ""
                } ${sidebar ? "gap-x-3 px-8" : "justify-center"}`}
                onClick={link.onClick}
              >
                {link.icon} {sidebar ? link.title : null}
              </Link>
            ))}
          </div>
        </section>
        {currentPage}
      </div>
    </>
  );
};

export default Sidebar;
