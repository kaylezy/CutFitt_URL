"use client";

import React from "react";
import Image from "next/image";

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex items-center ">
        <div className="relative lg:flex h-full items-center justify-center ">
          <div className="flex justify-center item-center">
            <Image
              className="w-50 h-50 animate-bounce"
              src="/urlfit.png"
              alt="icon"
              width={150}
              height={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
