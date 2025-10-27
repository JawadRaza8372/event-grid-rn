import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useThemeColors } from "../../hooks/useThemeColors";

const BottomButtons = ({
	onResetFun,
	onBackFun,
	onNextFun,
	onSubmitFun,
	showfirstPair,
}) => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		sideBySideView: {
			width: "100%",
			height: 48,
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			flexDirection: "row",
			marginTop: 10,
			marginBottom: 30,
		},
		noBtn: {
			width: "49%",
			height: "100%",
			borderRadius: 14,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			borderColor: colors.backBtnBorder,
			borderWidth: 1,
		},
		noTxt: {
			fontSize: 13,
			fontWeight: "600",
			color: colors.blackColor,
		},
		yesBtn: {
			width: "49%",
			height: "100%",
			borderRadius: 14,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: colors.blackColor,
		},
		yesTxt: {
			fontSize: 13,
			fontWeight: "600",
			color: colors.mainBgColor,
		},
	});
	return (
		<View style={styles.sideBySideView}>
			{showfirstPair ? (
				<>
					<TouchableOpacity
						onPress={onResetFun}
						style={styles.noBtn}>
						<Text style={styles.noTxt}>Reset</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={onNextFun}
						style={styles.yesBtn}>
						<Text style={styles.yesTxt}>Next</Text>
					</TouchableOpacity>
				</>
			) : (
				<>
					<TouchableOpacity
						onPress={onBackFun}
						style={styles.noBtn}>
						<Text style={styles.noTxt}>Back</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={onSubmitFun}
						style={styles.yesBtn}>
						<Text style={styles.yesTxt}>Submit</Text>
					</TouchableOpacity>
				</>
			)}
		</View>
	);
};

export default BottomButtons;
