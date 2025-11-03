import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icons } from "../../assets/icons";
import { useThemeColors } from "../../hooks/useThemeColors";

const CustomDateTimePicker = ({ value, onChangeValue, title, width }) => {
	const [show, setShow] = useState(false);
	const [tempDate, setTempDate] = useState(value ?? new Date());
	const colors = useThemeColors();

	const styles = StyleSheet.create({
		mainContainer: {
			width: width ?? "100%",
			flexDirection: "column",
			gap: 7,
		},
		inputLabel: {
			fontSize: 11,
			fontWeight: "500",
			color: colors.createInputLabelColor,
			lineHeight: 20,
		},
		inputMainStyle: {
			flex: 1,
			fontSize: 12,
			fontWeight: "500",
			color: colors.authTitleColor,
		},
		inputContainer: {
			height: 38,
			borderRadius: 8,
			flexDirection: "row",
			alignItems: "center",
			borderWidth: 1,
			borderColor: colors.dateBorder,
			width: "100%",
		},
		iconContainer: {
			height: "100%",
			width: 35,
			alignItems: "center",
			justifyContent: "center",
		},
		modalContainer: {
			flex: 1,
			justifyContent: "flex-end",
			backgroundColor: colors.modalBg,
		},
		pickerBox: {
			backgroundColor: colors.mainBgColor,
			borderTopLeftRadius: 12,
			borderTopRightRadius: 12,
			padding: 10,
		},
		modalActions: {
			flexDirection: "row",
			justifyContent: "flex-end",
			marginTop: 10,
		},
		actionText: {
			marginLeft: 20,
			fontWeight: "600",
			fontSize: 16,
			color: colors.blackColor,
		},
	});

	const handleConfirm = () => {
		setShow(false);
		onChangeValue(tempDate);
	};

	return (
		<>
			<View style={styles.mainContainer}>
				<Text style={styles.inputLabel}>{title ?? ""}</Text>
				<TouchableOpacity
					onPress={() => setShow(true)}
					style={styles.inputContainer}>
					<View style={styles.iconContainer}>
						<Icons.CalendarDigit
							width={16}
							height={16}
						/>
					</View>
					<Text style={styles.inputMainStyle}>
						{value
							? moment(value).format("DD:MM:YYYY hh:mm a")
							: "--:--:-- --:-- --"}
					</Text>
				</TouchableOpacity>
			</View>

			{/* Cross-platform custom modal */}
			{show && (
				<Modal
					visible
					transparent
					animationType="slide">
					<View style={styles.modalContainer}>
						<View style={styles.pickerBox}>
							{/* Date picker */}
							<DateTimePicker
								value={tempDate}
								mode="date"
								display="spinner"
								onChange={(e, d) => d && setTempDate(d)}
								style={{ backgroundColor: "#fff" }}
							/>
							{/* Time picker */}
							<DateTimePicker
								value={tempDate}
								mode="time"
								display="spinner"
								is24Hour={false}
								onChange={(e, d) => d && setTempDate(d)}
								style={{ backgroundColor: "#fff", marginTop: 10 }}
							/>
							{/* Buttons */}
							<View style={styles.modalActions}>
								<Text
									style={styles.actionText}
									onPress={() => setShow(false)}>
									Cancel
								</Text>
								<Text
									style={styles.actionText}
									onPress={handleConfirm}>
									Done
								</Text>
							</View>
						</View>
					</View>
				</Modal>
			)}
		</>
	);
};

export default CustomDateTimePicker;
