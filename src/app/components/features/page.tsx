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
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2 sm:mt-4">CutFitt-URL</h2>
                <p className="text-gray-600 text-justify">
                  CutFitt-URL is the hub of everything that has to do with your
                  link management. We shorten your URLs, allow you creating
                  custom ones for your personal, business, event usage. Our
                  swift QR code creation, management and usage tracking with
                  advance analytics for all of these is second to none.
                </p>
                <div>
                  <button className="bg-purple-700 text-white px-4 py-2 mt-4 rounded-lg">
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-4">
              <div className="flex flex-col items-center bg-white p-4 rounded shadow">
                <div className="flex rounded-full w-14 h-14 justify-center bg-gray-200">
                  <PiBracketsCurlyDuotone className="w-8 h-8 m-auto p-auto " />
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
          <div>
            <section className="sm:p-10 mt-6 min-w-full">
              <div className="bg-purple-100 min-w-full rounded-lg">
                <div className="flex flex-col md:flex-row justify-between w-[90%]== mx-auto p-2 pt-14 pb-16">
                  <div className="font-bold text-left sm:text-[40px] text-4xl leading-[48px] mb-8 md:mb-0">
                    One Stop.
                    <br /> Four{" "}
                    <span className="text-purple-700">Possibilities</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 md:flex w-full md:w-[60%]">
                    <div className=" first:ml-0 ml-0 md:ml-[72px]">
                      <div className="text-[32px] font-semibold">5M</div>
                      <div className="font-medium max-w-[14ch]">
                        Active Users
                      </div>
                    </div>
                    <div className=" first:ml-0 ml-0 md:ml-[72px]">
                      <div className="text-[32px] font-semibold">10M</div>
                      <div className="font-medium max-w-[14ch]">
                        Links &amp; QR codes created
                      </div>
                    </div>
                    <div className=" first:ml-0 ml-0 md:ml-[72px]">
                      <div className="text-[32px] font-semibold">10M</div>
                      <div className="font-medium max-w-[14ch]">
                        Clicked &amp; Scanned connections
                      </div>
                    </div>
                    <div className="first:ml-0 ml-0 md:ml-[72px]">
                      <div className="text-[32px] font-semibold">500K</div>
                      <div className="font-medium max-w-[14ch]">
                        App Integrations
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
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
