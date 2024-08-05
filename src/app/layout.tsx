import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import Navbar from "./components/navbar/page";
// import { ErrorBoundary } from "next/dist/client/components/error-boundary";
// import NotFoundPage from "./not-found";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CutFitt URL Shortener",
  description: "Shorten your URLs to make them easier to share",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <ErrorBoundary fallback={<NotFoundPage />}> */}
      <body className={inter.className}>
        {/* <Navbar /> */}
        {children}
      </body>
      {/* </ErrorBoundary> */}
    </html>
  );
}
