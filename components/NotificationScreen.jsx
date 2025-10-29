import { FlatList, StyleSheet, View } from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";
import CenteredTitleTopBar from "./CenteredTitleTopBar";
import NotificationComp from "./NotificationComp";

const NotificationScreen = () => {
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
	const notificationArray = [
		{
			title: "Event Booked",
			description: "Your event has been Booked!",
			date: "1 hour ago",
		},
	];
	return (
		<View style={styles.formContainer}>
			<View style={styles.topCircle} />
			<View style={styles.bottomCircle} />
			<CenteredTitleTopBar title={"Notifications"} />
			<FlatList
				data={notificationArray}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => (
					<NotificationComp
						date={item?.date}
						description={item?.description}
						title={item?.title}
					/>
				)}
				ItemSeparatorComponent={() => <View style={styles.sepratorView} />}
				ListFooterComponent={<View style={styles?.bottomPadding} />}
			/>
		</View>
	);
};

export default NotificationScreen;
