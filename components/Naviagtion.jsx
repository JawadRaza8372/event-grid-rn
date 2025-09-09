import { useFonts } from "expo-font";
import { Stack } from "expo-router";

const Naviagtion = () => {
	const [loaded] = useFonts({
		"SpaceMono-Regular": require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	if (!loaded) {
		return null;
	}

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" />
			<Stack.Screen name="onBoarding" />
			<Stack.Screen name="login" />
			<Stack.Screen name="register" />
			<Stack.Screen name="+not-found" />
		</Stack>
	);
};

export default Naviagtion;
