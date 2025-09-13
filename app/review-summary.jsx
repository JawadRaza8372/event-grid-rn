import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import masterCardImage from "../assets/images/mastercard.png";
import AuthLayout from "../components/AuthLayout";
import CustomButton from "../components/CustomButton";
import MyEventComp from "../components/MyEventComp.jsx";
import PaymentComp from "../components/PaymentComp";
import SideTopBar from "../components/SideTopBar";
import SuccessModal from "../components/SuccessModal";
import { useThemeColors } from "../hooks/useThemeColors";

const ReviewSummary = () => {
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
	const eventData = {
		address: "Grand Park, New Grand Park, New",
		date: "Mon, Dec 24 . 18.00 - 23.00",
		eventName: "Art WorkShops",
		imageLink:
			"https://plus.unsplash.com/premium_photo-1757343190565-3b99182167e3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
	};
	return (
		<AuthLayout hideBgImg={true}>
			<View style={styles.mainConatiner}>
				<SideTopBar
					title={"Review Summary"}
					isTailIcon={true}
				/>
				<MyEventComp
					address={eventData?.address}
					date={eventData?.date}
					title={eventData?.eventName}
					imageLink={eventData?.imageLink}
				/>
				<View style={styles.dataContainer}>
					<View style={styles.sideBySideContainer}>
						<Text style={styles.labelTxt}>Full Name</Text>
						<Text
							numberOfLines={1}
							ellipsizeMode="tail"
							style={styles.labelValue}>
							Jhon Doe
						</Text>
					</View>
					<View style={styles.sideBySideContainer}>
						<Text style={styles.labelTxt}>Phone</Text>
						<Text
							numberOfLines={1}
							ellipsizeMode="tail"
							style={styles.labelValue}>
							********
						</Text>
					</View>
					<View style={styles.sideBySideContainer}>
						<Text style={styles.labelTxt}>Email</Text>
						<Text
							numberOfLines={1}
							ellipsizeMode="tail"
							style={styles.labelValue}>
							jhondoe@gmail.com
						</Text>
					</View>
				</View>
				<View style={styles.dataContainer}>
					<View style={styles.sideBySideContainer}>
						<Text style={styles.labelTxt}>Payment Method</Text>
						<Text
							numberOfLines={1}
							ellipsizeMode="tail"
							style={styles.labelValue}>
							MasterCard
						</Text>
					</View>
					<View style={styles.sideBySideContainer}>
						<Text style={styles.labelTxt}>Order ID</Text>
						<Text
							numberOfLines={1}
							ellipsizeMode="tail"
							style={styles.labelValue}>
							5678548
						</Text>
					</View>
					<View style={styles.borderedView} />
					<View style={styles.sideBySideContainer}>
						<Text style={styles.labelTxt}>Status</Text>
						<Text
							numberOfLines={1}
							ellipsizeMode="tail"
							style={styles.labelValue}>
							Paid
						</Text>
					</View>
				</View>
				<PaymentComp
					image={masterCardImage}
					isChangeFun={() => router.back()}
					title={"********2589"}
				/>
				<CustomButton
					btnWidth={"100%"}
					btnTitle={"Continue"}
					onPressFun={switchOpenModal}
				/>
				<View style={styles.bottomPadding} />
			</View>
			<SuccessModal
				showModal={openModal}
				hideModal={switchOpenModal}
				title={"Congratulations!!"}
				description={
					"You have successfully placed an\norder for National Music Festival."
				}
			/>
		</AuthLayout>
	);
};

export default ReviewSummary;
