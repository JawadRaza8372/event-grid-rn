import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icons } from "../../assets/icons";
import { useThemeColors } from "../../hooks/useThemeColors";

const PromoSelectorItem = ({ value, type, deletePromoCode, code }) => {
	const colors = useThemeColors();

	const styles = StyleSheet.create({
		sideBySide: {
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			flexDirection: "row",
		},
		ticketTitleTxt: {
			fontSize: 14,
			fontWeight: "500",
			color: colors.dataTitleColor,
			marginBottom: 5,
			textTransform: "capitalize",
		},
		deleteBtn: {
			width: 35,
			height: 35,
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-end",
			flexDirection: "row",
		},

		ticketTextCont: {
			height: "auto",
			flex: 1,
			display: "flex",
			flexDirection: "column",
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
			fontSize: 12,
			fontWeight: "500",
			color: colors.createInputLabelColor,
			textTransform: "capitalize",
		},
	});
	return (
		<View style={styles.ticketCard}>
			<View style={styles.ticketTextCont}>
				{code ? (
					<Text style={styles.ticketTitleTxt}>
						<Text style={{ fontWeight: "700" }}>Promo Code:</Text> {code}
					</Text>
				) : null}
				<View style={styles.sideBySide}>
					<Text style={styles.ticketText}>
						<Text
							style={{
								fontWeight: "700",
							}}>
							Discount Type:
						</Text>
						{type}
					</Text>
					<Text style={styles.ticketText}>
						<Text style={{ fontWeight: "700" }}>Discount Value:</Text> {value}
					</Text>
				</View>
			</View>

			{deletePromoCode ? (
				<TouchableOpacity
					style={styles.deleteBtn}
					onPress={deletePromoCode}>
					<Icons.DeleteRed
						width={20}
						height={20}
					/>
				</TouchableOpacity>
			) : null}
		</View>
	);
};

export default PromoSelectorItem;

const styles = StyleSheet.create({});
