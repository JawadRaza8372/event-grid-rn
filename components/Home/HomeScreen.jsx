import { useRouter } from "expo-router";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import SeeAllView from "./SeeAllView";
import TopEventCard from "./TopEventCard";
import TrendingEventCardView from "./TrendingEvent";
import WelcomeTopComponent from "./WelcomeTopComponent";
const HomeScreen = () => {
	const { topEvents, trendingEvents, homeEvents } = useSelector(
		(state) => state?.user
	);
	console.log(homeEvents?.[0]);
	const router = useRouter();
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
			width: 10,
			height: 100,
		},
		bottomView: {
			width: "100%",
			height: 110,
		},
	});

	return (
		<>
			<WelcomeTopComponent />

			<SeeAllView
				title={"Top Events"}
				onPressFun={() => console.log("")}
			/>
			<View style={styles.TopEventCardView}>
				<FlatList
					showsHorizontalScrollIndicator={false}
					horizontal={true}
					data={topEvents}
					renderItem={({ item }) => (
						<TopEventCard
							eventId={item?.id}
							address={item?.location?.address}
							date={item?.startEndDate}
							eventName={item?.title}
							onPressFun={() =>
								router.push({
									pathname: "/event-details",
									params: { eventData: item },
								})
							}
						/>
					)}
					keyExtractor={(item, index) => item?.id}
					ItemSeparatorComponent={() => (
						<View style={styles.topEventSeprator} />
					)}
				/>
			</View>
			<SeeAllView
				title={"Trending Events"}
				onPressFun={() => console.log("")}
			/>
			<View style={styles.trendingEventCardView}>
				<FlatList
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					ListHeaderComponent={<View style={styles.trendingEventSeprator} />}
					data={trendingEvents}
					renderItem={({ item }) => (
						<TrendingEventCardView
							genralPrice={item?.generaladmissionPrice}
							location={item?.location?.address}
							date={item?.startEndDate}
							name={item?.title}
							vipPrice={item?.vipPrice}
							onPressFun={() =>
								router.push({
									pathname: "/event-details",
									params: { eventData: item },
								})
							}
						/>
					)}
					keyExtractor={(item, index) => item?.id}
					ItemSeparatorComponent={() => (
						<View style={styles.trendingEventSeprator} />
					)}
				/>
			</View>
			<View style={styles.bottomView} />
		</>
	);
};

export default HomeScreen;
