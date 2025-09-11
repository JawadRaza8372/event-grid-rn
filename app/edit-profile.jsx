import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icons } from "../assets/icons";
import AuthLayout from "../components/AuthLayout";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import UserAvatar from "../components/UserAvatar";
import { useThemeColors } from "../hooks/useThemeColors";
const EditProfile = () => {
	const colors = useThemeColors();
	const [formData, setformData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const styles = StyleSheet.create({
		screenHeaderTitle: {
			color: colors.blackColor,
			fontSize: 18,
			fontWeight: "600",
			lineHeight: 20,
		},
		topBarContainer: {
			width: "100%",
			height: 45,
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
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
		sideBtn: { height: 44, width: 44, borderRadius: 44 },
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
					<Text style={styles.screenHeaderTitle}>Profile</Text>
					<View style={styles.sideBtn} />
				</View>
				<UserAvatar
					size={76}
					isEditable={true}
				/>
				<CustomInput
					title={"Name"}
					placeHolderText={"jhon doe"}
					value={formData.name}
					onChangeValue={(text) => setformData({ ...formData, name: text })}
				/>
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
				<TouchableOpacity
					onPress={() => router.push({ pathname: "/forgot-password" })}
					style={styles.recoveryContainer}>
					<Text style={styles.recoverTxt}>Recover Password</Text>
				</TouchableOpacity>
				<CustomButton
					btnWidth={"100%"}
					btnTitle={"Submit"}
				/>
			</>
		</AuthLayout>
	);
};

export default EditProfile;
