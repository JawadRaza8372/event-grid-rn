import * as NavigationBar from "expo-navigation-bar";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useThemeColors } from "../hooks/useThemeColors";
import Navigation from "./Naviagtion";
const AppWrapper = () => {
	const colors = useThemeColors();
	useEffect(() => {
		const lockOrientation = async () => {
			try {
				await ScreenOrientation.lockAsync(
					ScreenOrientation.OrientationLock.PORTRAIT
				);
				await NavigationBar.setButtonStyleAsync("dark");
			} catch (err) {
				console.log("Failed to lock orientation:", err);
			}
		};
		lockOrientation();
		initiateSocket();
		return () => {
			disconnectSocket();
		};
	}, []);
	return (
		<SafeAreaProvider>
			<SafeAreaView
				edges={["bottom", "top"]}
				style={{ flex: 1, backgroundColor: colors.mainBgColor }}>
				<StatusBar
					backgroundColor={colors.mainBgColor}
					barStyle={"dark-content"}
				/>
				<Navigation />
			</SafeAreaView>
		</SafeAreaProvider>
	);
};

export default AppWrapper;
