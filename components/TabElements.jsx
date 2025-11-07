import { Tabs } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColors } from "../hooks/useThemeColors";
import TabIcon from "./TabIcon";

function CustomTabButton({
	tabHeight,
	icon,
	totalItems,
	children,
	onPress,
	...rest
}) {
	const focused =
		rest?.accessibilityState?.selected ?? rest?.["aria-selected"] ?? false;

	return (
		<Pressable
			onPress={onPress}
			android_ripple={{ color: "transparent" }}
			style={({ pressed }) => [
				{ justifyContent: "center", alignItems: "center", flex: 1 },
			]}>
			<View pointerEvents="none">
				<TabIcon
					tabHeight={tabHeight}
					totalItems={totalItems}
					focused={focused}
					Icon={icon}
				/>
			</View>
		</Pressable>
	);
}
const TabElements = ({ routes }) => {
	const colors = useThemeColors();
	const insets = useSafeAreaInsets();
	const totalItems = routes?.length ?? 0;

	const tabHeight = 60;
	const styles = StyleSheet.create({
		tabBarStyle: {
			backgroundColor: colors.botmTab,
			height: tabHeight + insets?.bottom,
			shadowColor: colors.botmTabShadow,
			shadowOffset: {
				width: 0,
				height: 4,
			},
			shadowOpacity: 0.32,
			shadowRadius: 5.46,
			elevation: 9,
		},
	});
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: styles.tabBarStyle,
				tabBarHideOnKeyboard: true,
			}}>
			{routes?.map((dat) => (
				<Tabs.Screen
					name={dat?.name}
					options={{
						title: dat?.title ?? dat?.name,
						tabBarButton: (props) => (
							<CustomTabButton
								key={dat?.name}
								icon={dat?.icon}
								tabHeight={tabHeight}
								totalItems={totalItems}
								{...props}
							/>
						),
					}}
				/>
			))}
		</Tabs>
	);
};

export default TabElements;
