import React from "react";
import { NextSeo } from "next-seo";

const Custom404: React.FC = () => {
  return (
    <>
      <NextSeo
        title="Page Not Found"
        description="Sorry, the page you were looking for could not be found."
      />

      <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-gray-800">404 Page Not Found</h1>
      </div>
    </>
  );
};

export default Custom404;
