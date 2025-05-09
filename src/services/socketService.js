import io from 'socket.io-client';

let socket;

export const initSocket = () => {
  if (!socket) {
    socket = io(process.env.REACT_APP_API_URL || 'http://localhost:8000', {
      auth: { token: localStorage.getItem('token') },
    });

    socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });
  }
};

export const subscribe = (channel, callback) => {
  if (socket) {
    socket.on(channel, callback);
  }
};

export const unsubscribe = (channel) => {
  if (socket) {
    socket.off(channel);
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};