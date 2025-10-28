import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Icons } from "../assets/icons";
import eventImage from "../assets/images/eventDetails.png";
import { useThemeColors } from "../hooks/useThemeColors";
import TwoButtons from "./TwoButtons";

const MyEventComp = ({
	address,
	date,
	title,
	totalTickets,
	soldTickets,
	totalAmount,
	showSmallButtons,
	onDeleteFun,
	onPublishFun,
}) => {
	const colors = useThemeColors();
	const showComponentCondition =
		totalTickets > 0 || soldTickets > 0 || totalAmount > 0 ? true : false;
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
			width: percentage ?? 0,
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
			height: "100%",
			display: "flex",
			alignItems: "flex-start",
			justifyContent: "center",
			flexDirection: "column",
			marginRight: 5,
			...(showComponentCondition ? { flex: 1 } : { height: 85 }),
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
	});
	const percentage =
		totalTickets && soldTickets ? (soldTickets / totalTickets) * 100 : 0;
	return (
		<View style={styles.mainContainer}>
			<View style={styles.imageContainer}>
				<Image
					style={styles.imageStyle}
					source={eventImage}
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
				{!totalAmount > 0 && !totalTickets > 0 && !soldTickets > 0 ? (
					<View style={styles?.emptyContainer} />
				) : null}
				<View style={styles.botmContainer}>
					<Icons.SendIcon />
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						style={styles.addressTxt}>
						{address ?? ""}
					</Text>
				</View>
				{showSmallButtons && onDeleteFun && onPublishFun ? (
					<View style={styles.sideBySideView}>
						<TwoButtons
							txtSize={10}
							height={32}
							firstBg={colors.redColor}
							firstText={"Delete"}
							secTxt={"Publish"}
							onfirstFun={onDeleteFun}
							onSecondFun={onPublishFun}
						/>
					</View>
				) : showComponentCondition ? (
					<View style={styles?.ticketSoldMainContainer}>
						<View style={styles.sideBySideView}>
							<Text style={styles.soldText}>
								Sold: {soldTickets ?? 0}/{totalTickets ?? 0}
							</Text>
							<Text style={styles.revenueTxt}>${totalAmount ?? 0}</Text>
						</View>
						<View style={styles.emptyPercentView}>
							<View style={styles.filledView} />
						</View>
					</View>
				) : null}
			</View>
		</View>
	);
};

export default MyEventComp;
