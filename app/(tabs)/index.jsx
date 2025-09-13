import { useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import HomeScreen from "../../components/Home/HomeScreen";
import OrganizerHomeScreen from "../../components/Home/OrganizerHomeScreen";
import { AuthContext } from "../../constants/AuthContext";
import { useThemeColors } from "../../hooks/useThemeColors";

const Home = () => {
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
			<ScrollView showsVerticalScrollIndicator={false}>
				{isOrganizerHomeScreen ? <OrganizerHomeScreen /> : <HomeScreen />}
			</ScrollView>
		</View>
	);
};

export default Home;
