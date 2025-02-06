// App.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import ChatContainer from "./components/ChatContainer";
import InputSection from "./components/InputSection";
import Header from "./components/Header";

function App() {
  const [inputText, setInputText] = useState("");
  const [file, setFile] = useState(null);
  const [flavor, setFlavor] = useState("casual");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" });

  // Handle text input change
  const handleInputChange = (e) => {
    setInputText(e.target.value);
    clearNotification();
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "text/plain") {
      setFile(selectedFile);
      clearNotification();
    } else {
      setFile(null);
      setNotification({
        message: "Only .txt files are allowed.",
        type: "error",
      });
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!inputText && !file) {
      setNotification({
        message: "Please enter text or upload a valid .txt file.",
        type: "error",
      });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      if (inputText) formData.append("inputText", inputText);
      if (file) formData.append("inputFile", file);
      formData.append("flavor", flavor);

      const response = await axios.post(
        "http://localhost:8080/api/test/generate",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMessages([
        ...messages,
        {
          type: "user",
          content: inputText || `Uploaded file: ${file?.name}`,
          timestamp: new Date().toLocaleTimeString(),
        },
        {
          type: "ai",
          content: response.data,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);

      setInputText("");
      setFile(null);
    } catch (error) {
      console.error(error);
      setNotification({
        message: error.response?.data || "Failed to process your request.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Clear chat history
  const clearChat = () => {
    setMessages([]);
    setNotification({ message: "Chat cleared successfully!", type: "success" });
  };

  // Copy AI response to clipboard
  const copyToClipboard = (content) => {
    navigator.clipboard.writeText(content);
    setNotification({
      message: "Response copied to clipboard!",
      type: "success",
    });
  };

  // Clear notification after 3 seconds
  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const clearNotification = () => {
    setNotification({ message: "", type: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col">
      <style>
        {`
          /* Custom Scrollbar Design */
          .custom-scrollbar::-webkit-scrollbar {
            width: 12px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #1f2937; /* Dark gray track */
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #4b5563; /* Light gray thumb */
            border-radius: 10px;
            border: 2px solid #1f2937; /* Border to match track */
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #6b7280; /* Slightly lighter on hover */
          }
        `}
      </style>
      <Header />
      <main className="flex-1 flex flex-col md:flex-row">
        <ChatContainer
          messages={messages}
          notification={notification}
          copyToClipboard={copyToClipboard}
        />
        <InputSection
          inputText={inputText}
          handleInputChange={handleInputChange}
          handleFileUpload={handleFileUpload}
          flavor={flavor}
          setFlavor={setFlavor}
          handleSubmit={handleSubmit}
          loading={loading}
          clearChat={clearChat}
        />
      </main>
    </div>
  );
}

export default App;
