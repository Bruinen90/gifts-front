import { io } from 'socket.io-client';

const socket = io(
	process.env.NODE_ENV === 'development'
		? 'http://ncmatt.dedyn.io:8880/'
		: 'http://ncmatt.dedyn.io:8880/',
	{ autoConnect: false }
);

export default socket;
