import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useThemeColors } from "../../hooks/useThemeColors";

const SeeAllView = ({ title, onPressFun }) => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		mainContainer: {
			width: Dimensions.get("screen").width - 32,
			alignSelf: "center",
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			flexDirection: "row",
			gap: 10,
		},
		titleTxt: {
			fontSize: 14,
			fontWeight: "500",
			lineHeight: 20,
			color: colors.dataTitleColor,
			height: "auto",
			flex: 1,
		},
		seeTxt: {
			fontSize: 12,
			fontWeight: "500",
			lineHeight: 20,
			color: colors.blackColor,
		},
	});
	return (
		<View style={styles.mainContainer}>
			<Text
				numberOfLines={1}
				ellipsizeMode="tail">
				{title ?? ""}
			</Text>
			<TouchableOpacity onPress={onPressFun}>
				<Text style={styles.seeTxt}>See All</Text>
			</TouchableOpacity>
		</View>
	);
};

export default SeeAllView;
