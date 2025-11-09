import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import eventImage from "../assets/images/eventDetails.png";
import { useThemeColors } from "../hooks/useThemeColors";
import TwoButtons from "./TwoButtons";

const EventAttendeComp = ({
	name,
	email,
	profileImage,
	markTicketAsInvalidFun,
	markTicketAsUsedFun,
	quantity,
	ticketType,
	status,
}) => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		mainContainer: {
			width: Dimensions.get("screen").width - 34,
			paddingVertical: 11,
			paddingHorizontal: 10,
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			gap: 10,
			backgroundColor: colors.topEventBg,
			borderRadius: 25,
			height: 133,
			overflow: "hidden",
		},
		imageContainer: {
			width: 110,
			height: 110,
			borderRadius: 20,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: colors.scannerBg,
			overflow: "hidden",
		},
		imageStyle: {
			width: "100%",
			height: "100%",
			resizeMode: "cover",
		},
		childContainer: {
			display: "flex",
			alignItems: "flex-start",
			justifyContent: "center",
			flexDirection: "column",
			marginRight: 5,
			height: "100%",
			flex: 1,
			gap: 10,
		},
		eventNmaeTxt: {
			fontSize: 14,
			fontWeight: "600",
			lineHeight: 20,
			color: colors.dataTitleColor,
			width: "100%",
		},
		yesBtn: {
			width: "100%",
			height: 32,
			borderRadius: 8,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: colors.blackColor,
		},
		yesTxt: {
			fontSize: 10,
			fontWeight: "600",
			color: colors.mainBgColor,
		},
		sideBySideView: {
			height: "auto",
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			flexDirection: "row",
		},
		labelTxt: {
			fontSize: 12,
			fontWeight: "500",
			color: colors.successSubTxtColor,
			width: "100%",
			lineHeight: 20,
		},
		statusText: {
			fontSize: 12,
			fontWeight: "500",
			color: colors.successSubTxtColor,
		},
		boldText: {
			fontWeight: "700",
		},
	});

	return (
		<View style={styles.mainContainer}>
			<View style={styles.imageContainer}>
				<Image
					style={styles.imageStyle}
					source={profileImage ? { uri: profileImage } : eventImage}
				/>
			</View>
			<View style={styles.childContainer}>
				<Text
					numberOfLines={1}
					ellipsizeMode="tail"
					style={styles.eventNmaeTxt}>
					{name ?? email ?? ""}
				</Text>
				<Text style={styles.labelTxt}>
					{quantity} Ticket ({ticketType})
				</Text>
				{status === "valid" ? (
					<TwoButtons
						txtSize={10}
						height={32}
						firstBg={colors.greenTxt}
						secBg={colors.redColor}
						firstText={"Mark Used"}
						secTxt={"Mark Invalid"}
						onfirstFun={markTicketAsUsedFun}
						onSecondFun={markTicketAsInvalidFun}
					/>
				) : (
					<Text style={styles.statusText}>
						Status: <Text style={styles.boldText}>{status}</Text>
					</Text>
				)}
			</View>
		</View>
	);
};

export default EventAttendeComp;
