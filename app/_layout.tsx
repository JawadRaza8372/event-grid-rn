import AppWrapper from "@/components/AppWrapper";
import { AuthProvider } from "@/constants/AuthContext";
import { KeyboardAvoidingView, LogBox, Platform } from "react-native";
import "react-native-reanimated";
export default function RootLayout() {
	LogBox.ignoreLogs([
		"VirtualizedLists should never be nested",
		"ReanimatedError: [Reanimated] Tried to synchronously call a non-worklet function `valueSetter`",
	]);

	return (
		<AuthProvider>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : undefined}>
				<AppWrapper />
			</KeyboardAvoidingView>
		</AuthProvider>
	);
}
