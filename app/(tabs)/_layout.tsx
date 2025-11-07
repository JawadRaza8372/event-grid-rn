// app/(tabs)/_layout.jsx
import FavoriteIcon from "../../assets/bottomIcons/FavoriteIcon";
import HomeIcon from "../../assets/bottomIcons/HomeIcon";
import NotificationIcon from "../../assets/bottomIcons/NotificationIcon";
import ProfileIcon from "../../assets/bottomIcons/ProfileIcon";
import TabElements from "../../components/TabElements";
export default function TabLayout() {
	const currentUserRoutes = [
		{ name: "index", title: "index", icon: HomeIcon },
		{ name: "fav-event", title: "fav-event", icon: FavoriteIcon },
		{ name: "notification", title: "notification", icon: NotificationIcon },
		{ name: "profile", title: "profile", icon: ProfileIcon },
	];
	return <TabElements routes={currentUserRoutes} />;
}
