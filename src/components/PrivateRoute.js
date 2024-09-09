import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// Function to check if the user is authenticated
// Assumes that an authentication token is stored in localStorage
const isAuthenticated = () => {
	return localStorage.getItem("authToken") !== null;
};

// Component to handle private routes
// If the user is authenticated, render the children components
// If not, redirect the user to the login page
const PrivateRoute = ({ children }) => {
	// Get the current location to pass it to the login page for redirect after login
	const location = useLocation();

	return isAuthenticated() ? (
		// Render the child components if authenticated
		children
	) : (
		// Redirect to the login page if not authenticated
		<Navigate to="/login" state={{ from: location }} />
	);
};

export default PrivateRoute;
