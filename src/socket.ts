import { io } from 'socket.io-client';

const socket = io(
	process.env.NODE_ENV === 'development'
		? 'http://localhost:8080'
		: 'https://ec2-3-83-205-41.compute-1.amazonaws.com:8080',
	{ autoConnect: false }
);

export default socket;
