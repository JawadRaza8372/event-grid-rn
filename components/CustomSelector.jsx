import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";

const CustomSelector = ({ title, value, onChangeValue, options }) => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		mainContainer: {
			width: "100%",
			height: "auto",
			display: "flex",
			flexDirection: "column",
			gap: 12,
		},
		optionText: {
			fontSize: 12,
			fontWeight: "400",
			color: colors.authTitleColor,
		},
		inputLabel: {
			fontSize: 14,
			fontWeight: "500",
			color: colors.authTitleColor,
			lineHeight: 20,
		},
		inputMainContainer: {
			height: "auto",
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			flexWrap: "wrap",
			gap: 25,
		},
		borderedView: {
			width: 16,
			height: 16,
			borderWidth: 1,
			borderColor: colors.blackColor,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column",
		},
		optionContainer: {
			width: "auto",
			height: "auto",
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			gap: 7,
		},
	});

	return (
		<View style={styles.mainContainer}>
			<Text style={styles?.inputLabel}>{title ?? ""}</Text>
			<View style={styles.inputMainContainer}>
				{options?.map((dat, index) => (
					<TouchableOpacity
						style={styles.optionContainer}
						key={index}
						onPress={() => onChangeValue(dat)}>
						<View style={styles.borderedView}></View>
						<Text style={styles.optionText}>{dat}</Text>
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
};

export default CustomSelector;
