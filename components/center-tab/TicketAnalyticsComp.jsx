import { StyleSheet, Text, View } from "react-native";
import { useThemeColors } from "../../hooks/useThemeColors";

const TicketAnalyticsComp = ({
	name,
	price,
	capacity,
	remainingTickets,
	revenue,
	soldTickets,
}) => {
	const colors = useThemeColors();

	const styles = StyleSheet.create({
		ticketTitleTxt: {
			fontSize: 16,
			fontWeight: "700",
			color: colors.dataTitleColor,
			marginBottom: 5,
			textTransform: "capitalize",
		},
		revenueTxt: {
			fontSize: 14,
			fontWeight: "500",
			color: colors.greenTxt,
			textTransform: "capitalize",
			marginTop: 5,
		},
		sideBySide: {
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			flexDirection: "row",
		},

		ticketCard: {
			width: "100%",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			borderWidth: 1,
			borderColor: colors.dateBorder,
			borderRadius: 10,
			padding: 10,
		},
		ticketText: {
			width: "49%",
			fontSize: 11,
			fontWeight: "500",
			color: colors.createInputLabelColor,
		},
		ticketTextCont: {
			height: "auto",
			flex: 1,
			display: "flex",
			flexDirection: "column",
		},
		deleteBtn: {
			width: 35,
			height: 35,
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-end",
			flexDirection: "row",
		},
	});
	return (
		<View style={styles.ticketCard}>
			<View style={styles.ticketTextCont}>
				<Text style={styles.ticketTitleTxt}>{name}</Text>
				<View style={styles.sideBySide}>
					<Text style={styles.ticketText}>
						<Text style={{ fontWeight: "700" }}>Price:</Text> ${price}
					</Text>
					<Text style={styles.ticketText}>
						<Text style={{ fontWeight: "700" }}>Capacity:</Text> {capacity}
					</Text>
				</View>
				<View style={styles.sideBySide}>
					<Text style={styles.ticketText}>
						<Text style={{ fontWeight: "700" }}>Sold Tickets:</Text>{" "}
						{soldTickets ?? 0}
					</Text>
					<Text style={styles.ticketText}>
						<Text style={{ fontWeight: "700" }}>Un-Sold Tickets:</Text>{" "}
						{remainingTickets ?? 0}
					</Text>
				</View>
				<Text style={styles.revenueTxt}>Revenue: ${revenue ?? 0}</Text>
			</View>
		</View>
	);
};

export default TicketAnalyticsComp;
