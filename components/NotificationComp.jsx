import {
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Icons } from "../assets/icons";
import notificationImage from "../assets/images/notificationUser.png";
import { useThemeColors } from "../hooks/useThemeColors";
import {
	formatTimestampWithMoment,
	getNotificationDescription,
} from "../services/endpoints";

const NotificationComp = ({ title, date, onDelete }) => {
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
			marginVertical: 5,
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
		deleteBox: {
			justifyContent: "center",
			alignItems: "center",
			width: 55,
			marginRight: 20,
		},
		deleteIconBox: {
			width: 45,
			height: 45,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			borderWidth: 1,
			borderColor: colors.redColor,
			borderRadius: 8,
		},
		deleteText: {
			color: "white",
			fontWeight: "600",
		},
	});

	const description = getNotificationDescription(title);

	const renderRightActions = () => (
		<TouchableOpacity
			style={styles.deleteBox}
			activeOpacity={0.8}
			onPress={onDelete}>
			<View style={styles.deleteIconBox}>
				<Icons.DeleteRed
					width={25}
					height={25}
				/>
			</View>
		</TouchableOpacity>
	);

	return (
		<Swipeable renderRightActions={renderRightActions}>
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
					<Text style={styles.dateTxt}>
						{date ? formatTimestampWithMoment(date) : ""}
					</Text>
				</View>
			</View>
		</Swipeable>
	);
};

export default NotificationComp;
