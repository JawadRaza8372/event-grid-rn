import { createContext, useState } from "react";

export const RoleContext = createContext();

export const AuthContext = ({ children }) => {
	const [role, setRole] = useState("user");

	const switchRole = () => {
		setRole((prev) => (prev === "user" ? "organizer" : "user"));
	};

	return (
		<RoleContext.Provider value={{ role, switchRole }}>
			{children}
		</RoleContext.Provider>
	);
};
