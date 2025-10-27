import { GooglePlacesAutocomplete } from "expo-google-places-autocomplete";
import { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useThemeColors } from "../../hooks/useThemeColors";
const CustomLocationInput = ({ title, onChangeValue, placeHolder }) => {
	const onSearchError = useCallback((error) => {
		console.log("place error", error);
	}, []);
	const onPlaceSelected = useCallback(
		(place) => {
			const addressData = {
				name: place?.name ?? "",
				address: place?.formattedAddress ?? "",
				coordinates: {
					lat: place?.coordinate?.latitude ?? 0,
					lng: place?.coordinate?.longitude ?? 0,
				},
			};
			onChangeValue(addressData);
		},
		[onChangeValue]
	);
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		mainContainer: {
			width: "100%",
			height: "auto",
			display: "flex",
			flexDirection: "column",
			gap: 7,
		},
		inputLabel: {
			width: "100%",
			fontSize: 11,
			fontWeight: "500",
			color: colors.createInputLabelColor,
			lineHeight: 20,
		},
		inputMainStyle: {
			height: "95%",
			flex: 1,
			fontSize: 12,
			fontWeight: "500",
			color: colors.authTitleColor,
		},
		inputContainer: {
			height: 38,
			width: "100%",
			borderRadius: 8,
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			backgroundColor: colors.createEventInputBg,
		},
		iconContainer: {
			height: "100%",
			width: 35,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		textInputContainer: {
			width: "100%",
			borderRadius: 8,
			height: 38,
			backgroundColor: colors.createEventInputBg,
			padding: 0,
		},
		textInputStyle: {
			width: "100%",
			height: 38,
			margin: 0,
			paddingHorizontal: 15,
			fontSize: 12,
			fontWeight: "500",
			color: colors.authTitleColor,
		},
	});
	return (
		<View style={styles.mainContainer}>
			<Text
				numberOfLines={1}
				ellipsizeMode="tail"
				style={styles.inputLabel}>
				{title ?? ""}
			</Text>

			<GooglePlacesAutocomplete
				placeholder={placeHolder ?? ""}
				apiKey={process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY}
				onPlaceSelected={onPlaceSelected}
				onSearchError={onSearchError}
				enablePoweredByContainer={false}
				listFooterStyle={{ display: "none" }}
				searchInputStyle={styles.textInputStyle}
				inputContainerStyle={styles.textInputContainer}
				styles={{
					container: {
						flex: 0,
						width: "100%",
					},
					textInputContainer: {
						width: "100%",
						height: 38,
						margin: 0,
						paddingHorizontal: 7,
						fontSize: 12,
						fontWeight: "500",
						color: colors.authTitleColor,
					},
					textInput: {
						height: 38,
						fontSize: 12,
						color: colors.authTitleColor,
						paddingHorizontal: 7,
					},
					listView: {
						backgroundColor: colors.mainBgColor,
						borderRadius: 10,
						position: "absolute",
						top: 45,
						width: "100%",
						zIndex: 1000,
						elevation: 10,
					},
				}}
				fetchDetails={true}
			/>
		</View>
	);
};

export default CustomLocationInput;
