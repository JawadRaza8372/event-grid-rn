import { StyleSheet, Text, TextInput, View } from "react-native";
import { Icons } from "../../assets/icons";
import { useThemeColors } from "../../hooks/useThemeColors";

const CustomLocationInput = ({ title, value, onChangeValue, placeHolder }) => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		mainContainer: {
			width: "100%",
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
			height: "95%",
			flex: 1,
			fontSize: 12,
			fontWeight: "500",
			color: colors.authTitleColor,
		},
		inputContainer: {
			height: 38,
			width: "100%",
			borderRadius: 8,
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			backgroundColor: colors.createEventInputBg,
		},
		iconContainer: {
			height: "100%",
			width: 35,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
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
			<View style={styles.inputContainer}>
				<View style={styles.iconContainer}>
					<Icons.PinFat
						width={16}
						height={16}
					/>
				</View>
				<TextInput
					placeholderTextColor={colors.createInputLabelColor}
					placeholder={placeHolder ?? ""}
					value={value}
					onChangeText={onChangeValue}
					style={styles.inputMainStyle}
				/>
			</View>
		</View>
	);
};

export default CustomLocationInput;
