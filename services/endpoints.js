import axios from "axios";
import { decode as atob } from "base-64";
import moment from "moment";
import { base, mainUrl } from "./apiUrl";
function isValidJWT(token) {
	return typeof token === "string" && token.split(".").length === 3;
}
export function getTimeBasedGreeting() {
	const currentHour = new Date().getHours();

	if (currentHour >= 5 && currentHour < 12) {
		return "Good morning";
	} else if (currentHour >= 12 && currentHour < 17) {
		return "Good afternoon";
	} else if (currentHour >= 17 && currentHour < 21) {
		return "Good evening";
	} else {
		return "Good night";
	}
}
export const shouldShowGetStarted = (user, sselectedTab) => {
	const now = new Date();
	const expiry = new Date(user.expiresAt);
	if (expiry <= now) {
		return true;
	}
	if (!user?.activePlan || user?.activePlan === "free") {
		return true; // always show for free users
	}

	if (user?.activePlan === "pro" && sselectedTab === "Monthly") {
		return false; // already has monthly
	}

	if (user?.activePlan === "premium" && sselectedTab === "Yearly") {
		return false; // has yearly, hide both
	}

	return true;
};
export function decodeUserId(accessToken) {
	try {
		if (!isValidJWT(accessToken)) {
			return null;
		}
		const accessTokenParts = accessToken.split(".");
		const payload = accessTokenParts[1]; // Extract only the payload

		const decodedPayload = atob(payload);
		const parsedPayload = JSON.parse(decodedPayload);
		return parsedPayload?.id ? parsedPayload?.id : null;
	} catch (error) {
		console.error("Failed to decode Base64:", error.message);
		return null;
	}
}
export function formatTimestampWithMoment(timestamp) {
	const now = moment();
	const date = moment(timestamp);
	if (now.diff(date, "hours") < 24) {
		return date.format("hh:mm A");
	}
	return date.format("DD-MM-YYYY");
}
export const isValidEmailFun = (email) => {
	const result = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
	return result;
};
export const isValidPasswordFun = (password) => {
	const result = password?.length >= 7 ? true : false;
	return result;
};
export const isValidUsernameFun = (password) => {
	const result = password?.length >= 3 ? true : false;
	return result;
};
export function parseDatabaseErrorMessage(errorMessage) {
	if (errorMessage.includes("E11000 duplicate key error collection")) {
		const match = errorMessage.match(/\{ (.+?) \}/);
		if (match && match[1]) {
			const fieldValue = match[1].split(": ");
			const field = fieldValue[0];
			return `The ${field} is already taken. Please use a different ${field}.`;
		}
	}
	return errorMessage;
}
export const loginApi = async (email, password) => {
	try {
		const result = await base.post(
			"auth/login",
			{ email, userpassword: password },
			{ isPublic: true }
		);
		return result?.data;
	} catch (error) {
		throw error?.response?.data?.message
			? error?.response?.data?.message
			: error?.message;
	}
};
export const registerApi = async (
	username,
	email,
	password,
	isUserOrganizer
) => {
	try {
		const result = await base.post(
			"auth/signup",
			{
				username,
				email,
				password,
				role: isUserOrganizer === "Yes" ? "organizer" : "user",
			},
			{ isPublic: true }
		);
		return result?.data;
	} catch (error) {
		throw error?.response?.data?.message
			? error?.response?.data?.message
			: error?.message;
	}
};
export const forgotPasswordApi = async (email) => {
	try {
		const result = await base.post(
			"auth/forgot-password",
			{ email },
			{ isPublic: true }
		);
		return result?.data;
	} catch (error) {
		throw error?.response?.data?.message
			? error?.response?.data?.message
			: error?.message;
	}
};
export const verifyOtpApi = async (email, enteredOtp, dbOtp) => {
	try {
		const result = await base.post(
			"auth/verify-otp",
			{ email, enteredOtp, dbOtp },
			{ isPublic: true }
		);
		return result?.data;
	} catch (error) {
		throw error?.response?.data?.message
			? error?.response?.data?.message
			: error?.message;
	}
};
export const resetPasswordApi = async (password, resetToken) => {
	try {
		const result = await axios.post(
			`${mainUrl}auth/reset-password`,
			{ newPassword: password },
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${resetToken}`,
				},
			}
		);
		return result?.data;
	} catch (error) {
		throw error?.response?.data?.message
			? error?.response?.data?.message
			: error?.message;
	}
};
export const changePasswordApi = async (password) => {
	try {
		const result = await base.post(
			`auth/reset-password`,
			{ newPassword: password },
			{
				isPublic: false,
			}
		);
		return result?.data;
	} catch (error) {
		throw error?.response?.data?.message
			? error?.response?.data?.message
			: error?.message;
	}
};
export const getUserProfileApi = async () => {
	try {
		const result = await base.get("auth/userProfile", { isPublic: false });
		return result?.data;
	} catch (error) {
		throw error?.response?.data?.message
			? error?.response?.data?.message
			: error?.message;
	}
};
export const addFavoriteEventApi = async (eventId) => {
	try {
		const result = await base.put(
			"auth/favorite-event",
			{ eventId, type: "add" },
			{ isPublic: false }
		);
		return result?.data;
	} catch (error) {
		throw error?.response?.data?.message
			? error?.response?.data?.message
			: error?.message;
	}
};
export const removeFavoriteEventApi = async (eventId) => {
	try {
		const result = await base.put(
			"auth/favorite-event",
			{ eventId, type: "remove" },
			{ isPublic: false }
		);
		return result?.data;
	} catch (error) {
		throw error?.response?.data?.message
			? error?.response?.data?.message
			: error?.message;
	}
};
export const getUserFavoriteApi = async () => {
	try {
		const result = await base.get("auth/user-favorite-events", {
			isPublic: false,
		});
		return result?.data;
	} catch (error) {
		throw error?.response?.data?.message
			? error?.response?.data?.message
			: error?.message;
	}
};
export const createPaymentIntentApi = async (planName) => {
	try {
		const result = await base.post(
			`payment/create-payment-intent`,
			{
				planName: planName,
			},
			{
				isPublic: false,
			}
		);
		return result?.data;
	} catch (error) {
		throw error?.response?.data?.message
			? error?.response?.data?.message
			: error?.message;
	}
};
export const createNewEventApi = async (
	title,
	category,
	status,
	location,
	date,
	startTime,
	endTime,
	description,
	ticketTiers
) => {
	try {
		const result = await base.post(
			`event/create`,
			{
				title,
				category,
				status,
				location,
				date,
				startTime,
				endTime,
				description,
				ticketTiers,
			},
			{
				isPublic: false,
			}
		);
		return result?.data;
	} catch (error) {
		throw error?.response?.data?.message
			? error?.response?.data?.message
			: error?.message;
	}
};
export const isValidPhoneNumber = (phone) => {
	const phoneRegex = /^\+?[0-9]+$/;
	return phoneRegex.test(phone);
};
export const postPaymentSuccessApi = async (paymentIntentId) => {
	try {
		const result = await base.post(
			`payment/payment-success`,
			{
				paymentIntentId: paymentIntentId,
			},
			{
				isPublic: false,
			}
		);
		return result?.data;
	} catch (error) {
		throw error?.response?.data?.message
			? error?.response?.data?.message
			: error?.message;
	}
};
const isJpgOrPng = (uri) => {
	const fileExtension = uri.split(".").pop().toLowerCase();

	return fileExtension;
};
export const uploadImageApi = async (imageUri, imgType) => {
	try {
		const formData = new FormData();
		const imageType = isJpgOrPng(imageUri);

		formData.append("image", {
			uri: imageUri,
			type: `image/${imageType}`,
			name: `${imgType}-${Date.now()}.${imageType}`,
		});

		const response = await base.post("file/upload", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
			isPublic: true,
		});

		return response?.data;
	} catch (error) {
		throw error?.response?.data?.message
			? error?.response?.data?.message
			: error?.message || "An error occurred while uploading image";
	}
};

export const updateProfileApi = async (
	username,
	profileImage,
	email,
	phone
) => {
	try {
		const result = await base.put(
			`auth/edit-profile`,
			{
				username,
				profileImage,
				email,
				phone,
			},
			{
				isPublic: false,
			}
		);
		return result?.data;
	} catch (error) {
		throw error?.response?.data?.message
			? error?.response?.data?.message
			: error?.message;
	}
};
export const deleteAccountApi = async () => {
	try {
		const result = await base.delete(`auth/deleteUserAccount`, {
			isPublic: false,
		});
		return result?.data;
	} catch (error) {
		throw error?.response?.data?.message
			? error?.response?.data?.message
			: error?.message;
	}
};
