import { useThemeColors } from "@/hooks/useThemeColors";
import { Dimensions, StyleSheet, View } from "react-native";

const TabIcon = ({ focused, Icon, totalItems }) => {
	const colors = useThemeColors();

	const styles = StyleSheet.create({
		defaultTab: {
			justifyContent: "flex-start",
			alignItems: "center",
			width: Dimensions.get("screen").width / totalItems,
			height: 70,
			gap: 5,
			zIndex: 3,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: colors.botmTab,
		},
		normalView: {
			height: 56,
			width: 56,
			borderRadius: 40,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column",
		},
		activeView: {
			backgroundColor: colors.blackColor,
			shadowColor: colors.blackColor,
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowOpacity: 0.25,
			shadowRadius: 3.84,
			elevation: 5,
		},
	});
	return (
		<View style={styles?.defaultTab}>
			<View style={[styles.normalView, focused ? styles.activeView : {}]}>
				<Icon isActive={focused} />
			</View>
		</View>
	);
};

export default TabIcon;
