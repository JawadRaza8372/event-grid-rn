import { StyleSheet, Text, View } from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";

const EmptyComponent = ({ title }) => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		mainContainer: {
			width: "100%",
			height: 160,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column",
		},
		emptyText: {
			fontSize: 14,
			fontWeight: "400",
			color: colors.inputPlaceHolderColor,
		},
	});

	return (
		<View style={styles.mainContainer}>
			<Text style={styles.emptyText}>{title ?? "No data found"}</Text>
		</View>
	);
};

export default EmptyComponent;
