import { useState } from "react";
import {
	ActivityIndicator,
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";

const CustomButtonWithLoading = ({
	btnWidth,
	btnTitle,
	onPressFun,
	btnAlignSelf,
	btnRadius,
	BtnIcon,
	bgColor,
	txtColor,
	txtSize,
	BtnIcon1,
	brdrColor,
	isDisabled,
	showBrdr,
}) => {
	const [isLoading, setisLoading] = useState(false);
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
			opacity: isDisabled ? 0.6 : 1,
		},
		btnTxt: {
			fontSize: txtSize ?? 15,
			fontWeight: "700",
			color: txtColor ?? colors.mainBgColor,
		},
	});
	const RenderComponent = onPressFun || isLoading ? TouchableOpacity : View;
	const onButtonClickFun = async () => {
		setisLoading(true);
		await onPressFun();
		setisLoading(false);
	};
	const renderProps =
		onPressFun || isLoading
			? { onPress: onButtonClickFun, disabled: isDisabled ?? false }
			: {};

	return (
		<RenderComponent
			{...renderProps}
			style={styles.mainBtnContainer}>
			{isLoading ? (
				<ActivityIndicator
					size={"small"}
					color={txtColor ?? colors.mainBgColor}
				/>
			) : (
				<>
					{BtnIcon1 && BtnIcon1}
					<Text style={styles.btnTxt}>{btnTitle ?? "Submit"}</Text>
					{BtnIcon && BtnIcon}
				</>
			)}
		</RenderComponent>
	);
};

export default CustomButtonWithLoading;
