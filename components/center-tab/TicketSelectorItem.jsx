import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icons } from "../../assets/icons";
import { useThemeColors } from "../../hooks/useThemeColors";

const TicketSelectorItem = ({ name, price, capacity, deleteTicketTier }) => {
	const colors = useThemeColors();

	const styles = StyleSheet.create({
		ticketTitleTxt: {
			fontSize: 14,
			fontWeight: "500",
			color: colors.dataTitleColor,
			marginBottom: 5,
			textTransform: "capitalize",
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
			height: 35,
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
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
			</View>

			{deleteTicketTier ? (
				<TouchableOpacity
					style={styles.deleteBtn}
					onPress={deleteTicketTier}>
					<Icons.DeleteRed
						width={20}
						height={20}
					/>
				</TouchableOpacity>
			) : null}
		</View>
	);
};

export default TicketSelectorItem;
