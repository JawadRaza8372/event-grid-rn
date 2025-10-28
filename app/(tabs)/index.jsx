import { ScrollView, StyleSheet, View } from "react-native";
import HomeScreen from "../../components/Home/HomeScreen";
import { useThemeColors } from "../../hooks/useThemeColors";

const Home = () => {
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
				<HomeScreen />
			</ScrollView>
		</View>
	);
};

export default Home;
