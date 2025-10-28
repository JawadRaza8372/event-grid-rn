import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import EmptyComponent from "../components/EmptyComponent";
import LoadingView from "../components/LoadingView";
import MyEventComp from "../components/MyEventComp";
import SideTopBar from "../components/SideTopBar";
import TabContainer from "../components/TabContainer";
import YesNoModal from "../components/YesNoModal";
import { useThemeColors } from "../hooks/useThemeColors";
import { setAuthToken } from "../services/apiUrl";
import {
	deleteAccountApi,
	deleteDraftEventApi,
	publishDraftEventApi,
} from "../services/endpoints";
import {
	removeUserTokenfromStorage,
	resetUser,
} from "../services/store/userSlice";
const OrganizerEvents = () => {
	const { user, organizerEvents } = useSelector((state) => state?.user);
	const router = useRouter();
	const dispatch = useDispatch();
	const colors = useThemeColors();
	const [isLoading, setisLoading] = useState(false);
	const [selectedEventType, setSelectedEventType] = useState("Published");
	const [openDeleteModal, setopenDeleteModal] = useState(false);
	const [openLogoutModal, setopenLogoutModal] = useState(false);

	const switchOpenDeleteModal = () => {
		setopenDeleteModal(!openDeleteModal);
	};
	const switchOpenLogoutModal = () => {
		setopenLogoutModal(!openLogoutModal);
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

	const logoutAccountFun = async () => {
		await removeUserTokenfromStorage();
		dispatch(resetUser());
		setAuthToken(null);
		switchOpenLogoutModal();
		setTimeout(() => {
			router.replace({ pathname: "/login" });
		}, 100);
	};
	const darftToPublishEventFun = async (eventId) => {
		try {
			setisLoading(true);
			await publishDraftEventApi(eventId);
			setisLoading(false);

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
	const deleteDraftEventFun = async (eventId) => {
		try {
			setisLoading(true);
			await deleteDraftEventApi(eventId);
			setisLoading(false);

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
	const deleteAccountFun = async () => {
		try {
			await deleteAccountApi();
			await removeUserTokenfromStorage();
			dispatch(resetUser());
			setAuthToken(null);
			switchOpenDeleteModal();
			setTimeout(() => {
				router.replace({ pathname: "/login" });
			}, 100);
		} catch (error) {
			console.log("Delete Account failed: ", error);
			Toast.show({
				type: "error",
				text1: error ?? "Delete account failed.",
			});
		}
	};
	const filterEventOnEventType =
		organizerEvents?.filter((dat) => dat?.status === selectedEventType) ?? [];
	return (
		<View style={styles.mainContainer}>
			<SideTopBar
				isTailIcon={true}
				title={"My Events"}
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
							<MyEventComp
								address={item?.address}
								date={item?.date}
								soldTickets={item?.stats?.ticketsSold}
								title={item?.title}
								totalTickets={item?.stats?.totalTickets}
								totalAmount={item?.stats?.revenue}
								showSmallButtons={selectedEventType === "Draft" ? true : false}
								onDeleteFun={() => deleteDraftEventFun(item?.id)}
								onPublishFun={() => darftToPublishEventFun(item?.id)}
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
				title={"Delete Account"}
				description={"Are you sure you want to delete\nyour account?"}
				showModal={openDeleteModal}
				hideModal={switchOpenDeleteModal}
				onYesFun={deleteAccountFun}
				onNoFun={switchOpenDeleteModal}
			/>
			<YesNoModal
				title={"Logout Account"}
				description={"Are you sure you want to logout\nyour account?"}
				showModal={openLogoutModal}
				onNoFun={switchOpenLogoutModal}
				hideModal={switchOpenLogoutModal}
				onYesFun={logoutAccountFun}
			/>
		</View>
	);
};

export default OrganizerEvents;
