import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';  // Ensure this matches your backend server address

const socket = io(SOCKET_URL, {
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log('Connected to WebSocket server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from WebSocket server');
});

export default socket;
