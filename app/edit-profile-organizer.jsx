import { router } from "expo-router";
import { useState } from "react";
import {
	Dimensions,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Icons } from "../assets/icons";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import UserAvatar from "../components/UserAvatar";
import { useThemeColors } from "../hooks/useThemeColors";
const EditProfileOrganizer = () => {
	const colors = useThemeColors();
	const [formData, setformData] = useState({
		name: "",
		email: "",
		phoneNumber: "",
		password: "",
	});
	const styles = StyleSheet.create({
		screenHeaderTitle: {
			color: colors.mainBgColor,
			fontSize: 18,
			fontWeight: "600",
			lineHeight: 20,
		},
		topBarContainer: {
			width: Dimensions.get("screen").width - 36,
			alignSelf: "center",
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
		topView: {
			backgroundColor: colors.blackColor,
			marginBottom: 110,
			height: 150,
		},
		childContainer: {
			width: Dimensions.get("screen").width - 72,
			height: "100%",
			alignSelf: "center",
			display: "flex",
			flexDirection: "column",
			gap: 15,
		},
		userAvtarContainer: {
			position: "absolute",
			bottom: "-45%",
			alignSelf: "center",
		},
		formContainer: {
			width: "100%",
			height: "auto",
			display: "flex",
			flexDirection: "column",
			paddingBottom: 180,
		},
	});
	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<StatusBar
				backgroundColor={colors.blackColor}
				barStyle={"light-content"}
			/>
			<View style={styles.formContainer}>
				<View style={styles?.topView}>
					<View style={styles.topBarContainer}>
						<TouchableOpacity
							onPress={() => router.back()}
							style={styles.backBtn}>
							<Icons.TaleArrowLeftWhite
								width={25}
								height={25}
							/>
						</TouchableOpacity>
						<Text style={styles.screenHeaderTitle}>Profile</Text>
						<View style={styles.backBtn}>
							<Icons.Share
								width={25}
								height={25}
							/>
						</View>
					</View>
					<View style={styles.userAvtarContainer}>
						<UserAvatar
							secondVarient={true}
							size={122}
							isEditable={true}
						/>
					</View>
				</View>
				<View style={styles.childContainer}>
					<CustomInput
						secondVarient={true}
						title={"Name"}
						placeHolderText={"jhon doe"}
						value={formData.name}
						onChangeValue={(text) => setformData({ ...formData, name: text })}
					/>
					<CustomInput
						secondVarient={true}
						title={"Email Address"}
						placeHolderText={"jhondoe@gmail.com"}
						value={formData.email}
						onChangeValue={(text) => setformData({ ...formData, email: text })}
					/>
					<CustomInput
						secondVarient={true}
						title={"Phone Number"}
						placeHolderText={"+1XXXXXXXXXXXX"}
						value={formData.phoneNumber}
						onChangeValue={(text) =>
							setformData({ ...formData, phoneNumber: text })
						}
					/>
					<CustomInput
						secondVarient={true}
						title={"Password"}
						placeHolderText={"********"}
						isPasswordType={true}
						value={formData.password}
						onChangeValue={(text) =>
							setformData({ ...formData, password: text })
						}
					/>
					<View style={styles.recoveryContainer} />

					<CustomButton
						btnWidth={"100%"}
						btnTitle={"Submit"}
					/>
				</View>
			</View>
		</ScrollView>
	);
};

export default EditProfileOrganizer;
