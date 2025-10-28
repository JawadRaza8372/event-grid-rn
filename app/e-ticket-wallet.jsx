import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Barcode from "react-native-barcode-svg";
import AuthLayout from "../components/AuthLayout";
import SideTopBar from "../components/SideTopBar";
import { useThemeColors } from "../hooks/useThemeColors";

const ETicketWallet = () => {
	const colors = useThemeColors();
	const { eventData } = useLocalSearchParams();

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
		dataContainer: {
			borderRadius: 25,
			paddingVertical: 20,
			paddingHorizontal: 23,
			width: "100%",
			height: "auto",
			display: "flex",
			flexDirection: "column",
			gap: 20,
			backgroundColor: colors.topEventBg,
			minHeight: 120,
			marginBottom: 29,
		},
		sideBySideContainer: {
			width: "100%",
			height: "auto",
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			flexDirection: "row",
		},
		labelTxt: {
			fontSize: 12,
			fontWeight: "600",
			color: colors.successSubTxtColor,
			width: "49%",
		},
		labelValue: {
			fontSize: 12,
			fontWeight: "500",
			color: colors.authTitleColor,
			width: "49%",
			textAlign: "right",
		},
		borderedView: {
			width: "100%",
			height: 1.3,
			backgroundColor: colors.createEventInputBg,
		},
		bottomPadding: {
			width: "100%",
			height: 80,
		},
	});
	return (
		<AuthLayout hideBgImg={true}>
			<>
				<SideTopBar
					title={"E-Ticket Wallet"}
					isTailIcon={true}
				/>
				<View style={styles.barCodeContainer}>
					<Barcode
						value={eventData?.id}
						format="EAN13"
						width={2}
						height={100}
						background={colors.mainBgColor}
						lineColor={colors.blackColor}
					/>
				</View>
				<View style={styles.dataContainer}>
					<View style={styles.sideBySideContainer}>
						<Text style={styles.labelTxt}>Full Name</Text>
						<Text
							numberOfLines={1}
							ellipsizeMode="tail"
							style={styles.labelValue}>
							Jhon Doe
						</Text>
					</View>
					<View style={styles.sideBySideContainer}>
						<Text style={styles.labelTxt}>Phone</Text>
						<Text
							numberOfLines={1}
							ellipsizeMode="tail"
							style={styles.labelValue}>
							********
						</Text>
					</View>
					<View style={styles.sideBySideContainer}>
						<Text style={styles.labelTxt}>Email</Text>
						<Text
							numberOfLines={1}
							ellipsizeMode="tail"
							style={styles.labelValue}>
							jhondoe@gmail.com
						</Text>
					</View>
				</View>
				<View style={styles.dataContainer}>
					<View style={styles.sideBySideContainer}>
						<Text style={styles.labelTxt}>1 Ticket (Economy)</Text>
						<Text
							numberOfLines={1}
							ellipsizeMode="tail"
							style={styles.labelValue}>
							$50.00
						</Text>
					</View>
					<View style={styles.sideBySideContainer}>
						<Text style={styles.labelTxt}>Tax</Text>
						<Text
							numberOfLines={1}
							ellipsizeMode="tail"
							style={styles.labelValue}>
							$5.00
						</Text>
					</View>
					<View style={styles.borderedView} />
					<View style={styles.sideBySideContainer}>
						<Text style={styles.labelTxt}>Total</Text>
						<Text
							numberOfLines={1}
							ellipsizeMode="tail"
							style={styles.labelValue}>
							$55.00
						</Text>
					</View>
				</View>
				<View style={styles.dataContainer}>
					<View style={styles.sideBySideContainer}>
						<Text style={styles.labelTxt}>Payment Method</Text>
						<Text
							numberOfLines={1}
							ellipsizeMode="tail"
							style={styles.labelValue}>
							MasterCard
						</Text>
					</View>
					<View style={styles.sideBySideContainer}>
						<Text style={styles.labelTxt}>Order ID</Text>
						<Text
							numberOfLines={1}
							ellipsizeMode="tail"
							style={styles.labelValue}>
							5678548
						</Text>
					</View>
					<View style={styles.borderedView} />
					<View style={styles.sideBySideContainer}>
						<Text style={styles.labelTxt}>Status</Text>
						<Text
							numberOfLines={1}
							ellipsizeMode="tail"
							style={styles.labelValue}>
							Paid
						</Text>
					</View>
				</View>
				<View style={styles.bottomPadding} />
			</>
		</AuthLayout>
	);
};

export default ETicketWallet;
