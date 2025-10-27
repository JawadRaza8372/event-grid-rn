import { StyleSheet, Text, View } from "react-native";
import { Icons } from "../../assets/icons";
import { useThemeColors } from "../../hooks/useThemeColors";

const PromoCodeSelector = () => {
	const colors = useThemeColors();

	const styles = StyleSheet.create({
		dataContainer: {
			borderRadius: 25,
			paddingVertical: 19,
			paddingHorizontal: 20,
			width: "100%",
			height: "auto",
			display: "flex",
			flexDirection: "column",
			backgroundColor: colors.topEventBg,
			minHeight: 120,
			gap: 12,
		},
		dataTitleTxt: {
			fontSize: 14,
			fontWeight: "500",
			lineHeight: 20,
			color: colors.dataTitleColor,
			marginBottom: 5,
		},
		sideBySide: {
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			flexDirection: "row",
		},
		giftTxt: {
			fontSize: 11,
			fontWeight: "500",
			lineHeight: 20,
			color: colors.profileItemsTxtColor,
			textAlign: "center",
		},
		giftContainer: {
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column",
			gap: 5,
			paddingVertical: 20,
		},
	});

	return (
		<View style={styles.dataContainer}>
			<View style={styles.sideBySide}>
				<Text style={styles.dataTitleTxt}>Promo Codes</Text>
				<Icons.AddCircle
					width={25}
					height={25}
				/>
			</View>
			<View style={styles.giftContainer}>
				<Icons.Gift />
				<Text style={styles.giftTxt}>
					No Promo codes yet{"\n"}Tap + to add one
				</Text>
			</View>
		</View>
	);
};

export default PromoCodeSelector;
