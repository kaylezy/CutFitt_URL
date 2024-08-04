"use client";

import { useState } from "react";
import { shortenUrl } from "../utils/shorteningUrl";
import { generateQRCode } from "../utils/generateQRCode";
import Image from "next/image";

const UrlShortner = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [qrCode, setQRCode] = useState("");

  const handleShorten = async () => {
    try {
      const alias = await shortenUrl(originalUrl, customAlias);
      const shortUrl = `${window.location.origin}/${alias}`;
      setShortUrl(shortUrl);
      const qr = await generateQRCode(shortUrl);
      setQRCode(qr);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="max-w-lg mx-auto p-4 text-gray-700">
        <h1 className="text-2xl font-bold mb-4 mt-4">Input Your Long URL</h1>
        <div className="flex flex-col space-y-3">
          <input
            type="text"
            placeholder="Original URL"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            className="border p-2 m-2"
          />
          <input
            type="text"
            placeholder="Custom Alias (optional)"
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
            className="border p-2 m-2"
          />
          <button
            onClick={handleShorten}
            className="bg-purple-500 text-white p-2 m-2"
          >
            Shorten URL
          </button>
        </div>
        {shortUrl && (
          <div>
            <p className="text-blue-500 mt-4 mb-4">
              Short URL:{" "}
              <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                {shortUrl}
              </a>
            </p>
            {/* <img src={qrCode} alt="QR Code" /> */}
            <Image src={qrCode} width={200} height={200} alt="QR Code" />
          </div>
        )}
      </div>
    </>
  );
};

export default UrlShortner;
