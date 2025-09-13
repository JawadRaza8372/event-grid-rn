import { router } from "expo-router";
import { useState } from "react";
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Icons } from "../assets/icons";
import CustomButton from "../components/CustomButton";
import SideTopBar from "../components/SideTopBar";
import { useThemeColors } from "../hooks/useThemeColors";
const BookEvent = () => {
	const colors = useThemeColors();
	const [selectedOption, setselectedOption] = useState("Economy");
	const [totalTickets, settotalTickets] = useState(1);
	const price = selectedOption === "Economy" ? 50 : 100;
	const styles = StyleSheet.create({
		mainContainer: {
			width: "100%",
			height: "100%",
			backgroundColor: colors.mainBgColor,
			paddingBottom: 30,
		},
		childContainer: {
			width: Dimensions.get("screen").width - 40,
			alignSelf: "center",
			flex: 1,
		},
		activeTab: {
			width: "50%",
			height: 40,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			borderBottomWidth: 2,
			borderBottomColor: colors.blackColor,
		},
		inActiveTab: {
			width: "50%",
			height: 40,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			borderBottomWidth: 1,
			borderBottomColor: colors.inActiveColor,
		},
		inActiveTxt: {
			color: colors.inActiveTabTxtColor,
			fontSize: 16,
			fontWeight: "500",
			lineHeight: 20,
		},
		activeTxt: {
			color: colors.blackColor,
			fontSize: 16,
			fontWeight: "500",
			lineHeight: 20,
		},
		tabContainer: {
			width: "100%",
			height: "auto",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
			marginVertical: 10,
		},
		headingTxt: {
			marginTop: 21,
			marginBottom: 33,
			fontSize: 16,
			fontWeight: "500",
			color: colors.dataTitleColor,
		},
		btnTxt: {
			fontSize: 40,
			fontWeight: "400",
			color: colors.blackColor,
		},
		btnCont: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			width: 40,
			height: 40,
			borderRadius: 15,
			borderWidth: 1,
			borderColor: colors.morningColor,
		},
		buttonsContainer: {
			width: "100%",
			height: "auto",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
			gap: 30,
		},
	});
	return (
		<View style={styles.mainContainer}>
			<SideTopBar
				title={"Book Event"}
				isTailIcon={true}
			/>
			<View style={styles.childContainer}>
				<View style={styles.tabContainer}>
					<TouchableOpacity
						onPress={() => setselectedOption("Economy")}
						style={
							selectedOption === "Economy"
								? styles.activeTab
								: styles.inActiveTab
						}>
						<Text
							style={
								selectedOption === "Economy"
									? styles.activeTxt
									: styles.inActiveTxt
							}>
							Economy
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => setselectedOption("VIP")}
						style={
							selectedOption === "VIP" ? styles.activeTab : styles.inActiveTab
						}>
						<Text
							style={
								selectedOption === "VIP" ? styles.activeTxt : styles.inActiveTxt
							}>
							VIP
						</Text>
					</TouchableOpacity>
				</View>
				<Text style={styles.headingTxt}>Choose number of Tickets</Text>
				<View style={styles.buttonsContainer}>
					<TouchableOpacity
						onPress={() => settotalTickets(totalTickets - 1)}
						style={styles.btnCont}>
						<Icons.MinusIcon />
					</TouchableOpacity>
					<Text style={styles.btnTxt}>{totalTickets}</Text>
					<TouchableOpacity
						onPress={() => settotalTickets(totalTickets + 1)}
						style={styles.btnCont}>
						<Icons.PlusIcon />
					</TouchableOpacity>
				</View>
			</View>
			<CustomButton
				btnTitle={`Continue - $${price}`}
				onPressFun={() => router.push({ pathname: "/payments" })}
			/>
		</View>
	);
};

export default BookEvent;
