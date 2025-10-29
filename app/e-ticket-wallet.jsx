import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useSelector } from "react-redux";
import AuthLayout from "../components/AuthLayout";
import ShowTicket from "../components/ShowTicket";
import SideTopBar from "../components/SideTopBar";
import { useThemeColors } from "../hooks/useThemeColors";

const ETicketWallet = () => {
	const { user } = useSelector((state) => state?.user);
	const colors = useThemeColors();
	const nonFormattedTicketData = useLocalSearchParams()?.ticketData;
	const ticketData = JSON.parse(nonFormattedTicketData);
	const styles = StyleSheet.create({
		barCodeContainer: {
			width: "100%",
			height: 120,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			marginTop: 34,
			marginBottom: 29,
		},
		barCodeImage: {
			width: "100%",
			height: "100%",
			resizeMode: "contain",
		},
		bottomPadding: {
			width: "100%",
			height: 80,
		},
	});
	console.log("hy", ticketData);
	return (
		<AuthLayout hideBgImg={true}>
			<>
				<SideTopBar
					title={"E-Ticket Wallet"}
					isTailIcon={true}
				/>
				<View style={styles.barCodeContainer}>
					<QRCode
						value={ticketData?.barcode || ""}
						size={180}
						backgroundColor={colors.mainBgColor}
						color={colors.blackColor}
					/>
				</View>
				<ShowTicket
					email={user?.email}
					id={ticketData?.id}
					paymentMethod={ticketData?.paymentMethod}
					phone={user?.phone}
					pricePaid={ticketData?.pricePaid}
					status={ticketData?.status}
					ticketType={ticketData?.ticketTierName}
					username={user?.username}
				/>

				<View style={styles.bottomPadding} />
			</>
		</AuthLayout>
	);
};

export default ETicketWallet;
