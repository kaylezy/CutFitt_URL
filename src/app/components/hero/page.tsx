"use client";

import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <div className="relative bg-purple-50 text-gray-700 p-4 sm:p-20 mt-24">
        <div className="absolute inset-0">
          {/* <Image
          src="/error.png"
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="opacity-50"
        /> */}
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center text-center">
          <h1 className="text-2xl md:text-6xl font-bold mb-8 sm:mb-20">
            CutFitt-URL Your One-Stop Solution for your URL Shortening
          </h1>
          <div>
            <Image
              src="/urlfit.png"
              alt="CutFit Logo"
              width={150}
              height={200}
            />
          </div>
          <p className="w-4/5 text-lg md:text-xl mt-4 mb-6">
            Personalize your shortened URLs to align with your brand identity.
            Utilize custom slugs, branded links, and domain customization
            options to reinforce your brand presence and enhance user
            engagement.
          </p>
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
