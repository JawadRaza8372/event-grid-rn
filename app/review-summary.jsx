import { useStripe } from "@stripe/stripe-react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import AuthLayout from "../components/AuthLayout";
import CustomButtonWithLoading from "../components/CustomButtonWithLoading.jsx";
import MyEventComp from "../components/MyEventComp.jsx";
import SideTopBar from "../components/SideTopBar";
import SuccessModal from "../components/SuccessModal";
import { useThemeColors } from "../hooks/useThemeColors";
import {
	createPaymentIntentApi,
	postPaymentSuccessApi,
} from "../services/endpoints.js";
const ReviewSummary = () => {
	const { initPaymentSheet, presentPaymentSheet, confirmPayment } = useStripe();

	const { user } = useSelector((state) => state?.user);
	const router = useRouter();
	const {
		eventId,
		title,
		startDate,
		address,
		sum,
		tickets,
		type,
		bannerImage,
	} = useLocalSearchParams();
	const colors = useThemeColors();
	const [openModal, setopenModal] = useState(false);
	const switchOpenModal = () => {
		setopenModal(!openModal);
	};
	const styles = StyleSheet.create({
		sideBySideContainer: {
			width: "100%",
			height: "auto",
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			flexDirection: "row",
		},
		labelTxt: {
			fontSize: 12,
			fontWeight: "600",
			color: colors.successSubTxtColor,
			width: "49%",
		},
		labelValue: {
			fontSize: 12,
			fontWeight: "500",
			color: colors.authTitleColor,
			width: "49%",
			textAlign: "right",
		},
		dataContainer: {
			borderRadius: 25,
			paddingVertical: 20,
			paddingHorizontal: 23,
			width: "100%",
			height: "auto",
			display: "flex",
			flexDirection: "column",
			gap: 20,
			backgroundColor: colors.topEventBg,
			minHeight: 120,
		},
		borderedView: {
			width: "100%",
			height: 1.3,
			backgroundColor: colors.createEventInputBg,
		},
		bottomPadding: {
			width: "100%",
			height: 80,
		},
		mainConatiner: {
			width: "100%",
			flex: 1,
			display: "flex",
			flexDirection: "column",
			gap: 20,
		},
	});
	const startPayment = async () => {
		try {
			// 1️⃣ Get Payment Intent from your backend
			const result = await createPaymentIntentApi(eventId, type, tickets);
			const clientSecret = result?.paymentIntent?.client_secret;
			const currentPaymentId = result?.paymentIntent?.id;
			// 2️⃣ Initialize Payment Sheet
			const { error: initError } = await initPaymentSheet({
				paymentIntentClientSecret: clientSecret,
				merchantDisplayName: "Event Grid",
				allowsDelayedPaymentMethods: true,
				defaultBillingDetails: {
					email: user?.email || "",
				},
				// googlePay: true,
				// googlePay: {
				// 	merchantCountryCode: "US",
				// 	testEnv: true,
				// },
				// applePay: true,
				// applePay: {
				// 	merchantCountryCode: "US",
				// },
			});

			if (initError) {
				console.log("init error", initError);
				Toast.show({
					type: "error",
					text1: initError.message ?? textStrings.paymentInitFailedMsg,
				});
				return;
			}
			// 3️⃣ Present the Payment Sheet
			const { error: paymentError } = await presentPaymentSheet();
			if (paymentError) {
				console.log("payment error", paymentError);
				Toast.show({
					type: "error",
					text1: paymentError.message ?? textStrings.paymentFailedMsg,
				});
				return;
			}

			// 4️⃣ Notify backend of success
			await postPaymentSuccessApi(currentPaymentId);
			switchOpenModal();
		} catch (error) {
			console.log("Payment failed error:", error);
			Toast.show({
				type: "error",
				text1: error ?? "Payment Failed",
			});
		}
	};
	return (
		<AuthLayout hideBgImg={true}>
			<View style={styles.mainConatiner}>
				<SideTopBar
					title={"Review Summary"}
					isTailIcon={true}
				/>
				<MyEventComp
					bannerImage={bannerImage}
					address={address}
					date={startDate}
					title={title}
				/>
				<View style={styles.dataContainer}>
					<View style={styles.sideBySideContainer}>
						<Text style={styles.labelTxt}>Full Name</Text>
						<Text
							numberOfLines={1}
							ellipsizeMode="tail"
							style={styles.labelValue}>
							{user?.username ?? "--"}
						</Text>
					</View>
					<View style={styles.sideBySideContainer}>
						<Text style={styles.labelTxt}>Phone</Text>
						<Text
							numberOfLines={1}
							ellipsizeMode="tail"
							style={styles.labelValue}>
							{user?.phone ?? "--"}
						</Text>
					</View>
					<View style={styles.sideBySideContainer}>
						<Text style={styles.labelTxt}>Email</Text>
						<Text
							numberOfLines={1}
							ellipsizeMode="tail"
							style={styles.labelValue}>
							{user?.email ?? "--"}
						</Text>
					</View>
				</View>
				<View style={styles.dataContainer}>
					<View style={styles.sideBySideContainer}>
						<Text style={styles.labelTxt}>
							{tickets} Ticket(s) (
							{type === "General Admission" ? "Economy" : type})
						</Text>
						<Text
							numberOfLines={1}
							ellipsizeMode="tail"
							style={styles.labelValue}>
							${sum ?? 0}
						</Text>
					</View>
					<View style={styles.sideBySideContainer}>
						<Text style={styles.labelTxt}>Tax</Text>
						<Text
							numberOfLines={1}
							ellipsizeMode="tail"
							style={styles.labelValue}>
							$5
						</Text>
					</View>
					<View style={styles.borderedView} />
					<View style={styles.sideBySideContainer}>
						<Text style={styles.labelTxt}>Total</Text>
						<Text
							numberOfLines={1}
							ellipsizeMode="tail"
							style={styles.labelValue}>
							${parseFloat(sum) + 5}
						</Text>
					</View>
				</View>
				<CustomButtonWithLoading
					btnWidth={"100%"}
					btnTitle={"Continue"}
					onPressFun={startPayment}
				/>
				<View style={styles.bottomPadding} />
			</View>
			<SuccessModal
				showModal={openModal}
				hideModal={() => {
					switchOpenModal();
					router.push({ pathname: "/(tabs)" });
				}}
				title={"Congratulations!!"}
				description={`You have successfully bought tickets for ${title}.`}
			/>
		</AuthLayout>
	);
};

export default ReviewSummary;
