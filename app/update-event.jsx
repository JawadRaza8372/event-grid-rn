import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import AuthLayout from "../components/AuthLayout";
import BannerUpload from "../components/BannerUpload";
import TicketSelector from "../components/center-tab/TicketSelector";
import BottomButtons from "../components/create-event/BottomButtons";
import CategorySelector from "../components/create-event/CategorySelector";
import CustomDatePicker from "../components/create-event/CustomDatePicker";
import CustomDescription from "../components/create-event/CustomDescription";
import CustomInput from "../components/create-event/CustomInput";
import CustomLocationInput from "../components/create-event/CustomLocationInput";
import CustomTimePicker from "../components/create-event/CustomTimePicker";
import TicketOverview from "../components/create-event/TicketOverview";
import GalleryUpload from "../components/GalleryUpload";
import LoadingView from "../components/LoadingView";
import SideTopBar from "../components/SideTopBar";
import { categoriesArry } from "../constants/rawData";
import { useThemeColors } from "../hooks/useThemeColors";
import {
	getEventByIdApi,
	getTicketSummary,
	updateEventApi,
	uploadImageApi,
	validateEventData,
} from "../services/endpoints";
const UpdateEvent = () => {
	const { eventId } = useLocalSearchParams();
	console.log("check my event Id", eventId);
	const totalSteps = 2;
	const [currentStep, setcurrentStep] = useState(0);
	const [isLoading, setisLoading] = useState(false);
	const [isScroll, setisScroll] = useState(false);
	const [formData, setformData] = useState({
		bannerImage: "",
		galleryImage: [],
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
		fromTime: new Date(),
		toTime: new Date(),
		description: "",
		ticketTiers: [],
	});
	const fetchEventWithIdFun = async () => {
		try {
			setisLoading(true);
			const result = await getEventByIdApi(eventId);
			setformData({
				bannerImage: result?.bannerImage,
				galleryImage: result?.galleryImages,
				title: result?.title,
				category: result?.category,
				location: {
					address: result?.location?.address,
					name: result?.location?.name,
					coordinates: {
						lat: result?.location?.coordinates?.lat,
						lng: result?.location?.coordinates?.lng,
					},
				},
				fromTime: new Date(result?.startTime),
				toTime: new Date(result?.endTime),
				description: result?.description,
				ticketTiers: result?.ticketTiers,
			});
			setisLoading(false);
		} catch (error) {
			setisLoading(false);
			console.log("getEventById error", error);
		}
	};
	useEffect(() => {
		if (eventId) {
			fetchEventWithIdFun();
		}
	}, [eventId]);

	const resetEventFun = async () => {
		await fetchEventWithIdFun();
		setisScroll(true);
		setisLoading(false);
		Toast.show({ type: "success", text1: "Reset Successfull." });
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
	const onSaveBtnClick = async () => {
		if (formData.ticketTiers.length <= 0) {
			Toast.show({
				type: "error",
				text1: "Please enter atleast one Ticket Tiers",
			});
			return;
		}
		try {
			setisLoading(true);
			await mainSubmitFun();
			setisLoading(false);
			Toast.show({
				type: "success",
				text1: "Event Updated.",
			});
		} catch (error) {
			setisLoading(false);
			console.log("show update error", error);
			Toast.show({
				type: "error",
				text1: error ?? "Event Update failed",
			});
		}
	};
	const mainSubmitFun = async () => {
		let uploadedBannerUrl = formData.bannerImage;
		let uploadedGalleryUrls = formData.galleryImage;

		// 🔹 Upload banner image if it's a local file
		if (formData.bannerImage && formData.bannerImage.startsWith("file://")) {
			const result = await uploadImageApi(formData.bannerImage, "event-banner");
			uploadedBannerUrl = result?.imageUrl;
		}

		// 🔹 Upload gallery images concurrently if any are local
		if (formData.galleryImage.length > 0) {
			const uploadPromises = formData.galleryImage.map(async (img) => {
				if (img.startsWith("file://")) {
					const result = await uploadImageApi(img, "event-gallery");
					return result?.imageUrl;
				}
				return img;
			});

			uploadedGalleryUrls = await Promise.all(uploadPromises);
		}
		await updateEventApi(
			eventId,
			formData.title,
			formData.category,
			formData.location,
			formData.fromTime,
			formData.toTime,
			formData.description,
			formData.ticketTiers,
			uploadedBannerUrl,
			uploadedGalleryUrls
		);
		setcurrentStep(0);
		setisScroll(true);
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
			marginLeft: 45,
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
		mainContainer: {
			width: "100%",
			height: "100%",
			backgroundColor: colors.mainBgColor,
		},
	});
	useEffect(() => {
		if (isScroll) {
			setisScroll(false);
		}
	}, [isScroll]);
	return (
		<AuthLayout
			hideBgImg={true}
			goScrollToTop={isScroll}>
			<>
				<View style={styles.topContainer}>
					<SideTopBar
						hideBackBtn={false}
						title={"Update Event"}
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
							<Text style={styles.dataTitleTxt}>Event Media</Text>
							<BannerUpload
								value={formData.bannerImage}
								onChange={(value) =>
									setformData({ ...formData, bannerImage: value })
								}
								title={"Banner Image"}
							/>
							<GalleryUpload
								value={formData.galleryImage}
								onChange={(value) =>
									setformData({
										...formData,
										galleryImage: value,
									})
								}
								title={"Event Gallery Images"}
							/>
						</View>
						<View style={styles.dataContainer}>
							<Text style={styles.dataTitleTxt}>Date & Time</Text>
							<View style={styles.sideBySide}>
								<CustomDatePicker
									width={"49%"}
									title={"Start Date"}
									value={formData.fromTime}
									onChangeValue={(value) =>
										setformData({ ...formData, fromTime: value })
									}
								/>
								<CustomTimePicker
									width={"49%"}
									title={"Start Time"}
									value={formData.fromTime}
									onChangeValue={(value) =>
										setformData({ ...formData, fromTime: value })
									}
								/>
							</View>
							<View style={styles.sideBySide}>
								<CustomDatePicker
									width={"49%"}
									title={"End Date"}
									value={formData.toTime}
									onChangeValue={(value) =>
										setformData({ ...formData, toTime: value })
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
					onSubmitFun={onSaveBtnClick}
					showfirstPair={currentStep === 0}
				/>
				<View style={styles.bottomPadding} />
				<LoadingView loading={isLoading} />
			</>
		</AuthLayout>
	);
};

export default UpdateEvent;
