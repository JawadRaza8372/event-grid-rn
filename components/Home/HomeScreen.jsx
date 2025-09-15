import { router } from "expo-router";
import { useState } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import CategoryView from "./CategoryView";
import SearchInput from "./SearchInput";
import SeeAllView from "./SeeAllView";
import TopEventCard from "./TopEventCard";
import TrendingEventCardView from "./TrendingEvent";
import WelcomeTopComponent from "./WelcomeTopComponent";
const HomeScreen = () => {
	const [searchTearm, setsearchTearm] = useState("");
	const [selectedCategory, setselectedCategory] = useState("All");
	const styles = StyleSheet.create({
		TopEventCardView: {
			width: Dimensions.get("screen").width - 20,
			alignSelf: "center",
			height: "auto",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
			marginTop: 29,
			marginBottom: 43,
		},
		trendingEventCardView: {
			width: Dimensions.get("screen").width - 32,
			alignSelf: "center",
			height: "auto",
			marginTop: 40,
			gap: 16,
		},
		topEventSeprator: {
			width: 18,
			height: "100%",
		},
		trendingEventSeprator: {
			width: "100%",
			height: 10,
		},
		bottomView: {
			width: "100%",
			height: 110,
		},
	});
	const topEventCardData = [
		{
			isFavorite: false,
			address: "Grand Park, New Grand Park, New",
			date: "Mon, Dec 24 . 18.00 - 23.00",
			eventName: "Art WorkShops",
			imageLink:
				"https://plus.unsplash.com/premium_photo-1757343190565-3b99182167e3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
		},
		{
			isFavorite: true,
			address: "Grand Park, New Grand Park, New",
			date: "Mon, Dec 24 . 18.00 - 23.00",
			eventName: "Art WorkShops",
			imageLink:
				"https://plus.unsplash.com/premium_photo-1757343190565-3b99182167e3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
		},
		{
			isFavorite: false,
			address: "Grand Park, New Grand Park, New",
			date: "Mon, Dec 24 . 18.00 - 23.00",
			eventName: "Art WorkShops",
			imageLink:
				"https://plus.unsplash.com/premium_photo-1757343190565-3b99182167e3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
		},
		{
			isFavorite: true,
			address: "Grand Park, New Grand Park, New",
			date: "Mon, Dec 24 . 18.00 - 23.00",
			eventName: "Art WorkShops",
			imageLink:
				"https://plus.unsplash.com/premium_photo-1757343190565-3b99182167e3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
		},
		{
			isFavorite: false,
			address: "Grand Park, New Grand Park, New",
			date: "Mon, Dec 24 . 18.00 - 23.00",
			eventName: "Art WorkShops",
			imageLink:
				"https://plus.unsplash.com/premium_photo-1757343190565-3b99182167e3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
		},
		{
			isFavorite: true,
			address: "Grand Park, New Grand Park, New",
			date: "Mon, Dec 24 . 18.00 - 23.00",
			eventName: "Art WorkShops",
			imageLink:
				"https://plus.unsplash.com/premium_photo-1757343190565-3b99182167e3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
		},
	];
	const trendingEventData = [
		{
			imageLink:
				"https://plus.unsplash.com/premium_photo-1757343190565-3b99182167e3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
			name: "National Art WorkShops",
			location: "5 miles from location",
			genralPrice: 25,
			vipPrice: 50,
			ratting: 4,
		},
		{
			imageLink:
				"https://plus.unsplash.com/premium_photo-1757343190565-3b99182167e3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
			name: "National Art WorkShops",
			location: "5 miles from location",
			genralPrice: 25,
			vipPrice: 50,
			ratting: 4,
		},
		{
			imageLink:
				"https://plus.unsplash.com/premium_photo-1757343190565-3b99182167e3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
			name: "National Art WorkShops",
			location: "5 miles from location",
			genralPrice: 25,
			vipPrice: 50,
			ratting: 4,
		},
		{
			imageLink:
				"https://plus.unsplash.com/premium_photo-1757343190565-3b99182167e3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
			name: "National Art WorkShops",
			location: "5 miles from location",
			genralPrice: 25,
			vipPrice: 50,
			ratting: 4,
		},
	];
	return (
		<>
			<WelcomeTopComponent
				name={"Jhon Doe"}
				welcomeTxt={"Good Morning"}
			/>
			<SearchInput
				value={searchTearm}
				onChangeValue={(text) => setsearchTearm(text)}
			/>
			<SeeAllView
				title={"Top Events"}
				onPressFun={() => console.log("")}
			/>
			<View style={styles.TopEventCardView}>
				<FlatList
					showsHorizontalScrollIndicator={false}
					horizontal={true}
					data={topEventCardData}
					renderItem={({ item }) => (
						<TopEventCard
							address={item.address}
							date={item.date}
							eventName={item.eventName}
							imageLink={item.imageLink}
							isFavorite={item.isFavorite}
							onPressFun={() => router.push({ pathname: "/event-details" })}
						/>
					)}
					keyExtractor={(item, index) => index.toString()}
					ItemSeparatorComponent={() => (
						<View style={styles.topEventSeprator} />
					)}
				/>
			</View>
			<SeeAllView
				title={"Categories"}
				onPressFun={() => console.log("")}
			/>
			<CategoryView
				value={selectedCategory}
				onChangeValue={(text) => setselectedCategory(text)}
				options={["All", "Music", "Art", "Workshop", "Fun", "Paint"]}
			/>
			<SeeAllView
				title={"Trending Events"}
				onPressFun={() => console.log("")}
			/>
			<View style={styles.trendingEventCardView}>
				<FlatList
					showsVerticalScrollIndicator={false}
					data={trendingEventData}
					renderItem={({ item }) => (
						<TrendingEventCardView
							genralPrice={item.genralPrice}
							imageLink={item.imageLink}
							location={item.location}
							name={item.name}
							ratting={item.ratting}
							vipPrice={item.vipPrice}
							onPressFun={() => router.push({ pathname: "/event-details" })}
						/>
					)}
					keyExtractor={(item, index) => index.toString()}
					ItemSeparatorComponent={() => (
						<View style={styles.trendingEventSeprator} />
					)}
					ListFooterComponent={<View style={styles.bottomView} />}
				/>
			</View>
		</>
	);
};

export default HomeScreen;
