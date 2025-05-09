import { useState, useEffect } from 'react';
import { initSocket, subscribe } from '../services/socketService';

const useWebSocket = (channel) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    initSocket();

    const handleMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    subscribe(channel, handleMessage);

    return () => {
      // Cleanup handled in socketService
    };
  }, [channel]);

  return { messages };
};

export default useWebSocket;