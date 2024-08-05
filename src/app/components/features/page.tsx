"use client";

import Image from "next/image";
import { PiBracketsCurlyDuotone } from "react-icons/pi";
import { LuPenSquare } from "react-icons/lu";
import { BsQrCode } from "react-icons/bs";
import { DiGoogleAnalytics } from "react-icons/di";
import UserAuth from "../../pages/userAuth/page";

const Feature = () => {
  return (
    <>
      <div
        id="about"
        className="relative flex justify-center bg-purple-50 text-gray-700 mt-10 mb-10 p-4 sm:mt-2 sm:p-10"
      >
        <div className="relative z-10 flex flex-col justify-center items-center text-center px-4">
          <h2 className="text-2xl md:text-4xl font-bold mb-10">
            Why choose CutFitt-URL
          </h2>
          <div className="sm:flex ">
            <div className=" p-4 rounded  sm:mr-4 sm:flex-col">
              <div className="flex justify-center">
                <Image
                  className=""
                  src="/urlfit.png"
                  alt="icon"
                  width={50}
                  height={50}
                />
              </div>
              <h2 className="text-xl font-bold mb-2 sm:mt-4">CutFitt-URL</h2>
              <p className="text-gray-600 text-justify">
                CutFitt-URL is the hub of everything that has to do with your
                link management. We shorten your URLs, allow you creating custom
                ones for your personal, business, event usage. Our swift QR code
                creation, management and usage tracking with advance analytics
                for all of these is second to none.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-4">
              <div className="flex flex-col items-center bg-white p-4 rounded shadow">
                <div className="flex rounded-full w-14 h-14 justify-center bg-gray-200">
                  <PiBracketsCurlyDuotone className="w-8 h-8 m-auto p-auto" />
                </div>
                <h2 className="text-xl font-bold mb-2">URL Shortening</h2>
                <p className="text-gray-600 text-justify">
                  CutFitt-URL allows you to shorten URLs of your business,
                  events. Shorten your URL at scale, URL redirects.
                </p>
              </div>
              <div className="flex flex-col items-center bg-white p-4 rounded shadow">
                <div className="flex rounded-full w-14 h-14 justify-center bg-gray-200">
                  <LuPenSquare className="w-8 h-8 m-auto p-auto" />{" "}
                </div>
                <h2 className="text-xl font-bold mb-2">Custom URL&apos;s</h2>
                <p className="text-gray-600 text-justify">
                  With CutFitt-URL, you can create custom URLs, with the length
                  you want! A solution for socials and businesses.
                </p>
              </div>
              <div className="flex flex-col items-center bg-white p-4 rounded shadow">
                <div className="flex rounded-full w-14 h-14 justify-center bg-gray-200">
                  <BsQrCode className="w-8 h-8 m-auto p-auto" />
                </div>
                <h2 className="text-xl font-bold mb-2">QR Codes</h2>
                <p className="text-gray-600 text-justify">
                  Generate QR codes to your business, events. Bring your
                  audience and customers to your doorstep with this scan and go
                  solution.
                </p>
              </div>
              <div className="flex flex-col items-center bg-white p-4 rounded shadow">
                <div className="flex rounded-full w-14 h-14 justify-center bg-gray-200">
                  <DiGoogleAnalytics className="w-8 h-8 m-auto p-auto" />
                </div>
                <h2 className="text-xl font-bold mb-2">Data Anaylytics</h2>
                <p className="text-gray-600 text-justify">
                  Receive data on the usage of either your shortened URL, custom
                  URLs or generated QR codes. Embedded to monitor progress.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full bg-purple-200 p-6 mt-10 rounded-lg">
            <UserAuth />
          </div>
        </div>
      </div>
    </>
  );
};

export default Feature;
