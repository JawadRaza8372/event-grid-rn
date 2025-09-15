// app/(tabs)/_layout.jsx
import { AuthContext } from "@/constants/AuthContext";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Tabs } from "expo-router";
import { useContext } from "react";
import { StyleSheet } from "react-native";
import CreateEvent from "../../assets/bottomIcons/CreateEvent";
import FavoriteIcon from "../../assets/bottomIcons/FavoriteIcon";
import HomeIcon from "../../assets/bottomIcons/HomeIcon";
import NotificationIcon from "../../assets/bottomIcons/NotificationIcon";
import ProfileIcon from "../../assets/bottomIcons/ProfileIcon";
import TicketIcon from "../../assets/bottomIcons/TicketIcon";
import TabIcon from "../../components/TabIcon";
export default function TabLayout() {
	const colors = useThemeColors();
	const { role } = useContext(AuthContext);
	const isOrganizer = role !== "user";

	const styles = StyleSheet.create({
		tabBarStyle: {
			backgroundColor: colors.botmTab,
			height: 90,
			position: "absolute",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
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
							focused={focused}
							Icon={TicketIcon}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name={"center-tab"}
				options={{
					title: "center-tab",
					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							Icon={isOrganizer ? CreateEvent : FavoriteIcon}
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
							focused={focused}
							Icon={ProfileIcon}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
