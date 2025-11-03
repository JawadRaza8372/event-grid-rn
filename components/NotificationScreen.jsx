import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { useThemeColors } from "../hooks/useThemeColors";
import { deleteUserNotificationApi } from "../services/endpoints";
import { setUserNotifications } from "../services/store/userSlice";
import CenteredTitleTopBar from "./CenteredTitleTopBar";
import LoadingView from "./LoadingView";
import NotificationComp from "./NotificationComp";

const NotificationScreen = () => {
	const dispatch = useDispatch();
	const { userNotifications } = useSelector((state) => state?.user);
	const colors = useThemeColors();
	const [isLoading, setisLoading] = useState(false);
	const styles = StyleSheet.create({
		formContainer: {
			width: "100%",
			height: "100%",
			display: "flex",
			flexDirection: "column",
			backgroundColor: colors.mainBgColor,
			gap: 25,
			position: "relative",
		},

		bottomPadding: {
			width: "100%",
			height: 120,
		},
		sepratorView: {
			width: "100%",
			height: 10,
		},
		topCircle: {
			position: "absolute",
			top: -75,
			right: -105,
			width: 189,
			height: 189,
			borderRadius: 200,
			backgroundColor: colors.blackColor,
		},
		bottomCircle: {
			position: "absolute",
			bottom: -75,
			left: -105,
			width: 189,
			height: 189,
			borderRadius: 200,
			backgroundColor: colors.blackColor,
		},
	});
	const deleteNotificationFun = async (notificationId) => {
		try {
			if (!notificationId) {
				Toast.show({
					type: "error",
					text1: "Notification Id is required",
				});
				return;
			}
			setisLoading(true);
			await deleteUserNotificationApi(notificationId);
			dispatch(
				setUserNotifications({
					userNotifications: userNotifications?.filter(
						(dat) => dat?.id !== notificationId
					),
				})
			);
			setisLoading(false);
		} catch (error) {
			setisLoading(false);

			console.log("Notification delete failed: ", error);
			Toast.show({
				type: "error",
				text1: error ?? "Notification delete failed.",
			});
		}
	};
	return (
		<View style={styles.formContainer}>
			<View style={styles.topCircle} />
			<View style={styles.bottomCircle} />
			<CenteredTitleTopBar title={"Notifications"} />
			<FlatList
				showsVerticalScrollIndicator={false}
				data={userNotifications}
				keyExtractor={(item, index) => item?.id}
				renderItem={({ item }) => {
					return (
						<NotificationComp
							date={item?.createdAt}
							title={item?.title}
							onDelete={() => deleteNotificationFun(item?.id)}
						/>
					);
				}}
				ItemSeparatorComponent={() => <View style={styles.sepratorView} />}
				ListFooterComponent={<View style={styles?.bottomPadding} />}
			/>
			<LoadingView loading={isLoading} />
		</View>
	);
};

export default NotificationScreen;
