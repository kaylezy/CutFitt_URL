"use client";

import { useState } from "react";
import MarkdownEditor from "../../components/markDownEditor/markDownEditor";

const ContentPage = () => {
  const [markdownContent, setMarkdownContent] = useState("");

  const handleSave = () => {
    // Save the markdown content to the database (Firestore, etc.)
    console.log("Markdown Content:", markdownContent);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create content here</h1>

      <MarkdownEditor value={markdownContent} onChange={setMarkdownContent} />

      <button
        onClick={handleSave}
        className="mt-6 rounded-full bg-purple-700 text-white hover:bg-purple-600 active:scale-90 font-medium py-2 px-8 transition duration-300"
      >
        Save Content
      </button>
    </div>
  );
};

export default ContentPage;
