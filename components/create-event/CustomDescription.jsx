import { StyleSheet, Text, TextInput, View } from "react-native";
import { useThemeColors } from "../../hooks/useThemeColors";

const CustomDescription = ({ value, onChangeValue }) => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		mainContainer: {
			width: "100%",
			flexDirection: "column",
			gap: 7,
		},
		inputLabel: {
			fontSize: 9,
			fontWeight: "500",
			color: colors.profileItemsTxtColor,
			lineHeight: 20,
		},
		inputMainStyle: {
			textAlignVertical: "top",
			width: "100%",
			height: 110,
			borderRadius: 8,
			backgroundColor: colors.createEventInputBg,
			fontSize: 12,
			fontWeight: "500",
			color: colors.authTitleColor,
			paddingHorizontal: 15,
			paddingVertical: 20,
		},
	});
	return (
		<View style={styles.mainContainer}>
			<TextInput
				multiline={true}
				placeholderTextColor={colors.createInputLabelColor}
				placeholder={"Tell people what your event is about..."}
				value={value}
				onChangeText={onChangeValue}
				style={styles.inputMainStyle}
			/>
			<Text style={styles.inputLabel}>{value?.length}/500 characyers</Text>
		</View>
	);
};

export default CustomDescription;
