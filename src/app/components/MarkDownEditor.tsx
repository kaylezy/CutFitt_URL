// "use client";

// import React, { useState } from "react";
// import dynamic from "next/dynamic";
// import "react-mde/lib/styles/css/react-mde-all.css";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import Showdown from "showdown";

// const ReactMde = dynamic(() => import("react-mde"), { ssr: false });

// const MarkdownEditor = () => {
//   const [value, setValue] = useState<string>("");
//   const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

//   const converter = new Showdown.Converter();

//   return (
//     <div className="container mx-auto p-4">
//       <ReactMde
//         value={value}
//         onChange={setValue}
//         selectedTab={selectedTab}
//         onTabChange={setSelectedTab}
//         generateMarkdownPreview={(markdown) =>
//           Promise.resolve(converter.makeHtml(markdown))
//         }
//         childProps={{
//           writeButton: {
//             tabIndex: -1,
//           },
//         }}
//       />
//       {selectedTab === "preview" && (
//         <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
//       )}
//     </div>
//   );
// };

// export default MarkdownEditor;
