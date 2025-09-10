import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icons } from "../assets/icons";
import AuthLayout from "../components/AuthLayout";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import SocialContainer from "../components/SocialContainer";
import { useThemeColors } from "../hooks/useThemeColors";
const Login = () => {
	const colors = useThemeColors();
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
		},
		loginWithText: {
			fontSize: 14,
			fontWeight: "500",
			color: colors.inputPlaceHolderColor,
			textAlign: "center",
		},
		botmBtn: {
			width: "100%",
			height: "auto",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
			gap: 10,
			marginBottom: 20,
		},
	});
	return (
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
					onChangeValue={(text) => setformData({ ...formData, password: text })}
				/>
				<TouchableOpacity style={styles.recoveryContainer}>
					<Text style={styles.recoverTxt}>Recovery Password</Text>
				</TouchableOpacity>
				<CustomButton
					btnWidth={"100%"}
					btnTitle={"Sign In"}
				/>
				<View style={styles.loginWithTxtCont}>
					<Text style={styles.orText}>OR</Text>
					<Text style={styles.loginWithText}>Login With</Text>
				</View>
				<SocialContainer
					onGooglePress={() => console.log("google")}
					onFacebookPress={() => console.log("facebook")}
					onInstaPress={() => console.log("insta")}
				/>
				<TouchableOpacity
					onPress={() => router.push({ pathname: "/register" })}
					style={styles.botmBtn}>
					<Text style={styles.loginWithText}>New User?</Text>
					<Text style={styles.orText}>Create Account</Text>
				</TouchableOpacity>
			</>
		</AuthLayout>
	);
};

export default Login;
