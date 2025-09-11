import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import notificationImage from "../assets/images/notificationUser.png";
import { useThemeColors } from "../hooks/useThemeColors";
const NotificationComp = ({ title, description, date }) => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		mainContainer: {
			width: Dimensions.get("screen").width - 40,
			alignSelf: "center",
			paddingVertical: 13,
			paddingHorizontal: 7,
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			gap: 15,
			backgroundColor: colors.notificationBg,
			borderRadius: 14,
		},
		imageContainer: {
			width: 40,
			height: 40,
			overflow: "hidden",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		imageStyle: {
			width: "100%",
			height: "100%",
			resizeMode: "contain",
		},
		dateTxt: {
			fontSize: 12,
			fontWeight: "500",
			color: colors.dateTxt,
		},
		descriptionTxt: {
			fontSize: 12,
			lineHeight: 14,
			fontWeight: "500",
			color: colors.blackColor,
		},
		titleTxt: {
			lineHeight: 16,
			fontSize: 12,
			fontWeight: "600",
			color: colors.blackColor,
		},
		textContainer: {
			height: "auto",
			flex: 1,
			display: "flex",
			flexDirection: "column",
			gap: 7,
		},
	});

	return (
		<View style={styles.mainContainer}>
			<View style={styles.imageContainer}>
				<Image
					style={styles.imageStyle}
					source={notificationImage}
				/>
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.titleTxt}>{title ?? ""}</Text>
				<Text style={styles.descriptionTxt}>{description ?? ""}</Text>
				<Text style={styles.dateTxt}>{date ?? ""}</Text>
			</View>
		</View>
	);
};

export default NotificationComp;
