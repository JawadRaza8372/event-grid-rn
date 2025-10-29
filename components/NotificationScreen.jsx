import { FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { useThemeColors } from "../hooks/useThemeColors";
import CenteredTitleTopBar from "./CenteredTitleTopBar";
import NotificationComp from "./NotificationComp";

const NotificationScreen = () => {
	const { userNotifications } = useSelector((state) => state?.user);
	const colors = useThemeColors();
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
	return (
		<View style={styles.formContainer}>
			<View style={styles.topCircle} />
			<View style={styles.bottomCircle} />
			<CenteredTitleTopBar title={"Notifications"} />
			<FlatList
				data={userNotifications}
				keyExtractor={(item, index) => item?.id}
				renderItem={({ item }) => {
					console.log(item);
					return (
						<NotificationComp
							date={item?.createdAt}
							title={item?.title}
						/>
					);
				}}
				ItemSeparatorComponent={() => <View style={styles.sepratorView} />}
				ListFooterComponent={<View style={styles?.bottomPadding} />}
			/>
		</View>
	);
};

export default NotificationScreen;
