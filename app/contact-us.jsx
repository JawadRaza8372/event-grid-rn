import { useState } from "react";
import { StyleSheet, View } from "react-native";
import CenteredTitleTopBar from "../components/CenteredTitleTopBar";
import LoadingView from "../components/LoadingView";
import { useThemeColors } from "../hooks/useThemeColors";
const ContactUs = () => {
	const colors = useThemeColors();
	const [isLoading, setisLoading] = useState(false);
	const styles = StyleSheet.create({
		mainContainerScreen: {
			width: "100%",
			height: "100%",
			backgroundColor: colors.mainBgColor,
			paddingBottom: 30,
			display: "flex",
			flexDirection: "column",
			gap: 20,
		},
		chalidContainer: {
			width: "100%",
			flex: 1,
		},
	});
	return (
		<View style={styles.mainContainerScreen}>
			<CenteredTitleTopBar
				title={"Contact Us"}
				showBackBtn={true}
			/>
			<View style={styles.chalidContainer}></View>
			<LoadingView loading={isLoading} />
		</View>
	);
};

export default ContactUs;
