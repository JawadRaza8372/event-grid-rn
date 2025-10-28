import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
	Dimensions,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { Icons } from "../assets/icons";
import eventImage from "../assets/images/eventDetails.png";
import CustomButton from "../components/CustomButton";
import EventDetailOverView from "../components/EventDetailOverView";
import MapContainer from "../components/MapContainer";
import { useThemeColors } from "../hooks/useThemeColors";
import {
	addFavoriteEventApi,
	removeFavoriteEventApi,
} from "../services/endpoints";
const EventDetails = () => {
	const { favEvents } = useSelector((state) => state?.user);
	console.log("favorite events", favEvents);
	const unformattedEventData = useLocalSearchParams()?.eventData;
	const eventData = JSON.parse(unformattedEventData);
	const colors = useThemeColors();
	const findEventInFavorites = favEvents?.find(
		(dat) => dat?.id === eventData?.id
	);
	const [isFavoriteEvent, setisFavoriteEvent] = useState(false);
	useEffect(() => {
		setisFavoriteEvent(findEventInFavorites ? true : false);
	}, [findEventInFavorites, favEvents]);

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
	const favoriteBtnClickFun = async () => {
		try {
			if (!findEventInFavorites) {
				await addFavoriteEventApi(eventData?.id);
				setisFavoriteEvent(true);
			} else {
				await removeFavoriteEventApi(eventData?.id);
				setisFavoriteEvent(true);
			}
		} catch (error) {
			console.log("event fav error: ", error);
			Toast.show({
				type: "error",
				text1: error ?? "Event Favorite failed.",
			});
		}
	};
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
							onPress={favoriteBtnClickFun}
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
							source={eventImage}
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
