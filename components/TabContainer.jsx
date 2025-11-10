import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";

const TabContainer = ({
	options,
	value,
	onchange,
	activeTxtColor,
	inActiveTxtColor,
	inActiveBg,
	borderWidth,
	borderColor,
}) => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		mainContainer: {
			width: "100%",
			height: 51,
			borderRadius: 29,
			backgroundColor: inActiveBg ?? colors.recoveryTabInactiveColor,
			borderWidth: borderWidth ?? 1,
			borderColor: borderColor ?? colors.recoveryTabInactiveBorderColor,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
		},
		optionContainer: {
			height: "98%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flex: 1,
			borderRadius: 29,
		},
		activeOptionContainer: {
			backgroundColor: colors.mainBgColor,
		},
		optionText: {
			fontSize: 12,
			fontWeight: "500",
			color: inActiveTxtColor ?? colors.recoverySubTxtColor,
		},
		activeOptionText: {
			color: activeTxtColor ?? colors.blackColor,
		},
	});

	return (
		<View style={styles.mainContainer}>
			{options &&
				options.map((dat, index) => (
					<TouchableOpacity
						onPress={() => onchange(dat)}
						style={[
							styles.optionContainer,
							dat === value ? styles.activeOptionContainer : {},
						]}
						key={index}>
						<Text
							style={[
								styles.optionText,
								dat === value ? styles.activeOptionText : {},
							]}>
							{dat}
						</Text>
					</TouchableOpacity>
				))}
		</View>
	);
};

export default TabContainer;
