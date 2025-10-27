import {
	Dimensions,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Icons } from "../../assets/icons";
import NotificationComp from "../../components/NotificationComp";
import { useThemeColors } from "../../hooks/useThemeColors";

const Notification = () => {
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
		screenHeaderTitle: {
			color: colors.blackColor,
			fontSize: 18,
			fontWeight: "600",
			lineHeight: 20,
		},
		topBarContainer: {
			width: Dimensions.get("screen").width - 40,
			alignSelf: "center",
			height: 45,
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			flexDirection: "row",
		},
		backBtn: {
			height: 44,
			width: 44,
			borderRadius: 14,
			borderWidth: 1,
			borderColor: colors.inActiveColor,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
		},
		sideBtn: { height: 44, width: 44, borderRadius: 44 },
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
			<View style={styles.topBarContainer}>
				<TouchableOpacity
					onPress={() => router.back()}
					style={styles.backBtn}>
					<Icons.ArrowBack
						width={25}
						height={25}
					/>
				</TouchableOpacity>
				<Text style={styles.screenHeaderTitle}>Notifications</Text>
				<View style={styles.sideBtn} />
			</View>
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

export default Notification;
