import { useRouter } from "expo-router";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import EmptyComponent from "../EmptyComponent";
import SeeAllView from "./SeeAllView";
import TopEventCard from "./TopEventCard";
import TrendingEventCardView from "./TrendingEvent";
import WelcomeTopComponent from "./WelcomeTopComponent";
const HomeScreen = () => {
	const { topEvents, trendingEvents, homeEvents } = useSelector(
		(state) => state?.user
	);
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
			{trendingEvents.length > 0 || topEvents?.length > 0 ? (
				<>
					{topEvents.length > 0 ? (
						<SeeAllView
							title={"Top Events"}
							onPressFun={
								homeEvents?.length > 0
									? () => router.push({ pathname: "/all-user-events" })
									: null
							}
						/>
					) : null}
					{topEvents.length > 0 ? (
						<View style={styles.TopEventCardView}>
							<FlatList
								showsHorizontalScrollIndicator={false}
								horizontal={true}
								data={topEvents}
								renderItem={({ item }) => (
									<TopEventCard
										bannerImage={item?.bannerImage}
										eventId={item?.id}
										address={item?.location?.address}
										date={item?.startEndDate}
										eventName={item?.title}
										onPressFun={() =>
											router.push({
												pathname: "/event-details",
												params: { eventData: JSON.stringify(item) },
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
					) : null}
					{trendingEvents.length > 0 ? (
						<SeeAllView
							title={"Trending Events"}
							onPressFun={
								homeEvents?.length > 0
									? () => router.push({ pathname: "/all-user-events" })
									: null
							}
						/>
					) : null}
					{trendingEvents.length > 0 ? (
						<View style={styles.trendingEventCardView}>
							<FlatList
								horizontal={true}
								showsHorizontalScrollIndicator={false}
								ListHeaderComponent={
									<View style={styles.trendingEventSeprator} />
								}
								data={trendingEvents}
								renderItem={({ item }) => (
									<TrendingEventCardView
										ticketTiers={item?.ticketTiers}
										bannerImage={item?.bannerImage}
										location={item?.location?.address}
										date={item?.startEndDate}
										name={item?.title}
										id={item?.id}
										onPressFun={() =>
											router.push({
												pathname: "/event-details",
												params: { eventData: JSON.stringify(item) },
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
					) : null}
				</>
			) : (
				<EmptyComponent title={"No events"} />
			)}

			<View style={styles.bottomView} />
		</>
	);
};

export default HomeScreen;
