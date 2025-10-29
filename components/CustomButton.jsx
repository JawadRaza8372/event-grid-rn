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
	bgColor,
	txtColor,
	BtnIcon1,
	BtnIcon2,
	brdrColor,
	showBrdr,
	isDisabled,
	txtSize,
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
			backgroundColor: bgColor ?? colors.blackColor,
			borderRadius: btnRadius ?? 14,
			gap: 12,
			borderWidth: showBrdr ? 1 : 0,
			borderColor: brdrColor ?? colors.blackColor,
			opacity: isDisabled ? 0.5 : 1,
		},
		btnTxt: {
			fontSize: txtSize ?? 15,
			fontWeight: "700",
			color: txtColor ?? colors.mainBgColor,
		},
	});
	const RenderComponent = onPressFun ? TouchableOpacity : View;
	const renderProps = onPressFun
		? { onPress: onPressFun, disabled: isDisabled ?? false }
		: {};

	return (
		<RenderComponent
			{...renderProps}
			style={styles.mainBtnContainer}>
			{BtnIcon1 ? BtnIcon1 : null}
			<Text style={styles.btnTxt}>{btnTitle ?? "Submit"}</Text>
			{BtnIcon2 ? BtnIcon2 : null}
		</RenderComponent>
	);
};

export default CustomButton;
