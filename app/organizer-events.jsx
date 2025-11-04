import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import CenteredTitleTopBar from "../components/CenteredTitleTopBar";
import EmptyComponent from "../components/EmptyComponent";
import LoadingView from "../components/LoadingView";
import OrganizerEventComp from "../components/OrganizerEventComp";
import TabContainer from "../components/TabContainer";
import YesNoModal from "../components/YesNoModal";
import { useThemeColors } from "../hooks/useThemeColors";
import {
	deleteDraftEventApi,
	publishDraftEventApi,
} from "../services/endpoints";
const OrganizerEvents = () => {
	const { organizerEvents } = useSelector((state) => state?.user);
	const router = useRouter();
	const colors = useThemeColors();
	const [isLoading, setisLoading] = useState(false);
	const [selectedEventType, setSelectedEventType] = useState("Published");
	const [openDeleteModal, setopenDeleteModal] = useState(null);
	const [openPublishModal, setopenPublishModal] = useState(null);

	const removeOpenDeleteModal = () => {
		setopenDeleteModal(null);
	};
	const removeOpenPublishModal = () => {
		setopenPublishModal(null);
	};
	const styles = StyleSheet.create({
		userContainer: {
			width: "100%",
			height: 180,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column",
			gap: 18,
			marginVertical: 40,
		},
		usernameTxt: {
			width: "80%",
			fontSize: 27,
			fontWeight: "600",
			color: colors.blackColor,
			textAlign: "center",
		},
		mainContainer: {
			width: "100%",
			height: "100%",
			backgroundColor: colors.mainBgColor,
			paddingHorizontal: 16,
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
		childContainer: {
			width: "100%",
			flex: 1,
		},
	});
	const darftToPublishEventFun = async () => {
		try {
			if (openPublishModal == null) {
				Toast.show({
					type: "error",
					text1: "Invalid Event selected.",
				});
				return;
			}
			setisLoading(true);
			await publishDraftEventApi(openPublishModal);
			setisLoading(false);
			removeOpenPublishModal();
			Toast.show({
				type: "success",
				text1: "Event Published successfully.",
			});
		} catch (error) {
			console.log("draft to publuish error: ", error);
			setisLoading(false);
			Toast.show({
				type: "error",
				text1: error ?? "Publishing Event failed.",
			});
		}
	};
	const deleteDraftEventFun = async () => {
		try {
			if (openDeleteModal == null) {
				Toast.show({
					type: "error",
					text1: "Invalid Event selected.",
				});
				return;
			}
			setisLoading(true);
			await deleteDraftEventApi(openDeleteModal);
			setisLoading(false);
			removeOpenDeleteModal();

			Toast.show({
				type: "success",
				text1: "Event Deleted successfully.",
			});
		} catch (error) {
			console.log("draft delete error: ", error);
			setisLoading(false);
			Toast.show({
				type: "error",
				text1: error ?? "Deleting Draft Event failed.",
			});
		}
	};

	const filterEventOnEventType =
		organizerEvents?.filter((dat) => dat?.status === selectedEventType) ?? [];
	return (
		<View style={styles.mainContainer}>
			<CenteredTitleTopBar
				paddingHorizontal={5}
				title={"My Events"}
				showBackBtn={true}
			/>
			<TabContainer
				borderColor={colors.dateBorder}
				inActiveBg={colors.bellBorder}
				inActiveTxtColor={colors.blackColor}
				value={selectedEventType}
				onchange={(text) => setSelectedEventType(text)}
				options={["Published", "Draft", "Completed"]}
			/>
			<View style={styles.childContainer}>
				<FlatList
					showsVerticalScrollIndicator={false}
					data={filterEventOnEventType}
					keyExtractor={(item) => item?.id}
					renderItem={({ item }) => {
						return (
							<OrganizerEventComp
								id={item?.id}
								isClickAble={selectedEventType !== "Draft" ? true : false}
								bannerImage={item?.bannerImage}
								address={item?.address}
								date={item?.date}
								ticketsSold={item?.stats?.ticketsSold}
								title={item?.title}
								totalTickets={item?.stats?.totalTickets}
								totalAmount={item?.stats?.revenue}
								showSmallButtons={selectedEventType === "Draft" ? true : false}
								showOnlyUpdateBtn={
									selectedEventType === "Published" ? true : false
								}
								onDeleteFun={() => setopenDeleteModal(item?.id)}
								onPublishFun={() => setopenPublishModal(item?.id)}
								onUpdateFun={() =>
									router.push({
										pathname: "/update-event",
										params: {
											eventId: item?.id,
										},
									})
								}
							/>
						);
					}}
					ItemSeparatorComponent={() => <View style={styles.sepratorView} />}
					ListEmptyComponent={
						<EmptyComponent title={`No ${selectedEventType} events`} />
					}
					ListFooterComponent={<View style={styles.bottomPadding} />}
				/>
			</View>
			<LoadingView loading={isLoading} />
			<YesNoModal
				title={"Delete Draft Event"}
				description={"Are you sure you want to delete this draft event?"}
				showModal={openDeleteModal ? true : false}
				hideModal={removeOpenDeleteModal}
				onYesFun={deleteDraftEventFun}
				onNoFun={removeOpenDeleteModal}
				yesTxt={"Delete"}
				noTxt={"Cancel"}
			/>
			<YesNoModal
				title={"Publish Event"}
				description={"Are you sure you want to publish this event?"}
				showModal={openPublishModal ? true : false}
				yesTxt={"Publish"}
				noTxt={"Cancel"}
				onNoFun={removeOpenPublishModal}
				hideModal={removeOpenPublishModal}
				onYesFun={darftToPublishEventFun}
			/>
		</View>
	);
};

export default OrganizerEvents;
