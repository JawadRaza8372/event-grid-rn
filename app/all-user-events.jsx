import { useRouter } from "expo-router";
import { useState } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import CenteredTitleTopBar from "../components/CenteredTitleTopBar";
import EmptyComponent from "../components/EmptyComponent";
import CategoryView from "../components/Home/CategoryView";
import SearchInput from "../components/Home/SearchInput";
import TrendingEventCardView from "../components/Home/TrendingEvent";
import { allCategoriesArry } from "../constants/rawData";
import { useThemeColors } from "../hooks/useThemeColors";
const AllUserEvents = () => {
	const { homeEvents } = useSelector((state) => state?.user);
	const [selectedCategory, setselectedCategory] = useState("All");
	const [searchTearm, setsearchTearm] = useState("");
	const colors = useThemeColors();
	const router = useRouter();
	const styles = StyleSheet.create({
		trendingEventSeprator: {
			width: "100%",
			height: 10,
		},
		bottomView: {
			width: "100%",
			height: 110,
		},
		mainContainer: {
			width: "100%",
			height: "100%",
			backgroundColor: colors.mainBgColor,
			display: "flex",
			flexDirection: "column",
			gap: 15,
			paddingHorizontal: 12,
		},
		topHeaderView: {
			width: "100%",
			display: "flex",
			flexDirection: "column",
			gap: 10,
		},
	});
	const filteredEventsData =
		homeEvents?.filter(
			(dat) =>
				`${dat?.title}`.includes(searchTearm) &&
				(selectedCategory === "All" || dat?.category === selectedCategory)
		) ?? [];
	return (
		<View style={styles.mainContainer}>
			<View style={styles.topHeaderView}>
				<CenteredTitleTopBar
					title={"Events"}
					showBackBtn={true}
				/>
				<SearchInput
					value={searchTearm}
					onChangeValue={(text) => setsearchTearm(text)}
				/>
				<CategoryView
					viewWidth={Dimensions.get("screen").width - 60}
					title={"Category"}
					value={selectedCategory}
					onChangeValue={(value) => setselectedCategory(value)}
					options={allCategoriesArry}
					mb={0}
					mt={0}
				/>
			</View>

			<FlatList
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={<View style={styles.trendingEventSeprator} />}
				data={filteredEventsData}
				renderItem={({ item }) => (
					<TrendingEventCardView
						isFullWidth={true}
						genralPrice={item?.generaladmissionPrice}
						location={item?.location?.address}
						date={item?.startEndDate}
						name={item?.title}
						vipPrice={item?.vipPrice}
						id={item?.id}
						onPressFun={() =>
							router.push({
								pathname: "/event-details",
								params: { eventData: JSON.stringify(item) },
							})
						}
					/>
				)}
				ListEmptyComponent={
					<EmptyComponent
						title={
							selectedCategory
								? `No ${selectedCategory} events`
								: "No events found"
						}
					/>
				}
				keyExtractor={(item, index) => item?.id}
				ItemSeparatorComponent={() => (
					<View style={styles.trendingEventSeprator} />
				)}
				ListFooterComponent={<View style={styles.bottomView} />}
			/>
		</View>
	);
};

export default AllUserEvents;
