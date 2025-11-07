import { useThemeColors } from "@/hooks/useThemeColors";
import { Dimensions, StyleSheet, View } from "react-native";

const TabIcon = ({ focused, Icon, totalItems, tabHeight }) => {
	const colors = useThemeColors();
	console.log("check tab heigh", tabHeight);
	const styles = StyleSheet.create({
		defaultTab: {
			justifyContent: "flex-start",
			alignItems: "center",
			width: Dimensions.get("screen").width / totalItems,
			height: tabHeight ?? 60,
			gap: 5,
			zIndex: 3,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: colors.botmTab,
			marginBottom: -10,
		},
		normalView: {
			height: 56,
			width: 56,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column",
		},
		activeView: {
			backgroundColor: colors.blackColor,
			shadowColor: colors.blackColor,
			borderRadius: tabHeight ? tabHeight - 10 : 40,

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
