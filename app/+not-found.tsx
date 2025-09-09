import { useThemeColors } from "@/hooks/useThemeColors";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
	const colors = useThemeColors();

	const styles = StyleSheet.create({
		container: {
			width: "100%",
			height: "100%",
			backgroundColor: colors.mainBgColor,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		notFoundText: {
			fontSize: 14,
			fontWeight: "400",
			color: colors.blackColor,
		},
	});
	return (
		<View style={styles.container}>
			<Text style={styles.notFoundText}>This screen does not exist.</Text>
		</View>
	);
}
