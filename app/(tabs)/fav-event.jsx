import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import FavoriteEvent from "../../components/center-tab/FavoriteEvent";
import { useThemeColors } from "../../hooks/useThemeColors";

const CenterTab = () => {
	const colors = useThemeColors();
	const { user } = useSelector((state) => state?.user);

	const styles = StyleSheet.create({
		mainContainer: {
			width: "100%",
			height: "100%",
			backgroundColor: colors.mainBgColor,
		},
	});
	return (
		<View style={styles.mainContainer}>
			<FavoriteEvent />
		</View>
	);
};

export default CenterTab;
