import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icons } from "../assets/icons";
import { useThemeColors } from "../hooks/useThemeColors";

const ProfileOption = ({ onPressFun, icon, title }) => {
	console.log(onPressFun ? "here it " : "");
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		btn: {
			paddingHorizontal: 20,
			borderRadius: 8,
			alignItems: "center",
			justifyContent: "space-between",
			backgroundColor: colors.splashBg,
			flexDirection: "row",
			paddingVertical: 12,
		},
		btnContent: {
			flexDirection: "row",
			alignItems: "center",
			gap: 10,
		},
		btnText: {
			fontWeight: "500",
			fontSize: 14,
			color: colors.profileItemsTxtColor,
		},
		iconContainer: {
			width: 30,
			height: 30,
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
		},
	});
	const WrapperComponent = onPressFun ? TouchableOpacity : View;
	const wrapperProps = onPressFun ? { onPress: onPressFun } : {};
	return (
		<WrapperComponent
			{...wrapperProps}
			activeOpacity={0.8}
			style={styles.btn}>
			<View style={styles.btnContent}>
				<View style={styles.iconContainer}>{icon}</View>
				<Text style={styles.btnText}>{title}</Text>
			</View>
			<Icons.ArrowLeft
				width={18}
				height={18}
			/>
		</WrapperComponent>
	);
};

export default ProfileOption;
