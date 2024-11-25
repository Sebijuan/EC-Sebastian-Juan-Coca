import React from 'react';
import './NotificationSystem.css';

const NotificationSystem = ({ notifications, onRemove }) => {
  return (
    <div className="notification-system">
      {notifications.map((notification, index) => (
        <div
          key={index}
          className={`notification ${notification.type}`}
          onClick={() => onRemove(index)}
        >
          {notification.message}
        </div>
      ))}
    </div>
  );
};

export default NotificationSystem;
