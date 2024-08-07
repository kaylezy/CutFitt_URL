import Hero from "./components/hero/page";
import Feature from "./components/features/page";
import Footer from "./components/footer/page";

import FAQ from "./pages/faq/page";

export default function Home() {
  return (
    //main section of the page
    <main className="overflow-hidden flex min-h-screen flex-col bg-purple-50">
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
