import {
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Icons } from "../../assets/icons";
import placeHolderImage from "../../assets/images/placeholderImage.jpg";
import { useThemeColors } from "../../hooks/useThemeColors";
const TrendingEvent = ({
	imageLink,
	name,
	location,
	genralPrice,
	vipPrice,
	ratting,
	onPressFun,
}) => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		mainContainer: {
			width: Dimensions.get("screen").width * 0.72,
			height: 200,
			borderRadius: 20,
			overflow: "hidden",
			display: "flex",
			flexDirection: "column",
			backgroundColor: colors.mainBgColor,
			shadowColor: colors.blackColor,
			shadowOffset: {
				width: 0,
				height: 4,
			},
			shadowOpacity: 0.32,
			shadowRadius: 5.46,
			elevation: 9,
			marginBottom: 10,
		},
		imageContainer: {
			height: 100,
			width: "100%",
		},
		childContainer: {
			width: "100%",
			flex: 1,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
			gap: 7,
			paddingHorizontal: 19,
			marginVertical: 15,
		},
		imageStyle: {
			width: "100%",
			height: "100%",
			resizeMode: "cover",
		},
		eventNameTxt: {
			fontSize: 12,
			fontWeight: "600",
			lineHeight: 20,
			color: colors.dataTitleColor,
		},
		addressTxt: {
			fontSize: 9,
			fontWeight: "600",
			color: colors.profileItemsTxtColor,
		},
		addressTxtLineHeight: {
			fontSize: 9,
			fontWeight: "600",
			color: colors.profileItemsTxtColor,
			lineHeight: 20,
		},
		vipTxt: {
			fontSize: 11,
			fontWeight: "600",
			color: colors.dataTitleColor,
		},
		generalTxt: {
			fontSize: 11,
			fontWeight: "600",
			color: colors.profileItemsTxtColor,
		},
		inLineContent: {
			height: "auto",
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			gap: 7,
		},
		firstChild: {
			height: "100%",
			flex: 1,
			display: "flex",
			flexDirection: "column",
			gap: 5,
			alignItems: "flex-start",
			justifyContent: "center",
		},
		secondChild: {
			height: "100%",
			width: 60,
			display: "flex",
			flexDirection: "column",
			gap: 5,
			alignItems: "flex-start",
			justifyContent: "center",
		},
	});
	const RenderComp = onPressFun ? TouchableOpacity : View;
	const renderProps = onPressFun ? { onPress: onPressFun } : {};

	return (
		<RenderComp
			{...renderProps}
			style={styles.mainContainer}>
			<View style={styles.imageContainer}>
				<Image
					source={
						typeof imageLink === "string"
							? { uri: imageLink }
							: placeHolderImage
					}
					style={styles.imageStyle}
				/>
			</View>
			<View style={styles.childContainer}>
				<View style={styles.firstChild}>
					<Text style={styles.eventNameTxt}>{name ?? ""}</Text>
					<View style={styles.inLineContent}>
						<Icons.Star />
						<Text style={styles.addressTxt}>{ratting ?? 0}</Text>
					</View>
					<View style={styles.inLineContent}>
						<Icons.SendIcon />
						<Text style={styles.addressTxt}>{location ?? ""}</Text>
					</View>
				</View>
				<View style={styles.secondChild}>
					<Text style={styles.addressTxtLineHeight}>{"Starting at"}</Text>
					{genralPrice ? (
						<View style={styles.inLineContent}>
							<Text style={styles.generalTxt}>{genralPrice ?? 0}/GA</Text>
						</View>
					) : (
						<View style={styles.inLineContent}>
							<Text style={styles.addressTxt}></Text>
						</View>
					)}
					{vipPrice ? (
						<View style={styles.inLineContent}>
							<Text style={styles.vipTxt}>{vipPrice ?? 0}/VIP</Text>
						</View>
					) : (
						<View style={styles.inLineContent}>
							<Text style={styles.addressTxt}></Text>
						</View>
					)}
				</View>
			</View>
		</RenderComp>
	);
};

export default TrendingEvent;
