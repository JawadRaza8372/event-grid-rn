import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
	Dimensions,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { Icons } from "../assets/icons";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import UserAvatar from "../components/UserAvatar";
import { useThemeColors } from "../hooks/useThemeColors";
import {
	isValidEmailFun,
	isValidPhoneNumber,
	isValidUsernameFun,
	parseDatabaseErrorMessage,
	updateProfileApi,
	uploadImageApi,
} from "../services/endpoints";

const EditProfileOrganizer = () => {
	const { user } = useSelector((state) => state?.user);
	const colors = useThemeColors();
	const [localImage, setlocalImage] = useState("");
	const [formData, setformData] = useState({
		name: "",
		email: "",
		phoneNumber: "",
	});
	useEffect(() => {
		setformData({
			email: user?.email,
			name: user?.username,
			phoneNumber: user?.phone,
		});
	}, [user]);
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
		spacingView: {
			width: "100%",
			height: 50,
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
	const takeImageFromGallery = async () => {
		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ["images"],
				allowsEditing: true,
				aspect: [1, 1],
				quality: 1,
			});

			if (result.didCancel) {
				console.log("Image selection cancelled");
			} else if (result.error) {
				console.error("Error selecting images:", result.error);
			} else if (result.assets) {
				setlocalImage(result.assets[0].uri);
			}
		} catch (error) {
			console.error("Error opening image library:", error);
		}
	};
	const editUserFun = async () => {
		try {
			if (!isValidEmailFun(formData.email)) {
				Toast.show({
					type: "error",
					text1: "Please enter valid email address.",
				});
				return;
			}
			if (!isValidUsernameFun(formData.name)) {
				Toast.show({
					type: "error",
					text1: "Please enter valid name",
				});
				return;
			}
			if (!isValidPhoneNumber(formData.phoneNumber)) {
				Toast.show({
					type: "error",
					text1: "Please enter valid phone number",
				});
				return;
			}

			let profileImageLink = user?.profileImage;
			if (localImage) {
				const imageLinkRaw = await uploadImageApi(localImage, "profile");
				profileImageLink = imageLinkRaw?.imageUrl;
			}
			const result = await updateProfileApi(
				formData.name,
				profileImageLink,
				formData.email,
				formData.phoneNumber
			);
			if (result) {
				console.log("edit profile success:", result);
				setformData({
					name: "",
					email: "",
					phoneNumber: "",
				});
				setlocalImage("");
				Toast.show({
					type: "success",
					text1: "Profile updated successfully.",
				});
			}
		} catch (error) {
			console.log("edit profile error", error);
			Toast.show({
				type: "error",
				text1: error ? parseDatabaseErrorMessage(error) : "Edit Profile Failed",
			});
		}
	};
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
						<View style={styles.backBtn} />
					</View>
					<TouchableOpacity
						onPress={takeImageFromGallery}
						style={styles.userAvtarContainer}>
						<UserAvatar
							secondVarient={true}
							size={122}
							isEditable={true}
							imgUrl={
								localImage
									? localImage
									: user?.profileImage
									? user?.profileImage
									: null
							}
						/>
					</TouchableOpacity>
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
						isNumber={true}
						secondVarient={true}
						title={"Phone Number"}
						placeHolderText={"+1XXXXXXXXXXXX"}
						value={formData.phoneNumber}
						onChangeValue={(text) =>
							setformData({ ...formData, phoneNumber: text })
						}
					/>

					<View style={styles.spacingView} />

					<CustomButton
						btnWidth={"100%"}
						btnTitle={"Submit"}
						onPressFun={editUserFun}
						isDisabled={
							formData.email.length < 5 ||
							!isValidUsernameFun(formData.name) ||
							formData.phoneNumber.length < 6
								? true
								: false
						}
					/>
				</View>
			</View>
		</ScrollView>
	);
};

export default EditProfileOrganizer;
