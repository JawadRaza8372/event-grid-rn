import { router } from "expo-router";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import eventLocationPin from "../assets/images/locationIcon.png";
import { useThemeColors } from "../hooks/useThemeColors";

const MapContainer = ({ coordinates, location }) => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		mainContainer: {
			width: "100%",
			height: 190,
			borderRadius: 15,
			overflow: "hidden",
			marginBottom: 38,
			marginTop: 24,
			backgroundColor: colors.scannerBg,
		},
		map: {
			width: "100%",
			height: "100%",
		},
	});
	console.log(coordinates);

	return (
		<TouchableOpacity
			onPress={() =>
				router.push({
					pathname: "/location",
					params: {
						coordinates: JSON.stringify(coordinates),
						location,
					},
				})
			}
			style={styles.mainContainer}>
			<MapView
				provider={PROVIDER_GOOGLE}
				initialRegion={{
					latitude: coordinates?.lat || 37.78825,
					longitude: coordinates?.lng || -122.4324,
					latitudeDelta: 0.01,
					longitudeDelta: 0.01,
				}}
				style={styles.map}>
				<Marker
					coordinate={{
						latitude: coordinates?.lat,
						longitude: coordinates?.lng,
					}}
					anchor={{ x: 0.5, y: 1 }}
					title={location ?? ""}>
					<Image
						source={eventLocationPin}
						style={{ width: 45, height: 45 }}
						resizeMode="contain"
					/>
				</Marker>
			</MapView>
		</TouchableOpacity>
	);
};

export default MapContainer;
