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

  const handleNewClick = () => {
    updateActive("home", <Homepage />);
    showSidebar(false);
  };

  const [active, setActive] = useState("dashboard");
  const [currentPage, setCurrentPage] = useState(
    <Dashboard handleNew={handleNewClick} />
  );

  const updateActive = (value: string, page: JSX.Element) => {
    setActive(value);
    setCurrentPage(page);
  };

  const onClick = () => {
    updateActive("setting", <SettingNav />);
    showSidebar(false);
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
        updateActive("dashboard", <Dashboard handleNew={handleNewClick} />);
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
        updateActive("about", <FAQ />);
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
      <Header
        HandleOnClick={HandleOnClick}
        currentPath="/sections/User"
        onClick={onClick}
      />
      <div className="flex landing-h">
        <section
          className={`bg-indigo-50 landing-h absolute z-10 md:static transition-[width] duration-300 overflow-x-hidden ${
            sidebar ? "w-[15rem]" : "md:w-[5.25rem] w-0"
          }`}
        >
          <div className="flex flex-col gap-y-2 py-4">
            {links.map((link) => (
              <div
                key={link.title}
                className="px-4 h-10 flex items-center"
                onClick={link.onClick}
              >
                <Link
                  href=""
                  className={`flex items-center gap-x-4 overflow-x-hidden py-[.58rem] px-[.9rem] rounded-lg w-full text-[.9rem] ${
                    link.active ? "bg-indigo-300" : ""
                  }`}
                >
                  <span>{link.icon}</span> <span>{link.title}</span>
                </Link>
              </div>
            ))}
          </div>
        </section>
        {currentPage}
      </div>
    </>
  );
};

export default Sidebar;
