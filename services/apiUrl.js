import axios from "axios";
import store from "./store/index";
import {
	getUserTokenfromStorage,
	removeUserTokenfromStorage,
	setTokens,
} from "./store/userSlice";

const productionLink = "https://event-grid.91.108.126.5.sslip.io/";
const developmentLink = "http://192.168.1.5:4000/";
const isProduction = true;
const mainUrl = isProduction ? productionLink : developmentLink;

// ⚙️ Axios instance
const base = axios.create({
	baseURL: mainUrl,
	headers: {
		"Content-Type": "application/json",
	},
});

// 🔐 Helper to dynamically attach/remove token
const setAuthToken = (token) => {
	if (token) {
		base.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	} else {
		delete base.defaults.headers.common["Authorization"];
	}
};
base.interceptors.request.use(
	async (config) => {
		if (config.isPublic) return config;

		const { accessToken, refreshToken } = await getUserTokenfromStorage();
		console.log("🔑 Access token found:", accessToken, "refresh");

		if (accessToken) {
			console.log("setting tokens in top interceptor");

			store.dispatch(
				setTokens({
					tokens: {
						accessToken: accessToken,
						refreshToken: refreshToken,
					},
				})
			);
			config.headers.Authorization = `Bearer ${accessToken}`;
			console.log("🔑 Access token attcheched");
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// 🔄 Response Interceptor — refresh token on 401
base.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (
			error.response &&
			error.response.status === 401 &&
			!originalRequest._retry
		) {
			originalRequest._retry = true;
			try {
				const { refreshToken } = await getUserTokenfromStorage();
				if (!refreshToken) {
					console.log("🚫 No refresh token available — user likely logged out");
					return null;
				}
				console.log("=============old refresh token==========================");
				console.log("refresh token", refreshToken);
				console.log("===============>requested new tokens<=================");
				// call backend refresh route
				const res = await axios.post(`${mainUrl}auth/renew-token`, {
					refreshToken: refreshToken,
				});
				const newAccessToken = res?.data?.accessToken;
				const newRefreshToken = res?.data?.refreshToken;
				console.log("setting tokens in bottom interceptor");

				store.dispatch(
					setTokens({
						tokens: {
							accessToken: newAccessToken,
							refreshToken: newRefreshToken,
						},
					})
				);
				console.log("===============>saved new tokens<=================");
				// attach new token for retry
				base.defaults.headers.common[
					"Authorization"
				] = `Bearer ${newAccessToken}`;
				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
				console.log(
					"===============>retrying orignal request<================="
				);

				return base(originalRequest); // retry original request
			} catch (refreshError) {
				console.error("Token refresh failed:", refreshError);
				// optional: redirect to login
				console.log("removing tokens in bottom ");

				store.dispatch(
					setTokens({
						tokens: {
							accessToken: "",
							refreshToken: "",
						},
					})
				);
				removeUserTokenfromStorage();
			}
		}
		return Promise.reject(error);
	}
);

export { base, mainUrl, setAuthToken };
