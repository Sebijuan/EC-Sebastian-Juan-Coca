import React, { useState } from 'react';
import './NotificationSystem.css';

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