import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Icons } from "../assets/icons";
import eventImage from "../assets/images/eventDetails.png";
import { useThemeColors } from "../hooks/useThemeColors";

const TicketComp = ({ type, bannerImage, address, date, title }) => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		addressTxt: {
			fontSize: 10,
			fontWeight: "500",
			lineHeight: 20,
			color: colors.profileItemsTxtColor,
			height: "auto",
			flex: 1,
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
		childContainer: {
			display: "flex",
			alignItems: "flex-start",
			justifyContent: "center",
			flexDirection: "column",
			marginRight: 5,
			height: 85,
			flex: 1,
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
		botmContainer: {
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			flex: 1,
			gap: 5,
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
				<View style={styles.botmContainer}>
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						style={styles.addressTxt}>
						<Text style={{ fontWeight: "700" }}>{type}</Text> Ticket
					</Text>
				</View>
			</View>
		</View>
	);
};

export default TicketComp;
