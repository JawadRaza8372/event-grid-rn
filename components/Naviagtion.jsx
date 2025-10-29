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
			<Stack.Screen name="forgot-password" />
			<Stack.Screen name="otp-verification" />
			<Stack.Screen name="change-password" />
			<Stack.Screen name="book-event" />
			<Stack.Screen name="edit-profile" />
			<Stack.Screen name="edit-profile-organizer" />
			<Stack.Screen name="e-ticket-wallet" />
			<Stack.Screen name="(tabs)" />
			<Stack.Screen name="(tabs-organizer)" />
			<Stack.Screen name="location" />
			<Stack.Screen name="payments" />
			<Stack.Screen name="review-summary" />
			<Stack.Screen name="event-details" />
			<Stack.Screen name="ticket-history" />
			<Stack.Screen name="my-tickets" />
			<Stack.Screen name="organizer-events" />
			<Stack.Screen name="+not-found" />
		</Stack>
	);
};

export default Naviagtion;
