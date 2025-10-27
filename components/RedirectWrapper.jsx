import { Redirect } from "expo-router";
import { useSelector } from "react-redux";

const RedirecetWrapper = ({ children }) => {
	const { user } = useSelector((state) => state?.user);
	const userEmail = user?.email;
	if (userEmail) {
		return (
			<Redirect
				href={user?.role === "user" ? "/(tabs)" : "/(tabs-organizer)"}
			/>
		);
	}

	return children;
};

export default RedirecetWrapper;
