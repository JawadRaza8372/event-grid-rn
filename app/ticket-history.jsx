import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import CenteredTitleTopBar from "../components/CenteredTitleTopBar";
import EmptyComponent from "../components/EmptyComponent";
import LoadingView from "../components/LoadingView";
import MyEventComp from "../components/MyEventComp";
import { useThemeColors } from "../hooks/useThemeColors";

const TicketHistory = () => {
	const colors = useThemeColors();
	const router = useRouter();
	const [isLoading, setisLoading] = useState(false);
	const { ticketHistory } = useSelector((state) => state?.user);
	const styles = StyleSheet.create({
		mainContainer: {
			width: "100%",
			height: "100%",
			backgroundColor: colors.mainBgColor,
			display: "flex",
			flexDirection: "column",
			gap: 15,
		},
		bottomPadding: {
			width: "100%",
			height: 120,
		},
		sepratorView: {
			width: "100%",
			height: 15,
		},
		eventWrapper: {
			alignSelf: "center",
		},
	});
	const filterValidTickets = ticketHistory?.filter(
		(dat) => dat?.status !== "valid"
	);
	return (
		<View style={styles.mainContainer}>
			<CenteredTitleTopBar
				title={"My Tickets"}
				showBackBtn={true}
			/>
			<FlatList
				showsVerticalScrollIndicator={false}
				data={filterValidTickets}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => {
					return (
						<TouchableOpacity
							style={styles.eventWrapper}
							onPress={() =>
								router.push({
									pathname: "/e-ticket-wallet",
									params: {
										ticketData: JSON.stringify(item),
									},
								})
							}>
							<MyEventComp
								address={item?.event?.location?.address}
								date={item?.event?.date}
								title={item?.event?.title}
							/>
						</TouchableOpacity>
					);
				}}
				ItemSeparatorComponent={() => <View style={styles.sepratorView} />}
				ListEmptyComponent={<EmptyComponent title={`No My Tickets`} />}
				ListFooterComponent={<View style={styles.bottomPadding} />}
			/>
			<LoadingView loading={isLoading} />
		</View>
	);
};

export default TicketHistory;
