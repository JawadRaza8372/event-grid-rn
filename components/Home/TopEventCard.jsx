import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icons } from "../../assets/icons";
import eventImage from "../../assets/images/eventDetails.png";
import { useThemeColors } from "../../hooks/useThemeColors";

const TopEventCard = ({ eventName, date, address, isFavorite, onPressFun }) => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		mainContainer: {
			width: 129,
			paddingHorizontal: 6,
			paddingVertical: 7,
			borderRadius: 25,
			backgroundColor: colors.topEventBg,
			display: "flex",
			flexDirection: "column",
		},
		imageContainer: {
			height: 110,
			width: "100%",
			borderRadius: 20,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			overflow: "hidden",
		},
		imageView: {
			width: "100%",
			height: "100%",
			resizeMode: "cover",
		},
		botmContainer: {
			height: "auto",
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			flex: 1,
			marginHorizontal: 6,
			gap: 5,
		},
		bottomTxtCont: {
			height: "auto",
			flex: 1,
		},
		dateTxt: {
			fontSize: 7.5,
			fontWeight: "600",
			lineHeight: 20,
			color: colors.blackColor,
			height: "auto",
			flex: 1,
			marginHorizontal: 6,
		},
		eventNmaeTxt: {
			fontSize: 12,
			fontWeight: "500",
			lineHeight: 20,
			color: colors.dataTitleColor,
			marginTop: 7,
			marginBottom: 3,
			height: "auto",
			flex: 1,
			marginHorizontal: 6,
		},
		addressTxt: {
			fontSize: 7,
			fontWeight: "600",
			lineHeight: 20,
			color: colors.profileItemsTxtColor,
			height: "auto",
			flex: 1,
		},
		hearFillCont: {
			height: 12,
			width: 12,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
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
					source={eventImage}
					style={styles.imageView}
				/>
			</View>
			<Text
				numberOfLines={1}
				ellipsizeMode="tail"
				style={styles.eventNmaeTxt}>
				{eventName ?? ""}
			</Text>
			<Text
				numberOfLines={1}
				ellipsizeMode="tail"
				style={styles.dateTxt}>
				{date ?? ""}
			</Text>
			<View style={styles.botmContainer}>
				<Icons.SendIcon
					width={7}
					height={7}
				/>
				<View style={styles.bottomTxtCont}>
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						style={styles.addressTxt}>
						{address ?? ""}
					</Text>
				</View>

				<View style={styles.hearFillCont}>
					{isFavorite ? (
						<Icons.HeartFill
							width={8}
							height={7}
						/>
					) : (
						<Icons.HeartEmpty
							width={8}
							height={7}
						/>
					)}
				</View>
			</View>
		</RenderComp>
	);
};

export default TopEventCard;
