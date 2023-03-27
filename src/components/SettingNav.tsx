import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

interface currentSection {
  curSection: JSX.Element;
}

const SettingNav = ({ curSection }: currentSection) => {
  const [profDetails, setProfDetails] = useState(false);
  const [profile, setProfile] = useState(false);
  const HandleProfDetails = () => {
    if (profDetails) {
      setProfDetails(false);
    } else {
      setProfDetails(true);
    }
  };
  const HandleProfile = () => {
    if (profile) {
      setProfile(false);
    } else {
      setProfile(true);
    }
  };
  const [active, setActive] = useState("profile");
  const [section, setSection] = useState<JSX.Element>();
  const updateActive = (value: string, section: JSX.Element) => {
    setActive(value);
    setSection(section);
  };
  return (
    <>
      <button
        type="button"
        onClick={HandleProfile}
        className="min-h-[4rem] font-semibold text-lg flex items-center justify-center gap-x-2 border-b"
      >
        Profile <BiChevronDown size={20} />
      </button>
      {profile && (
        <div className="text-[#041267] flex flex-col px-8 py-6 gap-y-8 h-full">
          <div className="flex flex-col gap-y-2">
            <h2 className="font-medium">Your settings</h2>
            <p className="font-light">Profile</p>
            <p className="font-light">Integration</p>
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
                <p className="font-light">Account details</p>
                <p className="font-light">Custom domains</p>
                <p className="font-light">Groups</p>
                <p className="font-light">CSV bulk shortening</p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            <h2 className="font-medium">Developer settings</h2>
            <p className="font-light">API</p>
          </div>
        </div>
      )}
      {curSection}
      {/* {profile && section} */}
    </>
  );
};

export default SettingNav;
