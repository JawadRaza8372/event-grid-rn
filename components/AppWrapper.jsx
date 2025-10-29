import {
	setFavEvents,
	setHomeEvents,
	setOrganizerEvents,
	setOrganizerStats,
	setTicketHistory,
} from "@/services/store/userSlice";
import * as NavigationBar from "expo-navigation-bar";
import * as ScreenOrientation from "expo-screen-orientation";
import { useCallback, useEffect, useRef } from "react";
import { Appearance, StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { useThemeColors } from "../hooks/useThemeColors";
import {
	getOrganizerStatsApi,
	getUserFavoriteApi,
	getUserHomeEventApi,
	getUserTicketHistoryApi,
} from "../services/endpoints";
import { disconnectSocket, initiateSocket } from "../services/socketService";
import Navigation from "./Naviagtion";
const AppWrapper = () => {
	const isFetchingRef = useRef(false);
	const previousUserIdRef = useRef(null);
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state?.user);
	const colors = useThemeColors();
	useEffect(() => {
		const lockOrientation = async () => {
			try {
				await ScreenOrientation.lockAsync(
					ScreenOrientation.OrientationLock.PORTRAIT
				);
				await NavigationBar.setButtonStyleAsync("dark");
				Appearance.setColorScheme("light");
			} catch (err) {
				console.log("Failed to lock orientation:", err);
			}
		};
		lockOrientation();
		initiateSocket();
		return () => {
			disconnectSocket();
		};
	}, []);
	const fetchAllData = useCallback(async () => {
		try {
			if (user?.role === "organizer") {
				console.log("isorganizer");
				const [organizerStats] = await Promise.all([
					getOrganizerStatsApi().catch((err) => {
						console.error("Error in getOrganizerStats:", err);
						return null;
					}),
				]);
				dispatch(
					setOrganizerStats({
						organizerStats: {
							totalEvents: organizerStats?.data?.totalEvents ?? 0,
							totalRevenue: organizerStats?.data?.totalRevenue ?? 0,
							totalTicketsSold: organizerStats?.data?.totalTicketsSold ?? 0,
							totalViews: organizerStats?.data?.totalViews ?? 0,
						},
					})
				);
				dispatch(
					setOrganizerEvents({ organizerEvents: organizerStats?.data?.events })
				);
			} else {
				const [homeEvent, favEvent, ticketHistory] = await Promise.all([
					getUserHomeEventApi().catch((err) => {
						console.error("Error in getUserHomeEventApi:", err);
						return null;
					}),
					getUserFavoriteApi().catch((err) => {
						console.error("Error in getUserFavoriteApi:", err);
						return null;
					}),
					getUserTicketHistoryApi().catch((err) => {
						console.error("Error in getUserTicketHistoryApi:", err);
						return null;
					}),
				]);

				dispatch(
					setHomeEvents({
						home: homeEvent?.allPublishedEvents,
						top: homeEvent?.topEvents,
						trends: homeEvent?.trendingEvents,
					})
				);
				dispatch(setFavEvents({ favEvents: favEvent?.myFavoriteEvents }));
				dispatch(setTicketHistory({ ticketHistory: ticketHistory?.tickets }));
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}, [user]);
	const fetchDataWhenLogedIn = useCallback(async () => {
		if (!user?.email) {
			return;
		}
		if (isFetchingRef.current) {
			return;
		}
		try {
			isFetchingRef.current = true;
			previousUserIdRef.current = user?.email;
			await fetchAllData();
		} catch (error) {
			console.log(error);
		} finally {
			isFetchingRef.current = false;
		}
	}, [user?.id, fetchAllData]);
	useEffect(() => {
		const run = async () => {
			if (user?.email && user.email !== previousUserIdRef.current)
				await fetchDataWhenLogedIn();
		};
		run();
	}, [user?.email, fetchDataWhenLogedIn]);
	return (
		<SafeAreaProvider>
			<SafeAreaView
				edges={["bottom", "top"]}
				style={{ flex: 1, backgroundColor: colors.mainBgColor }}>
				<StatusBar
					backgroundColor={colors.mainBgColor}
					barStyle={"dark-content"}
				/>
				<Navigation />
			</SafeAreaView>
		</SafeAreaProvider>
	);
};

export default AppWrapper;
