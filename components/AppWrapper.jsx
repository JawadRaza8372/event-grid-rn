import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../constants/AuthContext";
import { useThemeColors } from "../hooks/useThemeColors";
import Navigation from "./Naviagtion";
const AppWrapper = () => {
	const colors = useThemeColors();
	return (
		<SafeAreaProvider>
			<SafeAreaView
				edges={["bottom", "top"]}
				style={{ flex: 1, backgroundColor: colors.mainBgColor }}>
				<StatusBar
					backgroundColor={colors.mainBgColor}
					barStyle={"dark-content"}
				/>
				<AuthContext>
					<Navigation />
				</AuthContext>
			</SafeAreaView>
		</SafeAreaProvider>
	);
};

export default AppWrapper;
