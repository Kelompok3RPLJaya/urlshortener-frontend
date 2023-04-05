import React, { useState } from "react";
import Link from "next/link";
import Profile from "@/pages/sections/Profile";
import { BiChevronDown } from "react-icons/bi";

const SettingNav = () => {
  const [profDetails, setProfDetails] = useState(true);
  const [profile, setProfile] = useState(true);
  const HandleProfDetails = () => {
    setProfDetails(!profDetails);
  };
  const HandleProfile = () => {
    setProfile(!profile);
  };
  const [active, setActive] = useState("profile");
  const [curSection, setCurSection] = useState<JSX.Element>(<Profile />);
  const updateActive = (value: string, section: JSX.Element) => {
    setActive(value);
    setCurSection(section);
  };

  const links1 = [
    {
      title: "Profile",
      active: active === "profile",
      onClick: () => {
        updateActive("profile", <Profile />);
        // setProfile(false);
      },
    },
    {
      title: "Integration",
      active: active === "integration",
      onClick: () => {
        updateActive("integration", <Profile />);
        // setProfile(false);
      },
    },
  ];

  const links2 = [
    {
      title: "Account details",
      active: active === "account",
      onClick: () => {
        updateActive("account", <Profile />);
        // setProfile(false);
      },
    },
    {
      title: "Custom domains",
      active: active === "custom",
      onClick: () => {
        updateActive("custom", <Profile />);
        // setProfile(false);
      },
    },
    {
      title: "Groups",
      active: active === "groups",
      onClick: () => {
        updateActive("groups", <Profile />);
        // setProfile(false);
      },
    },
    {
      title: "CSV bulk shortening",
      active: active === "csv",
      onClick: () => {
        updateActive("csv", <Profile />);
        // setProfile(false);
      },
    },
  ];
  return (
    <section className="w-full landing-h links-w flex flex-col relative">
      <button
        type="button"
        onClick={HandleProfile}
        className="min-h-[4rem] w-full font-semibold text-xl flex items-center justify-center gap-x-2 border-b capitalize"
      >
        {active} <BiChevronDown size={20} />
      </button>
      <div className="flex overflow-y-clip">
        {profile && (
          <div className="text-[#041267] flex flex-col px-6 py-8 gap-y-8 bg-white profil-h text-sm setting-h md:border-r absolute w-full top-[4rem] md:static md:w-[45%] z-[1]">
            <div className="flex flex-col gap-y-2">
              <h2 className="font-medium">Your settings</h2>
              {links1.map((link) => (
                <Link
                  href=""
                  key={link.title}
                  className={`font-light px-4 py-2 ${
                    link.active ? "bg-indigo-50" : ""
                  }`}
                  onClick={link.onClick}
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-y-2">
              <h2 className="font-medium">Account settings</h2>
              <button
                type="button"
                onClick={HandleProfDetails}
                className="self-start flex items-center px-4"
              >
                account <BiChevronDown />
              </button>
              {profDetails && (
                <div className="flex flex-col gap-y-2">
                  {links2.map((link) => (
                    <Link
                      key={link.title}
                      href=""
                      className={`font-light px-4 py-2 ${
                        link.active ? "bg-indigo-50" : ""
                      }`}
                      onClick={link.onClick}
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <h2 className="font-medium">Developer settings</h2>
              <Link
                href=""
                className={`font-light px-4 py-2 ${
                  active == "API" ? "bg-indigo-50" : ""
                }`}
                onClick={() => {
                  setActive("API");
                  setCurSection(<Profile />);
                }}
              >
                API
              </Link>
            </div>
          </div>
        )}

        {/* {profile && section} */}
        {curSection}
      </div>
    </section>
  );
};

export default SettingNav;
