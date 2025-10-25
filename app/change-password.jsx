import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { Icons } from "../assets/icons";
import AuthLayout from "../components/AuthLayout";
import CustomButton from "../components/CustomButton";
import InputWithIcons from "../components/InputWithIcons";
import { useThemeColors } from "../hooks/useThemeColors";
import { isValidPasswordFun, resetPasswordApi } from "../services/endpoints";
const ChangePassword = () => {
	const router = useRouter();
	const colors = useThemeColors();
	const { resetPasswordToken } = useSelector((state) => state?.user);
	const [formData, setformData] = useState({ password: "", confirm: "" });
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
		topSpacing: {
			width: "100%",
			height: 10,
		},
	});
	const customResetPasswordFun = async () => {
		try {
			if (!isValidPasswordFun(formData.password)) {
				Toast.show({
					type: "error",
					text1: "Please enter password of atleast 7 letters.",
				});
				return;
			}
			if (!isValidPasswordFun(formData.confirm)) {
				Toast.show({
					type: "error",
					text1: "Please enter confirm password of atleast 7 letters.",
				});
				return;
			}
			if (formData.confirm !== formData.password) {
				Toast.show({
					type: "error",
					text1: "Please enter same password in both fields.",
				});
				return;
			}
			const result = await resetPasswordApi(
				formData.password,
				resetPasswordToken
			);
			if (result) {
				console.log("Reset Password success");
				Toast.show({
					type: "success",
					text1: "Password has been reset successully.",
				});
				setTimeout(() => {
					router.replace({
						pathname: "/login",
					});
				}, 800);
			}
		} catch (error) {
			console.log("Reset Password failed: ", error);
			Toast.show({
				type: "error",
				text1: error ?? "Password reset failed.",
			});
		}
	};
	return (
		<AuthLayout hideBgImg={true}>
			<>
				<View style={styles.topBarContainer} />

				<View style={styles?.titleContainer}>
					<Text style={styles.mainHeading}>Create New Password</Text>
					<Text style={styles.subHeading}>
						Create your new password to login
					</Text>
				</View>
				<InputWithIcons
					placeHolderText={"Enter Password"}
					value={formData.password}
					onChangeValue={(text) => setformData({ ...formData, password: text })}
					LeftIcon={<Icons.Lock />}
				/>
				<InputWithIcons
					placeHolderText={"Confirm Password"}
					value={formData.confirm}
					onChangeValue={(text) => setformData({ ...formData, confirm: text })}
					LeftIcon={<Icons.Lock />}
				/>
				<View style={styles?.topSpacing} />
				<CustomButton
					btnWidth={"100%"}
					btnTitle={"Create Password"}
					onPressFun={customResetPasswordFun}
					isDisabled={
						formData.password.length < 4 || formData.confirm.length < 4
							? true
							: false
					}
				/>
			</>
		</AuthLayout>
	);
};

export default ChangePassword;
