"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What should I do if I land on this page?",
    answer:
      "You can try checking the URL for any typos or go back to the homepage.",
  },
  {
    question: "How can I report a broken link?",
    answer:
      "Please contact our support team via the contact page and provide the URL that brought you here.",
  },
  {
    question: "Can I suggest a feature or improvement?",
    answer:
      "Yes, we welcome feedback! Please use the contact form to send us your suggestions.",
  },
];

const NotFoundPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-purple-50 p-4 text-gray-700">
      <h1 className="text-3xl sm:text-5xl font-bold mb-4">Page Not Found</h1>
      <div className="w-64 h-64 mb-6">
        <Image
          src="/eror.png"
          alt="Error 404"
          className="w-full h-full object-contain"
          width={300}
          height={300}
        />
      </div>
      <p className="text-lg mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-600
        transition mb-6"
      >
        {" "}
        Go back to Home
      </Link>
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full text-left py-4 flex justify-between items-center focus:outline-none"
            >
              <span>{faq.question}</span>
              <svg
                className={`w-6 h-6 transform transition-transform ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
                activeIndex === index ? "max-h-screen" : "max-h-0"
              }`}
            >
              <p className="p-4">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotFoundPage;
