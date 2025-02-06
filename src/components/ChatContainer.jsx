/* eslint-disable react/prop-types */
// ChatContainer.jsx
// ChatContainer.jsx
import { useRef, useEffect } from 'react';
import Message from './Message';
import NotificationBanner from './NotificationBanner';

export default function ChatContainer({ messages, notification, copyToClipboard }) {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex-1 p-4 overflow-hidden">
      {/* Notification Banner */}
      <NotificationBanner notification={notification} />

      {/* Chat Messages (Scrollable) */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto space-y-4 mt-4 custom-scrollbar"
        style={{ maxHeight: 'calc(100vh - 200px)' }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <Message msg={msg} copyToClipboard={copyToClipboard} />
          </div>
        ))}
      </div>
    </div>
  );
}