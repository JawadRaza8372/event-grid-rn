import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { categoriesArry } from "../../constants/rawData";
import { useThemeColors } from "../../hooks/useThemeColors";
import {
	createNewEventApi,
	getTicketSummary,
	validateEventData,
} from "../../services/endpoints";
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
import TicketSelector from "./TicketSelector";
const CreateEvent = () => {
	const totalSteps = 2;
	const [currentStep, setcurrentStep] = useState(0);
	const [formData, setformData] = useState({
		title: "",
		category: "",
		location: {
			name: "",
			address: "",
			coordinates: {
				lat: 0,
				lng: 0,
			},
		},
		date: new Date(),
		fromTime: new Date(),
		toTime: new Date(),
		description: "",
		ticketTiers: [],
	});
	const resetEventFun = () => {
		setformData({
			title: "",
			category: "",
			location: {
				address: "",
				name: "",
				coordinates: {
					lat: 0,
					lng: 0,
				},
			},
			date: new Date(),
			fromTime: new Date(),
			toTime: new Date(),
			description: "",
			ticketTiers: [],
		});
		Toast.show({ type: "error", text1: "Reset Successfull." });
	};
	const nextBtnFun = () => {
		const validation = validateEventData(formData);

		if (formData.title?.length < 5) {
			Toast.show({ type: "error", text1: "Please enter valid title" });
			return;
		}
		if (formData.category?.length === 0) {
			Toast.show({ type: "error", text1: "Please select a category" });
			return;
		}
		if (
			formData.location?.name?.length === 0 ||
			formData.location?.address?.length === 0 ||
			(formData.location?.coordinates?.lat?.length === 0 &&
				formData.location?.coordinates?.lng?.length === 0)
		) {
			Toast.show({ type: "error", text1: "Please enter valid location" });
			return;
		}

		if (!validation.valid) {
			Toast.show({
				type: "error",
				text1: validation.message,
			});
			return;
		}
		if (
			formData.description?.length < 20 ||
			formData.description?.length > 500
		) {
			Toast.show({
				type: "error",
				text1: "Please enter description between 20-500 letters",
			});
			return;
		}
		setcurrentStep(currentStep + 1);
	};
	const backBtnFun = () => {
		setcurrentStep(currentStep - 1);
	};
	const result = getTicketSummary(formData);
	const submitEventFun = async () => {
		if (formData.ticketTiers.length <= 0) {
			Toast.show({
				type: "error",
				text1: "Please enter atleast one Ticket Tiers",
			});
			return;
		}
		try {
			await createNewEventApi(
				formData.title,
				formData.category,
				"Published",
				formData.location,
				formData.date,
				formData.fromTime,
				formData.toTime,
				formData.description,
				formData.ticketTiers
			);
			resetEventFun();
			Toast.show({ type: "success", text1: "Event Created successfully" });
		} catch (error) {
			Toast.show({
				type: "error",
				text1: error ?? "Create Event failed",
			});
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
			marginLeft: 3,
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
		<AuthLayout
			hideBgImg={true}
			goScrollToTop={null}>
			<>
				<View style={styles.topContainer}>
					<SideTopBar
						hideBackBtn={true}
						title={"Create Event"}
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
								options={categoriesArry}
							/>
							<CustomLocationInput
								title={"Location"}
								placeHolder={"Enter event location"}
								value={formData.location.address}
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
								capcity={result.totalCapacity}
								price={result.priceRange}
								types={result.type}
							/>
						</View>
						<TicketSelector
							formData={formData}
							setformData={setformData}
						/>
						{formData?.ticketTiers?.length > 0 ? (
							<View style={styles.dataContainer}>
								<Text style={styles.dataTitleTxt}>Pricing Preview</Text>
								<View style={styles.sideBySide}>
									<Text style={styles.labelTxt}>
										1 Ticket{" "}
										<Text style={{ textTransform: "capitalize" }}>
											({formData?.ticketTiers[0]?.name})
										</Text>
									</Text>
									<Text
										numberOfLines={1}
										ellipsizeMode="tail"
										style={styles.labelValue}>
										${formData?.ticketTiers[0]?.price}
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
										${parseFloat(formData?.ticketTiers[0]?.price) + 5}
									</Text>
								</View>
							</View>
						) : null}
					</>
				)}

				<BottomButtons
					onBackFun={backBtnFun}
					onNextFun={nextBtnFun}
					onResetFun={resetEventFun}
					onSubmitFun={submitEventFun}
					showfirstPair={currentStep === 0}
				/>
				<View style={styles.bottomPadding} />
			</>
		</AuthLayout>
	);
};

export default CreateEvent;
