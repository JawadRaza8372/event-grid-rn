import { StyleSheet, Text, View } from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";

const ShowTicket = ({
	username,
	phone,
	email,
	ticketType,
	pricePaid,
	paymentMethod,
	id,
	status,
}) => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		dataContainer: {
			borderRadius: 25,
			paddingVertical: 20,
			paddingHorizontal: 23,
			width: "100%",
			height: "auto",
			display: "flex",
			flexDirection: "column",
			gap: 20,
			backgroundColor: colors.topEventBg,
			minHeight: 120,
			marginBottom: 29,
		},
		sideBySideContainer: {
			width: "100%",
			height: "auto",
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			flexDirection: "row",
		},
		labelTxt: {
			fontSize: 12,
			fontWeight: "600",
			color: colors.successSubTxtColor,
			width: "49%",
		},
		labelValue: {
			fontSize: 12,
			fontWeight: "500",
			color: colors.authTitleColor,
			width: "49%",
			textAlign: "right",
		},
		borderedView: {
			width: "100%",
			height: 1.3,
			backgroundColor: colors.createEventInputBg,
		},
		mainContaineer: {
			width: "100%",
			display: "flex",
			flexDirection: "column",
			gap: 15,
			height: "auto",
		},
	});
	return (
		<View style={styles.mainContaineer}>
			<View style={styles.dataContainer}>
				<View style={styles.sideBySideContainer}>
					<Text style={styles.labelTxt}>Full Name</Text>
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						style={styles.labelValue}>
						{username ?? "--"}
					</Text>
				</View>
				<View style={styles.sideBySideContainer}>
					<Text style={styles.labelTxt}>Phone</Text>
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						style={styles.labelValue}>
						{phone ?? "--"}
					</Text>
				</View>
				<View style={styles.sideBySideContainer}>
					<Text style={styles.labelTxt}>Email</Text>
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						style={styles.labelValue}>
						{email ?? "--"}
					</Text>
				</View>
			</View>
			<View style={styles.dataContainer}>
				<View style={styles.sideBySideContainer}>
					<Text style={styles.labelTxt}>
						1 Ticket (
						{ticketType === "General Admission" ? "Economy" : ticketType})
					</Text>
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						style={styles.labelValue}>
						${pricePaid ?? 0}
					</Text>
				</View>
				<View style={styles.borderedView} />
				<View style={styles.sideBySideContainer}>
					<Text style={styles.labelTxt}>Total</Text>
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						style={styles.labelValue}>
						${pricePaid ?? 0}
					</Text>
				</View>
			</View>
			<View style={styles.dataContainer}>
				<View style={styles.sideBySideContainer}>
					<Text style={styles.labelTxt}>Payment Method</Text>
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						style={{ ...styles.labelValue, textTransform: "capitalize" }}>
						{paymentMethod ?? "-"}
					</Text>
				</View>
				<View style={styles.sideBySideContainer}>
					<Text style={styles.labelTxt}>Order ID</Text>
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						style={styles.labelValue}>
						{id ?? "-"}
					</Text>
				</View>
				<View style={styles.borderedView} />
				<View style={styles.sideBySideContainer}>
					<Text style={styles.labelTxt}>Status</Text>
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						style={{ ...styles.labelValue, textTransform: "capitalize" }}>
						{status ?? "Null"}
					</Text>
				</View>
			</View>
		</View>
	);
};

export default ShowTicket;
