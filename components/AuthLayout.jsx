import { useEffect, useRef } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import backgroudImage from "../assets/images/Signin-bg.png";
import { useThemeColors } from "../hooks/useThemeColors";
const AuthLayout = ({ children, hideBgImg, goScrollToTop }) => {
	const colors = useThemeColors();
	const scrollRef = useRef(null);

	const scrollToTop = () => {
		scrollRef.current?.scrollTo({ y: 0, animated: true });
	};
	useEffect(() => {
		if (goScrollToTop) {
			scrollToTop();
		}
	}, [goScrollToTop]);

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
		},
	});
	return (
		<View style={styles.mainContainer}>
			{hideBgImg ? null : (
				<Image
					style={styles.backgroundImageStyle}
					source={backgroudImage}
				/>
			)}
			<View style={styles.childContainer}>
				<ScrollView
					ref={scrollRef}
					showsVerticalScrollIndicator={false}>
					<View style={styles.formContainer}>{children}</View>
				</ScrollView>
			</View>
		</View>
	);
};

export default AuthLayout;
