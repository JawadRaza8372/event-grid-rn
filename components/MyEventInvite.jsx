import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Icons } from "../assets/icons";
import eventImage from "../assets/images/eventDetails.png";
import { useThemeColors } from "../hooks/useThemeColors";
import TwoButtons from "./TwoButtons";

const MyEventInvite = ({
	address,
	date,
	title,
	onAcceptFun,
	onRejectFun,
	bannerImage,
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
		soldText: {
			fontSize: 9,
			fontWeight: "400",
			color: colors.profileItemsTxtColor,
		},
		emptyPercentView: {
			width: "100%",
			borderRadius: 30,
			height: 5,
			backgroundColor: colors.inActiveColor,
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
		},
		filledView: {
			height: "100%",
			width: 0,
			borderRadius: 30,
			backgroundColor: colors.blackColor,
		},
		revenueTxt: {
			fontSize: 9,
			fontWeight: "500",
			color: colors.greenTxt,
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
			height: 85,
			flex: 1,
		},
		sideBySideView: {
			height: "auto",
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			flexDirection: "row",
		},
		botmContainer: {
			height: "auto",
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			flex: 1,
			gap: 5,
		},

		dateTxt: {
			fontSize: 10,
			fontWeight: "500",
			lineHeight: 20,
			color: colors.blackColor,
			height: "auto",
			flex: 1,
		},
		eventNmaeTxt: {
			fontSize: 14,
			fontWeight: "600",
			lineHeight: 20,
			color: colors.dataTitleColor,
			height: "auto",
			flex: 1,
		},
		addressTxt: {
			fontSize: 10,
			fontWeight: "500",
			lineHeight: 20,
			color: colors.profileItemsTxtColor,
			height: "auto",
			flex: 1,
		},
		emptyContainer: {
			width: "100%",
			height: 20,
		},
		ticketSoldMainContainer: {
			height: 40,
			width: "100%",
			display: "flex",
			flexDirection: "column",
			alignItems: "flex-start",
			justifyContent: "center",
			gap: 5,
		},
		btnColumns: {
			width: "100%",
			height: "auto",
			display: "flex",
			flexDirection: "column",
			gap: 5,
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
		statusText: {
			fontSize: 10,
			fontWeight: "500",
			lineHeight: 20,
			color: colors.successSubTxtColor,
			height: "auto",
			flex: 1,
		},
	});
	return (
		<View style={styles.mainContainer}>
			<View style={styles.imageContainer}>
				<Image
					style={styles.imageStyle}
					source={bannerImage ? { uri: bannerImage } : eventImage}
				/>
			</View>
			<View style={styles.childContainer}>
				<Text
					numberOfLines={1}
					ellipsizeMode="tail"
					style={styles.eventNmaeTxt}>
					{title ?? ""}
				</Text>
				<Text
					numberOfLines={1}
					ellipsizeMode="tail"
					style={styles.dateTxt}>
					{date ?? ""}
				</Text>
				<View style={styles.botmContainer}>
					<Icons.SendIcon />
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						style={styles.addressTxt}>
						{address ?? ""}
					</Text>
				</View>
				{status === "pending" && onRejectFun && onAcceptFun ? (
					<View style={styles.btnColumns}>
						<TwoButtons
							txtSize={10}
							height={32}
							firstBg={colors.redColor}
							firstText={"Reject"}
							secTxt={"Accept"}
							onfirstFun={onRejectFun}
							onSecondFun={onAcceptFun}
						/>
					</View>
				) : (
					<Text style={styles.statusText}>
						{status === "expired"
							? "Invitation has been expired."
							: `You ${status} the invitation.`}
					</Text>
				)}
			</View>
		</View>
	);
};

export default MyEventInvite;
