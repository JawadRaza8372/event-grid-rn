import localStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: {},
	resetPasswordToken: null,
	billPayments: [],
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
	},
});

export const saveUserTokenToStorage = async (accessToken, refreshToken) => {
	if (!accessToken || !refreshToken) return;
	await localStorage.setItem("event-grid8372-accessToken", accessToken);
	await localStorage.setItem("event-grid8372-refreshToken", refreshToken);
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
	setUser,
	resetUser,
	setSelectedLang,
	setResetPasswordToken,
	setBillPayments,
} = userSlice.actions;

export default userSlice.reducer;
