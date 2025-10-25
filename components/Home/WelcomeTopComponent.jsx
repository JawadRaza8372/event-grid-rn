import { router } from "expo-router";
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useSelector } from "react-redux";
import { Icons } from "../../assets/icons";
import { useThemeColors } from "../../hooks/useThemeColors";
import { getTimeBasedGreeting } from "../../services/endpoints";
import UserAvatar from "../UserAvatar";
const WelcomeTopComponent = ({ imageLink }) => {
	const welcomeTxt = getTimeBasedGreeting();
	const { user } = useSelector((state) => state?.user);
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
				imgUrl={user?.profileImage ?? ""}
			/>
			<View style={styles.textContainer}>
				<Text style={styles.morningTxt}>{welcomeTxt ?? "Welcome"}</Text>
				<Text style={styles.nameTxt}>{user?.username ?? ""}</Text>
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
