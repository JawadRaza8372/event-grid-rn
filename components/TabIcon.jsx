import { useThemeColors } from "@/hooks/useThemeColors";
import { Dimensions, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

const TabIcon = ({ focused, Icon }) => {
	const colors = useThemeColors();
	const { user } = useSelector((state) => state?.user);

	const styles = StyleSheet.create({
		defaultTab: {
			justifyContent: "flex-start",
			alignItems: "center",
			width:
				user?.role === "user"
					? Dimensions.get("screen").width / 4
					: Dimensions.get("screen").width / 5,
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
