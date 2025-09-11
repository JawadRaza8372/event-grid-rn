import { useState } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { Icons } from "../assets/icons";
import { useThemeColors } from "../hooks/useThemeColors";

const CustomInput = ({
	title,
	placeHolderText,
	value,
	onChangeValue,
	isPasswordType,
	secondVarient,
}) => {
	const colors = useThemeColors();
	const [hidePassword, sethidePassword] = useState(false);
	const styles = StyleSheet.create({
		mainContainer: {
			width: "100%",
			height: "auto",
			display: "flex",
			flexDirection: "column",
			gap: 12,
		},
		inputLabel: {
			fontSize: 14,
			fontWeight: "500",
			color: colors.authTitleColor,
			lineHeight: 20,
		},
		inputMainContainer: {
			height: 48,
			width: "100%",
			borderRadius: 14,
			backgroundColor: secondVarient ? "transparent" : colors.inputBgColor,
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			gap: 10,
			overflow: "hidden",
			...(secondVarient
				? { borderWidth: 1, borderColor: colors.blackColor }
				: {}),
		},
		inputMainStyle: {
			fontSize: 12,
			fontWeight: "500",
			color: colors.authTitleColor,
			paddingHorizontal: 15,
			height: "100%",
			flex: 1,
		},
		sideBtn: {
			width: 44,
			height: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
	});

	return (
		<View style={styles.mainContainer}>
			<Text style={styles?.inputLabel}>{title ?? ""}</Text>
			<View style={styles.inputMainContainer}>
				<TextInput
					placeholderTextColor={colors.inputPlaceHolderColor}
					placeholder={placeHolderText ?? title ?? ""}
					value={value}
					onChangeText={onChangeValue}
					style={styles.inputMainStyle}
					secureTextEntry={isPasswordType ? !hidePassword : false}
				/>
				{isPasswordType ? (
					<TouchableOpacity
						style={styles?.sideBtn}
						onPress={() => sethidePassword(!hidePassword)}>
						{hidePassword ? (
							<Icons.Eye
								width={18}
								height={18}
							/>
						) : (
							<Icons.EyeOff
								width={18}
								height={18}
							/>
						)}
					</TouchableOpacity>
				) : null}
			</View>
		</View>
	);
};

export default CustomInput;
