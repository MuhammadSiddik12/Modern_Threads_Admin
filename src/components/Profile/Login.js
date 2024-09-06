import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../asserts/style/Profile/Login.css";
import { loginUser } from "../../services/api"; // Import the login function
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
	const [email, setEmail] = useState(""); // State for storing email input
	const [password, setPassword] = useState(""); // State for storing password input
	const [loading, setLoading] = useState(false); // State for loading state
	const navigate = useNavigate(); // Hook for programmatic navigation

	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission behavior

		setLoading(true); // Start loading

		try {
			const data = await loginUser(email, password); // Call the loginUser function
			console.log("🚀 ~ handleSubmit ~ data:", data);

			// Store the token (you can store it in localStorage or sessionStorage)
			localStorage.setItem("authToken", data.token);

			toast.success(data.message);
			// Redirect to home page after successful login
			navigate("/");
			setTimeout(() => {
				window.location.reload();
			}, 2000);
		} catch (error) {
			toast.error(error);
		} finally {
			setLoading(false); // Stop loading
		}
	};

	return (
		<div className="auth-page">
			<form className="auth-form" onSubmit={handleSubmit}>
				<h2>Login</h2>

				<div className="form-group">
					<label>Email</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)} // Update email state on change
						required // Ensure field is filled before submission
					/>
				</div>
				<div className="form-group">
					<label>Password</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)} // Update password state on change
						required // Ensure field is filled before submission
					/>
				</div>
				<button type="submit" className="auth-button" disabled={loading}>
					{loading ? "Logging in..." : "Login"}
				</button>
			</form>
		</div>
	);
};

export default LoginPage;
