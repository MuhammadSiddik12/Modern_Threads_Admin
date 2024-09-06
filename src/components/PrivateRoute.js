import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// Assuming you're storing the auth token in localStorage
const isAuthenticated = () => {
	return localStorage.getItem("authToken") !== null;
};

const PrivateRoute = ({ children }) => {
	const location = useLocation();

	return isAuthenticated() ? (
		children
	) : (
		<Navigate to="/login" state={{ from: location }} />
	);
};

export default PrivateRoute;
