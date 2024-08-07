"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <>
      <nav className="fixed z-20 w-full flex bg-purple-200">
        <div className="px-4 sm:px-6 lg:px-8 bg-purple-200">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <div className="w-full flex-shrink-0 text-purple-700">
                <Link href="/" className="text-2xl font-bold text-purple-700">
                  CutFitt-URL
                </Link>
              </div>

              <div className="hidden md:ml-6 md:flex md:space-x-8 h-10">
                <Link
                  href="/"
                  className="inline-flex items-center px-2 pt-1 border-b-2 text-md font-bold border-transparent text-purple-700 hover:text-purple-500 hover:border-purple-500"
                >
                  Home
                </Link>
                <Link
                  href="/#about"
                  className="inline-flex items-center px-2 pt-1 border-b-2 text-md font-bold border-transparent text-purple-700 hover:text-purple-500 hover:border-purple-500"
                >
                  About
                </Link>
                <Link
                  href="/components/contact"
                  className="inline-flex items-center px-2 pt-1 border-b-2 text-md font-bold border-transparent text-purple-700 hover:text-purple-500 hover:border-purple-500"
                >
                  Contact
                </Link>
                <Link
                  href="/#faq"
                  className="inline-flex items-center px-2 pt-1 border-b-2 text-md font-bold border-transparent text-purple-700 hover:text-purple-500 hover:border-purple-500"
                >
                  FAQs
                </Link>

                <Link
                  href="/login"
                  className="inline-flex items-center px-10 border bg-purple-700 border-purple-500 text-md font-bold text-purple-200 hover:bg-purple-200 hover:text-purple-700 rounded-xl"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
