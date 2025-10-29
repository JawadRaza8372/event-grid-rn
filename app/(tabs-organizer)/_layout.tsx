// app/(tabs)/_layout.jsx
import { useThemeColors } from "@/hooks/useThemeColors";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import CreateEvent from "../../assets/bottomIcons/CreateEvent";
import HomeIcon from "../../assets/bottomIcons/HomeIcon";
import NotificationIcon from "../../assets/bottomIcons/NotificationIcon";
import ProfileIcon from "../../assets/bottomIcons/ProfileIcon";
import TicketIcon from "../../assets/bottomIcons/TicketIcon";
import TabIcon from "../../components/TabIcon";
export default function TabLayout() {
	const colors = useThemeColors();
	const totalItems = 5;

	const styles = StyleSheet.create({
		tabBarStyle: {
			backgroundColor: colors.botmTab,
			height: 60,
			// display: "flex",
			// alignItems: "center",
			// justifyContent: "center",
			// flexDirection: "row",
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
			<Tabs.Screen
				name={"index"}
				options={{
					title: "index",
					tabBarIcon: ({ focused }) => (
						<TabIcon
							totalItems={totalItems}
							focused={focused}
							Icon={HomeIcon}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name={"ticket"}
				options={{
					title: "ticket",
					tabBarIcon: ({ focused }) => (
						<TabIcon
							totalItems={totalItems}
							focused={focused}
							Icon={TicketIcon}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name={"create-event"}
				options={{
					title: "create-event",
					tabBarIcon: ({ focused }) => (
						<TabIcon
							totalItems={totalItems}
							focused={focused}
							Icon={CreateEvent}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name={"notification"}
				options={{
					title: "notification",
					tabBarIcon: ({ focused }) => (
						<TabIcon
							totalItems={totalItems}
							focused={focused}
							Icon={NotificationIcon}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name={"profile"}
				options={{
					title: "profile",
					tabBarIcon: ({ focused }) => (
						<TabIcon
							totalItems={totalItems}
							focused={focused}
							Icon={ProfileIcon}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
