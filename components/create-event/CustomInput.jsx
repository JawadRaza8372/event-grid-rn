import { StyleSheet, Text, TextInput, View } from "react-native";
import { useThemeColors } from "../../hooks/useThemeColors";

const CustomInput = ({
	inputWidth,
	title,
	value,
	onChangeValue,
	placeHolder,
}) => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		mainContainer: {
			width: inputWidth ?? "100%",
			height: "auto",
			display: "flex",
			flexDirection: "column",
			gap: 7,
		},
		inputLabel: {
			width: "100%",
			fontSize: 11,
			fontWeight: "500",
			color: colors.createInputLabelColor,
			lineHeight: 20,
		},
		inputMainStyle: {
			height: 38,
			width: "100%",
			borderRadius: 8,
			fontSize: 12,
			fontWeight: "500",
			color: colors.authTitleColor,
			backgroundColor: colors.createEventInputBg,
			paddingHorizontal: 15,
		},
	});
	return (
		<View style={styles.mainContainer}>
			<Text
				numberOfLines={1}
				ellipsizeMode="tail"
				style={styles.inputLabel}>
				{title ?? ""}
			</Text>
			<TextInput
				placeholderTextColor={colors.createInputLabelColor}
				placeholder={placeHolder ?? ""}
				value={value}
				onChangeText={onChangeValue}
				style={styles.inputMainStyle}
			/>
		</View>
	);
};

export default CustomInput;
