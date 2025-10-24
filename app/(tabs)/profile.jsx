import { router } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Icons } from "../../assets/icons";
import DeleteAccountModal from "../../components/DeleteAccountModal";
import ProfileOption from "../../components/ProfileOption";
import SideTopBar from "../../components/SideTopBar";
import UserAvatar from "../../components/UserAvatar";
import { useThemeColors } from "../../hooks/useThemeColors";

const Profile = () => {
	const colors = useThemeColors();
	const role = "";
	const isOrganizerHomeScreen = role && role !== "user";
	const switchRole = () => null;

	const [openDeleteModal, setopenDeleteModal] = useState(false);
	const switchOpenDeleteModal = () => {
		setopenDeleteModal(!openDeleteModal);
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
			title: "Notifications",
			icon: (
				<Icons.Notification
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
				if (isOrganizerHomeScreen) {
					router.push({ pathname: "/edit-profile-organizer" });
				} else {
					router.push({ pathname: "/edit-profile" });
				}
			},
		},
		{
			title: "Switch Role",
			icon: (
				<Icons.Star
					width={25}
					height={25}
				/>
			),
			onClickFun: () => switchRole(),
		},
		{
			title: "Payment Method",
			icon: (
				<Icons.CreditCard
					width={25}
					height={25}
				/>
			),
			onClickFun: () => null,
		},
		{
			title: "Log Out",
			icon: (
				<Icons.Logout
					width={25}
					height={25}
				/>
			),
			onClickFun: () => null,
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
	return (
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
							<UserAvatar size={103} />
							<Text
								numberOfLines={1}
								ellipsizeMode="tail"
								style={styles.usernameTxt}>
								Jhon Doe
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
			<DeleteAccountModal
				showModal={openDeleteModal}
				hideModal={switchOpenDeleteModal}
				onYesFun={switchOpenDeleteModal}
			/>
		</View>
	);
};

export default Profile;
