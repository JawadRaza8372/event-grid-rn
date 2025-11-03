import { useState } from "react";
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Icons } from "../../assets/icons";
import { useThemeColors } from "../../hooks/useThemeColors";
import CustomInput from "../create-event/CustomInput";

const TicketSelector = ({ formData, setformData }) => {
	const colors = useThemeColors();
	const [ticketTier, setticketTier] = useState({
		name: "",
		price: "",
		capacity: "",
		description: "",
	});
	const ticketList = formData.ticketTiers || [];

	const handleAddTicket = () => {
		// Add the current ticket to the array
		const updatedList = [...ticketList, ticketTier];
		setformData({ ...formData, ticketTiers: updatedList });

		// Reset inputs
		setticketTier({
			name: "",
			price: "",
			capacity: "",
			description: "",
		});
	};

	const handleDeleteTicket = (index) => {
		const updatedList = ticketList.filter((_, i) => i !== index);
		setformData({ ...formData, ticketTiers: updatedList });
	};
	const isAddDisabled =
		!ticketTier.name.trim() ||
		!ticketTier.price.trim() ||
		!ticketTier.capacity.trim();
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
		addBtn: {
			opacity: isAddDisabled ? 0.3 : 1,
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
		sepratorComp: {
			width: "100%",
			height: 1,
			marginVertical: 5,
		},
	});

	return (
		<View style={styles.dataContainer}>
			<View style={styles.sideBySide}>
				<Text style={styles.dataTitleTxt}>Ticket Tiers</Text>
				<TouchableOpacity
					style={styles.addBtn}
					disabled={isAddDisabled}
					onPress={handleAddTicket}>
					<Icons.AddCircle
						width={25}
						height={25}
					/>
				</TouchableOpacity>
			</View>

			<CustomInput
				title={"Ticket Name"}
				value={ticketTier.name}
				onChangeValue={(value) => setticketTier({ ...ticketTier, name: value })}
				placeHolder="Select Ticket Name"
			/>
			<View style={styles.sideBySide}>
				<CustomInput
					inputWidth={"49%"}
					title={"Price ($)"}
					value={ticketTier.price}
					onChangeValue={(value) =>
						setticketTier({ ...ticketTier, price: value })
					}
					placeHolder={"80"}
				/>
				<CustomInput
					inputWidth={"49%"}
					title={"Capacity"}
					value={ticketTier.capacity}
					onChangeValue={(value) =>
						setticketTier({ ...ticketTier, capacity: value })
					}
					placeHolder={"100"}
				/>
			</View>
			<CustomInput
				title={"Description (optional)"}
				value={ticketTier.description}
				onChangeValue={(value) =>
					setticketTier({ ...ticketTier, description: value })
				}
				placeHolder={"Standard entry ticket"}
			/>
			{ticketList.length > 0 && (
				<FlatList
					data={ticketList}
					ItemSeparatorComponent={<View style={styles.sepratorComp} />}
					keyExtractor={(_, index) => index.toString()}
					renderItem={({ item, index }) => (
						<View style={styles.ticketCard}>
							<View style={styles.ticketTextCont}>
								<Text style={styles.ticketTitleTxt}>{item.name}</Text>
								<View style={styles.sideBySide}>
									<Text style={styles.ticketText}>
										<Text style={{ fontWeight: "700" }}>Price:</Text> $
										{item.price}
									</Text>
									<Text style={styles.ticketText}>
										<Text style={{ fontWeight: "700" }}>Capacity:</Text>{" "}
										{item.capacity}
									</Text>
								</View>
							</View>

							<TouchableOpacity
								style={styles.deleteBtn}
								onPress={() => handleDeleteTicket(index)}>
								<Icons.DeleteRed
									width={20}
									height={20}
								/>
							</TouchableOpacity>
						</View>
					)}
				/>
			)}
		</View>
	);
};

export default TicketSelector;
