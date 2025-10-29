import { useRouter } from "expo-router";
import { useState } from "react";
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { Icons } from "../assets/icons";
import AuthLayout from "../components/AuthLayout";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import LoadingView from "../components/LoadingView";
import RedirecetWrapper from "../components/RedirectWrapper";
import SocialGoogleButton from "../components/SocialGoogleButton";
import { useThemeColors } from "../hooks/useThemeColors";
import {
	isValidEmailFun,
	isValidPasswordFun,
	loginApi,
} from "../services/endpoints";
import { setTokens, setUser } from "../services/store/userSlice";
const Login = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const colors = useThemeColors();
	const [isLoading, setisLoading] = useState(false);
	const [formData, setformData] = useState({ email: "", password: "" });
	const styles = StyleSheet.create({
		topBarContainer: {
			width: "100%",
			height: 45,
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
		},
		backBtn: {
			height: 44,
			width: 44,
			borderRadius: 44,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
			backgroundColor: colors.inputBgColor,
		},
		mainHeading: {
			fontSize: 25,
			fontWeight: "600",
			color: colors.authTitleColor,
			marginTop: 14,
			marginBottom: 32,
			textAlign: "center",
		},
		recoverTxt: {
			fontSize: 14,
			fontWeight: "400",
			color: colors.recoveryPasswordColor,
			textAlign: "right",
		},
		recoveryContainer: {
			width: "100%",
			height: "auto",
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-end",
			flexDirection: "row",
			marginTop: -5,
			marginBottom: 19,
		},
		loginWithTxtCont: {
			width: "100%",
			height: "auto",
			marginTop: 3,
			marginBottom: 14,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column",
		},
		orText: {
			fontSize: 14,
			fontWeight: "600",
			color: colors.inputPlaceHolderColor,
			textAlign: "center",
			lineHeight: 20,
		},
		loginWithText: {
			fontSize: 14,
			fontWeight: "500",
			color: colors.inputPlaceHolderColor,
			textAlign: "center",
			lineHeight: 20,
		},
		btmOrText: {
			fontSize: 14,
			fontWeight: "600",
			color: colors.blackColor,
			textAlign: "center",
			lineHeight: 20,
		},
		btmLoginWithText: {
			fontSize: 14,
			fontWeight: "500",
			color: colors.inputPlaceHolderColor,
			textAlign: "center",
			lineHeight: 20,
		},
		botmBtn: {
			width: "100%",
			height: "auto",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
			gap: 3,
			marginTop: Dimensions.get("screen").height / 4.7,
		},
	});
	const customLoginFun = async () => {
		try {
			if (!isValidEmailFun(formData.email)) {
				Toast.show({
					type: "error",
					text1: "Please enter valid email address.",
				});
				return;
			}
			if (!isValidPasswordFun(formData.password)) {
				Toast.show({
					type: "error",
					text1: "Please enter valid password of atleast 7 letters",
				});
				return;
			}
			setisLoading(true);
			const result = await loginApi(formData.email, formData.password);
			if (result) {
				console.log("Login success:", result?.user);
				const { tokens, ...rest } = result?.user;
				dispatch(setUser({ user: rest }));
				dispatch(
					setTokens({
						tokens: {
							accessToken: tokens?.accessToken,
							refreshToken: tokens?.refreshToken,
						},
					})
				);
			}
			setisLoading(false);
		} catch (error) {
			console.log("login failed: ", error);
			setisLoading(false);

			Toast.show({
				type: "error",
				text1: error ?? "Login failed",
			});
		}
	};
	return (
		<RedirecetWrapper>
			<AuthLayout>
				<>
					<View style={styles.topBarContainer}>
						<TouchableOpacity
							onPress={() => router.back()}
							style={styles.backBtn}>
							<Icons.ArrowBack
								width={25}
								height={25}
							/>
						</TouchableOpacity>
					</View>
					<Text style={styles.mainHeading}>Let’s Sign In</Text>
					<CustomInput
						title={"Email Address"}
						placeHolderText={"jhondoe@gmail.com"}
						value={formData.email}
						onChangeValue={(text) => setformData({ ...formData, email: text })}
					/>
					<CustomInput
						title={"Password"}
						placeHolderText={"********"}
						isPasswordType={true}
						value={formData.password}
						onChangeValue={(text) =>
							setformData({ ...formData, password: text })
						}
					/>
					<TouchableOpacity
						onPress={() => router.push({ pathname: "/forgot-password" })}
						style={styles.recoveryContainer}>
						<Text style={styles.recoverTxt}>Recover Password</Text>
					</TouchableOpacity>
					<CustomButton
						isDisabled={
							formData.email.length < 5 || formData.password.length < 4
								? true
								: false
						}
						btnWidth={"100%"}
						btnTitle={"Sign In"}
						onPressFun={customLoginFun}
					/>
					<View style={styles.loginWithTxtCont}>
						<Text style={styles.orText}>OR</Text>
						<Text style={styles.loginWithText}>Login With</Text>
					</View>
					<SocialGoogleButton />
					<TouchableOpacity
						onPress={() => router.push({ pathname: "/register" })}
						style={styles.botmBtn}>
						<Text style={styles.btmLoginWithText}>New User?</Text>
						<Text style={styles.btmOrText}>Create Account</Text>
					</TouchableOpacity>
					<LoadingView loading={isLoading} />
				</>
			</AuthLayout>
		</RedirecetWrapper>
	);
};

export default Login;
