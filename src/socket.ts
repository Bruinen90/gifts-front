import { io } from 'socket.io-client';

const socket = io(
	process.env.NODE_ENV === 'development'
		? 'http://localhost:8080'
		: 'https://bez-niespodzianek-api.onrender.com',
	{ autoConnect: false }
);

export default socket;
