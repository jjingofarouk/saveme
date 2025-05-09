
import React, { useState, useContext, useEffect } from 'react';
import { NotificationContext } from '../../context/NotificationContext';
import { db } from '../../services/firebaseConfig';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import Button from './Button';
import '../../App.css';

const NotificationPanel = ({ userId }) => {
  const { notification, setNotification } = useContext(NotificationContext);
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'notifications'), where('userId', '==', userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNotifications(notifs);
    });
    return () => unsubscribe();
  }, [userId]);

  useEffect(() => {
    if (notification) {
      setNotifications((prev) => [...prev, { ...notification, id: Date.now().toString(), read: false }]);
      setNotification(null); // Clear context notification
    }
  }, [notification, setNotification]);

  const markAsRead = async (id) => {
    try {
      const notifRef = doc(db, 'notifications', id);
      await updateDoc(notifRef, { read: true });
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  return (
    <div className="notification-panel">
      <Button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle notifications">
        🔔 {notifications.filter((n) => !n.read).length > 0 && (
          <span className="badge">{notifications.filter((n) => !n.read).length}</span>
        )}
      </Button>
      {isOpen && (
        <div className="notification-list" role="dialog" aria-label="Notifications">
          <h3>Notifications</h3>
          {notifications.length === 0 ? (
            <p>No notifications</p>
          ) : (
            <ul>
              {notifications.map((notif) => (
                <li key={notif.id} className={notif.read ? 'read' : 'unread'}>
                  <p>{notif.title}</p>
                  <p>{notif.body}</p>
                  {!notif.read && (
                    <Button onClick={() => markAsRead(notif.id)}>Mark as Read</Button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;