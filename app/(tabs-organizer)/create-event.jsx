import { StyleSheet, View } from "react-native";
import CreateEvent from "../../components/center-tab/CreateEvent";
import { useThemeColors } from "../../hooks/useThemeColors";

const CenterTab = () => {
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
			<CreateEvent />
		</View>
	);
};

export default CenterTab;
