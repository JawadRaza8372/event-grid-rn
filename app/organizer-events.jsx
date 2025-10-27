import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { Icons } from "../assets/icons";
import ProfileOption from "../components/ProfileOption";
import SideTopBar from "../components/SideTopBar";
import TabContainer from "../components/TabContainer";
import YesNoModal from "../components/YesNoModal";
import { useThemeColors } from "../hooks/useThemeColors";
import { setAuthToken } from "../services/apiUrl";
import { deleteAccountApi } from "../services/endpoints";
import {
	removeUserTokenfromStorage,
	resetUser,
} from "../services/store/userSlice";
const OrganizerEvents = () => {
	const { user } = useSelector((state) => state?.user);
	const router = useRouter();
	const dispatch = useDispatch();
	const colors = useThemeColors();
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
		},
		bottomPadding: {
			width: "100%",
			height: 120,
		},
	});
	const menuOptions = [
		{
			title: "My Tickets",
			icon: (
				<Icons.Ticket
					width={25}
					height={25}
				/>
			),
			onClickFun: () => null,
		},
		{
			title: "Ticket History",
			icon: (
				<Icons.TransactionHistory
					width={25}
					height={25}
				/>
			),
			onClickFun: () => null,
		},
		{
			title: "Edit profile",
			icon: <Icons.Edit size={25} />,
			onClickFun: () => {
				if (user?.role === "organizer") {
					router.push({ pathname: "/edit-profile-organizer" });
				} else if (user?.role === "user") {
					router.push({ pathname: "/edit-profile" });
				} else {
					Toast.show({ type: "error", text1: "Unknow user type." });
					return;
				}
			},
		},

		{
			title: "Log Out",
			icon: (
				<Icons.Logout
					width={25}
					height={25}
				/>
			),
			onClickFun: () => switchOpenLogoutModal(),
		},
		{
			title: "Delete Account",
			icon: (
				<Icons.Delete
					width={25}
					height={25}
				/>
			),
			onClickFun: () => switchOpenDeleteModal(),
		},
	];
	const logoutAccountFun = async () => {
		await removeUserTokenfromStorage();
		dispatch(resetUser());
		setAuthToken(null);
		switchOpenLogoutModal();
		setTimeout(() => {
			router.replace({ pathname: "/login" });
		}, 100);
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
	return (
		<View style={styles.mainContainer}>
			<SideTopBar
				isTailIcon={true}
				title={"My Events"}
			/>
			<TabContainer
				value={selectedEventType}
				onchange={(text) => setSelectedEventType(text)}
				options={["Published", "Drafts", "Completed"]}
			/>
			<FlatList
				showsVerticalScrollIndicator={false}
				data={menuOptions}
				renderItem={({ item }) => (
					<ProfileOption
						title={item?.title}
						onPressFun={item.onClickFun}
						icon={item.icon}
					/>
				)}
				ListFooterComponent={<View style={styles.bottomPadding} />}
			/>
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
