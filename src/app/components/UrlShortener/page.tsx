"use client";

import { useState, useEffect, useRef } from "react";
import { FaDownload } from "react-icons/fa";
import QRCode from "qrcode.react";
import { toPng, toJpeg, toSvg, toCanvas } from "html-to-image";
import { shortenUrl } from "../../utils/shorten";
import { FiLink, FiLink2 } from "react-icons/fi";
import {
  PiMagicWandFill,
  PiMagicWandLight,
  PiQrCodeFill,
} from "react-icons/pi";
// import Dropdown from "./Dropdown";
import {
  FaTwitter,
  FaLinkedin,
  FaShare,
  FaTelegram,
  FaTimes,
} from "react-icons/fa";
import {
  IoLogoWhatsapp,
  IoIosMail,
  IoIosCopy,
  IoMdCheckmarkCircle,
} from "react-icons/io";
// import { TfiSharethis } from "react-icons/tfi";
// import { FaS } from "react-icons/fa6";

const UrlShortener = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState("");
  const [isShortened, setIsShortened] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false); //State to manage the visibility of the QR Code
  const [downloadFormat, setDownloadFormat] = useState("png"); //State to manage the download format of the QR Code
  const qrCodeRef = useRef<HTMLDivElement>(null); //Reference to the QR Code div element

  const socialItems = [
    {
      name: "WhatsApp",
      icon: <IoLogoWhatsapp />,
      url: "https://api.whatsapp.com/send?text=",
    },
    {
      name: "Twitter",
      icon: <FaTwitter />,
      url: "https://twitter.com/intent/tweet?text=",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/shareArticle?mini=true&url=",
    },
    {
      name: "Telegram",
      icon: <FaTelegram />,
      url: "https://t.me/share/url?url=",
    },
    {
      name: "Mail",
      icon: <IoIosMail />,
      url: "mailto:?subject=Check+out+this+shortened+URL&body=",
    },
  ];

  useEffect(() => {
    const storedShortUrl = localStorage.getItem("shortUrl");
    if (storedShortUrl) setShortUrl(storedShortUrl);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (copySuccess) {
      timer = setTimeout(() => setCopySuccess(""), 3000);
    }
    return () => clearTimeout(timer);
  }, [copySuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isShortened) {
      handleReset();
      return;
    }
    setError("");
    setCopySuccess("");
    try {
      const shortenedUrl = await shortenUrl(originalUrl, customAlias);
      setShortUrl(shortenedUrl);
      localStorage.setItem("shortUrl", shortenedUrl);
      setIsShortened(true);
      setError(null); //reset error state
    } catch (err) {
      setError((err as Error)?.message || "");
      setIsShortened(false); //ensure isShortened is false when there is an error
    }
  };

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl).then(
        () => {
          setCopySuccess("Copied to clipboard!");
        },
        (err) => {
          setCopySuccess("Failed to copy URL!");
        }
      );
    }
  };

  const handleVisit = () => {
    window.open(shortUrl, "_blank");
  };

  const handleReset = () => {
    setOriginalUrl("");
    setCustomAlias("");
    setShortUrl("");
    setError("");
    setCopySuccess("");
    setIsShortened(false);
    setShowQrCode(false);
  };

  const handleDownloadQRCode = () => {
    if (qrCodeRef.current) {
      let downloadFunction;
      let mimeType;
      switch (downloadFormat) {
        case "jpeg":
          downloadFunction = toJpeg;
          mimeType = "image/jpeg";
          break;
        case "svg":
          downloadFunction = toSvg;
          mimeType = "image/svg+xml";
          break;
        case "canvas":
          downloadFunction = toCanvas;
          mimeType = "image/png";
          break;
        case "png":
        default:
          downloadFunction = toPng;
          mimeType = "image/png";
          break;
      }

      downloadFunction(qrCodeRef.current)
        .then((dataUrl) => {
          //convert data URL to blob
          fetch(dataUrl as string)
            .then((res) => res.blob())
            .then((blob) => {
              //create a temporary URL for the blob
              const url = URL.createObjectURL(blob);

              //create a link element and set its href to the Blob URL
              const link = document.createElement("a");
              link.href = url;
              link.download = `qrcode.${downloadFormat}`;

              // Append link to the DOM, click it, and then remove it
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);

              //revoke the object URL to free up memory
              URL.revokeObjectURL(url);
            })
            .catch((err) => {
              console.log("Failed to convert data URL to Blob", err);
            });
        })
        .catch((err) => {
          console.log("Failed to download QR Code", err);
        });
    }
  };

  const handleShareQRCodeAsSVG = async () => {
    if (qrCodeRef.current) {
      try {
        //convert the QR Code to SVG
        const dataUrl = await toSvg(qrCodeRef.current);

        //convert data URL to Blob
        const response = await fetch(dataUrl);
        const blob = await response.blob();

        //use the web share API if available
        if (navigator.share) {
          await navigator.share({
            title: "QR Code",
            text: "Scan this QR Code to visit the shortened URL",
            files: [new File([blob], "qrcode.svg", { type: "image/svg+xml" })],
          });
        } else {
          console.warn("Web Share API not supported in this browser.");
        }
      } catch (err) {
        console.log("Failed to share QR Code as SVG", err);
      }
    }
  };

  return (
    <>
      <div className="max-w-lg mx-auto p-4 text-gray-700">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label
            htmlFor="originalUrl"
            className="flex items-center gap-2 text-xl font-xl font-normal"
          >
            {isShortened ? (
              <FiLink2 className="text-2xl" />
            ) : (
              <FiLink className="text-2xl" />
            )}
            {isShortened
              ? "Original Long URL"
              : "Shortened a Long Original URL"}
          </label>
          <input
            type="text"
            id="originalUrl"
            placeholder="Enter Original URL"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            readOnly={isShortened}
            className="w-full text-deep-teal rounded-xl px-3 py-2 mt-2 mb-2 outline-none"
          />
          <label
            htmlFor="customAlias"
            className="flex items-center gap-2 text-xl font-normal"
          >
            {isShortened ? (
              <PiMagicWandLight className="text-2xl" />
            ) : (
              <PiMagicWandFill className="text-2xl" />
            )}
            {isShortened ? "CutFitt URL" : "Customize your link"}
          </label>
          <div
            className={`w-full ${
              isShortened ? "" : "flex flex-col md:flex-row gap-2"
            }`}
          >
            {!isShortened && (
              <select
                name="domain"
                className="w-full md:w-3/5 rounded-xl px-3 py-2 mt-2 mb-2 outline-none text-gray-800 bg-white"
                title="domain"
              >
                <option value="tiny.one">tiny.one</option>
              </select>
            )}
            <span className="relative w-full">
              <input
                type="text"
                id="customAlias"
                placeholder={
                  isShortened ? "Shortened URL" : "Enter Custom Name"
                }
                value={isShortened ? shortUrl : customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
                className={`w-full text-deep-teal rounded-xl px-3 py-2 mt-2 mb-2 outline-none ${
                  error ? "input-error" : ""
                }`}
                readOnly={isShortened} //disable input when URL is shortened
              />
              {error && (
                <p className="text-red-600 absolute text-xs bottom">{error}</p>
              )}
            </span>
          </div>

          {isShortened && (
            <div className="flex gap-2 mt-4">
              <button
                type="button"
                onClick={handleVisit}
                className="flex items-center gap-2 bg-transparent text-soft-orange border-soft-orange border font-semibold py-2 px-4 rounded-xl"
              >
                <FaShare className="" />
                <p className="hidden md:block">Visit site</p>
              </button>
              <button
                type="button"
                onClick={() => setShowQrCode(!showQrCode)}
                className="bg-soft-orange text-purple-900 font-semibold py-2 px-4 rounded-xl inline-flex items-center gap-2"
              >
                <PiQrCodeFill />
                <p className="hidden md:block">QR</p>
              </button>

              {/* <Dropdown
                icons={<TfiSharethis />}
                label="Share"
                socials={socialItems.map((item) => ({
                  ...item,
                  url: item.url + encodeURIComponent(shortUrl),
                }))}
              /> */}

              <button
                type="button"
                onClick={handleCopy}
                className="bg-deep-teal text-purple-900 font-semibold py-2 px-4 rounded-xl inline-flex items-center gap-2"
              >
                <IoIosCopy />
                <p className="hidden md:block">Copy</p>
              </button>
              {copySuccess && (
                <div className="w-44 bg-deep-teal border-1-8 border-purple-600 space-y-1 fixed top-7 right-2 z-50">
                  <button
                    onClick={() => setCopySuccess("")}
                    className="absolute right-2 top-4 text-purple-950"
                  >
                    <FaTimes />
                    {/* <p className="text-xs">{copySuccess}</p> */}
                  </button>

                  <p className="flex items-center gap-1 text-xs">
                    <IoMdCheckmarkCircle />
                    success
                  </p>
                  <p className="text-xs">{copySuccess}</p>
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full text-xl font-bold rounded-xl px-3 py-2 mt-6 text-center bg-purple-700 text-gray-200 transition-all duration-300 ease-in-out hover:bg-opacity-90 hover:shadow-md active:bg-opacity-100 active:scaled-95"
          >
            {isShortened ? "Shorten Another" : "Shorten URL"}
          </button>
        </form>

        {isShortened &&
          shortUrl &&
          showQrCode && ( //Display the QR Code when the URL is shortened and the QR Code is visible
            <div className="mt-4 flex flex-col items-center">
              <div ref={qrCodeRef}>
                <QRCode value={shortUrl} size={120} />
              </div>
              <p className="mt-2 text-xs text-gray-700">
                Scan this QR code to visit the shortened URL site
              </p>
              <div className="flex flex-col items-center gap-2 mt-2">
                <div className="flex items-center gap-2">
                  <select
                    value={downloadFormat}
                    onChange={(e) => setDownloadFormat(e.target.value)}
                    className="w-full md:w-auto rounded-xl px-3 py-2 outline-none text-gray-800 bg-white"
                    title="Download Format"
                  >
                    <option value="svg">SVG</option>
                    <option value="png">PNG</option>
                    <option value="jpeg">JPEG</option>
                    <option value="canvas">Canvas</option>
                  </select>
                  <button
                    onClick={handleDownloadQRCode}
                    className="bg-purple-950 text-white font-semibold py-2 px-4 rounded"
                  >
                    <FaDownload />
                    Download QR Code
                  </button>
                </div>
                <button
                  onClick={handleShareQRCodeAsSVG}
                  className="bg-purple-950 text-white font-semibold py-2 px-4 rounded"
                >
                  Share QR Code
                </button>
              </div>
            </div>
          )}
      </div>
    </>
  );
};

export default UrlShortener;
