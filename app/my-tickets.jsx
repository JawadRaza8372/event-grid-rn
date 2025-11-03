import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import CenteredTitleTopBar from "../components/CenteredTitleTopBar";
import EmptyComponent from "../components/EmptyComponent";
import LoadingView from "../components/LoadingView";
import TicketComp from "../components/TicketComp";
import { useThemeColors } from "../hooks/useThemeColors";

const MyTickets = () => {
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
		(dat) => dat?.status === "valid"
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
					console.log(item);
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
							<TicketComp
								bannerImage={item?.event?.bannerImage}
								address={item?.event?.location?.address}
								date={item?.event?.startEndDate}
								title={item?.event?.title}
								type={item?.ticketTierName}
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

export default MyTickets;
