// app/(tabs)/_layout.jsx
import CreateEvent from "../../assets/bottomIcons/CreateEvent";
import HomeIcon from "../../assets/bottomIcons/HomeIcon";
import NotificationIcon from "../../assets/bottomIcons/NotificationIcon";
import ProfileIcon from "../../assets/bottomIcons/ProfileIcon";
import TicketIcon from "../../assets/bottomIcons/TicketIcon";

import TabElements from "../../components/TabElements";

export default function TabLayout() {
	const currentOrganizerRoutes = [
		{ name: "index", title: "index", icon: HomeIcon },
		{ name: "ticket", title: "ticket", icon: TicketIcon },
		{ name: "create-event", title: "create-event", icon: CreateEvent },
		{ name: "notification", title: "notification", icon: NotificationIcon },
		{ name: "profile", title: "profile", icon: ProfileIcon },
	];

	return <TabElements routes={currentOrganizerRoutes} />;
}
