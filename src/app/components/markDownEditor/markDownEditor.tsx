"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "react-markdown-editor-lite/lib/index.css";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange }) => {
  const handleEditorChange = ({ text }: any) => {
    onChange(text);
  };

  return (
    <div className="w-full">
      <MdEditor
        value={value}
        style={{ height: "500px" }}
        renderHTML={(text) => (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
        )}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default MarkdownEditor;
