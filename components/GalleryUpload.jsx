import * as ImagePicker from "expo-image-picker";
import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Icons } from "../assets/icons";
import { useThemeColors } from "../hooks/useThemeColors";

const GalleryUpload = ({ title, value, onChange }) => {
	console.log("here", value);
	const colors = useThemeColors();
	const styles = StyleSheet.create({
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
		addMainContainer: {
			width: 70,
			height: 70,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
			borderRadius: 8,
			overflow: "hidden",
			backgroundColor: colors.createEventInputBg,
			marginLeft: value?.length > 0 ? 5 : 0,
		},
		imageMainContainer: {
			width: 70,
			height: 70,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
			borderRadius: 8,
			overflow: "hidden",
			backgroundColor: colors.createEventInputBg,
			position: "relative",
		},
		valueImageCont: {
			width: "100%",
			height: "100%",
			resizeMode: "cover",
		},
		sepratorView: {
			width: 5,
			height: 70,
		},
		childContainer: {
			width: "100%",
			height: "auto",
		},
		deleteBg: {
			width: "100%",
			height: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			position: "absolute",
			zIndex: 1,
			backgroundColor: colors.modalBg4,
			position: "absolute",
			top: 0,
			right: 0,
		},
	});
	const takeImageFromGallery = async () => {
		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ["images"],
				quality: 1,
				allowsMultipleSelection: true,
			});

			if (result.didCancel) {
				console.log("Image selection cancelled");
			} else if (result.error) {
				console.error("Error selecting images:", result.error);
			} else if (result.assets) {
				const resultImageUri = result.assets?.map((dat) => dat?.uri);
				onChange([...(value?.length > 0 ? value : []), ...resultImageUri]);
			}
		} catch (error) {
			console.error("Error opening image library:", error);
		}
	};
	const removeCurrentImage = (imageIndex) => {
		const filterCurrentImage = value?.filter(
			(_, index) => imageIndex !== index
		);
		onChange(filterCurrentImage);
	};
	return (
		<View style={styles.mainContainer}>
			<Text style={styles.inputLabel}>{title ?? ""}</Text>
			<View style={styles.childContainer}>
				<FlatList
					data={value}
					horizontal={true}
					keyExtractor={(item, index) => index.toString()}
					showsHorizontalScrollIndicator={false}
					renderItem={({ item, index }) => (
						<View style={styles.imageMainContainer}>
							<Image
								source={{ uri: item }}
								style={styles.valueImageCont}
							/>
							<TouchableOpacity
								onPress={() => removeCurrentImage(index)}
								style={styles.deleteBg}>
								<Icons.DeleteRed />
							</TouchableOpacity>
						</View>
					)}
					ItemSeparatorComponent={() => <View style={styles.sepratorView} />}
					ListFooterComponent={
						<TouchableOpacity
							style={styles.addMainContainer}
							onPress={takeImageFromGallery}>
							<Icons.PlusIcon />
						</TouchableOpacity>
					}
				/>
			</View>
		</View>
	);
};

export default GalleryUpload;
