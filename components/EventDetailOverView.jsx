import { StyleSheet, Text, View } from "react-native";
import { Icons } from "../assets/icons";
import { useThemeColors } from "../hooks/useThemeColors";

const EventDetailOverView = ({
	date,
	time,
	location,
	locationDesc,
	priceRange,
}) => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		mainContainer: {
			width: "100%",
			height: "auto",
			display: "flex",
			flexDirection: "column",
			gap: 20,
		},
		viewContainer: {
			width: "100%",
			height: "auto",
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			gap: 17,
		},
		iconContainer: {
			width: 48,
			height: 48,
			borderRadius: 48,
			backgroundColor: colors.eventKeyBg,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		textContainer: {
			height: "auto",
			flex: 1,
			display: "flex",
			flexDirection: "column",
			gap: 3,
		},
		titleTxt: {
			fontSize: 14,
			lineHeight: 20,
			fontWeight: "600",
			color: colors.dataTitleColor,
			height: "auto",
			flex: 1,
		},
		subTitleTxt: {
			fontSize: 12,
			lineHeight: 20,
			fontWeight: "400",
			color: colors.blackColor,
			height: "auto",
			flex: 1,
		},
	});

	return (
		<View style={styles.mainContainer}>
			<View style={styles.viewContainer}>
				<View style={styles.iconContainer}>
					<Icons.Calendar />
				</View>
				<View style={styles.textContainer}>
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						style={styles.titleTxt}>
						{date ?? ""}
					</Text>
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						style={styles.subTitleTxt}>
						{time ?? ""}
					</Text>
				</View>
			</View>
			<View style={styles.viewContainer}>
				<View style={styles.iconContainer}>
					<Icons.PinFat
						width={22}
						height={22}
					/>
				</View>
				<View style={styles.textContainer}>
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						style={styles.titleTxt}>
						{location ?? ""}
					</Text>
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						style={styles.subTitleTxt}>
						{locationDesc ?? ""}
					</Text>
				</View>
			</View>
			<View style={styles.viewContainer}>
				<View style={styles.iconContainer}>
					<Icons.PriceTag />
				</View>
				<View style={styles.textContainer}>
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						style={styles.titleTxt}>
						{priceRange ?? ""}
					</Text>
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						style={styles.subTitleTxt}>
						Ticket price depends on package.
					</Text>
				</View>
			</View>
		</View>
	);
};

export default EventDetailOverView;
