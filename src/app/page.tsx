// "use client";

// import React, { useState } from "react";
// import Hero from "./components/hero/page";
// import Feature from "./components/features/page";
// import Footer from "./components/footer/page";
// import Loader from "./components/loader/page";
// import FAQ from "./pages/faq/page";

// export default function Home() {
//   const [isLoading, setIsLoading] = useState(false);
//   return (
//     //main section of the page
//     <main className="overflow-hidden flex min-h-screen flex-col bg-purple-50">
//  
//       {/* hero component */}
//       <Hero />

//       {/* features component */}
//       <Feature />

//       {/* faq component */}
//       <FAQ />

//       {/* footer component */}
//       <Footer />
//     </main>
//   );
// }

"use client";

import React, { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import Hero from "./components/hero/page";
import Feature from "./components/features/page";
import Footer from "./components/footer/page";
import Loader from "./components/loader/page";
import FAQ from "./pages/faq/page";

const MyApp: React.FC<AppProps> = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
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
 
)
};

export default MyApp;
