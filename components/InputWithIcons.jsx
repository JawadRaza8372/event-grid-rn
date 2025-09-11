import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Icons } from "../assets/icons";
import { useThemeColors } from "../hooks/useThemeColors";

const InputWithIcons = ({
	placeHolderText,
	value,
	onChangeValue,
	isPasswordType,
	LeftIcon,
}) => {
	const colors = useThemeColors();
	const [hidePassword, sethidePassword] = useState(false);
	const styles = StyleSheet.create({
		inputMainContainer: {
			height: 56,
			width: "100%",
			borderRadius: 24,
			backgroundColor: colors.recoveryTabInactiveColor,
			borderWidth: 1,
			borderColor: colors.recoveryTabInactiveBorderColor,
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			gap: 10,
			overflow: "hidden",
		},
		inputMainStyle: {
			fontSize: 16,
			fontWeight: "400",
			color: colors.authTitleColor,
			height: "100%",
			flex: 1,
		},
		leftSideBtn: {
			width: 56,
			height: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
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
		<View style={styles.inputMainContainer}>
			{LeftIcon ? <View style={styles?.leftSideBtn}>{LeftIcon}</View> : null}
			<TextInput
				placeholderTextColor={colors.inputPlaceHolderColor}
				placeholder={placeHolderText ?? ""}
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
			) : value?.length > 0 ? (
				<View style={styles?.sideBtn}>
					<Icons.Check />
				</View>
			) : null}
		</View>
	);
};

export default InputWithIcons;
