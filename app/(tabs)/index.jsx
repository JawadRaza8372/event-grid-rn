import { ScrollView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import HomeScreen from "../../components/Home/HomeScreen";
import OrganizerHomeScreen from "../../components/Home/OrganizerHomeScreen";
import { useThemeColors } from "../../hooks/useThemeColors";

const Home = () => {
	const { user } = useSelector((state) => state?.user);
	const colors = useThemeColors();
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
				{user?.role === "user" ? (
					<HomeScreen />
				) : user?.role === "organizer" ? (
					<OrganizerHomeScreen />
				) : null}
			</ScrollView>
		</View>
	);
};

export default Home;
