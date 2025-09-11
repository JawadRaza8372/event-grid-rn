import { router } from "expo-router";
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Icons } from "../assets/icons";
import { useThemeColors } from "../hooks/useThemeColors";

const SideTopBar = ({ title, isTailIcon }) => {
	const colors = useThemeColors();

	const styles = StyleSheet.create({
		topBarContainer: {
			width: Dimensions.get("screen").width - 40,
			alignSelf: "center",
			height: 45,
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
		},
		backBtn: {
			height: 44,
			width: 44,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
		},
		screenHeaderTitle: {
			color: colors.blackColor,
			fontSize: 18,
			fontWeight: "600",
			lineHeight: 20,
		},
	});
	return (
		<View style={styles.topBarContainer}>
			<TouchableOpacity
				onPress={() => router.back()}
				style={styles.backBtn}>
				{isTailIcon ? (
					<Icons.TaleArrowLeft
						width={25}
						height={25}
					/>
				) : (
					<Icons.ArrowBack
						width={25}
						height={25}
					/>
				)}
			</TouchableOpacity>
			<Text style={styles.screenHeaderTitle}>{title ?? ""}</Text>
		</View>
	);
};

export default SideTopBar;
