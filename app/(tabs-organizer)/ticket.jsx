import { CameraView, useCameraPermissions } from "expo-camera";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import AuthLayout from "../../components/AuthLayout";
import CenteredTitleTopBar from "../../components/CenteredTitleTopBar";
import CustomButton from "../../components/CustomButton";
import LoadingView from "../../components/LoadingView";
import ShowTicket from "../../components/ShowTicket";
import { useThemeColors } from "../../hooks/useThemeColors";
import {
	getTicketFromBarCodeApi,
	markTicketAsUsedApi,
} from "../../services/endpoints";
// import base from "../../services/base"; // uncomment if using axios instance

const Ticket = () => {
	const [permission, requestPermission] = useCameraPermissions();
	const [scanned, setScanned] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [ticketInfo, setTicketInfo] = useState(null);
	const colors = useThemeColors();

	useEffect(() => {
		if (!permission) requestPermission();
	}, [permission]);

	const fetchTicketInfo = async (eventId) => {
		setIsLoading(true);
		try {
			console.log("Fetching ticket info for:", eventId);
			const responce = await getTicketFromBarCodeApi(eventId);
			setTicketInfo(responce?.ticket);
		} catch (error) {
			Toast.show({
				type: "error",
				text1: error ?? "Invalid or Expired Ticket",
			});
		} finally {
			setIsLoading(false);
		}
	};
	const markTicketAsUsedFun = async () => {
		if (!ticketInfo?.event?.id || !ticketInfo?.id) {
			Toast.show({
				type: "error",
				text1: "Event ID and Ticket ID is required.",
			});
			return;
		}
		try {
			setIsLoading(true);
			await markTicketAsUsedApi(ticketInfo?.event?.id, ticketInfo?.id);
			Toast.show({
				type: "success",
				text1: "Ticket Marked as used successfully.",
			});
		} catch (error) {
			Toast.show({
				type: "error",
				text1: error ?? "Mark as used failed",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleBarcodeScanned = useCallback(({ data, type }) => {
		if (type !== "qr") {
			Toast.show({
				type: "error",
				text1: "Invalid Format",
				text2: "Please scan a valid QR code.",
			});
			return;
		}
		if (scanned) return;
		setScanned(true);
		fetchTicketInfo(data);
	}, []);

	const handleRescan = () => {
		setScanned(false);
		setTicketInfo(null);
	};

	const styles = StyleSheet.create({
		scannerView: {
			width: "100%",
			maxWidth: 300,
			height: 300,
			marginTop: 40,
			marginBottom: 40,
			backgroundColor: colors.scannerBg,
			borderRadius: 20,
			alignSelf: "center",
			alignItems: "center",
			justifyContent: "center",
			overflow: "hidden",
		},
		infoText: {
			fontSize: 14,
			fontWeight: "500",
			color: colors.blackColor,
			textAlign: "center",
			width: "80%",
		},
		loader: {
			marginTop: 10,
		},
		eventCard: {
			backgroundColor: colors.cardBg,
			padding: 20,
			borderRadius: 12,
			marginHorizontal: 20,
			marginTop: 10,
		},
		eventTitle: {
			fontSize: 16,
			fontWeight: "bold",
			color: colors.mainTextColor,
			marginBottom: 6,
			textAlign: "center",
		},
		eventDetail: {
			fontSize: 14,
			color: colors.subTextColor,
			textAlign: "center",
		},
		bottomPadding: {
			width: "100%",
			height: 80,
		},
		sideBySideButtons: {
			width: "100%",
			height: "auto",
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			flexDirection: "row",
		},
	});
	return (
		<AuthLayout hideBgImg={true}>
			<>
				<CenteredTitleTopBar title="Scan Ticket" />

				{ticketInfo ? (
					<>
						<ShowTicket
							email={ticketInfo?.owner?.email}
							id={ticketInfo?.id}
							paymentMethod={ticketInfo?.paymentMethod}
							phone={ticketInfo?.owner?.phone}
							pricePaid={ticketInfo?.pricePaid}
							status={ticketInfo?.status}
							ticketType={ticketInfo?.ticketTierName}
							username={ticketInfo?.owner?.username}
						/>
						<View style={styles.sideBySideButtons}>
							<CustomButton
								btnWidth={"49%"}
								btnTitle="Scan Another"
								onPressFun={handleRescan}
							/>
							<CustomButton
								btnWidth={"49%"}
								isDisabled={!ticketInfo?.isCurrrentUserCreator}
								btnTitle="Mark as Used"
								bgColor={colors.redColor}
								onPressFun={markTicketAsUsedFun}
							/>
						</View>
					</>
				) : !permission ? (
					<View style={styles.scannerView}>
						<Text style={styles.infoText}>Requesting camera permission...</Text>
						<ActivityIndicator
							style={styles.loader}
							size={"large"}
							color={colors.blackColor}
						/>
					</View>
				) : !permission.granted ? (
					<>
						<View style={styles.scannerView}>
							<Text style={styles.infoText}>
								We need camera access to scan tickets.
							</Text>
						</View>
						<CustomButton
							btnTitle="Grant Permission"
							onPressFun={requestPermission}
							btnStyle={{ marginTop: 20 }}
						/>
					</>
				) : (
					<View style={styles.scannerView}>
						<CameraView
							style={StyleSheet.absoluteFillObject}
							facing="back"
							barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
							onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
						/>
					</View>
				)}
				<View style={styles.bottomPadding} />

				<LoadingView loading={isLoading} />
			</>
		</AuthLayout>
	);
};

export default Ticket;
