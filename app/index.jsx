import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
	Animated,
	Dimensions,
	Easing,
	Image,
	StatusBar,
	StyleSheet,
	View,
} from "react-native";
import { useDispatch } from "react-redux";
import loadingImage from "../assets/images/loading.png";
import logoImage from "../assets/images/logo.png";
import { useThemeColors } from "../hooks/useThemeColors";
import { getUserProfileApi } from "../services/endpoints";
import {
	getUserTokenfromStorage,
	saveUserTokenToStorage,
	setUser,
} from "../services/store/userSlice";
const Splash = () => {
	const colors = useThemeColors();
	const dispatch = useDispatch();
	const spinValue = useRef(new Animated.Value(0)).current;
	const router = useRouter();
	const fetchSavedTokenFromDb = async () => {
		const { accessToken, refreshToken } = await getUserTokenfromStorage();
		if (accessToken && refreshToken) {
			await getUserProfileApi()
				.then(async (result) => {
					console.log("user success:", result?.user);

					const { tokens, ...rest } = result?.user;
					dispatch(setUser({ user: rest }));
					await saveUserTokenToStorage(
						tokens?.accessToken,
						tokens?.refreshToken
					);
					router.replace({
						pathname: rest?.role === "user" ? "/(tabs)" : "/(tabs-organizer)",
					});
				})
				.catch((err) => {
					console.log("err", err);
					router.replace({ pathname: "/onBoarding" });
				});
		} else {
			setTimeout(() => {
				router.replace({ pathname: "/onBoarding" });
			}, 800);
		}
	};
	useEffect(() => {
		fetchSavedTokenFromDb();
	}, []);

	useEffect(() => {
		Animated.loop(
			Animated.timing(spinValue, {
				toValue: 1,
				duration: 1200, // 1.2s per rotation
				easing: Easing.linear,
				useNativeDriver: true,
			})
		).start();
	}, [spinValue]);

	// Interpolating spin value to degrees
	const spin = spinValue.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "360deg"],
	});
	const styles = StyleSheet.create({
		screenContainer: {
			flex: 1,
			backgroundColor: colors.mainBgColor,
			alignItems: "center",
			justifyContent: "center",
			position: "relative",
		},
		logoStyle: {
			width: "85%",
			height: Dimensions.get("screen").height / 2,
			resizeMode: "contain",
		},
		loadingStyle: {
			width: 90,
			height: 90,
			resizeMode: "contain",
			position: "absolute",
			bottom: StatusBar.currentHeight / 2.5 ?? 20,
		},
	});
	return (
		<View style={styles.screenContainer}>
			<Image
				source={logoImage}
				style={styles.logoStyle}
			/>
			<Animated.Image
				source={loadingImage}
				style={[styles.loadingStyle, { transform: [{ rotate: spin }] }]}
			/>
		</View>
	);
};

export default Splash;
