import * as Location from "expo-location";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import eventLocationPin from "../assets/images/locationIcon.png";
import SideTopBar from "../components/SideTopBar";
import { useThemeColors } from "../hooks/useThemeColors";
const LocationScreen = () => {
	const unFormattedCoordinates = useLocalSearchParams()?.coordinates;
	const addressName = useLocalSearchParams()?.location;
	const formattedCoordinates = JSON.parse(unFormattedCoordinates);
	const colors = useThemeColors();

	const [userLocation, setUserLocation] = useState(null);

	useEffect(() => {
		const requestLocationPermission = async () => {
			try {
				let { status } = await Location.requestForegroundPermissionsAsync();

				if (status !== "granted") {
					Alert.alert(
						"Permission Required",
						"Please grant location permission to show directions.",
						[
							{
								text: "OK",
								onPress: async () => {
									const { status: retryStatus } =
										await Location.requestForegroundPermissionsAsync();
									if (retryStatus === "granted") {
										getUserLocation();
									}
								},
							},
						]
					);
					return;
				}

				getUserLocation();
			} catch (err) {
				console.log("Error requesting permission:", err);
			}
		};

		const getUserLocation = async () => {
			const location = await Location.getCurrentPositionAsync({});
			const coords = {
				lat: location.coords.latitude,
				lng: location.coords.longitude,
			};
			setUserLocation(coords);
		};

		requestLocationPermission();
	}, []);

	const styles = StyleSheet.create({
		map: { width: "100%", height: "100%" },
		mainContainer: {
			width: "100%",
			height: "100%",
			backgroundColor: colors.mainBgColor,
			position: "relative",
		},
		topBarView: {
			width: "100%",
			position: "absolute",
			top: 0,
			alignSelf: "center",
			zIndex: 2,
		},
	});

	return (
		<View style={styles.mainContainer}>
			<View style={styles.topBarView}>
				<SideTopBar
					isTailIcon={true}
					title={"Location"}
				/>
			</View>

			<MapView
				provider={PROVIDER_GOOGLE}
				initialRegion={{
					latitude: formattedCoordinates?.lat || 37.78825,
					longitude: formattedCoordinates?.lng || -122.4324,
					latitudeDelta: 0.05,
					longitudeDelta: 0.05,
				}}
				style={styles.map}>
				{formattedCoordinates && (
					<Marker
						coordinate={{
							latitude: formattedCoordinates.lat,
							longitude: formattedCoordinates.lng,
						}}
						anchor={{ x: 0.5, y: 1 }}
						title={addressName ?? ""}>
						<Image
							source={eventLocationPin}
							style={{ width: 45, height: 45 }}
							resizeMode="contain"
						/>
					</Marker>
				)}

				{userLocation && (
					<Marker
						coordinate={{
							latitude: userLocation.lat,
							longitude: userLocation.lng,
						}}
						pinColor={"#222831"}
						title={"You"}
					/>
				)}

				{userLocation && formattedCoordinates && (
					<MapViewDirections
						origin={{
							latitude: userLocation.lat,
							longitude: userLocation.lng,
						}}
						destination={{
							latitude: formattedCoordinates.lat,
							longitude: formattedCoordinates.lng,
						}}
						apikey={process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY}
						strokeWidth={4}
						strokeColor={"#3d7ddcff"}
						mode="DRIVING"
					/>
				)}
			</MapView>
		</View>
	);
};

export default LocationScreen;
