import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";

const PaymentComp = ({ isChangeFun, title, image, onChangeValue, value }) => {
	const colors = useThemeColors();

	const styles = StyleSheet.create({
		paymentView: {
			width: "100%",
			height: 50,
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			gap: 11,
			backgroundColor: colors.inputBgColor,
			borderRadius: 14,
			paddingHorizontal: 18,
		},
		paymentImage: {
			width: 40,
			height: 30,
			resizeMode: "contain",
		},
		paymentTxt: {
			height: "auto",
			flex: 1,
			fontSize: 14,
			lineHeight: 22,
			fontWeight: "500",
			color: colors.blackColor,
		},
		emptyView: {
			height: 15,
			width: 15,
			borderRadius: 15,
			borderColor: colors.blackColor,
			borderWidth: 1,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		activeView: {
			width: 8,
			height: 8,
			borderRadius: 8,
			backgroundColor: colors.blackColor,
		},
	});
	const RenderComp = isChangeFun ? View : TouchableOpacity;
	const renderProps = isChangeFun
		? {}
		: { onPress: () => onChangeValue(title) };
	return (
		<RenderComp
			{...renderProps}
			style={styles.paymentView}>
			<Image
				style={styles.paymentImage}
				source={image}
			/>
			<Text
				style={styles.paymentTxt}
				numberOfLines={1}
				ellipsizeMode="tail">
				{title ?? ""}
			</Text>
			{isChangeFun ? (
				<TouchableOpacity onPress={isChangeFun}>
					<Text>Change</Text>
				</TouchableOpacity>
			) : (
				<View style={styles.emptyView}>
					{title === value ? <View style={styles.activeView} /> : null}
				</View>
			)}
		</RenderComp>
	);
};

export default PaymentComp;
