import { router } from "expo-router";
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Icons } from "../../assets/icons";
import { useThemeColors } from "../../hooks/useThemeColors";
import UserAvatar from "../UserAvatar";
const WelcomeTopComponent = ({ name, imageLink, welcomeTxt }) => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		mainContainer: {
			width: Dimensions.get("screen").width - 60,
			alignSelf: "center",
			height: "auto",
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			gap: 17,
			marginTop: 20,
			marginBottom: 17,
		},
		textContainer: {
			height: "auto",
			flex: 1,
			display: "flex",
			alignItems: "flex-start",
			justifyContent: "center",
			flexDirection: "column",
			gap: 4,
		},
		morningTxt: {
			fontSize: 14,
			fontWeight: "400",
			lineHeight: 20,
			color: colors.morningColor,
		},
		nameTxt: {
			fontSize: 18,
			fontWeight: "500",
			lineHeight: 20,
			color: colors.dataTitleColor,
		},
		notificationBtn: {
			width: 39,
			height: 39,
			borderRadius: 39,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			borderWidth: 1,
			borderColor: colors.bellBorder,
		},
	});

	return (
		<View style={styles.mainContainer}>
			<UserAvatar
				size={47}
				imgUrl={imageLink ?? ""}
			/>
			<View style={styles.textContainer}>
				<Text style={styles.morningTxt}>{welcomeTxt ?? "Welcome"}</Text>
				<Text style={styles.nameTxt}>{name ?? ""}</Text>
			</View>
			<TouchableOpacity
				onPress={() => router.push({ pathname: "/notification" })}
				style={styles.notificationBtn}>
				<Icons.NotificationWithDot />
			</TouchableOpacity>
		</View>
	);
};

export default WelcomeTopComponent;
