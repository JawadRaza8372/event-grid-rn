import { GestureHandlerRootView } from "react-native-gesture-handler";
import NotificationScreen from "../../components/NotificationScreen";

const Notification = () => {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<NotificationScreen />
		</GestureHandlerRootView>
	);
};

export default Notification;
