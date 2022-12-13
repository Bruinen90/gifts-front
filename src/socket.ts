import { io } from 'socket.io-client';

const socket = io(
	process.env.NODE_ENV === 'development'
		? 'https://bez-niespodzianek-api.onrender.com'
		: 'https://bez-niespodzianek-api.onrender.com',
	{ autoConnect: false }
);

export default socket;
