import AppWrapper from "@/components/AppWrapper";
import { StripeProvider } from "@stripe/stripe-react-native";
import {
	AppRegistry,
	KeyboardAvoidingView,
	LogBox,
	Platform,
} from "react-native";
import "react-native-reanimated";
import Toast, { BaseToast, BaseToastProps } from "react-native-toast-message";
import { Provider } from "react-redux";
import store from "../services/store";

try {
	if (!AppRegistry.getRunnable("StripeKeepJsAwakeTask")) {
		AppRegistry.registerHeadlessTask(
			"StripeKeepJsAwakeTask",
			() => () => Promise.resolve()
		);
	}
} catch (e) {
	console.log("StripeKeepJsAwakeTask already registered or not needed");
}
const toastProps: BaseToastProps = {
	text1Style: {
		fontSize: 18,
		lineHeight: 22,
	},
	text2Style: {
		fontSize: 14,
		lineHeight: 18,
	},
	text2NumberOfLines: 0,
	style: {
		height: "auto",
		paddingVertical: 10,
		paddingHorizontal: 0,
	},
};

const toastConfig = {
	info: (props: any) => (
		<BaseToast
			{...props}
			text1NumberOfLines={0} // 👈 allow wrapping
			style={[
				toastProps.style,
				{
					borderLeftColor: "transaprent",
				},
			]}
		/>
	),
	success: (props: any) => (
		<BaseToast
			{...props}
			text1NumberOfLines={0} // 👈 allow wrapping
			style={[
				toastProps.style,
				{
					borderLeftColor: "#69C779",
				},
			]}
		/>
	),
	error: (props: any) => (
		<BaseToast
			{...props}
			text1NumberOfLines={0}
			style={[
				toastProps.style,
				{
					borderLeftColor: "red",
				},
			]}
		/>
	),
};

export default function RootLayout() {
	LogBox.ignoreLogs([
		"VirtualizedLists should never be nested",
		"ReanimatedError: [Reanimated] Tried to synchronously call a non-worklet function `valueSetter`",
	]);
	const publishKeyValue = process.env.EXPO_PUBLIC_STRIPE_PUBLISHKEY ?? "";

	return (
		<StripeProvider
			urlScheme="com.eventgrid"
			publishableKey={publishKeyValue}>
			<Provider store={store}>
				<KeyboardAvoidingView
					style={{ flex: 1 }}
					behavior={Platform.OS === "ios" ? "padding" : undefined}>
					<AppWrapper />
					<Toast config={toastConfig} />
				</KeyboardAvoidingView>
			</Provider>
		</StripeProvider>
	);
}
