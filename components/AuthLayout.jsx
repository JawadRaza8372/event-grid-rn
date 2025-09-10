import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import backgroudImage from "../assets/images/Signin-bg.png";
import { useThemeColors } from "../hooks/useThemeColors";
const AuthLayout = ({ children }) => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		mainContainer: {
			width: "100%",
			height: "100%",
			position: "relative",
			backgroundColor: colors.mainBgColor,
		},
		backgroundImageStyle: {
			width: "100%",
			height: "32%",
			resizeMode: "contain",
			position: "absolute",
			top: 0,
			opacity: 0.45,
			right: -30,
		},
		childContainer: {
			width: Dimensions.get("screen").width - 36,
			height: "100%",
			alignSelf: "center",
		},
		formContainer: {
			width: "100%",
			height: "100%",
			display: "flex",
			flexDirection: "column",
			gap: 15,
			backgroundColor: colors.profileItemsTxtColor,
		},
	});
	return (
		<View style={styles.mainContainer}>
			<Image
				style={styles.backgroundImageStyle}
				source={backgroudImage}
			/>
			<View style={styles.childContainer}>
				<ScrollView>
					<View style={styles.formContainer}>{children}</View>
				</ScrollView>
			</View>
		</View>
	);
};

export default AuthLayout;
