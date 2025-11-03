import * as ImagePicker from "expo-image-picker";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import placeHolderImage from "../assets/images/placeholderImage.jpg";
import { useThemeColors } from "../hooks/useThemeColors";
const BannerUpload = ({ title, value, onChange }) => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		mainInputContainer: {
			height: 150,
			width: "100%",
			// borderWidth: 1,
			// borderColor: colors.,
			borderRadius: 8,
			overflow: "hidden",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			gap: 10,
			backgroundColor: colors.createEventInputBg,
		},
		fullImage: {
			width: "100%",
			height: "100%",
			resizeMode: "cover",
		},
		mainContainer: {
			width: "100%",
			flexDirection: "column",
			gap: 7,
		},
		inputLabel: {
			fontSize: 11,
			fontWeight: "500",
			color: colors.createInputLabelColor,
			lineHeight: 20,
		},
	});
	const takeImageFromGallery = async () => {
		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ["images"],
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});

			if (result.didCancel) {
				console.log("Image selection cancelled");
			} else if (result.error) {
				console.error("Error selecting images:", result.error);
			} else if (result.assets) {
				onChange(result.assets[0].uri);
			}
		} catch (error) {
			console.error("Error opening image library:", error);
		}
	};
	return (
		<View style={styles.mainContainer}>
			<Text style={styles.inputLabel}>{title ?? ""}</Text>
			<TouchableOpacity
				onPress={takeImageFromGallery}
				style={styles.mainInputContainer}>
				<Image
					source={value ? { uri: value } : placeHolderImage}
					style={styles.fullImage}
				/>
			</TouchableOpacity>
		</View>
	);
};

export default BannerUpload;
