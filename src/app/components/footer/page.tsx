"use client";

import React from "react";
import { FaMobileAlt } from "react-icons/fa";
import {
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaTwitter,
  FaGithub,
} from "react-icons/fa6";
import Link from "next/link";

const FooterLinks = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About Us",
    link: "/#about",
  },
  {
    title: "Feature",
    link: "/#feature",
  },
  {
    title: "Contact Us",
    link: "/contact",
  },
];

const Footer = () => {
  return (
    <div className="bg-purple-200 text-gray-700 mt-10">
      <div className="container">
        <div className="grid md:grid-cols-3 pb-10 pt-5">
          {/*company details*/}
          <div className="py-8 px-4">
            <a
              href="#"
              className="text-purple-700 font-bold tracking-widest text-2xl uppercase sm:text-3xl"
            >
              CutFitt-URL
            </a>
            <p className="text-gray-600 dark:text-gray-600 lg:pr-24 pt-3">
              Cutfitt-URL is a platform where you Shorten your URLs to make them
              easier to share.
            </p>
            <p className="text-gray-500 mt-4">Made with ❤️ by kngkay</p>
            <p className="text-gray-500 mt-4">&copy; 2024 CutFitt-URL</p>
          </div>
          {/*Footer links*/}
          <div className="col-span-2 grid grid-cols-2 sm:grid-cols-3 md:pl-10">
            <div className="py-8 px-4">
              <h1 className="text-xl font-bold sm:text-left mb-3">
                Important Links
              </h1>
              <ul className="space-y-3">
                {FooterLinks.map((data, index) => (
                  <li key={index}>
                    <a
                      href={data.link}
                      className="text-gray-600 dark:text-gray-600 hover:dark:text-white hover:text-black duration-300"
                    >
                      {data.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/*Second footer links*/}
            <div className="py-8 px-4">
              <h1 className="text-xl font-bold sm:text-left mb-3">
                Quick Links
              </h1>
              <ul className="space-y-3">
                {FooterLinks.map((data, index) => (
                  <li key={index}>
                    <a
                      href={data.link}
                      className="text-gray-600 dark:text-gray-600 hover:dark:text-white hover:text-black duration-300"
                    >
                      {data.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/*Company Address*/}
            <div className="py-8 px-4 col-span-2 sm:col-auto">
              <h1 className="text-xl font-bold sm:text-left mb-3">Address</h1>
              <div>
                <div className="flex items-center gap-3">
                  <FaLocationArrow className="" />
                  <p>123, Main Street, New York, USA</p>
                </div>
                <div className="flex items-center gap-3 mt-6">
                  <FaMobileAlt className="" />
                  <p>+234 802 973 2493</p>
                </div>

                {/*social links*/}
                <div className="flex items-center gap-3 mt-6">
                  <Link
                    href="https://instagram.com/#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="text-3xl hover:text-primary duration -200" />
                  </Link>
                  <Link
                    href="https://github.com/kaylezy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="text-3xl hover:text-primary duration -200" />
                  </Link>
                  <Link
                    href="https://twitter.com/iam_kaylezy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter className="text-3xl hover:text-primary duration -200" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/olakunle-hassan/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin className="text-3xl hover:text-primary duration -200" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
