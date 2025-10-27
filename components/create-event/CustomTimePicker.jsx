import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { useState } from "react";
import {
	Modal,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Icons } from "../../assets/icons";
import { useThemeColors } from "../../hooks/useThemeColors";

const CustomTimePicker = ({ width, value, onChangeValue, title }) => {
	const [show, setShow] = useState(false);
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
			backgroundColor: colors.createEventInputBg,
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
			backgroundColor: "rgba(0,0,0,0.4)",
		},
		pickerBox: {
			backgroundColor: "#fff",
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
			color: "#007AFF",
		},
	});

	const handleChange = (event, selectedDate) => {
		if (Platform.OS === "android") {
			setShow(false); // Android closes automatically
			if (event.type !== "dismissed" && selectedDate) {
				onChangeValue(selectedDate);
			}
		} else {
			if (selectedDate) {
				onChangeValue(selectedDate);
			}
		}
	};

	return (
		<>
			<View style={styles.mainContainer}>
				<Text style={styles.inputLabel}>{title ?? ""}</Text>
				<TouchableOpacity
					onPress={() => setShow(true)}
					style={styles.inputContainer}>
					<View style={styles.iconContainer}>
						<Icons.Time
							width={16}
							height={16}
						/>
					</View>
					<Text style={styles.inputMainStyle}>
						{value ? moment(value).format("hh:mm a") : "--:-- --"}
					</Text>
				</TouchableOpacity>
			</View>

			{/* Android: DateTimePicker itself opens a modal */}
			{show && Platform.OS === "android" && (
				<DateTimePicker
					value={value ?? new Date()}
					mode="time"
					is24Hour={false}
					display="default"
					onChange={handleChange}
				/>
			)}

			{/* iOS: Custom modal with picker */}
			{Platform.OS === "ios" && (
				<Modal
					visible={show}
					transparent
					animationType="slide">
					<View style={styles.modalContainer}>
						<View style={styles.pickerBox}>
							<DateTimePicker
								value={value ?? new Date()}
								mode="time"
								display="spinner"
								onChange={handleChange}
								style={{ backgroundColor: "#fff" }}
							/>
							<View style={styles.modalActions}>
								<Text
									style={styles.actionText}
									onPress={() => setShow(false)}>
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

export default CustomTimePicker;
