import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import CenteredTitleTopBar from "../components/CenteredTitleTopBar";
import LoadingView from "../components/LoadingView";
import MyEventInvite from "../components/MyEventInvite";
import YesNoModal from "../components/YesNoModal";
import { useThemeColors } from "../hooks/useThemeColors";
import {
	acceptStaffInviteEventApi,
	rejectStaffInviteEventApi,
} from "../services/endpoints";

const StaffInvites = () => {
	const { organizerInvites } = useSelector((state) => state?.user);
	const colors = useThemeColors();
	const [isLoading, setisLoading] = useState(false);
	const [openDeleteModal, setopenDeleteModal] = useState(null);
	const [openPublishModal, setopenPublishModal] = useState(null);

	const removeOpenDeleteModal = () => {
		setopenDeleteModal(null);
	};
	const removeOpenPublishModal = () => {
		setopenPublishModal(null);
	};
	const acceptEventInviteFun = async () => {
		try {
			if (openPublishModal == null) {
				Toast.show({
					type: "error",
					text1: "Invalid Event selected.",
				});
				return;
			}
			setisLoading(true);
			await acceptStaffInviteEventApi(openPublishModal);
			setisLoading(false);
			removeOpenPublishModal();
			Toast.show({
				type: "success",
				text1: "Invitation accepted successfully.",
			});
		} catch (error) {
			console.log("invite accept error: ", error);
			setisLoading(false);
			Toast.show({
				type: "error",
				text1: error ?? "Accepting Invite failed.",
			});
		}
	};
	const rejectEventInviteFun = async () => {
		try {
			if (openDeleteModal == null) {
				Toast.show({
					type: "error",
					text1: "Invalid Event selected.",
				});
				return;
			}
			setisLoading(true);
			await rejectStaffInviteEventApi(openDeleteModal);
			setisLoading(false);
			removeOpenDeleteModal();

			Toast.show({
				type: "success",
				text1: "Invitation rejected successfully.",
			});
		} catch (error) {
			console.log("invite reject error: ", error);
			setisLoading(false);
			Toast.show({
				type: "error",
				text1: error ?? "Rejecting Invite failed.",
			});
		}
	};
	const styles = StyleSheet.create({
		mainContainer: {
			width: "100%",
			height: "100%",
			backgroundColor: colors.mainBgColor,
			paddingHorizontal: 16,
			gap: 15,
		},
		childContainer: {
			width: "100%",
			flex: 1,
		},
		bottomPadding: {
			width: "100%",
			height: 120,
		},
		sepratorView: {
			width: "100%",
			height: 15,
		},
	});
	return (
		<View style={styles.mainContainer}>
			<CenteredTitleTopBar
				paddingHorizontal={5}
				title={"My Invites as Staff"}
				showBackBtn={true}
			/>
			<View style={styles.childContainer}>
				<FlatList
					showsVerticalScrollIndicator={false}
					data={organizerInvites}
					keyExtractor={(item) => item?.eventId}
					renderItem={({ item }) => {
						return (
							<MyEventInvite
								status={item?.status}
								bannerImage={item?.eventBanner}
								address={item?.location?.address}
								date={item?.date}
								title={item?.eventTitle}
								onRejectFun={() => setopenDeleteModal(item?.eventId)}
								onAcceptFun={() => setopenPublishModal(item?.eventId)}
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
				title={"Reject Invite"}
				description={
					"Are you sure you want to reject this invite as staff member?"
				}
				showModal={openDeleteModal ? true : false}
				hideModal={removeOpenDeleteModal}
				onYesFun={rejectEventInviteFun}
				onNoFun={removeOpenDeleteModal}
				yesTxt={"Delete"}
				noTxt={"Cancel"}
			/>
			<YesNoModal
				title={"Accept Invite"}
				description={
					"Are you sure you want to accept this invite as staff member?"
				}
				showModal={openPublishModal ? true : false}
				yesTxt={"Publish"}
				noTxt={"Cancel"}
				onNoFun={removeOpenPublishModal}
				hideModal={removeOpenPublishModal}
				onYesFun={acceptEventInviteFun}
			/>
		</View>
	);
};

export default StaffInvites;

const styles = StyleSheet.create({});
