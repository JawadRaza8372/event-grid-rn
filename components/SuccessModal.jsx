import {
	Dimensions,
	Image,
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import successImage from "../assets/images/success.png";
import { useThemeColors } from "../hooks/useThemeColors";
const SuccessModal = ({ showModal, hideModal, title, description }) => {
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
			paddingHorizontal: 16,
			paddingVertical: 22,
			borderRadius: 25,
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
		modalTitleTxt: {
			fontSize: 20,
			fontWeight: "600",
			color: colors.blackColor,
			textAlign: "center",
			marginTop: 15,
			marginBottom: 9,
		},
		modalSubTitleTxt: {
			fontSize: 10,
			fontWeight: "500",
			color: colors.successSubTxtColor,
			lineHeight: 14,
		},
		modalImage: {
			width: "100%",
			resizeMode: "contain",
			height: 150,
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
						source={successImage}
						style={styles.modalImage}
					/>
					<Text style={styles.modalTitleTxt}>{title ?? ""}</Text>
					<Text style={styles.modalSubTitleTxt}>{description ?? ""}</Text>
				</View>
			</TouchableOpacity>
		</Modal>
	);
};

export default SuccessModal;
