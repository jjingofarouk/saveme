
import { messaging } from './firebaseConfig';
import { getToken } from 'firebase/messaging';

export const requestNotificationPermission = async () => {
  if (!messaging) return;
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
      });
      return token;
    }
  } catch (err) {
    console.error('Notification permission error:', err);
  }
};