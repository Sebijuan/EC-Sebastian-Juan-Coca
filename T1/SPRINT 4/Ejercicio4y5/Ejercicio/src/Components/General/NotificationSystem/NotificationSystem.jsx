import React, { useState } from 'react';
import './NotificationSystem.css';

/**
 * NotificationSystem:
 * Manages the display of notifications or messages to the user.
 * Used to show success, error, or informational messages.
 * Displays pop-up notifications to the user about the success or failure of actions performed.
 * Can be used to inform about scheduling conflicts, unmet requirements, etc.
 */
const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type) => {
    const id = new Date().getTime();
    setNotifications([...notifications, { id, message, type }]);
    setTimeout(() => {
      setNotifications(notifications.filter(notification => notification.id !== id));
    }, 3000);
  };

  return (
    <div className="notification-system">
      {notifications.map(notification => (
        <div key={notification.id} className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      ))}
    </div>
  );
};

export default NotificationSystem;