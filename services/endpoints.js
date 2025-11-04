import axios from "axios";
import { decode as atob } from "base-64";
import moment from "moment";
import { base, mainUrl } from "./apiUrl";
function isValidJWT(token) {
	return typeof token === "string" && token.split(".").length === 3;
}
export const combineDateAndTime = (date, time) => {
	if (!date || !time) return null;

	const combined = new Date(date);
	combined.setHours(time.getHours());
	combined.setMinutes(time.getMinutes());
	combined.setSeconds(time.getSeconds());
	combined.setMilliseconds(0);

	return combined;
};
export const formatTo12Hour = (timeValue) => {
	try {
		const date = new Date(timeValue);
		if (isNaN(date.getTime())) return "";

		let hours = date.getHours();
		const minutes = date.getMinutes();
		const ampm = hours >= 12 ? "PM" : "AM";

		hours = hours % 12 || 12; // Convert 0 => 12
		const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

		return `${hours}:${formattedMinutes} ${ampm}`;
	} catch (error) {
		console.error("Error formatting time:", error);
		return "";
	}
};
export const getTicketSummary = (formData) => {
	const tiers = formData?.ticketTiers || [];

	if (tiers.length === 0) {
		return {
			totalCapacity: 0,
			priceRange: "N/A",
			type: 0,
		};
	}

	// Convert to numbers safely
	const capacities = tiers?.map((t) => Number(t.capacity) || 0);
	const prices = tiers?.map((t) => Number(t.price) || 0);

	const totalCapacity = capacities.reduce((sum, c) => sum + c, 0);
	const minPrice = Math.min(...prices);
	const maxPrice = Math.max(...prices);

	const priceRange =
		minPrice === maxPrice ? `${minPrice}` : `${minPrice} - ${maxPrice}`;

	return { totalCapacity, priceRange, type: tiers?.length ?? 0 };
};

export const validateEventData = (formData) => {
	const { fromTime, toTime } = formData;

	// Ensure values exist
	if (!fromTime || !toTime) {
		return { valid: false, message: "Please select start and end time." };
	}

	// Convert to full DateTime (handles cases where pickers are separate)
	const start = new Date(fromTime);
	const end = new Date(toTime);

	// Check if start date is in the past
	const now = new Date();
	if (start < now) {
		return { valid: false, message: "Event start time cannot be in the past." };
	}

	// Ensure end is after start
	if (end <= start) {
		return { valid: false, message: "End time must be after start time." };
	}

	return { valid: true };
};

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
export const getNotificationDescription = (title) => {
	let description = "";

	switch (title) {
		case "Event Created":
			description =
				"Your event has been successfully created and saved as a draft. You can edit or publish it anytime.";
			break;
		case "Event Updated":
			description = "Your event has been successfully updated.";
			break;
		case "Event Published":
			description =
				"Your event is now live and visible to attendees. People can start booking tickets.";
			break;

		case "Event Deleted":
			description =
				"Your event has been permanently deleted and is no longer visible to users.";
			break;

		case "Draft Event Deleted":
			description =
				"Your draft event has been removed successfully and will not appear in your drafts anymore.";
			break;

		case "Event Completed":
			description =
				"Your event has ended and is now marked as completed. All valid tickets are now expired.";
			break;

		case "Event Booked":
			description =
				"Someone just booked tickets for your event. Check your event dashboard for details.";
			break;

		case "Profile Updated":
			description = "Your profile information has been successfully updated.";
			break;

		case "Ticket Marked as used":
			description =
				"Your ticket has been scanned and marked as used for entry. Enjoy the event!";
			break;

		case "Ticket Marked as invalid":
			description =
				"Your ticket is now invalid — this could be due to event completion or cancellation.";
			break;

		default:
			description = "You have a new notification.";
			break;
	}

	return description;
};

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
		throw parseDatabaseErrorMessage(
			error?.response?.data?.message
				? error?.response?.data?.message
				: error?.message
		);
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
		throw parseDatabaseErrorMessage(
			error?.response?.data?.message
				? error?.response?.data?.message
				: error?.message
		);
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
		throw parseDatabaseErrorMessage(
			error?.response?.data?.message
				? error?.response?.data?.message
				: error?.message
		);
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
		throw parseDatabaseErrorMessage(
			error?.response?.data?.message
				? error?.response?.data?.message
				: error?.message
		);
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
		throw parseDatabaseErrorMessage(
			error?.response?.data?.message
				? error?.response?.data?.message
				: error?.message
		);
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
		throw parseDatabaseErrorMessage(
			error?.response?.data?.message
				? error?.response?.data?.message
				: error?.message
		);
	}
};
export const deleteUserNotificationApi = async (notificationId) => {
	try {
		const result = await base.delete(
			`auth/delete-user-notification/${notificationId}`,
			{
				isPublic: false,
			}
		);
		return result?.data;
	} catch (error) {
		throw parseDatabaseErrorMessage(
			error?.response?.data?.message
				? error?.response?.data?.message
				: error?.message
		);
	}
};
export const getUserNotificationApi = async () => {
	try {
		const result = await base.get("auth/user-notification", {
			isPublic: false,
		});
		return result?.data;
	} catch (error) {
		throw parseDatabaseErrorMessage(
			error?.response?.data?.message
				? error?.response?.data?.message
				: error?.message
		);
	}
};
export const getUserProfileApi = async () => {
	try {
		const result = await base.get("auth/userProfile", { isPublic: false });
		return result?.data;
	} catch (error) {
		throw parseDatabaseErrorMessage(
			error?.response?.data?.message
				? error?.response?.data?.message
				: error?.message
		);
	}
};
export const getOrganizerStatsApi = async () => {
	try {
		const result = await base.get("event/my-events-stats", { isPublic: false });
		return result?.data;
	} catch (error) {
		throw parseDatabaseErrorMessage(
			error?.response?.data?.message
				? error?.response?.data?.message
				: error?.message
		);
	}
};
export const publishDraftEventApi = async (eventId) => {
	try {
		const result = await base.put(`event/publish-draft/${eventId}`, {
			isPublic: false,
		});
		return result?.data;
	} catch (error) {
		throw parseDatabaseErrorMessage(
			error?.response?.data?.message
				? error?.response?.data?.message
				: error?.message
		);
	}
};
export const deleteDraftEventApi = async (eventId) => {
	try {
		const result = await base.delete(`event/delete-draft/${eventId}`, {
			isPublic: false,
		});
		return result?.data;
	} catch (error) {
		throw parseDatabaseErrorMessage(
			error?.response?.data?.message
				? error?.response?.data?.message
				: error?.message
		);
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
		throw parseDatabaseErrorMessage(
			error?.response?.data?.message
				? error?.response?.data?.message
				: error?.message
		);
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
		throw parseDatabaseErrorMessage(
			error?.response?.data?.message
				? error?.response?.data?.message
				: error?.message
		);
	}
};
export const getUserFavoriteApi = async () => {
	try {
		const result = await base.get("auth/user-favorite-events", {
			isPublic: false,
		});
		return result?.data;
	} catch (error) {
		throw parseDatabaseErrorMessage(
			error?.response?.data?.message
				? error?.response?.data?.message
				: error?.message
		);
	}
};
export const createPaymentIntentApi = async (
	eventId,
	ticketTierName,
	quantity,
	promoCode
) => {
	try {
		const result = await base.post(
			`payment/create-payment-intent`,
			{
				eventId,
				ticketTierName,
				quantity: parseInt(quantity),
				couponCode: promoCode,
			},
			{
				isPublic: false,
			}
		);
		return result?.data;
	} catch (error) {
		console.log(
			"payment error",
			error?.response?.data?.message
				? error?.response?.data?.message
				: error?.message
		);
		throw parseDatabaseErrorMessage(
			error?.response?.data?.message
				? error?.response?.data?.message
				: error?.message
		);
	}
};
export const getUserHomeEventApi = async () => {
	//highlights
	try {
		const result = await base.get(`event/highlights`, {
			isPublic: false,
		});
		return result?.data;
	} catch (error) {
		throw parseDatabaseErrorMessage(
			error?.response?.data?.message
				? error?.response?.data?.message
				: error?.message
		);
	}
};
export const getTicketFromBarCodeApi = async (barcodeValue) => {
	try {
		const result = await base.get(`ticket/barcode/${barcodeValue}`, {
			isPublic: false,
		});
		return result?.data;
	} catch (error) {
		throw parseDatabaseErrorMessage(
			error?.response?.data?.message
				? error?.response?.data?.message
				: error?.message
		);
	}
};
export const getUserTicketHistoryApi = async () => {
	try {
		const result = await base.get(`ticket/ticket-history`, {
			isPublic: false,
		});
		return result?.data;
	} catch (error) {
		throw parseDatabaseErrorMessage(
			error?.response?.data?.message
				? error?.response?.data?.message
				: error?.message
		);
	}
};
export const markTicketAsUsedApi = async (eventId, ticketId) => {
	try {
		const result = await base.put(
			`ticket/mark-ticket-used`,
			{
				eventId,
				ticketId,
			},
			{
				isPublic: false,
			}
		);
		return result?.data;
	} catch (error) {
		throw parseDatabaseErrorMessage(
			error?.response?.data?.message
				? error?.response?.data?.message
				: error?.message
		);
	}
};
export const addViewToEventApi = async (eventId) => {
	try {
		const result = await base.post(
			`event/add-view/${eventId}`,
			{},
			{
				isPublic: false,
			}
		);
		return result?.data;
	} catch (error) {
		throw parseDatabaseErrorMessage(
			error?.response?.data?.message
				? error?.response?.data?.message
				: error?.message
		);
	}
};
export const createNewEventApi = async (
	title,
	category,
	status,
	location,
	startTime,
	endTime,
	description,
	ticketTiers,
	bannerImage,
	galleryImages,
	promoCodes
) => {
	const formattedStartTime = new Date(startTime).toISOString(); // proper time
	const formattedEndTime = new Date(endTime).toISOString();
	const formattedTicketTiers = ticketTiers?.map((dat) => {
		const { capacity, price, ...rest } = dat;
		return {
			...rest,
			capacity: typeof capacity === "string" ? parseInt(capacity) : capacity,
			price: typeof price === "string" ? parseFloat(price) : price,
		};
	});
	const formattedPromoCodes =
		promoCodes?.length > 0
			? promoCodes?.map((dat) => {
					const { type, value, ...rest } = dat;
					return {
						...rest,
						discountType: type,
						discountValue:
							typeof value === "string" ? parseFloat(value) : value,
					};
			  })
			: [];
	try {
		const result = await base.post(
			`event/create`,
			{
				title,
				category,
				status,
				location,
				startTime: formattedStartTime,
				endTime: formattedEndTime,
				description,
				ticketTiers: formattedTicketTiers,
				bannerImage,
				galleryImages,
				promoCodes: formattedPromoCodes,
			},
			{
				isPublic: false,
			}
		);
		return result?.data;
	} catch (error) {
		throw parseDatabaseErrorMessage(
			error?.response?.data?.message
				? error?.response?.data?.message
				: error?.message
		);
	}
};
export const updateEventApi = async (
	eventId,
	title,
	category,
	location,
	startTime,
	endTime,
	description,
	ticketTiers,
	bannerImage,
	galleryImages,
	promoCodes
) => {
	const formattedStartTime = new Date(startTime).toISOString(); // proper time
	const formattedEndTime = new Date(endTime).toISOString();
	const formattedTicketTiers = ticketTiers?.map((dat) => {
		const { capacity, price, ...rest } = dat;
		return {
			...rest,
			capacity: typeof capacity === "string" ? parseInt(capacity) : capacity,
			price: typeof price === "string" ? parseFloat(price) : price,
		};
	});
	const formattedPromoCodes =
		promoCodes?.length > 0
			? promoCodes?.map((dat) => {
					const { type, value, ...rest } = dat;
					return {
						...rest,
						discountType: type,
						discountValue:
							typeof value === "string" ? parseFloat(value) : value,
					};
			  })
			: [];
	try {
		const result = await base.put(
			`event/update/${eventId}`,
			{
				title,
				category,
				location,
				startTime: formattedStartTime,
				endTime: formattedEndTime,
				description,
				ticketTiers: formattedTicketTiers,
				bannerImage,
				galleryImages,
				promoCodes: formattedPromoCodes,
			},
			{
				isPublic: false,
			}
		);
		return result?.data;
	} catch (error) {
		throw parseDatabaseErrorMessage(
			error?.response?.data?.message
				? error?.response?.data?.message
				: error?.message
		);
	}
};
export const getEventByIdApi = async (eventId) => {
	try {
		const result = await base.get(`event/${eventId}`, {
			isPublic: false,
		});
		return result?.data?.event;
	} catch (error) {
		throw parseDatabaseErrorMessage(
			error?.response?.data?.message
				? error?.response?.data?.message
				: error?.message
		);
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
		throw parseDatabaseErrorMessage(
			error?.response?.data?.message
				? error?.response?.data?.message
				: error?.message
		);
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
		throw parseDatabaseErrorMessage(
			error?.response?.data?.message
				? error?.response?.data?.message
				: error?.message || "An error occurred while uploading image"
		);
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
		throw parseDatabaseErrorMessage(
			error?.response?.data?.message
				? error?.response?.data?.message
				: error?.message
		);
	}
};
export const deleteAccountApi = async () => {
	try {
		const result = await base.delete(`auth/deleteUserAccount`, {
			isPublic: false,
		});
		return result?.data;
	} catch (error) {
		throw parseDatabaseErrorMessage(
			error?.response?.data?.message
				? error?.response?.data?.message
				: error?.message
		);
	}
};
