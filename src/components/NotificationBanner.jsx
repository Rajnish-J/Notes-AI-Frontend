/* eslint-disable react/prop-types */
// NotificationBanner.jsx
export default function NotificationBanner({ notification }) {
    if (!notification.message) return null;
  
    return (
      <div
        className={`p-3 text-center text-sm rounded-lg ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}
      >
        {notification.message}
      </div>
    );
  }