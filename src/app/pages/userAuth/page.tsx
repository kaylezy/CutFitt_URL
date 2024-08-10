"use client";

import { useState } from "react";
import Modal from "../modal/modal";
import { auth } from "../../firebase/firebase";
import { shortenUrl } from "../../utils/shorten";
import { generateQRCode } from "../../utils/generateQRCode";
import Image from "next/image";

const Home = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [qrCode, setQRCode] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleShorten = async () => {
    if (!auth.currentUser) {
      setModalOpen(true);
      return;
    }

    try {
      const alias = await shortenUrl(originalUrl, customAlias);
      setShortUrl(`${window.location.origin}/${alias}`);
      const qr = await generateQRCode(`${window.location.origin}/${alias}`);
      setQRCode(qr);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Long URL</h1>
      <input
        type="text"
        placeholder="Original URL"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        className="sm:w-full border p-2 m-2 rounded-md focus:border-purple-500"
      />
      <input
        type="text"
        placeholder="Custom Alias (optional)"
        value={customAlias}
        onChange={(e) => setCustomAlias(e.target.value)}
        className="sm:w-2/4 border p-2 m-2 rounded-md"
      />
      <button
        onClick={handleShorten}
        className="bg-purple-700 rounded-lg text-white p-2 m-2"
      >
        Shorten URL
      </button>

      {shortUrl && (
        <div>
          <p>
            Short URL:{" "}
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </p>
          <Image src={qrCode} width={100} height={100} alt="QR Code" />
        </div>
      )}
      <Modal isOpen={modalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Home;
