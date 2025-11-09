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

export const userProfileUpdated = (callback) => {
	if (socket) {
		socket.on("userProfileUpdated", (message) => {
			callback(message);
			console.log("user profile updated", message);
		});
	}
};
export const userFavoriteEventsUpdated = (callback) => {
	if (socket) {
		socket.on("userFavoriteEventsUpdated", (message) => {
			callback(message);
			console.log("user favorite events updated", message);
		});
	}
};
export const organizerInvitesUpdated = (callback) => {
	if (socket) {
		socket.on("organizerInvitesUpdated", (message) => {
			callback(message);
			console.log("organizer invites updated", message);
		});
	}
};
export const organizerEventsUpdated = (callback) => {
	if (socket) {
		socket.on("organizerEventsUpdated", (message) => {
			callback(message);
			console.log("organizer event updated", message);
		});
	}
};
export const homeEventsUpdated = (callback) => {
	if (socket) {
		socket.on("eventsUpdated", (message) => {
			callback(message);
			console.log("home event updated", message);
		});
	}
};
export const userTicketsUpdated = (callback) => {
	if (socket) {
		socket.on("userTicketsUpdated", (message) => {
			callback(message);
			console.log("user ticckets updated", message);
		});
	}
};
export const notificationUpdated = (callback) => {
	if (socket) {
		socket.on("notificationUpdated", (message) => {
			callback(message);
			console.log("notifications updated", message);
		});
	}
};
export const disconnectSocket = () => {
	if (socket) {
		socket.disconnect();
		activeRooms = [];
	}
};
