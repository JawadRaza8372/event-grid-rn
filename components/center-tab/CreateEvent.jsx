import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icons } from "../../assets/icons";
import { useThemeColors } from "../../hooks/useThemeColors";
import AuthLayout from "../AuthLayout";
import BottomButtons from "../create-event/BottomButtons";
import CategorySelector from "../create-event/CategorySelector";
import CustomDatePicker from "../create-event/CustomDatePicker";
import CustomDescription from "../create-event/CustomDescription";
import CustomInput from "../create-event/CustomInput";
import CustomLocationInput from "../create-event/CustomLocationInput";
import CustomTimePicker from "../create-event/CustomTimePicker";
import TicketOverview from "../create-event/TicketOverview";
import SideTopBar from "../SideTopBar";
const CreateEvent = () => {
	const totalSteps = 2;
	const [currentStep, setcurrentStep] = useState(0);
	const [formData, setformData] = useState({
		title: "",
		category: "",
		location: "",
		date: new Date(),
		fromTime: new Date(),
		toTime: new Date(),
		description: "",
		ticketName: "",
		capacity: "",
		price: "",
		ticketDescription: "",
	});
	const stepsHandler = () => {
		if (currentStep < 1) {
			setcurrentStep(currentStep + 1);
		} else if (currentStep > 0) {
			setcurrentStep(currentStep - 1);
		} else {
			router.back();
		}
	};
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		topContainer: {
			width: "100%",
			display: "flex",
			flexDirection: "column",
		},
		stepsIndicator: {
			fontSize: 13,
			fontWeight: "400",
			color: colors.dateTxt,
			marginLeft: 50,
			marginTop: -7,
		},
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
		bottomPadding: {
			width: "100%",
			height: 80,
		},
		sideBySide: {
			width: "100%",
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
		<AuthLayout hideBgImg={true}>
			<>
				<View style={styles.topContainer}>
					<SideTopBar
						title={"Create Event"}
						isTailIcon={true}
					/>
					<Text style={styles.stepsIndicator}>
						Step {currentStep + 1} of {totalSteps}
					</Text>
				</View>
				{currentStep === 0 ? (
					<>
						<View style={styles.dataContainer}>
							<Text style={styles.dataTitleTxt}>Basic Information</Text>
							<CustomInput
								title={"Event Title"}
								value={formData.title}
								onChangeValue={(value) =>
									setformData({ ...formData, title: value })
								}
								placeHolder={"Enter Event Name"}
							/>
							<CategorySelector
								title={"Category"}
								value={formData.category}
								onChangeValue={(value) =>
									setformData({ ...formData, category: value })
								}
								options={["Music", "Art", "Workshop", "Tech"]}
							/>
							<CustomLocationInput
								title={"Location"}
								placeHolder={"Enter event location"}
								value={formData.location}
								onChangeValue={(text) =>
									setformData({ ...formData, location: text })
								}
							/>
						</View>
						<View style={styles.dataContainer}>
							<Text style={styles.dataTitleTxt}>Date & Time</Text>
							<CustomDatePicker
								title={"Event Date"}
								value={formData.date}
								onChangeValue={(value) =>
									setformData({ ...formData, date: value })
								}
							/>
							<View style={styles.sideBySide}>
								<CustomTimePicker
									width={"49%"}
									title={"Start Time"}
									value={formData.fromTime}
									onChangeValue={(value) =>
										setformData({ ...formData, fromTime: value })
									}
								/>
								<CustomTimePicker
									width={"49%"}
									title={"End Time"}
									value={formData.toTime}
									onChangeValue={(value) =>
										setformData({ ...formData, toTime: value })
									}
								/>
							</View>
						</View>
						<View style={styles.dataContainer}>
							<Text style={styles.dataTitleTxt}>Description</Text>
							<CustomDescription
								value={formData.description}
								onChangeValue={(text) =>
									setformData({ ...formData, description: text })
								}
							/>
						</View>
					</>
				) : (
					<>
						<View style={styles.dataContainer}>
							<Text style={styles.dataTitleTxt}>Ticket Overview</Text>
							<TicketOverview
								capcity={100}
								price={50}
								types={2}
							/>
						</View>
						<View style={styles.dataContainer}>
							<Text style={styles.dataTitleTxt}>Ticket Tiers</Text>
							<CustomInput
								title={"Ticket Name"}
								value={formData.ticketName}
								onChangeValue={(value) =>
									setformData({ ...formData, ticketName: value })
								}
								placeHolder={"General Admission"}
							/>
							<View style={styles.sideBySide}>
								<CustomInput
									inputWidth={"49%"}
									title={"Price ($)"}
									value={formData.price}
									onChangeValue={(value) =>
										setformData({ ...formData, price: value })
									}
									placeHolder={"80"}
								/>
								<CustomInput
									inputWidth={"49%"}
									title={"Capacity"}
									value={formData.capacity}
									onChangeValue={(value) =>
										setformData({ ...formData, capacity: value })
									}
									placeHolder={"100"}
								/>
							</View>
							<CustomInput
								title={"Description (optional)"}
								value={formData.ticketDescription}
								onChangeValue={(value) =>
									setformData({ ...formData, ticketDescription: value })
								}
								placeHolder={"Standard entry ticket"}
							/>
						</View>
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
						<View style={styles.dataContainer}>
							<Text style={styles.dataTitleTxt}>Pricing Preview</Text>
							<View style={styles.sideBySide}>
								<Text style={styles.labelTxt}>1 Ticket (Economy)</Text>
								<Text
									numberOfLines={1}
									ellipsizeMode="tail"
									style={styles.labelValue}>
									$50.00
								</Text>
							</View>
							<View style={styles.sideBySide}>
								<Text style={styles.labelTxt}>Tax</Text>
								<Text
									numberOfLines={1}
									ellipsizeMode="tail"
									style={styles.labelValue}>
									$5.00
								</Text>
							</View>
							<View style={styles.borderedView} />
							<View style={styles.sideBySide}>
								<Text style={styles.labelTxt}>Total</Text>
								<Text
									numberOfLines={1}
									ellipsizeMode="tail"
									style={styles.labelValue}>
									$55.00
								</Text>
							</View>
						</View>
					</>
				)}

				<BottomButtons
					onCancelFun={stepsHandler}
					onNextFun={stepsHandler}
				/>
				<View style={styles.bottomPadding} />
			</>
		</AuthLayout>
	);
};

export default CreateEvent;
