import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import CreateEvent from "../../components/center-tab/CreateEvent";
import FavoriteEvent from "../../components/center-tab/FavoriteEvent";
import { AuthContext } from "../../constants/AuthContext";
import { useThemeColors } from "../../hooks/useThemeColors";

const CenterTab = () => {
	const colors = useThemeColors();
	const { role } = useContext(AuthContext);
	const isOrganizerHomeScreen = role !== "user";
	const styles = StyleSheet.create({
		mainContainer: {
			width: "100%",
			height: "100%",
			backgroundColor: colors.mainBgColor,
		},
	});
	return (
		<View style={styles.mainContainer}>
			{isOrganizerHomeScreen ? <CreateEvent /> : <FavoriteEvent />}
		</View>
	);
};

export default CenterTab;
