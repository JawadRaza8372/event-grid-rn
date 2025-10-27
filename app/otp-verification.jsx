import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from "react-native-confirmation-code-field";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { Icons } from "../assets/icons";
import AuthLayout from "../components/AuthLayout";
import CustomButton from "../components/CustomButton";
import { useThemeColors } from "../hooks/useThemeColors";
import {
	forgotPasswordApi,
	isValidEmailFun,
	verifyOtpApi,
} from "../services/endpoints";
import { setResetPasswordToken } from "../services/store/userSlice";
const OtpVerification = () => {
	const { dbCode: initialDbCode, email } = useLocalSearchParams();
	const dispatch = useDispatch();
	const router = useRouter();
	const [dbCode, setDbCode] = useState(initialDbCode);
	console.log("check code", dbCode);
	const [value, setValue] = useState("");
	const colors = useThemeColors();
	const ref = useBlurOnFulfill({ value, cellCount: 6 });
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	});
	const [timer, setTimer] = useState(180);
	const inputRefs = useRef([]);

	const [canResend, setCanResend] = useState(false);
	useEffect(() => {
		if (inputRefs.current[0]) {
			inputRefs.current[0].focus();
		}
	}, []);

	useEffect(() => {
		if (timer > 0) {
			const interval = setInterval(() => {
				setTimer((prev) => prev - 1);
			}, 1000);
			return () => clearInterval(interval);
		} else {
			setCanResend(true);
		}
	}, [timer]);
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
		mainInputContainer: {
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "column",
			gap: 35,
			marginTop: 15,
		},
		codeFieldRoot: {
			width: Dimensions.get("screen").width / 1.1,
			height: 85,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			alignSelf: "flex-start",
		},
		celltxt: {
			height: 50,
			width: 50,
			backgroundColor: "transparent",
			borderRadius: 6,
			fontSize: 28,
			lineHeight: 50,
			color: colors.blackColor,
			borderWidth: 1,
			textAlign: "center",
		},
		timeTxt: {
			fontWeight: "400",
			fontSize: 12,
			color: colors.dateTxt,
			width: "86%",
			marginTop: -40,
			marginBottom: 20,
		},
		bottomBtn: {
			marginTop: 15,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			opacity: !canResend ? 0.4 : 1,
		},
		otherBottomTxt: {
			fontSize: 16,
			fontWeight: "400",
			color: colors.dateTxt,
		},
		mainBottomTxt: {
			fontSize: 16,
			fontWeight: !canResend ? "400" : "500",
			color: !canResend ? colors.dateTxt : colors.blackColor,
		},
	});
	const sendCodeToEmailFun = async () => {
		try {
			if (!isValidEmailFun(email)) {
				Toast.show({
					type: "error",
					text1: "Please enter valid email address.",
				});
				return;
			}
			const result = await forgotPasswordApi(email);
			if (result) {
				console.log("resend code success code:", result?.code);
				setDbCode(result?.code);
				setTimer(180);
				setCanResend(false);
				Toast.show({
					type: "success",
					text1: "Code resent successfully.",
				});
			}
		} catch (error) {
			console.log("resend code failed: ", error);
			Toast.show({
				type: "error",
				text1: error ?? "Codde resend failed",
			});
		}
	};
	const customVerifyOtpFun = async () => {
		try {
			const result = await verifyOtpApi(email, dbCode, value);
			if (result?.tokens) {
				dispatch(
					setResetPasswordToken({
						resetPasswordToken: result?.tokens?.accessToken,
					})
				);
				router.replace({
					pathname: "/change-password",
				});
			}
		} catch (error) {
			console.log("verify otp failed: ", error);
			Toast.show({
				type: "error",
				text1: error ?? "OTP verification failed",
			});
		}
	};

	return (
		<AuthLayout hideBgImg={true}>
			<>
				<View style={styles.topBarContainer}>
					<TouchableOpacity
						onPress={() => router.replace({ pathname: "/login" })}
						style={styles.backBtn}>
						<Icons.ArrowBack
							width={25}
							height={25}
						/>
					</TouchableOpacity>
				</View>
				<View style={styles?.titleContainer}>
					<Text style={styles.mainHeading}>One-Time Password Verification</Text>
					<Text style={styles.subHeading}>
						Please enter confirmation code that you recieved on {email}
					</Text>
				</View>

				<View style={styles.mainInputContainer}>
					<CodeField
						{...props}
						ref={ref}
						value={value}
						onChangeText={setValue}
						cellCount={6}
						rootStyle={styles.codeFieldRoot}
						keyboardType="number-pad"
						textContentType="oneTimeCode"
						renderCell={({ index, symbol, isFocused }) => (
							<View
								key={index}
								onLayout={getCellOnLayoutHandler(index)}>
								<Text
									style={[
										styles.celltxt,
										{
											marginRight: index < 5 ? 5 : 0,
											borderColor: isFocused
												? colors.blackColor
												: colors.inActiveTabTxtColor,
										},
									]}>
									{symbol || (isFocused ? <Cursor /> : null)}
								</Text>
							</View>
						)}
					/>
					<Text style={styles.timeTxt}>{`${Math.floor(timer / 60)
						.toString()
						.padStart(2, "0")}:${(timer % 60)
						.toString()
						.padStart(2, "0")}`}</Text>
				</View>
				<CustomButton
					isDisabled={value.length !== 6 ? true : false}
					btnTitle={"Verify"}
					btnWidth={"100%"}
					btnRadius={10}
					onPressFun={customVerifyOtpFun}
				/>
				<TouchableOpacity
					style={styles.bottomBtn}
					disabled={!canResend}
					onPress={sendCodeToEmailFun}>
					<Text style={styles.otherBottomTxt}>
						Didn't receive code?{" "}
						<Text style={styles.mainBottomTxt}>Resend</Text>
					</Text>
				</TouchableOpacity>
			</>
		</AuthLayout>
	);
};

export default OtpVerification;
