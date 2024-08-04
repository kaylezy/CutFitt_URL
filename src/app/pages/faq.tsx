"use client";

import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What is a URL shortener?",
    answer:
      "A URL shortener is a service that converts a long URL into a shorter, more manageable link.",
  },
  {
    question: "How does the custom URL feature work?",
    answer:
      "You can specify a custom alias for your shortened URL, making it easier to remember and share.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, we use encryption and other security measures to ensure your data is safe.",
  },
  {
    question: "Can I track the usage of my shortened URLs?",
    answer:
      "Yes, our service provides detailed analytics for each shortened URL.",
  },
  {
    question: "Is the service free to use?",
    answer:
      "Yes, the basic URL shortening service is free to use. However, additional features might require a subscription.",
  },
  {
    question: "How do I generate a QR code for my shortened URL?",
    answer:
      "When you shorten a URL, a QR code is automatically generated for it. You can download or share this QR code directly from the app.",
  },
  {
    question: "Can I use a domain I already own?",
    answer:
      "Absolutely! Personalization, flexibility, and control are what CutFit-URL is all about. With each of our paid plans, you can register or connect at least one top-level domain (your-domain.com) or subdomains (sub.your-domain.com) that you already own to create your branded short links using CutFit-URL.",
  },
  {
    question: "Do I have to install Rebrandly on my website?",
    answer:
      "No. CutFit-URL is a web-based service requiring no software to install or code to write. After subscribing, you will be ready to start branding and shortening links right away. No tech skills are required!",
  },
  {
    question: "How do I change a long URL to a short URL?",
    answer:
      "Changing a long URL to a short one involves using a URL shortening service such as CutFit-URL. You first copy the long URL that you wish to shorten. Then, use the URL shortener generator. You will find a field where you can paste the long URL. After pasting the URL, click on the button “Shorten URL.” CutFit-URL will then provide you with a shortened version of your original URL, which redirects to the same page when clicked.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can contact support by visiting our Contact page and filling out the contact form with your query.",
  },
];

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <div id="faq" className="container mx-auto p-4 sm:w-2/4 text-center mb-10">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">
          Frequently Asked Questions
        </h1>
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
              <p className="p-4 text-justify">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FAQPage;
