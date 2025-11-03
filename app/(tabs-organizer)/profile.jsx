import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { Icons } from "../../assets/icons";
import ProfileOption from "../../components/ProfileOption";
import ProtectRedirectWrapper from "../../components/ProtectRedirectWrapper";
import SideTopBar from "../../components/SideTopBar";
import UserAvatar from "../../components/UserAvatar";
import YesNoModal from "../../components/YesNoModal";
import { useThemeColors } from "../../hooks/useThemeColors";
import { setAuthToken } from "../../services/apiUrl";
import { deleteAccountApi } from "../../services/endpoints";
import {
	removeUserTokenfromStorage,
	resetOrganizer,
} from "../../services/store/userSlice";
const Profile = () => {
	const { user } = useSelector((state) => state?.user);
	const router = useRouter();
	const dispatch = useDispatch();
	const colors = useThemeColors();
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
		},
		bottomPadding: {
			width: "100%",
			height: 120,
		},
	});
	const menuOptions = [
		{
			title: "My Events",
			icon: (
				<Icons.TransactionHistory
					width={25}
					height={25}
				/>
			),
			onClickFun: () => router.push({ pathname: "/organizer-events" }),
		},
		{
			title: "Edit profile",
			icon: <Icons.Edit size={25} />,
			onClickFun: () => router.push({ pathname: "/edit-profile-organizer" }),
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
		dispatch(resetOrganizer());
		setAuthToken(null);
		switchOpenLogoutModal();
	};
	const deleteAccountFun = async () => {
		try {
			await deleteAccountApi();
			await removeUserTokenfromStorage();
			dispatch(resetOrganizer());
			setAuthToken(null);
			switchOpenDeleteModal();
		} catch (error) {
			console.log("Delete Account failed: ", error);
			Toast.show({
				type: "error",
				text1: error ?? "Delete account failed.",
			});
		}
	};
	return (
		<ProtectRedirectWrapper>
			<View style={styles.mainContainer}>
				<FlatList
					showsVerticalScrollIndicator={false}
					ListHeaderComponent={
						<>
							<SideTopBar
								isTailIcon={true}
								title={"Profile"}
							/>
							<View style={styles.userContainer}>
								<UserAvatar
									imgUrl={user?.profileImage}
									size={103}
								/>
								<Text
									numberOfLines={1}
									ellipsizeMode="tail"
									style={styles.usernameTxt}>
									{user?.username ?? ""}
								</Text>
							</View>
						</>
					}
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
					description={"Are you sure you want to delete your account?"}
					showModal={openDeleteModal}
					hideModal={switchOpenDeleteModal}
					onYesFun={deleteAccountFun}
					onNoFun={switchOpenDeleteModal}
				/>
				<YesNoModal
					title={"Logout Account"}
					description={"Are you sure you want to logout your account?"}
					showModal={openLogoutModal}
					onNoFun={switchOpenLogoutModal}
					hideModal={switchOpenLogoutModal}
					onYesFun={logoutAccountFun}
				/>
			</View>
		</ProtectRedirectWrapper>
	);
};

export default Profile;
