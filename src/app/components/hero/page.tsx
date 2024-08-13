"use client";

import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <div className="relative bg-purple-50 text-gray-700 p-4 sm:p-20 mt-24">
        {/* <div className="absolute inset-0">
          <Image
            src="/urlfit.png"
            alt="Hero Image"
            layout="fill"
            objectFit="blur"
            quality={100}
            className="opacity-50"
          />
        </div> */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center">
          <h1 className="text-2xl md:text-6xl font-bold mb-8 sm:mb-20">
            CutFitt-URL Your One-Stop Solution for your URL Shortening
          </h1>
          <div className="md:w-3/4 flex flex-col md:flex md:flex-row justify-center items-center md:p-10">
            <div className="relative lg:flex h-full w-1/4 items-center justify-center ">
              <div className="flex justify-center item-center">
                <Image
                  className="w-50 h-50 animate-bounce"
                  src="/urlfit.png"
                  alt="icon"
                  width={150}
                  height={200}
                />
              </div>
              {/* <div className="w-screen h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" /> */}
            </div>
            <p className="w-4/5 text-lg md:text-xl mt-4 mb-6">
              CutFitt-URL is a URL shortening service that allows you to shorten
              any URL to a more manageable and user-friendly link. CutFitt-URL
              helps you to create branded short links to share your brand
              identity, custom slugs and domain customization options to
              reinforce your brand presence and enhance user engagement.
            </p>
          </div>
          <Link
            className="text-purple-200 ml-1 cursor-pointer font-bold border border-purple-700 bg-purple-700 px-4 py-2 rounded-xl hover:bg-purple-200 hover:text-purple-700"
            href={"/register"}
          >
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
};

export default Hero;
