import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";

const TwoButtons = ({
	onfirstFun,
	onSecondFun,
	firstText,
	secTxt,
	height,
	firstBg,
	secBg,
	txtSize,
}) => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		sideBySideView: {
			width: "100%",
			height: height ?? 48,
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			flexDirection: "row",
		},
		noBtn: {
			width: "49%",
			height: "100%",
			borderRadius: 8,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: firstBg ?? colors.backBtnBorder,
		},
		noTxt: {
			fontSize: txtSize ?? 13,
			fontWeight: "600",
			color: colors.mainBgColor,
		},
		yesBtn: {
			width: "49%",
			height: "100%",
			borderRadius: 8,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: secBg ?? colors.blackColor,
		},
		yesTxt: {
			fontSize: txtSize ?? 13,
			fontWeight: "600",
			color: colors.mainBgColor,
		},
	});
	return (
		<View style={styles.sideBySideView}>
			<TouchableOpacity
				onPress={onfirstFun}
				style={styles.noBtn}>
				<Text style={styles.noTxt}>{firstText ?? ""}</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={onSecondFun}
				style={styles.yesBtn}>
				<Text style={styles.yesTxt}>{secTxt ?? ""}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default TwoButtons;
