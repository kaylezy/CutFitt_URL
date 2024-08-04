"use client";

import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { FaEnvelope } from "react-icons/fa";
import { RiMailSendFill } from "react-icons/ri";
import Link from "next/link";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent to your email");
      setIsModalOpen(true);
    } catch (err) {
      setError("Please enter a valid email address");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <div className="bg-purple-500 p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6">Forgot Password!</h1>
          <form onSubmit={handleForgotPassword}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-300 font-medium mb-2"
              >
                Enter Your Email Address
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-purple-900" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-10 py-2  border text-purple-500 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            {message && <p className="text-green-300">{message}</p>}
            {error && <p className="text-red-300">{error}</p>}
            <button
              type="submit"
              className="w-full mt-3 bg-purple-800 text-white rounded-lg p-2 text-sm shadow-md hover:bg-gradient-to-b from-purple-300 to-purple-900 hover:shadow-lg transition-all disabled:to-purple-400 disabled:from-purple-400"
            >
              Send Reset Link
            </button>
          </form>
        </div>
        {isModalOpen && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <RiMailSendFill
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Email Sent
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          A password reset link has been sent to your email.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-500 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <Link href={"/login"}>Sign In</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ForgotPassword;
