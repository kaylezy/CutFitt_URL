import Hero from "./components/hero/page";
import Feature from "./components/features/page";
import Footer from "./components/footer/page";
import Link from "./components/link";

import FAQ from "./pages/faq";

export default function Home() {
  return (
    //main sectio of the page
    <main className="overflow-hidden flex min-h-screen flex-col bg-purple-50">
      <Link />

      <h1>I'm about to deploy a project with vercel</h1>

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
