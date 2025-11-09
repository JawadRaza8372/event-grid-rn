import {
	setFavEvents,
	setHomeEvents,
	setOrganizerEvents,
	setOrganizerInvites,
	setOrganizerStats,
	setTicketHistory,
	setTokens,
	setUser,
	setUserNotifications,
} from "@/services/store/userSlice";
import * as NavigationBar from "expo-navigation-bar";
import * as ScreenOrientation from "expo-screen-orientation";
import { useCallback, useEffect, useRef } from "react";
import { Appearance, StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { useThemeColors } from "../hooks/useThemeColors";
import {
	decodeUserId,
	getEventStaffInvitationsApi,
	getOrganizerStatsApi,
	getUserFavoriteApi,
	getUserHomeEventApi,
	getUserNotificationApi,
	getUserProfileApi,
	getUserTicketHistoryApi,
} from "../services/endpoints";
import {
	disconnectSocket,
	homeEventsUpdated,
	initiateSocket,
	notificationUpdated,
	organizerEventsUpdated,
	organizerInvitesUpdated,
	userFavoriteEventsUpdated,
	userProfileUpdated,
	userTicketsUpdated,
} from "../services/socketService";
import Navigation from "./Naviagtion";
const AppWrapper = () => {
	const isFetchingRef = useRef(false);
	const previousUserIdRef = useRef(null);
	const dispatch = useDispatch();
	const { user, tokens } = useSelector((state) => state?.user);
	const currentUserId = decodeUserId(tokens?.accessToken);
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
				const [organizerStats, userNotification, organizerInvites] =
					await Promise.all([
						getOrganizerStatsApi().catch((err) => {
							console.error("Error in getOrganizerStats:", err);
							return null;
						}),
						getUserNotificationApi().catch((err) => {
							console.error("Error in getUserTicketHistoryApi:", err);
							return null;
						}),
						getEventStaffInvitationsApi().catch((err) => {
							console.error("Error in getEventStaffInvitationsApi:", err);
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
				dispatch(
					setUserNotifications({
						userNotifications: userNotification?.notifications,
					})
				);
				dispatch(setOrganizerInvites({ organizerInvites: organizerInvites }));
			} else {
				const [homeEvent, favEvent, ticketHistory, userNotification] =
					await Promise.all([
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
						getUserNotificationApi().catch((err) => {
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
				dispatch(
					setUserNotifications({
						userNotifications: userNotification?.notifications,
					})
				);
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
	useEffect(() => {
		notificationUpdated(async (userId) => {
			if (userId === currentUserId) {
				getUserNotificationApi()
					.then((dat) => {
						dispatch(
							setUserNotifications({
								userNotifications: dat?.notifications,
							})
						);
					})
					.catch((err) => {
						console.error("Error in getUserTicketHistoryApi in sockets:", err);
						return null;
					});
			}
		});
		userTicketsUpdated(async (userId) => {
			if ((userId === currentUserId && user?.role) === "user") {
				getUserTicketHistoryApi()
					.then((dat) => {
						dispatch(
							setTicketHistory({
								ticketHistory: dat?.tickets,
							})
						);
					})
					.catch((err) => {
						console.error("Error in getUserTicketHistoryApi:", err);
						return null;
					});
			}
		});
		homeEventsUpdated(async () => {
			if (userId === currentUserId) {
				await getUserHomeEventApi()
					.then((dat) => {
						dispatch(
							setHomeEvents({
								home: dat?.allPublishedEvents,
								top: dat?.topEvents,
								trends: dat?.trendingEvents,
							})
						);
					})
					.catch((err) => {
						console.error("Error in getUserHomeEventApi in sockets:", err);
					});
			}
		});
		organizerInvitesUpdated(async (userId) => {
			if (userId === currentUserId && user?.role === "organizer") {
				getEventStaffInvitationsApi()
					.then((dat) => {
						dispatch(
							setOrganizerInvites({
								organizerInvites: dat,
							})
						);
					})
					.catch((err) => {
						console.error(
							"Error in getEventStaffInvitationsApi IN SOCKETS:",
							err
						);
						return null;
					});
			}
		});
		organizerEventsUpdated(async (userId) => {
			if (userId === currentUserId && user?.role === "organizer") {
				getOrganizerStatsApi()
					.then((dat) => {
						dispatch(
							setOrganizerStats({
								organizerStats: {
									totalEvents: dat?.data?.totalEvents ?? 0,
									totalRevenue: dat?.data?.totalRevenue ?? 0,
									totalTicketsSold: dat?.data?.totalTicketsSold ?? 0,
									totalViews: dat?.data?.totalViews ?? 0,
								},
							})
						);
						dispatch(
							setOrganizerEvents({
								organizerEvents: dat?.data?.events,
							})
						);
					})
					.catch((err) => {
						console.error("Error in getOrganizerStats IN SOCKETS:", err);
						return null;
					});
			}
		});
		userFavoriteEventsUpdated(async (userId) => {
			if (userId === currentUserId && user?.role === "user") {
				getUserFavoriteApi()
					.then((dat) => {
						dispatch(setFavEvents({ favEvents: dat?.myFavoriteEvents }));
					})
					.catch((err) => {
						console.error("Error in getUserFavoriteApi in sockets:", err);
					});
			}
		});
		userProfileUpdated(async (userId) => {
			if (userId === currentUserId) {
				await getUserProfileApi()
					.then((dat) => {
						const { tokens, ...rest } = dat?.user;
						dispatch(setUser({ user: rest }));
						console.log("setting tokens in sockets");
						dispatch(
							setTokens({
								tokens: {
									accessToken: tokens?.accessToken,
									refreshToken: tokens?.refreshToken,
								},
							})
						);
					})
					.catch((err) => {
						console.error("Error in getUserProfileApi in sockets:", err);
					});
			}
		});
	}, [dispatch, currentUserId, tokens, user]);
	return (
		<SafeAreaProvider>
			<SafeAreaView
				edges={["top"]}
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
