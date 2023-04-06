import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

const User = () => {
  const [isToken, setIsToken] = useState(false);
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
    }
  }, []);
  return <Sidebar />;
};

export default User;
