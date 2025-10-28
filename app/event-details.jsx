import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import {
	Dimensions,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Icons } from "../assets/icons";
import CustomButton from "../components/CustomButton";
import EventDetailOverView from "../components/EventDetailOverView";
import MapContainer from "../components/MapContainer";
import { useThemeColors } from "../hooks/useThemeColors";

const EventDetails = () => {
	const unformattedEventData = useLocalSearchParams()?.eventData;
	const eventData = JSON.parse(unformattedEventData);
	console.log("here ", eventData);
	const colors = useThemeColors();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isFavoriteEvent, setisFavoriteEvent] = useState(false);
	const viewabilityConfig = useRef({
		viewAreaCoveragePercentThreshold: 50,
	}).current;

	const onViewableItemsChanged = useRef(({ viewableItems }) => {
		if (viewableItems.length > 0) {
			setCurrentIndex(viewableItems[0].index);
		}
	}).current;
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
			backgroundColor: "red",
		},
		imageStyle: {
			width: "100%",
			height: "100%",
			resizeMode: "cover",
		},
		backBtn: {
			width: 50,
			height: 60,
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
		},
		favoriteBtn: {
			width: 50,
			height: 60,
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-end",
			flexDirection: "row",
		},
		topHeaderView: {
			position: "absolute",
			top: 0,
			zIndex: 2,
			display: "flex",
			width: Dimensions.get("screen").width - 42,
			alignSelf: "center",
			alignItems: "center",
			justifyContent: "space-between",
			flexDirection: "row",
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
	});
	return (
		<View style={styles.mainContainer}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.imageContainer}>
					<View style={styles.topHeaderView}>
						<TouchableOpacity
							onPress={() => router.back()}
							style={styles.backBtn}>
							<Icons.TaleArrowLeftWhite />
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => setisFavoriteEvent(!isFavoriteEvent)}
							style={styles.favoriteBtn}>
							{isFavoriteEvent ? (
								<Icons.HeartFillWhite
									width={25}
									height={25}
								/>
							) : (
								<Icons.HeartEmptyWhite
									width={25}
									height={25}
								/>
							)}
						</TouchableOpacity>
					</View>

					<View style={styles.imageContainerView}>
						<Image
							style={styles.imageStyle}
							source={{
								uri: "https://plus.unsplash.com/premium_photo-1757343190565-3b99182167e3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
							}}
						/>
					</View>
				</View>

				<View style={styles.childContainer}>
					<Text style={styles.eventNameTxt}>{eventData?.title ?? ""}</Text>
					<View style={styles.categoryView}>
						<Text style={styles.categoryTxt}>{eventData?.category ?? ""}</Text>
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
					<Text style={styles.headingTxt}>About Event</Text>
					<Text style={styles.eventDescriptionTxt}>
						{eventData?.description ?? ""}
					</Text>
					<Text style={styles.headingTxt}>Location</Text>
					<View style={styles.locationView}>
						<Icons.PinFat />
						<Text style={styles.locationText}>
							{eventData.location?.address}
						</Text>
					</View>
					<MapContainer
						location={eventData?.location?.address}
						coordinates={eventData?.location?.coordinates}
					/>
					<CustomButton
						btnWidth={"100%"}
						btnTitle={"Book Event"}
						onPressFun={() =>
							router.push({
								pathname: "/book-event",
								params: {
									gaPrice: eventData?.generaladmissionPrice,
									vipPrice: eventData?.vipPrice,
									eventId: eventData?.id ?? "",
									title: eventData?.title,
									startDate: eventData?.startEndDate,
									address: eventData?.location?.address,
								},
							})
						}
					/>
					<View style={styles.botomPadding} />
				</View>
			</ScrollView>
		</View>
	);
};

export default EventDetails;
