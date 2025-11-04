import { router } from "expo-router";
import { useState } from "react";
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Toast from "react-native-toast-message";
import { Icons } from "../assets/icons";
import AuthLayout from "../components/AuthLayout";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import CustomSelector from "../components/CustomSelector";
import LoadingView from "../components/LoadingView";
import RedirecetWrapper from "../components/RedirectWrapper";
import SocialGoogleButton from "../components/SocialGoogleButton";
import SuccessModal from "../components/SuccessModal";
import { useThemeColors } from "../hooks/useThemeColors";
import {
	isValidEmailFun,
	isValidPasswordFun,
	isValidUsernameFun,
	parseDatabaseErrorMessage,
	registerApi,
} from "../services/endpoints";
const Register = () => {
	const colors = useThemeColors();
	const [formData, setformData] = useState({
		name: "",
		role: "No",
		email: "",
		password: "",
	});
	const [isLoading, setisLoading] = useState(false);
	const [openOrganizeModal, setopenOrganizeModal] = useState(false);
	const switchOpenOrganizeModal = () => {
		setopenOrganizeModal(!openOrganizeModal);
	};
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
			marginTop: Dimensions.get("screen").height / 13,
		},
		seprator: {
			width: "100%",
			height: 12,
		},
	});
	const customRegisterFun = async () => {
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
			if (!isValidPasswordFun(formData.password)) {
				Toast.show({
					type: "error",
					text1: "Please enter valid password of atleast 7 letters",
				});
				return;
			}
			setisLoading(true);
			const result = await registerApi(
				formData.name,
				formData.email,
				formData.password,
				formData.role
			);
			if (result) {
				console.log("register success:", result);
				setformData({
					email: "",
					name: "",
					password: "",
					role: "No",
				});
				Toast.show({
					type: "success",
					text1: "Account created successfully. Please Login.",
				});
			}
			setisLoading(false);
		} catch (error) {
			console.log("register failed: ", error);
			setisLoading(false);
			Toast.show({
				type: "error",
				text1: error
					? parseDatabaseErrorMessage(error)
					: "Registeration Failed",
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
					<Text style={styles.mainHeading}>Create your Account</Text>
					<CustomInput
						title={"Your Name"}
						placeHolderText={"jhon doe"}
						value={formData.name}
						onChangeValue={(text) => setformData({ ...formData, name: text })}
					/>
					<CustomInput
						title={"Email Address"}
						placeHolderText={"jhondoe@gmail.com"}
						value={formData.email}
						onChangeValue={(text) =>
							setformData({ ...formData, email: `${text}`.toLowerCase() })
						}
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
					<CustomSelector
						title={"Are you an Organizer?"}
						value={formData.role}
						onChangeValue={(text) => setformData({ ...formData, role: text })}
						options={["Yes", "No"]}
					/>
					<View style={styles?.seprator} />
					<CustomButton
						isDisabled={
							formData.email.length < 5 ||
							formData.password.length < 4 ||
							!isValidUsernameFun(formData.name)
								? true
								: false
						}
						btnWidth={"100%"}
						btnTitle={"Sign Up"}
						onPressFun={customRegisterFun}
					/>
					<View style={styles.loginWithTxtCont}>
						<Text style={styles.orText}>OR</Text>
						<Text style={styles.loginWithText}>Sign Up With</Text>
					</View>
					<SocialGoogleButton />
					<TouchableOpacity
						onPress={() => router.push({ pathname: "/login" })}
						style={styles.botmBtn}>
						<Text style={styles.btmLoginWithText}>
							Already have an account?
						</Text>
						<Text style={styles.btmOrText}>Login</Text>
					</TouchableOpacity>
					<SuccessModal
						title={"Organizer Approved!"}
						description={"Admin has successfully approved you as an Organizer"}
						showModal={openOrganizeModal}
						hideModal={switchOpenOrganizeModal}
					/>
					<LoadingView loading={isLoading} />
				</>
			</AuthLayout>
		</RedirecetWrapper>
	);
};

export default Register;
