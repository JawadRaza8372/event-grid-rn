import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { Icons } from "../assets/icons";
import AuthLayout from "../components/AuthLayout";
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

const EditProfile = () => {
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
		spacingView: {
			width: "100%",
			height: 50,
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
				<TouchableOpacity onPress={takeImageFromGallery}>
					<UserAvatar
						size={76}
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
					isNumber={true}
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
						formData.email.length < 5 || !isValidUsernameFun(formData.name)
							? true
							: false
					}
				/>
			</>
		</AuthLayout>
	);
};

export default EditProfile;
