import { router } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import ScannerImage from "../../assets/images/Barcode.png";
import AuthLayout from "../../components/AuthLayout";
import CustomButton from "../../components/CustomButton";
import SideTopBar from "../../components/SideTopBar";
import { useThemeColors } from "../../hooks/useThemeColors";
const Ticket = () => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		scannerView: {
			width: "100%",
			maxWidth: 300,
			height: 300,
			marginTop: 40,
			marginBottom: 60,
			backgroundColor: colors.scannerBg,
			borderRadius: 20,
			alignSelf: "center",
		},
		scannerImage: {
			width: "100%",
			height: "100%",
			resizeMode: "contain",
		},
	});
	return (
		<AuthLayout hideBgImg={true}>
			<>
				<SideTopBar
					title={"Scan Ticket"}
					isTailIcon={true}
				/>
				<View style={styles.scannerView}>
					<Image
						source={ScannerImage}
						style={styles.scannerImage}
					/>
				</View>
				<CustomButton
					btnTitle={"Scan Now"}
					onPressFun={() => router.push({ pathname: "/e-ticket-wallet" })}
				/>
			</>
		</AuthLayout>
	);
};

export default Ticket;
