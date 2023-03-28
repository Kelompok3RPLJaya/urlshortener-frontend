import React, { useState } from "react";
import Link from "next/link";
import Profile from "@/pages/sections/setting-section/Profile";
import { BiChevronDown } from "react-icons/bi";

const SettingNav = () => {
  const [profDetails, setProfDetails] = useState(false);
  const [profile, setProfile] = useState(false);
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
        setProfile(false);
      },
    },
    {
      title: "Integration",
      active: active === "integration",
      onClick: () => {
        updateActive("integration", <Profile />);
        setProfile(false);
      },
    },
  ];

  const links2 = [
    {
      title: "Account details",
      active: active === "account",
      onClick: () => {
        updateActive("account", <Profile />);
        setProfile(false);
      },
    },
    {
      title: "Custom domains",
      active: active === "custom",
      onClick: () => {
        updateActive("custom", <Profile />);
        setProfile(false);
      },
    },
    {
      title: "Groups",
      active: active === "groups",
      onClick: () => {
        updateActive("groups", <Profile />);
        setProfile(false);
      },
    },
    {
      title: "CSV bulk shortening",
      active: active === "csv",
      onClick: () => {
        updateActive("csv", <Profile />);
        setProfile(false);
      },
    },
  ];
  return (
    <section className="w-full landing-h links-w flex">
      <div className="absolute w-full bg-white md:static md:w-[45%]">
        <button
          type="button"
          onClick={HandleProfile}
          className="min-h-[4rem] w-full font-semibold text-lg flex items-center justify-center gap-x-2 border-b capitalize"
        >
          {active} <BiChevronDown size={20} />
        </button>
        {profile && (
          <div className="text-[#041267] flex flex-col px-4 py-6 gap-y-8 h-full">
            <div className="flex flex-col gap-y-2">
              <h2 className="font-medium">Your settings</h2>
              {links1.map((link) => (
                <Link
                  href=""
                  className={`font-light px-4 ${
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
                className="self-start flex items-center"
              >
                vron <BiChevronDown />
              </button>
              {profDetails && (
                <div className="flex flex-col gap-y-2">
                  {links2.map((link) => (
                    <Link
                      href=""
                      className={`font-light px-4 ${
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
                className={`font-light px-4 ${
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
      </div>
      {curSection}
    </section>
  );
};

export default SettingNav;
