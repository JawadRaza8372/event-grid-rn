import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";

const CustomButton = ({
	btnWidth,
	btnTitle,
	onPressFun,
	btnAlignSelf,
	btnRadius,
}) => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		mainBtnContainer: {
			width: btnWidth ?? Dimensions.get("screen").width - 60,
			alignSelf: btnAlignSelf ?? "center",
			height: 48,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
			backgroundColor: colors.blackColor,
			borderRadius: btnRadius ?? 14,
		},
		btnTxt: {
			fontSize: 15,
			fontWeight: "700",
			color: colors.mainBgColor,
		},
	});
	const RenderComponent = onPressFun ? TouchableOpacity : View;
	const renderProps = onPressFun ? { onPress: onPressFun } : {};

	return (
		<RenderComponent
			{...renderProps}
			style={styles.mainBtnContainer}>
			<Text style={styles.btnTxt}>{btnTitle ?? "Submit"}</Text>
		</RenderComponent>
	);
};

export default CustomButton;
