import { useRouter } from "expo-router";
import { useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { Icons } from "../../assets/icons";
import { allCategoriesArry } from "../../constants/rawData";
import { useThemeColors } from "../../hooks/useThemeColors";
import MyEventComp from "../MyEventComp";
import CategoryView from "./CategoryView";
import SeeAllView from "./SeeAllView";
import WelcomeTopComponent from "./WelcomeTopComponent";

const OrganizerHomeScreen = () => {
	const router = useRouter();
	const colors = useThemeColors();
	const [selectedCategory, setselectedCategory] = useState("All");
	const currentUserData = {
		revenue: "420k",
		events: "4",
		tickets: "2301",
		views: "11.9k",
	};
	const ticketsArray = [
		{
			address: "Grand Park, New Grand Park, New",
			date: "Mon, Dec 24 . 18.00 - 23.00",
			eventName: "Art WorkShops",
			totalTickets: 500,
			soldTickets: 250,
			totalAmount: 1500,
			imageLink:
				"https://plus.unsplash.com/premium_photo-1757343190565-3b99182167e3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
		},
		{
			address: "Grand Park, New Grand Park, New",
			date: "Mon, Dec 24 . 18.00 - 23.00",
			eventName: "Art WorkShops",
			totalTickets: 500,
			soldTickets: 250,
			totalAmount: 1500,
			imageLink:
				"https://plus.unsplash.com/premium_photo-1757343190565-3b99182167e3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
		},
		{
			address: "Grand Park, New Grand Park, New",
			date: "Mon, Dec 24 . 18.00 - 23.00",
			eventName: "Art WorkShops",
			totalTickets: 500,
			soldTickets: 250,
			totalAmount: 1500,
			imageLink:
				"https://plus.unsplash.com/premium_photo-1757343190565-3b99182167e3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
		},
	];
	const styles = StyleSheet.create({
		bottomPadding: {
			width: "100%",
			height: 100,
		},
		tabContainer: {
			width: Dimensions.get("screen").width - 34,
			alignSelf: "center",
			marginTop: 17,
			marginBottom: 29,
		},
		mainItemsContainer: {
			width: Dimensions.get("screen").width - 34,
			alignSelf: "center",
			marginTop: 15,
		},
		sepratorView: {
			width: "100%",
			height: 15,
		},
		valueContainer: {
			width: (Dimensions.get("screen").width - 48 - 12) / 2,
			paddingVertical: 40,
			paddingHorizontal: 21,
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			borderRadius: 15,
			backgroundColor: colors.topEventBg,
			gap: 12,
		},
		upperMainContainer: {
			width: Dimensions.get("screen").width - 48,
			alignSelf: "center",
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			flexDirection: "row",
			flexWrap: "wrap",
			gap: 12,
		},
		childContainer: {
			height: "auto",
			flex: 1,
			display: "flex",
			flexDirection: "column",
			gap: 6,
		},
		labelTxt: {
			fontSize: 16,
			fontWeight: "600",
			lineHeight: 20,
			color: colors.blackColor,
		},
		valueTxt: {
			fontSize: 16,
			fontWeight: "500",
			color: colors.dataTitleColor,
		},
	});

	return (
		<>
			<WelcomeTopComponent />
			<View style={styles.upperMainContainer}>
				<View style={styles.valueContainer}>
					<Icons.CoinsDollar />
					<View style={styles.childContainer}>
						<Text style={styles.labelTxt}>Revenue</Text>
						<Text style={styles.valueTxt}>{currentUserData?.revenue ?? 0}</Text>
					</View>
				</View>
				<View style={styles.valueContainer}>
					<Icons.Ticket
						width={25}
						height={25}
					/>
					<View style={styles.childContainer}>
						<Text style={styles.labelTxt}>Tickets</Text>
						<Text style={styles.valueTxt}>{currentUserData?.tickets ?? 0}</Text>
					</View>
				</View>
				<View style={styles.valueContainer}>
					<Icons.CalendarDigit />
					<View style={styles.childContainer}>
						<Text style={styles.labelTxt}>Events</Text>
						<Text style={styles.valueTxt}>{currentUserData?.events ?? 0}</Text>
					</View>
				</View>
				<View style={styles.valueContainer}>
					<Icons.Eye />
					<View style={styles.childContainer}>
						<Text style={styles.labelTxt}>Views</Text>
						<Text style={styles.valueTxt}>{currentUserData?.views ?? 0}</Text>
					</View>
				</View>
			</View>

			<SeeAllView title={"Categories"} />
			<CategoryView
				value={selectedCategory}
				onChangeValue={(text) => setselectedCategory(text)}
				options={allCategoriesArry}
			/>
			<SeeAllView
				title={"Your Events"}
				onPressFun={() => router.push({ pathname: "/organizer-events" })}
			/>
			<View style={styles.mainItemsContainer}>
				<FlatList
					showsVerticalScrollIndicator={false}
					data={ticketsArray}
					ItemSeparatorComponent={() => <View style={styles.sepratorView} />}
					renderItem={({ item }) => (
						<MyEventComp
							address={item?.address}
							date={item?.date}
							imageLink={item?.imageLink}
							soldTickets={item?.soldTickets}
							title={item?.eventName}
							totalTickets={item?.totalTickets}
							totalAmount={item?.totalAmount}
						/>
					)}
				/>
			</View>
			<View style={styles.bottomPadding} />
		</>
	);
};

export default OrganizerHomeScreen;
