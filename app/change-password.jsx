import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icons } from "../assets/icons";
import AuthLayout from "../components/AuthLayout";
import CustomButton from "../components/CustomButton";
import InputWithIcons from "../components/InputWithIcons";
import { useThemeColors } from "../hooks/useThemeColors";
const ChangePassword = () => {
	const router = useRouter();
	const colors = useThemeColors();
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
				/>
			</>
		</AuthLayout>
	);
};

export default ChangePassword;
