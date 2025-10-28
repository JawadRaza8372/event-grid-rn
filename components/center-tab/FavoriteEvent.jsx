import { useRouter } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import AuthLayout from "../AuthLayout";
import TrendingEventCardView from "../Home/TrendingEvent";
import SideTopBar from "../SideTopBar";

const FavoriteEvent = () => {
	const { favEvents } = useSelector((state) => state?.user);
	const router = useRouter();

	return (
		<AuthLayout hideBgImg={true}>
			<>
				<SideTopBar
					title={"Favorite Events"}
					isTailIcon={true}
				/>
				<FlatList
					showsVerticalScrollIndicator={false}
					data={favEvents}
					renderItem={({ item }) => (
						<TrendingEventCardView
							genralPrice={item?.generaladmissionPrice}
							location={item?.location?.address}
							date={item?.startEndDate}
							name={item?.title}
							vipPrice={item?.vipPrice}
							id={item?.id}
							isFullWidth={true}
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
					ListFooterComponent={<View style={styles.bottomView} />}
				/>
			</>
		</AuthLayout>
	);
};

export default FavoriteEvent;

const styles = StyleSheet.create({
	trendingEventSeprator: {
		width: "100%",
		height: 10,
	},
	bottomView: {
		width: "100%",
		height: 110,
	},
});
