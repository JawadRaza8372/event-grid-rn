import * as Location from "expo-location";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import SideTopBar from "../components/SideTopBar";
import { useThemeColors } from "../hooks/useThemeColors";

const LocationScreen = () => {
	const colors = useThemeColors();
	const coordinates = { title: "dummy location", lat: 0, lng: 0 };
	useEffect(() => {
		const requestLocationPermission = async () => {
			try {
				let { status } = await Location.requestForegroundPermissionsAsync();

				if (status !== "granted") {
					console.log("Permission denied");
					return;
				}
				const location = await Location.getCurrentPositionAsync({});
				console.log(location);
			} catch (err) {
				console.log("Error requesting permission:", err);
			}
		};
		requestLocationPermission();
	}, []);
	const styles = StyleSheet.create({
		map: {
			width: "100%",
			height: "100%",
		},
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
			<MapView style={styles.map}>
				<Marker
					coordinate={{
						latitude: coordinates?.lat,
						longitude: coordinates?.lng,
					}}
					pinColor={colors.blackColor}
					title={coordinates?.title ?? ""}
				/>
			</MapView>
		</View>
	);
};

export default LocationScreen;
