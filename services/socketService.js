// socketService.js
import io from "socket.io-client";
import { mainUrl } from "./apiUrl";

const SOCKET_URL = `${mainUrl}`;
let socket;
let reconnectAttempts = 0;
let activeRooms = [];
export const initiateSocket = () => {
	if (!socket) {
		socket = io(SOCKET_URL, {
			transports: ["websocket"],
			jsonp: false,
			reconnection: true, // Enable reconnection
			reconnectionAttempts: 5, // Attempt 5 times before failing
			reconnectionDelay: 1000, // Delay 1s before attempting to reconnect
		});

		socket.on("connect", () => {
			console.log("Connected to socket server");
			reconnectRooms();
		});
		socket.on("connect_error", (err) => {
			reconnectAttempts++;
			setTimeout(() => socket.connect(), 1200 * reconnectAttempts);
		});
	}
};

export const getSocket = () => socket;

export const joinRoom = (roomId) => {
	if (socket) {
		socket.emit("joinRoom", roomId);
		console.log("join room", roomId);
		if (!activeRooms.includes(roomId)) {
			activeRooms.push(roomId);
		}
	}
};
export const leaveRoom = (roomId) => {
	if (socket) {
		socket.emit("leaveRoom", roomId);
		console.log("left room:", roomId);
		activeRooms = activeRooms.filter((r) => r !== roomId);
	}
};
export const sendMessage = (message) => {
	if (socket) {
		socket.emit("sendMessage", message);
		console.log("message send", message);
	}
};
const reconnectRooms = () => {
	if (socket && socket.connected && activeRooms.length > 0) {
		console.log("Reconnecting to rooms:", activeRooms);
		activeRooms.forEach((roomId) => {
			socket.emit("joinRoom", roomId);
		});
	}
};
export const receiveMessage = (callback) => {
	if (socket) {
		socket.on("newMessage", (message) => {
			console.log("message recived", message);
			callback(message);
		});
	}
};
export const userProfileUpdated = (callback) => {
	if (socket) {
		socket.on("userProfileUpdated", (message) => {
			callback(message);
			console.log("user profile updated", message);
		});
	}
};
export const userPaymentUpdated = (callback) => {
	if (socket) {
		socket.on("userPaymentUpdated", (message) => {
			callback(message);
			console.log("user payment updated", message);
		});
	}
};

export const disconnectSocket = () => {
	if (socket) {
		socket.disconnect();
		activeRooms = [];
	}
};
