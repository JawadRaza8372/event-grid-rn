import { Redirect } from "expo-router";
import { useSelector } from "react-redux";

const ProtectRedirectWrapper = ({ children }) => {
	const { user } = useSelector((state) => state?.user);
	const userEmail = user?.email;
	if (!userEmail) {
		return <Redirect href={"/login"} />;
	}

	return children;
};

export default ProtectRedirectWrapper;
