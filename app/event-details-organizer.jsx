import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
	Dimensions,
	FlatList,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import Toast from "react-native-toast-message";
import { Icons } from "../assets/icons";
import AddStaffInputField from "../components/AddStaffInputField";
import PromoSelectorItem from "../components/center-tab/PromoSelectorItem";
import TicketAnalyticsComp from "../components/center-tab/TicketAnalyticsComp";
import TicketSelectorItem from "../components/center-tab/TicketSelectorItem";
import EmptyComponent from "../components/EmptyComponent";
import EventAttendeComp from "../components/EventAttendeComp";
import EventDetailOverView from "../components/EventDetailOverView";
import EventStaffComp from "../components/EventStaffComp";
import EventTopImageScoll from "../components/EventTopImageScoll";
import LoadingView from "../components/LoadingView";
import MapContainer from "../components/MapContainer";
import TabContainer from "../components/TabContainer";
import YesNoModal from "../components/YesNoModal";
import { useThemeColors } from "../hooks/useThemeColors";
import {
	getEventByIdApi,
	inviteStaffToEventApi,
	isValidEmailFun,
	markTicketAsInvalidApi,
	markTicketAsUsedApi,
} from "../services/endpoints";
const EventDetails = () => {
	const eventId = useLocalSearchParams()?.eventId;
	const [eventData, seteventData] = useState(null);
	const [isLoading, setisLoading] = useState(false);
	const [eventAnalytics, seteventAnalytics] = useState(null);
	const [eventAttendees, seteventAttendees] = useState(null);
	const [eventStaffMemnbers, seteventStaffMemnbers] = useState([]);
	const [selectedInfoType, setSelectedInfoType] = useState("General");
	const [staffEnteredEmail, setstaffEnteredEmail] = useState("");
	const colors = useThemeColors();
	const [openDeleteModal, setopenDeleteModal] = useState(null);
	const [openUsedModal, setopenUsedModal] = useState(null);
	const removeOpenDeleteModal = () => {
		setopenDeleteModal(null);
	};
	const removeOpenUsedModal = () => {
		setopenUsedModal(null);
	};
	const fetchEventWithIdFun = async () => {
		try {
			setisLoading(true);
			const result = await getEventByIdApi(eventId);
			seteventData(result?.event);
			seteventAnalytics(result?.analytics);
			seteventAttendees(result?.attendees);
			seteventStaffMemnbers(result?.staffMembers);
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
	const markSelectedTicketAsUsed = async () => {
		try {
			if (openUsedModal === null) {
				Toast.show({
					type: "error",
					text1: "Invalid Ticket selected.",
				});
				return;
			}
			setisLoading(true);
			await markTicketAsUsedApi(eventId, openUsedModal);
			await fetchEventWithIdFun();
			setisLoading(false);
			removeOpenUsedModal();

			Toast.show({
				type: "success",
				text1: "Ticket marked used successfully.",
			});
		} catch (error) {
			console.log("marking ticket used error: ", error);
			setisLoading(false);
			Toast.show({
				type: "error",
				text1: error ?? "Marking ticket used failed.",
			});
		}
	};
	const markSelectedTicketAsInvalid = async () => {
		try {
			if (openDeleteModal === null) {
				Toast.show({
					type: "error",
					text1: "Invalid Ticket selected.",
				});
				return;
			}
			setisLoading(true);
			await markTicketAsInvalidApi(eventId, openDeleteModal);
			await fetchEventWithIdFun();
			setisLoading(false);
			removeOpenDeleteModal();

			Toast.show({
				type: "success",
				text1: "Ticket marked invalid successfully.",
			});
		} catch (error) {
			console.log("marking ticket invalid error: ", error);
			setisLoading(false);
			Toast.show({
				type: "error",
				text1: error ?? "Marking ticket invalid failed.",
			});
		}
	};
	const addStaffMembersFun = async () => {
		try {
			if (!isValidEmailFun(staffEnteredEmail)) {
				Toast.show({
					type: "error",
					text1: "Please enter valid email",
				});
				return;
			}
			setisLoading(true);
			await inviteStaffToEventApi(eventId, staffEnteredEmail);
			await fetchEventWithIdFun();
			setisLoading(false);
			setstaffEnteredEmail("");
			Toast.show({
				type: "success",
				text1: "Staff member added successfully.",
			});
		} catch (error) {
			console.log("adding staff error: ", error);
			setisLoading(false);
			Toast.show({
				type: "error",
				text1: error ?? "Adding Staff failed.",
			});
		}
	};
	const styles = StyleSheet.create({
		mainContainer: {
			width: "100%",
			height: "100%",
			backgroundColor: colors.mainBgColor,
		},
		imageContainer: {
			width: "100%",
			height: "auto",
			position: "relative",
			backgroundColor: colors.scannerBg,
		},
		imageContainerView: {
			width: Dimensions.get("screen").width,
			height: Dimensions.get("screen").height / 2.8,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: colors.dateBorder,
		},
		imageStyle: {
			width: "100%",
			height: "100%",
			resizeMode: "cover",
		},

		bottmIndicator: {
			bottom: 0,
			left: 0,
			zIndex: 20,
			position: "absolute",
			width: "100%",
			height: 60,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
			gap: 3,
		},
		activeIndicatorView: {
			width: 28,
			height: 10,
			borderRadius: 10,
			backgroundColor: colors.blackColor,
		},
		indicatorView: {
			width: 10,
			height: 10,
			borderRadius: 10,
			backgroundColor: colors.inActiveColor,
		},
		childContainer: {
			width: Dimensions.get("screen").width - 42,
			alignSelf: "center",
			flex: 1,
		},
		eventDescriptionTxt: {
			marginTop: 14,
			marginBottom: 19,
			fontSize: 12,
			lineHeight: 20,
			fontWeight: "400",
			color: colors.blackColor,
			letterSpacing: 0.5,
		},
		locationText: {
			fontSize: 12,
			fontWeight: "400",
			lineHeight: 20,
			color: colors.blackColor,
		},
		locationView: {
			height: "auto",
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			gap: 9,
			marginTop: 14,
		},
		headingTxt: {
			width: "100%",
			fontSize: 20,
			fontWeight: "600",
			color: colors.dataTitleColor,
		},
		eventNameTxt: {
			marginTop: 29,
			marginBottom: 18,
			width: "100%",
			fontSize: 24,
			fontWeight: "600",
			color: colors.dataTitleColor,
		},
		categoryTxt: {
			fontSize: 7,
			fontWeight: "400",
			color: colors.blackColor,
		},
		categoryView: {
			height: 22,
			paddingHorizontal: 14,
			alignSelf: "flex-start",
			borderWidth: 1,
			borderColor: colors.blackColor,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			borderRadius: 5,
		},
		borderedView: {
			width: "100%",
			marginVertical: 22,
			height: 1,
			backgroundColor: colors.noBtnBg,
		},
		botomPadding: {
			width: "100%",
			height: 100,
		},
		sepratorView: {
			width: "100%",
			height: 1,
			marginVertical: 5,
		},
		tabContainerView: {
			width: "100%",
			marginVertical: 20,
		},
		upperMainContainer: {
			width: Dimensions.get("screen").width - 48,
			alignSelf: "center",
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			flexDirection: "row",
			flexWrap: "wrap",
			gap: 12,
			marginBottom: 20,
		},
		valueContainer: {
			width: (Dimensions.get("screen").width - 48 - 12) / 2,
			paddingVertical: 40,
			paddingHorizontal: 21,
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			borderRadius: 15,
			backgroundColor: colors.topEventBg,
			gap: 12,
		},
		labelTxt: {
			fontSize: 16,
			fontWeight: "600",
			lineHeight: 20,
			color: colors.blackColor,
		},
		valueTxt: {
			fontSize: 16,
			fontWeight: "500",
			color: colors.dataTitleColor,
		},
		staffContainer: {
			width: "100%",
			display: "flex",
			flexDirection: "column",
			gap: 10,
			marginBottom: 10,
		},
	});

	return (
		<View style={styles.mainContainer}>
			{!isLoading && eventData ? (
				<ScrollView showsVerticalScrollIndicator={false}>
					<EventTopImageScoll imageLinks={eventData?.galleryImages} />
					<View style={styles.childContainer}>
						<Text style={styles.eventNameTxt}>{eventData?.title ?? ""}</Text>
						<View style={styles.categoryView}>
							<Text style={styles.categoryTxt}>
								{eventData?.category ?? ""}
							</Text>
						</View>
						<View style={styles.tabContainerView}>
							<TabContainer
								borderColor={colors.dateBorder}
								inActiveBg={colors.bellBorder}
								inActiveTxtColor={colors.blackColor}
								value={selectedInfoType}
								onchange={(text) => setSelectedInfoType(text)}
								options={["General", "Analytics", "Attendees", "Staff"]}
							/>
						</View>
						{selectedInfoType === "General" ? (
							<>
								<View style={styles.borderedView} />
								<EventDetailOverView
									date={eventData?.date}
									location={eventData?.location?.name}
									locationDesc={eventData?.location?.address}
									priceRange={eventData?.ticketOverview?.priceRange}
									time={eventData?.time}
								/>
								<View style={styles.borderedView} />
								<Text style={styles.headingTxt}>Ticket Tiers</Text>
								<FlatList
									ListHeaderComponent={<View style={styles.sepratorView} />}
									data={eventData?.ticketTiers}
									ItemSeparatorComponent={() => (
										<View style={styles.sepratorView} />
									)}
									ListEmptyComponent={
										<EmptyComponent title={"No Ticket Tiers"} />
									}
									keyExtractor={(item, index) => item?._id}
									renderItem={({ item }) => (
										<TicketSelectorItem
											capacity={item.capacity}
											name={item.name}
											price={item.price}
										/>
									)}
								/>
								<View style={styles.borderedView} />
								<Text style={styles.headingTxt}>Promo Codes</Text>
								<FlatList
									ListHeaderComponent={<View style={styles.sepratorView} />}
									ItemSeparatorComponent={() => (
										<View style={styles.sepratorView} />
									)}
									ListEmptyComponent={
										<EmptyComponent title={"No Promo Codes"} />
									}
									data={eventData?.promoCodes}
									keyExtractor={(item, index) => index.toString()}
									renderItem={({ item }) => (
										<PromoSelectorItem
											type={item?.discountType}
											value={item?.discountValue}
											code={item?.code}
										/>
									)}
								/>
								<View style={styles.borderedView} />
								<Text style={styles.headingTxt}>About Event</Text>
								<Text style={styles.eventDescriptionTxt}>
									{eventData?.description ?? ""}
								</Text>
								<Text style={styles.headingTxt}>Location</Text>
								<View style={styles.locationView}>
									<Icons.PinFat />
									<Text style={styles.locationText}>
										{eventData?.location?.address}
									</Text>
								</View>
								<MapContainer
									isNotBtn={true}
									location={eventData?.location?.address}
									coordinates={eventData?.location?.coordinates}
								/>
							</>
						) : selectedInfoType === "Analytics" ? (
							<>
								<FlatList
									ListHeaderComponent={
										<View style={styles.upperMainContainer}>
											<View style={styles.valueContainer}>
												<Icons.CoinsDollar />
												<View style={styles.childContainer}>
													<Text style={styles.labelTxt}>Revenue</Text>
													<Text style={styles.valueTxt}>
														{eventAnalytics?.totalRevenue ?? 0}
													</Text>
												</View>
											</View>
											<View style={styles.valueContainer}>
												<Icons.Ticket
													width={25}
													height={25}
												/>
												<View style={styles.childContainer}>
													<Text style={styles.labelTxt}>Sold Tickets</Text>
													<Text style={styles.valueTxt}>
														{eventAnalytics?.totalTicketsSold ?? 0}
													</Text>
												</View>
											</View>
											<View style={styles.valueContainer}>
												<Icons.CalendarDigit />
												<View style={styles.childContainer}>
													<Text style={styles.labelTxt}>Ticket Tiers</Text>
													<Text style={styles.valueTxt}>
														{eventAnalytics?.tierBreakdown?.length ?? 0}
													</Text>
												</View>
											</View>
											<View style={styles.valueContainer}>
												<Icons.Eye />
												<View style={styles.childContainer}>
													<Text style={styles.labelTxt}>Views</Text>
													<Text style={styles.valueTxt}>
														{eventAnalytics?.totalViews ?? 0}
													</Text>
												</View>
											</View>
										</View>
									}
									data={eventAnalytics?.tierBreakdown}
									ItemSeparatorComponent={() => (
										<View style={styles.sepratorView} />
									)}
									ListEmptyComponent={
										<EmptyComponent title={"No ticket tiers"} />
									}
									keyExtractor={(item, index) => index.toString()}
									renderItem={({ item, index }) => (
										<TicketAnalyticsComp
											remainingTickets={item?.remaining}
											revenue={item?.revenue}
											soldTickets={item?.ticketsSold}
											capacity={item?.capacity}
											name={item?.name}
											price={item?.price}
										/>
									)}
								/>
							</>
						) : selectedInfoType === "Attendees" ? (
							<>
								<FlatList
									data={eventAttendees}
									ItemSeparatorComponent={() => (
										<View style={styles.sepratorView} />
									)}
									keyExtractor={(item, index) => item?.ticketId}
									ListEmptyComponent={
										<EmptyComponent title={"No  Attendees"} />
									}
									renderItem={({ item, index }) => (
										<EventAttendeComp
											markTicketAsInvalidFun={() =>
												setopenDeleteModal(item?.ticketId)
											}
											markTicketAsUsedFun={() =>
												setopenUsedModal(item?.ticketId)
											}
											key={item?.ticketId}
											status={item?.status}
											email={item?.owner?.email}
											name={item?.owner?.name}
											profileImage={item?.owner?.profileImage}
											quantity={item?.quantity}
											ticketType={item?.ticketTier}
										/>
									)}
								/>
							</>
						) : selectedInfoType === "Staff" ? (
							<>
								<FlatList
									ListHeaderComponent={
										<View style={styles.staffContainer}>
											<AddStaffInputField
												value={staffEnteredEmail}
												onChangeValue={(text) =>
													setstaffEnteredEmail(`${text}`.toLowerCase())
												}
												addMemeberFun={addStaffMembersFun}
											/>
											<Text style={styles.labelTxt}>Staff Memebers</Text>
										</View>
									}
									data={eventStaffMemnbers}
									ItemSeparatorComponent={() => (
										<View style={styles.sepratorView} />
									)}
									ListEmptyComponent={
										<EmptyComponent title={"No staff members added"} />
									}
									keyExtractor={(item, index) => index.toString()}
									renderItem={({ item, index }) => (
										<EventStaffComp
											status={item?.status}
											email={item?.email}
											name={item?.username}
											profileImage={item?.profileImage}
											onDeleteFun={() => console.log("hy")}
										/>
									)}
								/>
							</>
						) : null}

						<View style={styles.botomPadding} />
					</View>
				</ScrollView>
			) : !eventData ? (
				<EmptyComponent
					showBack={true}
					title={"No Event Data"}
				/>
			) : null}

			<LoadingView loading={isLoading} />
			<YesNoModal
				title={"Mark Ticket invalid"}
				description={
					"Are you sure you want to mark this ticket as invalid? After that it cannot be used for entry."
				}
				showModal={openDeleteModal ? true : false}
				hideModal={removeOpenDeleteModal}
				onYesFun={markSelectedTicketAsInvalid}
				onNoFun={removeOpenDeleteModal}
			/>
			<YesNoModal
				title={"Mark Ticket used"}
				description={"Are you sure you want to mark this ticket as used?"}
				showModal={openUsedModal ? true : false}
				hideModal={removeOpenUsedModal}
				onYesFun={markSelectedTicketAsUsed}
				onNoFun={removeOpenUsedModal}
			/>
		</View>
	);
};

export default EventDetails;
