import localStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: {},
	resetPasswordToken: null,
	tokens: {
		accessToken: "",
		refreshToken: "",
	},
	billPayments: [],
	homeEvents: [],
	favEvents: [],
	topEvents: [],
	trendingEvents: [],
	ticketHistory: [],
	organizerStats: {
		totalEvents: 0,
		totalRevenue: 0,
		totalTicketsSold: 0,
		totalViews: 0,
	},
	organizerEvents: [],
	userNotifications: [],
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action) => {
			if (action.payload.user === null) {
				state.user = {};
			} else {
				state.user = action.payload.user;
			}
		},
		resetUser: (state, action) => {
			state.user = {};
		},

		setResetPasswordToken: (state, action) => {
			state.resetPasswordToken = action.payload.resetPasswordToken;
		},

		setBillPayments: (state, action) => {
			state.billPayments = action.payload.billPayments;
		},
		setFavEvents: (state, action) => {
			state.favEvents = action.payload.favEvents;
		},
		setHomeEvents: (state, action) => {
			state.homeEvents = action.payload.home;
			state.topEvents = action.payload.top;
			state.trendingEvents = action.payload.trends;
		},
		setOrganizerEvents: (state, action) => {
			state.organizerEvents = action.payload.organizerEvents;
		},
		setTicketHistory: (state, action) => {
			state.ticketHistory = action.payload.ticketHistory;
		},
		setOrganizerStats: (state, action) => {
			state.organizerStats = action.payload.organizerStats;
		},
		setUserNotifications: (state, action) => {
			state.userNotifications = action.payload.userNotifications;
		},
		setTokens: (state, action) => {
			state.tokens = action.payload.tokens;
			saveUserTokenToStorage(
				action.payload.tokens?.accessToken,
				action.payload.tokens?.refreshToken
			);
		},
	},
});

export const saveUserTokenToStorage = async (accessToken, refreshToken) => {
	if (accessToken) {
		await localStorage.setItem("event-grid8372-accessToken", accessToken);
	}
	if (refreshToken) {
		await localStorage.setItem("event-grid8372-refreshToken", refreshToken);
	}
};
export const removeUserTokenfromStorage = async () => {
	await localStorage.removeItem("event-grid8372-accessToken");
	await localStorage.removeItem("event-grid8372-refreshToken");
};
export const getUserTokenfromStorage = async () => {
	const fetchedAccessToken = await localStorage.getItem(
		"event-grid8372-accessToken"
	);
	const fetchedRefreshToken = await localStorage.getItem(
		"event-grid8372-refreshToken"
	);
	return { accessToken: fetchedAccessToken, refreshToken: fetchedRefreshToken };
};

export const {
	setTokens,
	setUser,
	resetUser,
	setSelectedLang,
	setResetPasswordToken,
	setBillPayments,
	setFavEvents,
	setHomeEvents,
	setOrganizerEvents,
	setOrganizerStats,
	setTicketHistory,
	setUserNotifications,
} = userSlice.actions;

export default userSlice.reducer;
