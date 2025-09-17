import { FlatList, StyleSheet, View } from "react-native";
import AuthLayout from "../AuthLayout";
import TrendingEventCardView from "../Home/TrendingEvent";
import SideTopBar from "../SideTopBar";

const FavoriteEvent = () => {
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
		<AuthLayout hideBgImg={true}>
			<>
				<SideTopBar
					title={"Favorite Events"}
					isTailIcon={true}
				/>
				<FlatList
					showsVerticalScrollIndicator={false}
					data={trendingEventData}
					renderItem={({ item }) => (
						<TrendingEventCardView
							isFavoriteItem={true}
							genralPrice={item.genralPrice}
							imageLink={item.imageLink}
							location={item.location}
							name={item.name}
							ratting={item.ratting}
							vipPrice={item.vipPrice}
							isFullWidth={true}
							onPressFun={() => router.push({ pathname: "/event-details" })}
						/>
					)}
					keyExtractor={(item, index) => index.toString()}
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
