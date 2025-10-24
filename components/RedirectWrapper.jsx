import { Redirect } from "expo-router";
import { useSelector } from "react-redux";

const RedirecetWrapper = ({ children }) => {
	const { user } = useSelector((state) => state?.user);
	const userEmail = user?.email;
	if (userEmail) {
		return <Redirect href={"/(tabs)"} />;
	}

	return children;
};

export default RedirecetWrapper;
