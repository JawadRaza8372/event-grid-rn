import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Image, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import googleIcon from "../assets/images/google-icon.png";
import { useThemeColors } from "../hooks/useThemeColors";
import { mainUrl } from "../services/apiUrl";
import { setTokens, setUser } from "../services/store/userSlice";
import CustomButton from "./CustomButton";
const SocialGoogleButton = () => {
	const colors = useThemeColors();
	const router = useRouter();
	const dispatch = useDispatch();
	const processUserData = async () => {
		try {
			// 1. Open Google login in WebBrowser
			const authUrl = `${mainUrl}auth/google`;
			const result = await WebBrowser.openAuthSessionAsync(
				authUrl,
				"com.eventgrid://login-success"
			);
			if (result.type === "success") {
				// 2. The backend redirects to your custom scheme with user data
				const { queryParams } = Linking.parse(result.url);
				if (!queryParams?.user) {
					Toast.show({
						type: "error",
						text1: "Google login failed",
					});
					return;
				}

				// 3. Parse user object
				const userObj = JSON.parse(queryParams?.user);
				console.log("google Login success:", userObj);
				const { tokens, ...rest } = userObj;
				dispatch(setUser({ user: rest }));
				console.log("setting tokens in social login");

				dispatch(
					setTokens({
						tokens: {
							accessToken: tokens?.accessToken,
							refreshToken: tokens?.refreshToken,
						},
					})
				);
				router.replace({
					pathname: rest?.role === "user" ? "/(tabs)" : "/(tabs-organizer)",
				});
			}
		} catch (error) {
			console.log("google login failed: ", error);
			Toast.show({
				type: "error",
				text1: error ?? "Google login failed",
			});
		}
	};
	return (
		<CustomButton
			btnTitle={"Continue with Google"}
			BtnIcon1={
				<Image
					style={styles.socialIcon}
					source={googleIcon}
				/>
			}
			btnWidth={"100%"}
			btnRadius={10}
			bgColor={"transparent"}
			txtColor={colors.blackColor}
			onPressFun={processUserData}
			showBrdr={true}
			brdrColor={colors.socialBorderColor}
		/>
	);
};

export default SocialGoogleButton;

const styles = StyleSheet.create({
	socialIcon: {
		width: 24,
		height: 24,
		resizeMode: "contain",
	},
});
