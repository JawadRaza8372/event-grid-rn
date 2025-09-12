import { StyleSheet, Text, View } from "react-native";
import { useThemeColors } from "../../hooks/useThemeColors";

const TicketOverview = ({ price, capcity, types }) => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		sideBySideView: {
			width: "100%",
			height: "auto",
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			gap: 10,
		},
		itemView: {
			height: "auto",
			flex: 1,
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			gap: 10,
		},
		labelTxt: {
			fontSize: 11,
			fontWeight: "400",
			color: colors.createInputLabelColor,
			textAlign: "center",
		},
		valueTxt: {
			fontSize: 12,
			fontWeight: "600",
			color: colors.blackColor,
			textAlign: "center",
		},
	});
	return (
		<View style={styles?.sideBySideView}>
			<View style={styles.itemView}>
				<Text style={styles.labelTxt}>Total Capcity</Text>
				<Text style={styles.valueTxt}>{capcity ?? 0}</Text>
			</View>
			<View style={styles.itemView}>
				<Text style={styles.labelTxt}>Price Range</Text>
				<Text style={styles.valueTxt}>${price ?? 0}</Text>
			</View>
			<View style={styles.itemView}>
				<Text style={styles.labelTxt}>Ticket Types</Text>
				<Text style={styles.valueTxt}>{types ?? 0}</Text>
			</View>
		</View>
	);
};

export default TicketOverview;
