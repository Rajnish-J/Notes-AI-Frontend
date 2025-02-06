/* eslint-disable react/prop-types */
// Message.jsx
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "./CodeBlock";
import { IoCopyOutline } from "react-icons/io5";

export default function Message({ msg, copyToClipboard, loading }) {
  if (loading) {
    return (
      <div className="max-w-[70%] p-4 rounded-lg bg-gray-700 text-gray-300">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-bold">AI</span>
          <span className="text-xs text-gray-400">Processing...</span>
        </div>
        {/* Loading Animation */}
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Processing your data...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`max-w-[70%] p-4 rounded-lg font-family-custom ${
        msg.type === "user"
          ? "bg-blue-600 text-white"
          : "bg-gray-700 text-gray-300"
      }`}
    >
      <div className="flex items-center space-x-2 mb-1">
        <span className="font-bold">{msg.type === "user" ? "You" : "AI"}</span>
        <span className="text-xs text-gray-400">{msg.timestamp}</span>
      </div>
      {/* Render Markdown Content */}
      <div className="text-sm leading-relaxed" style={{ lineHeight: 1.6 }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              if (inline) {
                // Inline code
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
              // Block code
              return <CodeBlock className={className}>{children}</CodeBlock>;
            },
          }}
        >
          {msg.content}
        </ReactMarkdown>
      </div>
      {msg.type === "ai" && (
        <button
          onClick={() => copyToClipboard(msg.content)}
          className="mt-2 text-xs text-blue-400 hover:underline"
        >
          <IoCopyOutline />
        </button>
      )}
    </div>
  );
}