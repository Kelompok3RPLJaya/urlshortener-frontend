import React, { useState } from "react";
import SettingNav from "@/components/SettingNav";
import Profile from "./setting-section/Profile";

const Setting = () => {
  return (
    <section className="w-full links-w flex flex-col border-2">
      <SettingNav curSection={<Profile />} />
      <div className=""></div>
    </section>
  );
};

export default Setting;
