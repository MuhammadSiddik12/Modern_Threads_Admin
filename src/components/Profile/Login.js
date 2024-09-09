import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../asserts/style/Profile/Login.css";
import { loginUser } from "../../services/ApiService"; // Import the login function
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
	const [email, setEmail] = useState(""); // State for storing email input
	const [password, setPassword] = useState(""); // State for storing password input
	const [loading, setLoading] = useState(false); // State for loading state
	const navigate = useNavigate(); // Hook for programmatic navigation

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission behavior

		setLoading(true); // Set loading state to true

		try {
			const data = await loginUser(email, password); // Call the loginUser function with email and password

			// Store the token securely (preferably in HttpOnly cookies)
			localStorage.setItem("authToken", data.token);

			toast.success(data.message); // Show success message
			// Redirect to home page after successful login
			navigate("/");
			setTimeout(() => {
				window.location.reload(); // Reload page after redirect
			}, 1000);
		} catch (error) {
			toast.error("Login failed. Please check your credentials."); // Show error message if login fails
		} finally {
			setLoading(false); // Set loading state to false after try/catch block
		}
	};

	return (
		<div className="auth-page">
			<form className="auth-form" onSubmit={handleSubmit}>
				<h2>Login</h2>

				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)} // Update email state on change
						required // Ensure field is filled before submission
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)} // Update password state on change
						required // Ensure field is filled before submission
					/>
				</div>
				<button type="submit" className="auth-button" disabled={loading}>
					{loading ? "Logging in..." : "Login"}{" "}
					{/* Display appropriate button text based on loading state */}
				</button>
			</form>
		</div>
	);
};

export default LoginPage;
