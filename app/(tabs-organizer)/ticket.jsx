import { useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import AuthLayout from "../../components/AuthLayout";
import CustomButton from "../../components/CustomButton";
import SideTopBar from "../../components/SideTopBar";
import { useThemeColors } from "../../hooks/useThemeColors";

const Ticket = () => {
	const [permission, requestPermission] = useCameraPermissions();
	const [scanned, setScanned] = useState(false);
	const [isLoading, setisLoading] = useState(false);
	const [scannedEventId, setscannedEventId] = useState(null);
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
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		permsiisonTxt: {
			fontSize: 14,
			fontWeight: "500",
			color: colors.mainBgColor,
			textAlign: "center",
			width: "75%",
		},
	});
	useEffect(() => {
		if (!permission) {
			requestPermission();
		}
	}, [permission]);

	const handleBarcodeScanned = ({ data, type }) => {
		setScanned(true);
		console.log("data", data, type);
	};

	return (
		<AuthLayout hideBgImg={true}>
			<>
				<SideTopBar
					title={"Scan Ticket"}
					isTailIcon={true}
				/>
				{permission ? (
					permission?.granted ? (
						<>
							<View style={styles.scannerView}>
								{scannedEventId ? (
									<Text style={styles.permsiisonTxt}>Ticket Scanned.</Text>
								) : (
									<CameraView
										style={StyleSheet.absoluteFillObject}
										facing="back"
										barcodeScannerSettings={{
											barcodeTypes: ["CODE128A"], // Add the types you want
										}}
										onBarcodeScanned={
											scanned ? undefined : handleBarcodeScanned
										}
									/>
								)}
							</View>
							{scannedEventId ? (
								<CustomButton
									btnTitle={"View Ticket"}
									onPressFun={() =>
										router.push({
											pathname: "/e-ticket-wallet",
											params: { eventId: scannedEventId },
										})
									}
								/>
							) : null}
						</>
					) : (
						<>
							<View style={styles.scannerView}>
								<Text style={styles.permsiisonTxt}>
									We need your permission to show the camera
								</Text>
							</View>
							<CustomButton
								btnTitle={"Scan Now"}
								onPressFun={() => router.push({ pathname: "/e-ticket-wallet" })}
							/>
						</>
					)
				) : (
					<View style={styles.scannerView}>
						<Text style={styles.permsiisonTxt}>
							Requesting camera permission...
						</Text>
					</View>
				)}
			</>
		</AuthLayout>
	);
};

export default Ticket;
