import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";
import UserAvatar from "./UserAvatar";

const EventStaffComp = ({ name, email, profileImage, status }) => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		mainContainer: {
			width: Dimensions.get("screen").width - 34,
			paddingVertical: 11,
			paddingHorizontal: 10,
			display: "flex",
			alignItems: "flex-start",
			justifyContent: "center",
			flexDirection: "column",
			gap: 10,
			backgroundColor: colors.topEventBg,
			borderRadius: 25,
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
			height: "auto",
			flexShrink: 1,
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
			justifyContent: "flex-start",
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
			fontSize: 14,
			fontWeight: "500",
			color: colors.successSubTxtColor,
		},
		boldText: {
			fontWeight: "700",
			textTransform: "capitalize",
		},
		userInfoCont: {
			height: "auto",
			flex: 1,
			display: "flex",
			flexDirection: "column",
			gap: 5,
		},
		deleteBox: {
			justifyContent: "center",
			alignItems: "center",
			width: 35,
		},
		deleteIconBox: {
			width: 35,
			height: 35,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			borderWidth: 1,
			borderColor: colors.redColor,
			borderRadius: 8,
		},
	});

	return (
		<View style={styles.mainContainer}>
			<View style={{ ...styles.sideBySideView, gap: 10 }}>
				<UserAvatar
					imgUrl={profileImage}
					size={50}
				/>
				<View style={styles.userInfoCont}>
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						style={styles.eventNmaeTxt}>
						{name ?? email ?? ""}
					</Text>
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						style={styles.statusText}>
						Status: <Text style={styles.boldText}>{status}</Text>
					</Text>
				</View>
			</View>
		</View>
	);
};

export default EventStaffComp;
