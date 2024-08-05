"use client";

import Hero from "./components/hero/page";
import Feature from "./components/features/page";
import Footer from "./components/footer/page";
import Link from "./components/link";

import FAQ from "./pages/faq";

export default function Home() {
  return (
    //main section of the page
    <main className="overflow-hidden flex min-h-screen flex-col bg-purple-50">
      <Link />
      <h1>Why is my project not rendering in vercel</h1>
      {/* hero component */}
      <Hero />

      {/* features component */}
      <Feature />

      {/* faq component */}
      <FAQ />

      {/* footer component */}
      <Footer />
    </main>
  );
}
