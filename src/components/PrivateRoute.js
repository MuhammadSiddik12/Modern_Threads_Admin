import React from "react";
import { Navigate } from "react-router-dom";

// Assuming you're storing the auth token in localStorage
const isAuthenticated = () => {
	return localStorage.getItem("authToken") !== null;
};

const PrivateRoute = ({ children }) => {
	return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
