import { router } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
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

	return (
		<TouchableOpacity
			onPress={() => router.push({ pathname: "/location" })}
			style={styles.mainContainer}>
			<MapView style={styles.map}>
				<Marker
					coordinate={{
						latitude: coordinates?.lat,
						longitude: coordinates?.lng,
					}}
					pinColor={colors.blackColor}
					title={location ?? ""}
				/>
			</MapView>
		</TouchableOpacity>
	);
};

export default MapContainer;
