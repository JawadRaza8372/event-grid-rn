import { router } from "expo-router";
import { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import applepayImage from "../assets/images/applepay.png";
import googlepayImage from "../assets/images/google-icon.png";
import masterCardImage from "../assets/images/mastercard.png";
import payPalImage from "../assets/images/paypal.png";
import CustomButton from "../components/CustomButton";
import PaymentComp from "../components/PaymentComp";
import SideTopBar from "../components/SideTopBar";
import { useThemeColors } from "../hooks/useThemeColors";

const Payments = () => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		mainContainer: {
			width: "100%",
			height: "100%",
			backgroundColor: colors.mainBgColor,
			paddingBottom: 30,
		},
		descriptionTxt: {
			color: colors.blackColor,
			fontSize: 13,
			fontWeight: "500",
			lineHeight: 20,
			marginVertical: 20,
			width: Dimensions.get("screen").width - 40,
			alignSelf: "center",
		},
		childContainer: {
			width: Dimensions.get("screen").width - 40,
			alignSelf: "center",
			flex: 1,
			gap: 18,
		},
	});
	const [selectedPayments, setselectedPayments] = useState("");
	const paymentsArray = [
		{ title: "PayPal", image: payPalImage },
		{ title: "Google Pay", image: googlepayImage },
		{ title: "********2589", image: masterCardImage },
		{ title: "********2569", image: applepayImage },
	];
	return (
		<View style={styles.mainContainer}>
			<SideTopBar
				title={"Payments"}
				isTailIcon={true}
			/>
			<Text style={styles.descriptionTxt}>
				Select the payment method you want to use
			</Text>
			<View style={styles.childContainer}>
				{paymentsArray?.length > 0 &&
					paymentsArray?.map((dat, index) => (
						<PaymentComp
							key={index}
							image={dat?.image}
							value={selectedPayments}
							onChangeValue={(text) => setselectedPayments(text)}
							title={dat?.title}
						/>
					))}
				<CustomButton
					btnTitle={"Add New Card"}
					btnWidth={"100%"}
					onPressFun={() => null}
				/>
			</View>
			<CustomButton
				btnTitle={`Continue - $${50}`}
				onPressFun={() => router.push({ pathname: "/review-summary" })}
			/>
		</View>
	);
};

export default Payments;
