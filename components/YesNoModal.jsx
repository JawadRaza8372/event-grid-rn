import {
	Dimensions,
	Image,
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import deletImage from "../assets/images/Question.png";
import { useThemeColors } from "../hooks/useThemeColors";
const YesNoModal = ({
	showModal,
	hideModal,
	onYesFun,
	onNoFun,
	title,
	description,
	yesTxt,
	noTxt,
}) => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		mainContainer: {
			width: "100%",
			height: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column",
			backgroundColor: colors.modalBg,
		},
		modalMainContainer: {
			width: Dimensions.get("screen").width - 60,
			alignSelf: "center",
			maxWidth: 450,
			padding: 23,
			paddingVertical: 43,
			borderRadius: 8,
			shadowColor: colors.blackColor,
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowOpacity: 0.25,
			shadowRadius: 3.84,
			elevation: 5,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column",
			backgroundColor: colors.mainBgColor,
		},
		modalImage: {
			width: 60,
			resizeMode: "contain",
			height: 60,
		},
		textContainer: {
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column",
			gap: 10,
			marginTop: 26,
			marginBottom: 34,
		},
		titleTxt: {
			fontSize: 24,
			fontWeight: "700",
			textAlign: "center",
			color: colors.modalBg,
		},
		descriptionTxt: {
			fontSize: 16,
			fontWeight: "500",
			color: colors.deleteDesc,
			textAlign: "center",
		},
		sideBySideView: {
			width: "100%",
			height: 65,
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			flexDirection: "row",
		},
		noBtn: {
			width: "49%",
			height: "100%",
			borderRadius: 31,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: colors.noBtnBg,
		},
		noTxt: {
			fontSize: 16,
			fontWeight: "500",
			color: colors.blackColor,
		},
		yesBtn: {
			width: "49%",
			height: "100%",
			borderRadius: 31,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: colors.blackColor,
		},
		yesTxt: {
			fontSize: 16,
			fontWeight: "500",
			color: colors.mainBgColor,
		},
	});

	return (
		<Modal
			transparent={true}
			visible={showModal}
			onRequestClose={hideModal}>
			<TouchableOpacity
				onPress={hideModal}
				style={styles.mainContainer}>
				<View style={styles?.modalMainContainer}>
					<Image
						source={deletImage}
						style={styles.modalImage}
					/>
					<View style={styles.textContainer}>
						<Text style={styles.titleTxt}>{title ?? ""}</Text>
						<Text style={styles.descriptionTxt}>{description ?? ""}</Text>
					</View>
					<View style={styles.sideBySideView}>
						<TouchableOpacity
							onPress={onNoFun}
							style={styles.noBtn}>
							<Text style={styles.noTxt}>{noTxt ?? "No"}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={onYesFun}
							style={styles.yesBtn}>
							<Text style={styles.yesTxt}>{yesTxt ?? "Yes"}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</TouchableOpacity>
		</Modal>
	);
};

export default YesNoModal;
