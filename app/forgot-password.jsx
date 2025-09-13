import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icons } from "../assets/icons";
import AuthLayout from "../components/AuthLayout";
import CustomButton from "../components/CustomButton";
import InputWithIcons from "../components/InputWithIcons";
import TabContainer from "../components/TabContainer";
import { useThemeColors } from "../hooks/useThemeColors";
const ForgotPassword = () => {
	const router = useRouter();
	const colors = useThemeColors();
	const [selectedTab, setSelectedTab] = useState("Email");
	const [formData, setformData] = useState({ email: "", phone: "" });
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
						Enter your email or your phone number, we will send you confirmation
						code
					</Text>
				</View>
				<View style={styles.tabContainer}>
					<TabContainer
						options={["Email", "Phone"]}
						value={selectedTab}
						onchange={(text) => setSelectedTab(text)}
					/>
				</View>
				{selectedTab === "Email" ? (
					<InputWithIcons
						placeHolderText={""}
						value={formData.email}
						onChangeValue={(text) => setformData({ ...formData, email: text })}
						LeftIcon={<Icons.Email />}
					/>
				) : (
					<InputWithIcons
						placeHolderText={""}
						value={formData.email}
						onChangeValue={(text) => setformData({ ...formData, email: text })}
						LeftIcon={<Icons.Call />}
					/>
				)}
				<View style={styles?.topSpacing} />
				<CustomButton
					btnWidth={"100%"}
					btnTitle={"Reset Password"}
					onPressFun={() => router.push({ pathname: "/change-password" })}
				/>
			</>
		</AuthLayout>
	);
};

export default ForgotPassword;
