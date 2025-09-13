// context/RoleContext.js
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [role, setRole] = useState("user");

	const switchRole = () => {
		setRole((prev) => (prev === "user" ? "organizer" : "user"));
	};

	return (
		<AuthContext.Provider value={{ role, switchRole }}>
			{children}
		</AuthContext.Provider>
	);
};
