/* eslint-disable react/prop-types */
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { useState } from "react";

export const CodeBlock = ({ children, className }) => {
    const [buttonText, setButtonText] = useState("Copy");
  const language = className?.replace("language-", "") || "text";
  const highlightedCode = hljs.highlight(String(children).replace(/\n$/, ""), {
    language,
  }).value;

  

  // Function to copy code block content to clipboard
  const copyCodeToClipboard = () => {
    setButtonText("Copied!");
    setTimeout(() => setButtonText("Copy"), 2000); 
    navigator.clipboard.writeText(String(children).replace(/\n$/, ""));
  };

  return (
    <div className="relative bg-gray-900 rounded-lg p-4 my-4">
      {/* Language Label */}
      <div className="absolute top-2 left-2 text-xs text-blue-400">
        {language}
      </div>
      {/* Copy Button */}
      <button
        onClick={copyCodeToClipboard}
        className="absolute top-2 right-2 py-1 px-2 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
      >
        {buttonText}
      </button>

      {/* Highlighted Code */}
      <pre className="overflow-x-auto mt-2.5 p-3">
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
    </div>
  );
};
