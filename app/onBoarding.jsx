import { useRouter } from "expo-router";
import { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import onBoardingImage from "../assets/images/borading-image.png";
import CustomButton from "../components/CustomButton";
import { boardingData } from "../constants/rawData";
import { useThemeColors } from "../hooks/useThemeColors";
const onBoarding = () => {
	const colors = useThemeColors();
	const router = useRouter();
	const [currentIndex, setcurrentIndex] = useState(0);
	const handleOnNextFun = () => {
		if (currentIndex < boardingData.length - 1) {
			setcurrentIndex(currentIndex + 1);
		} else {
			router.replace({ pathname: "/login" });
		}
	};
	const styles = StyleSheet.create({
		screenContainer: {
			flex: 1,
			backgroundColor: colors.mainBgColor,
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column",
			gap: 20,
		},
		otherContainer: {
			width: "100%",
			height: "auto",
			gap: 20,
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column",
			marginBottom: 20,
		},
		imageContainer: {
			width: Dimensions.get("screen").width - 120,
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column",
		},
		mainImageStyle: {
			width: "100%",
			height: "100%",
			resizeMode: "contain",
		},
		textContainer: {
			width: Dimensions.get("screen").width - 60,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column",
			gap: 21,
			marginTop: 30,
		},
		titleTxt: {
			fontSize: 24,
			fontWeight: "700",
			color: colors.blackColor,
			textAlign: "center",
		},
		subTitleTxt: {
			fontSize: 12,
			fontWeight: "500",
			color: colors.onBoardSubColor,
		},
		activeIndicatorView: {
			width: 44,
			height: 10,
			borderRadius: 10,
			backgroundColor: colors.blackColor,
		},
		indicatorView: {
			width: 10,
			height: 10,
			borderRadius: 10,
			backgroundColor: colors.inActiveColor,
		},
		indicatorContainer: {
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
			gap: 3,
			marginVertical: 10,
		},
	});
	return (
		<View style={styles.screenContainer}>
			<View style={styles.imageContainer}>
				<Image
					style={styles.mainImageStyle}
					source={onBoardingImage}
				/>
			</View>
			<View style={styles.otherContainer}>
				<View style={styles.textContainer}>
					<Text style={styles.titleTxt}>
						{boardingData[currentIndex]?.title ?? ""}
					</Text>
					<Text style={styles.subTitleTxt}>
						{boardingData[currentIndex]?.subTitle ?? ""}
					</Text>
				</View>
				<View style={styles.indicatorContainer}>
					{boardingData.map((_, index) => (
						<View
							key={index}
							style={
								index === currentIndex
									? styles?.activeIndicatorView
									: styles?.indicatorView
							}
						/>
					))}
				</View>
				<CustomButton
					btnTitle={"Next"}
					onPressFun={handleOnNextFun}
				/>
			</View>
		</View>
	);
};

export default onBoarding;
