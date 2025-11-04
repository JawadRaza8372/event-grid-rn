import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icons } from "../assets/icons";
import AuthLayout from "../components/AuthLayout";
import CustomButton from "../components/CustomButton";
import InputWithIcons from "../components/InputWithIcons";
import { useThemeColors } from "../hooks/useThemeColors";
import { forgotPasswordApi, isValidEmailFun } from "../services/endpoints";
const ForgotPassword = () => {
	const router = useRouter();
	const colors = useThemeColors();
	const [formData, setformData] = useState({ email: "" });
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
		titleContainer: {
			width: "100%",
			height: "auto",
			display: "flex",
			flexDirection: "column",
			gap: 10,
			marginTop: 11,
			marginBottom: 21,
		},
		mainHeading: {
			fontSize: 22,
			fontWeight: "600",
			color: colors.authTitleColor,
		},
		subHeading: {
			fontSize: 14,
			fontWeight: "400",
			color: colors.recoverySubTxtColor,
		},
		tabContainer: {
			marginBottom: 10,
		},
		topSpacing: {
			width: "100%",
			height: 10,
		},
	});
	const customForgotPasswordFun = async () => {
		try {
			if (!isValidEmailFun(formData.email)) {
				Toast.show({
					type: "error",
					text1: "Please enter valid email address.",
				});
				return;
			}
			const result = await forgotPasswordApi(formData.email);
			if (result) {
				console.log("Forgot password success code:", result?.code);
				router.replace({
					pathname: "/otp-verification",
					params: { dbCode: result?.code, email: formData.email },
				});
			}
		} catch (error) {
			console.log("forgot password failed: ", error);
			Toast.show({
				type: "error",
				text1: error ?? "Forgot password failed",
			});
		}
	};
	return (
		<AuthLayout hideBgImg={true}>
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
				<View style={styles?.titleContainer}>
					<Text style={styles.mainHeading}>Forgot Your Password?</Text>
					<Text style={styles.subHeading}>
						Please enter your email, we will send you confirmation code
					</Text>
				</View>
				<InputWithIcons
					placeHolderText={""}
					value={formData.email}
					onChangeValue={(text) =>
						setformData({ ...formData, email: `${text}`.toLowerCase() })
					}
					LeftIcon={<Icons.Email />}
				/>

				<View style={styles?.topSpacing} />
				<CustomButton
					isDisabled={formData.email.length < 5 ? true : false}
					btnWidth={"100%"}
					btnTitle={"Reset Password"}
					onPressFun={customForgotPasswordFun}
				/>
			</>
		</AuthLayout>
	);
};

export default ForgotPassword;
