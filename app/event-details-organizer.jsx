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
import { Icons } from "../assets/icons";
import PromoSelectorItem from "../components/center-tab/PromoSelectorItem";
import TicketSelectorItem from "../components/center-tab/TicketSelectorItem";
import EmptyComponent from "../components/EmptyComponent";
import EventDetailOverView from "../components/EventDetailOverView";
import EventTopImageScoll from "../components/EventTopImageScoll";
import LoadingView from "../components/LoadingView";
import MapContainer from "../components/MapContainer";
import { useThemeColors } from "../hooks/useThemeColors";
import { getEventByIdApi } from "../services/endpoints";
const EventDetails = () => {
	const eventId = useLocalSearchParams()?.eventId;
	const [eventData, seteventData] = useState(null);
	const [isLoading, setisLoading] = useState(false);
	const colors = useThemeColors();

	const fetchEventWithIdFun = async () => {
		try {
			setisLoading(true);
			const result = await getEventByIdApi(eventId);
			console.log("cghec", result);
			seteventData(result);
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
							ListEmptyComponent={<EmptyComponent title={"No Ticket Tiers"} />}
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
							ListEmptyComponent={<EmptyComponent title={"No Promo Codes"} />}
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
		</View>
	);
};

export default EventDetails;
