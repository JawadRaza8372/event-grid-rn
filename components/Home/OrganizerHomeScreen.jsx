import { useRouter } from "expo-router";
import { useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { Icons } from "../../assets/icons";
import { allCategoriesArry } from "../../constants/rawData";
import { useThemeColors } from "../../hooks/useThemeColors";
import EmptyComponent from "../EmptyComponent";
import MyEventComp from "../MyEventComp";
import CategoryView from "./CategoryView";
import SeeAllView from "./SeeAllView";
import WelcomeTopComponent from "./WelcomeTopComponent";

const OrganizerHomeScreen = () => {
	const router = useRouter();
	const colors = useThemeColors();
	const { organizerStats, organizerEvents } = useSelector(
		(state) => state?.user
	);

	const [selectedCategory, setselectedCategory] = useState("All");
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
	const homeOrganizerEvents =
		organizerEvents?.filter(
			(dat) =>
				dat?.status === "Published" &&
				(selectedCategory === "All" || dat?.category === selectedCategory)
		) ?? [];
	return (
		<>
			<WelcomeTopComponent />
			<View style={styles.upperMainContainer}>
				<View style={styles.valueContainer}>
					<Icons.CoinsDollar />
					<View style={styles.childContainer}>
						<Text style={styles.labelTxt}>Revenue</Text>
						<Text style={styles.valueTxt}>
							{organizerStats?.totalRevenue ?? 0}
						</Text>
					</View>
				</View>
				<View style={styles.valueContainer}>
					<Icons.Ticket
						width={25}
						height={25}
					/>
					<View style={styles.childContainer}>
						<Text style={styles.labelTxt}>Tickets</Text>
						<Text style={styles.valueTxt}>
							{organizerStats?.totalTicketsSold ?? 0}
						</Text>
					</View>
				</View>
				<View style={styles.valueContainer}>
					<Icons.CalendarDigit />
					<View style={styles.childContainer}>
						<Text style={styles.labelTxt}>Events</Text>
						<Text style={styles.valueTxt}>
							{organizerStats?.totalEvents ?? 0}
						</Text>
					</View>
				</View>
				<View style={styles.valueContainer}>
					<Icons.Eye />
					<View style={styles.childContainer}>
						<Text style={styles.labelTxt}>Views</Text>
						<Text style={styles.valueTxt}>
							{organizerStats?.totalViews ?? 0}
						</Text>
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
				onPressFun={
					organizerEvents?.length > 0
						? () => router.push({ pathname: "/organizer-events" })
						: null
				}
			/>
			<View style={styles.mainItemsContainer}>
				<FlatList
					showsVerticalScrollIndicator={false}
					data={homeOrganizerEvents}
					ItemSeparatorComponent={() => <View style={styles.sepratorView} />}
					renderItem={({ item }) => (
						<MyEventComp
							address={item?.address}
							date={item?.date}
							soldTickets={item?.stats?.ticketsSold}
							title={item?.title}
							totalTickets={item?.stats?.totalTickets}
							totalAmount={item?.stats?.revenue}
						/>
					)}
					ListEmptyComponent={
						<EmptyComponent
							title={
								selectedCategory === "All"
									? "No Published Events"
									: `No events for ${selectedCategory} category`
							}
						/>
					}
				/>
			</View>
			<View style={styles.bottomPadding} />
		</>
	);
};

export default OrganizerHomeScreen;
